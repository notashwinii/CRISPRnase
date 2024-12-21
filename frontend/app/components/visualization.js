import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

export default function Visualization({ data }) {
  const { geneModel, scoreDistribution } = data

  return (
    (<div className="space-y-8">
      <div className="relative h-24 w-full rounded-lg border bg-white p-4">
        <div className="absolute inset-4">
          <div className="h-2 w-full rounded-full bg-blue-100">
            <div className="relative">
              {geneModel.map((position) => (
                <div
                  key={position}
                  className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white"
                  style={{ left: `${position}%`, top: "50%" }} />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm text-muted-foreground">
            <span>0</span>
            <span>500</span>
            <span>1000</span>
            <span>1500</span>
            <span>2000</span>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Count",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]">
            <BarChart data={scoreDistribution}>
              <XAxis dataKey="score" />
              <YAxis />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>)
  );
}

