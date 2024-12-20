import re
from typing import Union


def validate_sequence(data: dict) -> Union[str, bool]:
    """Validate input data for guide RNA design"""

    # Check if sequence is provided
    if 'sequence' not in data:
        return "No sequence provided"

    sequence = data['sequence'].upper()

    # Check sequence length
    if len(sequence) < 23:  # Minimum length for guide + PAM
        return "Sequence too short (minimum 23 bp)"

    if len(sequence) > 10000:  # Arbitrary max length
        return "Sequence too long (maximum 10000 bp)"

    # Check sequence content
    if not re.match('^[ATCG]+$', sequence):
        return "Invalid sequence (only A, T, C, G allowed)"

    # Validate cas_type if provided
    valid_cas_types = {'SpCas9', 'SaCas9', 'Cas12a'}
    if 'cas_type' in data and data['cas_type'] not in valid_cas_types:
        return f"Invalid cas_type (must be one of {', '.join(valid_cas_types)})"

    return True
