import re
from typing import List, Dict, Optional
import numpy as np
from .scoring import GuideScorer
from .offtarget import OffTargetFinder


class GuideDesigner:
    def __init__(self, config: Dict):
        self.config = config
        self.scorer = GuideScorer(config)
        self.offtarget_finder = OffTargetFinder()

    def find_pam_sites(self, sequence: str, cas_type: str) -> List[Dict]:
        """Find all PAM sites in the sequence"""
        pam_pattern = self.config['cas_enzymes'][cas_type]['pam']
        pattern = self._convert_pam_to_regex(pam_pattern)

        pam_sites = []
        for match in re.finditer(pattern, sequence):
            pam_sites.append({
                'position': match.start(),
                'sequence': match.group()
            })
        return pam_sites

    def _convert_pam_to_regex(self, pam: str) -> str:
        """Convert IUPAC nucleotide codes to regex pattern"""
        conversions = {
            'N': '[ATCG]',
            'R': '[AG]',
            'Y': '[CT]',
            'S': '[GC]',
            'W': '[AT]',
            'K': '[GT]',
            'M': '[AC]',
            'B': '[CGT]',
            'D': '[AGT]',
            'H': '[ACT]',
            'V': '[ACG]'
        }
        pattern = pam
        for code, regex in conversions.items():
            pattern = pattern.replace(code, regex)
        return pattern

    def design_guides(self,
                      target_sequence: str,
                      cas_type: str = 'SpCas9') -> List[Dict]:
        """Design guide RNAs for the target sequence"""
        guides = []
        pam_sites = self.find_pam_sites(target_sequence, cas_type)

        guide_length = self.config['cas_enzymes'][cas_type]['guide_length']

        for pam in pam_sites:
            guide_seq = self._extract_guide_sequence(
                target_sequence,
                pam['position'],
                guide_length
            )

            if guide_seq:
                guide_data = self._analyze_guide(guide_seq, cas_type)
                guide_data.update({
                    'pam': pam['sequence'],
                    'position': pam['position']
                })
                guides.append(guide_data)

        return sorted(guides, key=lambda x: x['score'], reverse=True)

    def _extract_guide_sequence(self,
                                sequence: str,
                                pam_position: int,
                                guide_length: int) -> Optional[str]:
        """Extract guide sequence of correct length"""
        start = max(0, pam_position - guide_length)
        guide_seq = sequence[start:pam_position]

        return guide_seq if len(guide_seq) == guide_length else None

    def _analyze_guide(self, guide_seq: str, cas_type: str) -> Dict:
        """Analyze guide sequence for scoring and off-targets"""
        return {
            'sequence': guide_seq,
            'score': self.scorer.calculate_score(guide_seq, cas_type),
            'gc_content': self._calculate_gc_content(guide_seq),
            'offtargets': self.offtarget_finder.find_offtargets(guide_seq),
            'secondary_structure': self._predict_secondary_structure(guide_seq)
        }

    @staticmethod
    def _calculate_gc_content(sequence: str) -> float:
        """Calculate GC content of sequence"""
        gc_count = sequence.count('G') + sequence.count('C')
        return gc_count / len(sequence)

    def _predict_secondary_structure(self, sequence: str) -> Dict:
        """Predict potential secondary structure formation"""
        # Simplified implementation - you would want to use a proper RNA
        # structure prediction tool in production
        return {
            'has_hairpin': self._check_hairpin(sequence),
            'self_complementarity': self._check_self_complementarity(sequence)
        }

    @staticmethod
    def _check_hairpin(sequence: str) -> bool:
        """Check for potential hairpin formation"""
        # Simplified check - look for reverse complementary sequences
        complement = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'}
        rev_comp = ''.join(complement.get(base, base)
                           for base in reversed(sequence))

        for i in range(len(sequence)-3):
            for j in range(i+3, len(sequence)):
                if sequence[i:i+4] in rev_comp[j-3:j+1]:
                    return True
        return False

    @staticmethod
    def _check_self_complementarity(sequence: str) -> float:
        """Check degree of self-complementarity"""
        complement = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'}
        rev_comp = ''.join(complement.get(base, base)
                           for base in reversed(sequence))

        matches = sum(a == b for a, b in zip(sequence, rev_comp))
        return matches / len(sequence)
