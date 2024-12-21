import React, { useState } from "react";
import { HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const Design = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/result");
  };

  const casTypes = [
    {
      value: "SpCas9",
      label: "SpCas9",
      description: "The most common CRISPR enzyme",
    },
    {
      value: "AsCas12a",
      label: "AsCas12a",
      description: "Also known as Cpf1, requires a T-rich PAM sequence",
    },
    {
      value: "Cpf1",
      label: "Cpf1",
      description: "Alternative name for AsCas12a",
    },
  ];

  const [dnaSequence, setDnaSequence] = useState("");
  const [casType, setCasType] = useState("SpCas9");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateDnaSequence = (sequence) => {
    const validNucleotides = /^[ATCG]+$/i;
    return validNucleotides.test(sequence);
  };

  const handleAnalyze = async () => {
    if (!validateDnaSequence(dnaSequence)) {
      setError("Invalid DNA sequence. Please use only A, T, C, and G.");
      return;
    }
    setError("");
    setIsLoading(true);

    // Simulate API call or some processing
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate initial processing time

    setIsLoading(false);

    // Wait for an additional 5 seconds before navigating
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 5 seconds

    // Navigate to the results page
    handleButtonClick();

    // Handle the analysis result here
    console.log("Analyzing:", { dnaSequence, casType });
  };

  const handleClear = () => {
    setDnaSequence("");
    setCasType("SpCas9");
    setError("");
  };

  const handleDnaSequenceChange = (e) => {
    setDnaSequence(e.target.value);
    if (error) {
      setError("");
    }
  };

  const isAnalyzeDisabled = !validateDnaSequence(dnaSequence) || isLoading;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="font-semibold text-blue-600 text-3xl text-center ">
        gRNA Design
      </h1>
      <div className="space-y-2">
        <Label htmlFor="dna-sequence" className="font-medium text-base">
          Target DNA Sequence
        </Label>
        <Textarea
          id="dna-sequence"
          placeholder="e.g., ATCGATCGATCGATCGATCGAGG"
          value={dnaSequence}
          onChange={handleDnaSequenceChange}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
          <p>
            Paste or enter the target DNA sequence, including the PAM sequence
            if applicable.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cas-type">Cas Type (Optional)</Label>
        <Select value={casType} onValueChange={setCasType}>
          <SelectTrigger id="cas-type">
            <SelectValue placeholder="Select Cas Type" />
          </SelectTrigger>
          <SelectContent>
            {casTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full text-left">
                      {type.label}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{type.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={handleAnalyze}
          className="bg-blue-500 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </Button>
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Design;
