import React from "react";
import { Copy, HelpCircle, Download } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

  {
    ID: 15,
    sgRNASequence: "GGAGTATCCCTGAACCTAGT",
    TargetGene: "POU5F1",
    TranscriptIDs: [
      "NM_001173531",
      "NM_001285986",
      "NM_001285987",
      "NM_203289"
    ],
    DistanceToTSS: "+1306",
    Chromosome: 6,
    Location: 31133641,
    Strand: "+",
    EScore: 12,
    SScore: -2,
    EPlusSScore: 10
  },

export default function ResultsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>gRNA Sequence</TableHead>
            <TableHead>Target Gene</TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <span>Distance To TSS</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Higher scores indicate better target specificity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead>Chromosome</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <span>Distance To TSS</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Higher scores indicate better target specificity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead>E Score</TableHead>
            <TableHead>S Score</TableHead>
            <TableHead>E + S Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono">
                <div className="flex items-center space-x-2">
                  <span>{row.sequence}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{row.efficiency}%</div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${row.efficiency}%` }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>{row.specificity}%</TableCell>
              <TableCell>{row.offTargets}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


