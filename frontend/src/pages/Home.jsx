import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import Navbar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Feature from "@/components/Feature";
import HowToUse from "@/components/HowToUse";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <HeroSection />

        <section id="howtouse">
          <div className="flex items-center justify-center">
            <p className="hr  mt-12 text-4xl font-semibold text-blue-500 ">
              How to use
            </p>
          </div>

          <HowToUse />
        </section>

        <section
          id="gene-input"
          className="mb-12 bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Gene Sequence Input
          </h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="gene-sequence">Enter Gene Sequence</Label>
              <Textarea
                id="gene-sequence"
                placeholder="Paste your gene sequence here..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="file-upload" className="block mb-2">
                Or Upload a File
              </Label>
              <div className="flex items-center space-x-2">
                <Input id="file-upload" type="file" className="hidden" />
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload File
                </Button>
              </div>
            </div>
            <div>
              <Label>Gene Type</Label>
              <RadioGroup defaultValue="human" className="flex space-x-4 mt-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="human" id="human" />
                  <Label htmlFor="human">Human</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-human" id="non-human" />
                  <Label htmlFor="non-human">Non-Human</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Analyze Sequence
            </Button>
          </form>
        </section>
        <Feature />

        <section id="how-it-works" className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            How CRISPRnase Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-blue-600 mb-2">
                1. Sequence Input
              </h3>
              <p className="text-gray-600">
                CRISPRnase accepts gene sequences through direct input or file
                upload, supporting various file formats.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-blue-600 mb-2">2. Analysis</h3>
              <p className="text-gray-600">
                Our advanced algorithms analyze the sequence, identifying key
                features and potential CRISPR target sites.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-blue-600 mb-2">3. Results</h3>
              <p className="text-gray-600">
                CRISPRnase provides detailed insights, including potential
                off-target effects and efficiency predictions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
