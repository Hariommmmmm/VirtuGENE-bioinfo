import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dna, 
  Play, 
  Download, 
  Copy, 
  RefreshCw,
  Info,
  Zap
} from "lucide-react";

const GeneDesigner = () => {
  const [sequence, setSequence] = useState("");
  const [organism, setOrganism] = useState("");
  const [geneType, setGeneType] = useState("");

  const organisms = [
    "Escherichia coli", "Saccharomyces cerevisiae", "Arabidopsis thaliana",
    "Mus musculus", "Homo sapiens", "Drosophila melanogaster", 
    "Caenorhabditis elegans", "Bacillus subtilis", "Pseudomonas aeruginosa",
    "Oryza sativa", "Solanum lycopersicum", "Brassica oleracea"
  ];

  const geneTypes = [
    "Protein Coding", "rRNA", "tRNA", "miRNA", "lncRNA", 
    "Pseudogene", "Regulatory", "Promoter", "Enhancer"
  ];

  const generateRandomSequence = () => {
    const bases = ['A', 'T', 'G', 'C'];
    const length = 300 + Math.floor(Math.random() * 700); // 300-1000 bp
    let seq = '';
    for (let i = 0; i < length; i++) {
      seq += bases[Math.floor(Math.random() * 4)];
    }
    setSequence(seq);
  };

  const analyzeSequence = () => {
    // This would connect to backend analysis
    console.log("Analyzing sequence:", { sequence, organism, geneType });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="w-6 h-6 text-primary" />
            Gene Designer Studio
          </CardTitle>
          <CardDescription>
            Design, modify, and analyze genetic sequences with advanced bioinformatics tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="analyze">Analyze</TabsTrigger>
              <TabsTrigger value="optimize">Optimize</TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="organism">Target Organism</Label>
                    <Select value={organism} onValueChange={setOrganism}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organism" />
                      </SelectTrigger>
                      <SelectContent>
                        {organisms.map((org) => (
                          <SelectItem key={org} value={org}>
                            {org}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="geneType">Gene Type</Label>
                    <Select value={geneType} onValueChange={setGeneType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gene type" />
                      </SelectTrigger>
                      <SelectContent>
                        {geneTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={generateRandomSequence}
                      variant="secondary"
                      className="flex-1"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate Random
                    </Button>
                    <Button 
                      onClick={analyzeSequence}
                      className="flex-1"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Analyze
                    </Button>
                  </div>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Sequence Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Length:</span>
                      <Badge variant="outline">{sequence.length} bp</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">GC Content:</span>
                      <Badge variant="outline">
                        {sequence ? ((sequence.match(/[GC]/g) || []).length / sequence.length * 100).toFixed(1) : 0}%
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">AT Content:</span>
                      <Badge variant="outline">
                        {sequence ? ((sequence.match(/[AT]/g) || []).length / sequence.length * 100).toFixed(1) : 0}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Label htmlFor="sequence">DNA Sequence</Label>
                <Textarea
                  id="sequence"
                  placeholder="Enter your DNA sequence (ATGC format) or generate a random one..."
                  value={sequence}
                  onChange={(e) => setSequence(e.target.value.toUpperCase())}
                  className="h-40 font-mono text-sm"
                />
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(sequence)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export FASTA
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analyze" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Composition Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['A', 'T', 'G', 'C'].map((base) => {
                        const count = (sequence.match(new RegExp(base, 'g')) || []).length;
                        const percentage = sequence ? (count / sequence.length * 100).toFixed(1) : 0;
                        return (
                          <div key={base} className="flex items-center gap-2">
                            <span className="w-4 font-mono font-bold">{base}:</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm w-12">{percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Predicted Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Open Reading Frames:</span>
                        <Badge>3 found</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Start Codons:</span>
                        <Badge variant="secondary">2 ATG</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Stop Codons:</span>
                        <Badge variant="secondary">1 TGA</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Restriction Sites:</span>
                        <Badge variant="outline">5 sites</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="optimize" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Codon Optimization
                  </CardTitle>
                  <CardDescription>
                    Optimize your sequence for expression in the selected organism
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button variant="secondary">
                      Optimize for E. coli
                    </Button>
                    <Button variant="secondary">
                      Optimize for Yeast
                    </Button>
                    <Button variant="secondary">
                      Optimize for Mammalian
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Optimization will improve expression efficiency by using preferred codons for your target organism.
                      This can increase protein yield by 2-10x in many cases.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneDesigner;