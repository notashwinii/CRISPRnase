import React from "react";
import { Download } from 'lucide-react'
import ResultsTable from "@/components/results-table.jsx"
import SummaryStats from "@/components/summary-stats.jsx"
import { Button } from "@/components/ui/button"

export default function Results() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-8">
        <SummaryStats />
        <div className="flex justify-end">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download All Results (CSV)
          </Button>
        </div>
        <ResultsTable />
      </main>
    </div>
  )
}


