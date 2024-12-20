# src/api/routes.py
from flask import Blueprint, request, jsonify, current_app
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
            return jsonify(design.to_dict())

        except Exception as e:
            design.status = 'failed'
            design.error_message = str(e)
            db.session.commit()
            raise

    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({'error': str(e)}), 500
