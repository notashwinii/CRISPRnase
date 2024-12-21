import { Card, CardContent } from "@/components/ui/card"

export default function SummaryStats({ data }) {
  return (
    (<div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{data.sgRNAsGenerated}</div>
          <p className="text-sm text-muted-foreground">sgRNAs Generated</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{data.averageEfficiency}%</div>
          <p className="text-sm text-muted-foreground">Average Efficiency</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{data.lowestOffTargetScore}</div>
          <p className="text-sm text-muted-foreground">Lowest Off-Target Score</p>
        </CardContent>
      </Card>
    </div>)
  );
}

