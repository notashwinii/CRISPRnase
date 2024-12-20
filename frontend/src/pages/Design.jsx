import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function Design() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            STEP 1: Specify the types of manipulation on the genome
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Gene editing</Label>
                <RadioGroup defaultValue="nickase" className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nickase" id="nickase" />
                    <Label htmlFor="nickase">Using nickase</Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="nuclease" id="nuclease" />
                    <Label htmlFor="nuclease">Using nuclease</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="space-y-2">
                <RadioGroup defaultValue="repression">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="repression" id="repression" />
                    <Label htmlFor="repression">Gene repression</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="activation" id="activation" />
                    <Label htmlFor="activation">Gene activation</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button className="w-full">Submit and Continue</Button>
    </div>
  );
}
