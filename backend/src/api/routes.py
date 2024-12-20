# src/api/routes.py
from flask import Blueprint, request, jsonify, current_app
from ..core.guide_designer import GuideDesigner
from ..core.genome_loader import GenomeLoader
from ..models.database import db, Guide, Design
from .validators import validate_sequence
import logging
from datetime import datetime

api = Blueprint('api', __name__)
logger = logging.getLogger(__name__)


@api.route('/design', methods=['POST'])
def design_grna():
    try:
        data = request.get_json()

        # Validate input
        validation_result = validate_sequence(data)
        if validation_result is not True:
            return jsonify({'error': validation_result}), 400

        # Get parameters
        sequence = data['sequence'].upper()
        cas_type = data.get('cas_type', 'SpCas9')

        # Create design record
        design = Design(
            input_sequence=sequence,
            cas_type=cas_type,
            status='processing',
            timestamp=datetime.utcnow()
        )
        db.session.add(design)
        db.session.commit()

        try:
            # Design guides
            designer = GuideDesigner(current_app.config)
            guides = designer.design_guides(sequence, cas_type)

            # Store guides in database
            for guide_data in guides:
                guide = Guide(
                    design_id=design.id,
                    sequence=guide_data['sequence'],
                    pam=guide_data['pam'],
                    position=guide_data['position'],
                    score=guide_data['score'],
                    gc_content=guide_data['gc_content'],
                    offtarget_count=len(guide_data['offtargets'])
                )
                db.session.add(guide)

            design.status = 'completed'
            design.guide_count = len(guides)
            db.session.commit()

            return jsonify({
                'design_id': design.id,
                'guides': guides,
                'total': len(guides)
            })

        except Exception as e:
            design.status = 'failed'
            design.error_message = str(e)
            db.session.commit()
            raise

    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@api.route('/designs/<int:design_id>', methods=['GET'])
def get_design(design_id):
    try:
        design = Design.query.get_or_404(design_id)
        guides = Guide.query.filter_by(design_id=design_id).all()

        return jsonify({
            'design': design.to_dict(),
            'guides': [guide.to_dict() for guide in guides]
        })

    except Exception as e:
        logger.error(f"Error retrieving design {design_id}: {str(e)}")
        return jsonify({'error': str(e)}), 500


@api.route('/genome/status', methods=['GET'])
def genome_status():
    try:
        genome_loader = GenomeLoader(
            current_app.config['genome']['reference_path'])
        status = genome_loader.check_status()

        return jsonify({
            'status': 'loaded' if status else 'not_loaded',
            'genome_build': current_app.config['genome']['build'],
            'species': current_app.config['genome']['species']
        })

    except Exception as e:
        logger.error(f"Error checking genome status: {str(e)}")
        return jsonify({'error': str(e)}), 500
