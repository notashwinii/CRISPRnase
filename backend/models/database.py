# src/models/database.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Design(db.Model):
    """Record of a guide RNA design request"""

    id = db.Column(db.Integer, primary_key=True)
    input_sequence = db.Column(db.Text, nullable=False)
    cas_type = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    guide_count = db.Column(db.Integer)
    error_message = db.Column(db.Text)

    guides = db.relationship('Guide', backref='design', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'input_sequence': self.input_sequence,
            'cas_type': self.cas_type,
            'status': self.status,
            'timestamp': self.timestamp.isoformat(),
            'guide_count': self.guide_count,
            'error_message': self.error_message
        }


class Guide(db.Model):
    """Individual guide RNA design"""

    id = db.Column(db.Integer, primary_key=True)
    design_id = db.Column(db.Integer, db.ForeignKey(
        'design.id'), nullable=False)
    sequence = db.Column(db.String(30), nullable=False)
    pam = db.Column(db.String(10), nullable=False)
    position = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Float, nullable=False)
    gc_content = db.Column(db.Float, nullable=False)
    offtarget_count = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'design_id': self.design_id,
            'sequence': self.sequence,
            'pam': self.pam,
            'position': self.position,
            'score': self.score,
            'gc_content': self.gc_content,
            'offtarget_count': self.offtarget_count
        }
