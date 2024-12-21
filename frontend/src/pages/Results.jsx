
import React from "react";
import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import ResultsTable from "@/components/results-table.jsx"
import SummaryStats from "@/components/summary-stats"
import { Button } from "@/components/ui/button"

export default function Results() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/backend/src/api/design')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-8">
        <SummaryStats data={data.summary} />
        <div className="flex justify-end">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download All Results (CSV)
          </Button>
        </div>
        <ResultsTable data={data.results} />
      </main>
    </div>
  )
}

