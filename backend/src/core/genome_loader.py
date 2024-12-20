from Bio import SeqIO
from pathlib import Path
import logging
from typing import Dict, Optional


class GenomeLoader:
    def __init__(self, genome_path: str):
        self.genome_path = Path(genome_path)
        self.genome_data: Dict[str, str] = {}
        self.logger = logging.getLogger(__name__)

    def load_genome(self) -> bool:
        """Load genome data from FASTA file"""
        try:
            for record in SeqIO.parse(self.genome_path, "fasta"):
                self.genome_data[record.id] = str(record.seq)
            self.logger.info(f"Successfully loaded genome from {
                             self.genome_path}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to load genome: {str(e)}")
            return False

    def get_sequence(self, chromosome: str, start: int, end: int) -> Optional[str]:
        """Retrieve a specific sequence from the genome"""
        try:
            return self.genome_data[chromosome][start:end]
        except KeyError:
            self.logger.error(f"Chromosome {chromosome} not found")
            return None
        except Exception as e:
            self.logger.error(f"Error retrieving sequence: {str(e)}")
            return None
