export async function GET() {
  // In a real application, this data would come from a database or external API
  const data = {
    summary: {
      sgRNAsGenerated: 10,
      averageEfficiency: 85,
      lowestOffTargetScore: 2.0
    },
    results: [
      {
        id: 1,
        sequence: "GGTGAAATGAGGGCTTGCGA",
        efficiency: 85,
        specificity: 92,
        offTargets: 2,
        position: "150-170",
      },
      {
        id: 2,
        sequence: "TCGCAAGCCCTCATTTCACC",
        efficiency: 78,
        specificity: 88,
        offTargets: 3,
        position: "171-191",
      },
      // Add more results as needed
    ],
    visualization: {
      geneModel: [20, 40, 60, 80],
      scoreDistribution: [
        { score: "70-75", count: 2 },
        { score: "75-80", count: 3 },
        { score: "80-85", count: 4 },
        { score: "85-90", count: 8 },
        { score: "90-95", count: 3 },
        { score: "95-100", count: 1 },
      ]
    }
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

