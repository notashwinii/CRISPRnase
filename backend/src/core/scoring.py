import numpy as np
from typing import Dict


class GuideScorer:
    def __init__(self, config: Dict):
        self.config = config
        self.weights = config['scoring']['weights']

    def calculate_score(self, sequence: str, cas_type: str) -> float:
        """Calculate overall guide score"""
        scores = {
            'gc_content': self._score_gc_content(sequence, cas_type),
            'self_complementarity': self._score_self_complementarity(sequence),
            'position_effect': self._score_position_effects(sequence),
            'offtarget_potential': self._score_offtarget_potential(sequence)
        }

        weighted_score = sum(
            scores[metric] * self.weights[metric]
            for metric in scores
        )

        return round(weighted_score, 3)

    def _score_gc_content(self, sequence: str, cas_type: str) -> float:
        """Score GC content based on optimal range"""
        gc_content = (sequence.count('G') +
                      sequence.count('C')) / len(sequence)
        optimal_min = self.config['cas_enzymes'][cas_type]['optimal_gc_min']
        optimal_max = self.config['cas_enzymes'][cas_type]['optimal_gc_max']

        if optimal_min <= gc_content <= optimal_max:
            return 1.0
        else:
            # Penalty increases with distance from optimal range
            distance = min(
                abs(gc_content - optimal_min),
                abs(gc_content - optimal_max)
            )
            return max(0, 1 - distance * 2)

    def _score_self_complementarity(self, sequence: str) -> float:
        """Score based on self-complementarity potential"""
        complement = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'}
        rev_comp = ''.join(complement.get(base, base)
                           for base in reversed(sequence))

        # Count matching bases in reverse complement
        matches = sum(a == b for a, b in zip(sequence, rev_comp))

        # Penalize high self-complementarity
        return 1 - (matches / len(sequence))

    def _score_position_effects(self, sequence: str) -> float:
        """Score based on position-specific rules"""
        score = 1.0

        # Penalty for poly-T sequences (termination signal)
        if 'TTTT' in sequence:
            score *= 0.7

        # Bonus for G at position 1 (improves expression)
        if sequence.startswith('G'):
            score *= 1.2

        # Penalty for C at position 1 (reduces expression)
        if sequence.startswith('C'):
            score *= 0.8

        return min(1.0, score)

    def _score_offtarget_potential(self, sequence: str) -> float:
        """Score based on potential for off-target effects"""
        # Simple scoring based on sequence complexity
        # More sophisticated implementations would use actual alignment data

        # Count dinucleotide repeats
        repeats = 0
        for i in range(len(sequence)-1):
            if sequence[i] == sequence[i+1]:
                repeats += 1

        # Penalize repetitive sequences
        return max(0, 1 - (repeats / (len(sequence)-1)))
