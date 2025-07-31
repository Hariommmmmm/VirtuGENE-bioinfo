import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Image, Download, Zap, AlertTriangle } from "lucide-react";

const CrossSpeciesDesigner = () => {
  const [species1, setSpecies1] = useState("");
  const [species2, setSpecies2] = useState("");
  const [trait, setTrait] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const species = [
    "Homo sapiens (Human)", "Pan troglodytes (Chimpanzee)", "Mus musculus (Mouse)",
    "Drosophila melanogaster (Fruit fly)", "Caenorhabditis elegans (Nematode)",
    "Arabidopsis thaliana (Thale cress)", "Oryza sativa (Rice)", "Zea mays (Corn)",
    "Escherichia coli (E. coli)", "Saccharomyces cerevisiae (Baker's yeast)",
    "Danio rerio (Zebrafish)", "Xenopus laevis (African clawed frog)"
  ];

  const traits = [
    "Disease Resistance", "Growth Rate", "Stress Tolerance", "Metabolic Efficiency",
    "Longevity", "Cognitive Function", "Physical Strength", "Sensory Perception",
    "Reproductive Success", "Environmental Adaptation"
  ];

  const generatePrediction = async () => {
    if (!species1 || !species2 || !trait) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate AI processing with progress updates
    const intervals = [10, 25, 45, 65, 80, 95, 100];
    for (let i = 0; i < intervals.length; i++) {
      setTimeout(() => {
        setProgress(intervals[i]);
        if (intervals[i] === 100) {
          setIsGenerating(false);
        }
      }, (i + 1) * 800);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            AI Cross-Species Designer
          </CardTitle>
          <CardDescription>
            Predict genetic outcomes and visualize cross-species hybrids using advanced AI models
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Research Use Only</p>
                <p className="text-sm text-amber-700">
                  This tool is for theoretical research and educational purposes. Results are AI predictions 
                  and should not be used for actual genetic modification.
                </p>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="species1">Primary Species</Label>
                <Select value={species1} onValueChange={setSpecies1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary species" />
                  </SelectTrigger>
                  <SelectContent>
                    {species.map((sp) => (
                      <SelectItem key={sp} value={sp}>
                        {sp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="species2">Secondary Species</Label>
                <Select value={species2} onValueChange={setSpecies2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select secondary species" />
                  </SelectTrigger>
                  <SelectContent>
                    {species.map((sp) => (
                      <SelectItem key={sp} value={sp}>
                        {sp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="trait">Target Trait</Label>
                <Select value={trait} onValueChange={setTrait}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trait to enhance" />
                  </SelectTrigger>
                  <SelectContent>
                    {traits.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generatePrediction}
                disabled={!species1 || !species2 || !trait || isGenerating}
                className="w-full"
              >
                <Brain className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating Prediction..." : "Generate AI Prediction"}
              </Button>
            </div>

            {/* AI Processing Status */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  AI Processing Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {progress < 30 && "Analyzing genetic sequences..."}
                      {progress >= 30 && progress < 60 && "Computing trait compatibility..."}
                      {progress >= 60 && progress < 90 && "Generating visual prediction..."}
                      {progress >= 90 && "Finalizing results..."}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Model:</span>
                    <Badge variant="outline">GPT-4 Bio</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Confidence:</span>
                    <Badge variant="secondary">87%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Processing Time:</span>
                    <Badge variant="outline">~2-3 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section (shown after generation) */}
          {progress === 100 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Generated Image */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      AI Generated Visualization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 text-accent mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          AI-generated hybrid visualization
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Based on {species1.split(' ')[0]} × {species2.split(' ')[0]}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Download Image
                    </Button>
                  </CardContent>
                </Card>

                {/* Prediction Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Prediction Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Trait Enhancement: {trait}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Expression Level:</span>
                          <Badge>+145%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Stability:</span>
                          <Badge variant="secondary">High</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Side Effects:</span>
                          <Badge variant="outline">Minimal</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Key Genetic Markers</p>
                      <div className="space-y-1">
                        <Badge variant="outline" className="mr-2">FOXP2</Badge>
                        <Badge variant="outline" className="mr-2">BRCA1</Badge>
                        <Badge variant="outline" className="mr-2">TP53</Badge>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Viability Score</p>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        75% - High theoretical viability
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Report */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">AI Analysis Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-muted-foreground">
                      The AI model has analyzed the genetic compatibility between <strong>{species1}</strong> and{" "}
                      <strong>{species2}</strong> for enhancing <strong>{trait}</strong>. The prediction indicates 
                      a high potential for trait expression with minimal negative impacts.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Key findings include enhanced metabolic pathways, improved cellular resilience, and 
                      optimized gene expression profiles. The hybrid characteristics show promise for 
                      research applications in controlled environments.
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm">
                      Share Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CrossSpeciesDesigner;