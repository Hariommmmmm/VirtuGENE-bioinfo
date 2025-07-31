import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Database,
  FileText,
  Dna
} from "lucide-react";

const ImportData = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    { ext: ".fasta", desc: "FASTA sequence files", icon: Dna },
    { ext: ".gb", desc: "GenBank format files", icon: Database },
    { ext: ".json", desc: "JSON data files", icon: FileText },
    { ext: ".astra", desc: "VirtuGene custom format", icon: File },
  ];

  const sampleData = [
    { name: "Human_Beta_Globin.fasta", size: "2.1 KB", type: "Protein sequence" },
    { name: "E_coli_Genome_Sample.gb", size: "45.2 KB", type: "Genomic data" },
    { name: "Plant_Resistance_Genes.json", size: "12.8 KB", type: "Gene annotation" },
    { name: "Microbial_Analysis.astra", size: "8.9 KB", type: "Analysis results" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processFiles = () => {
    console.log("Processing files:", uploadedFiles);
    // This would send files to backend for processing
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-6 h-6 text-primary" />
            Import Sequence Data
          </CardTitle>
          <CardDescription>
            Upload your biological sequence files and data for analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="samples">Sample Data</TabsTrigger>
              <TabsTrigger value="remote">Remote Sources</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                <div className="text-center space-y-4">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Upload Your Files</h3>
                    <p className="text-muted-foreground">
                      Drag and drop files here, or click to browse
                    </p>
                  </div>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="mx-auto"
                  >
                    <File className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".fasta,.fa,.gb,.gbk,.json,.astra"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Supported Formats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {supportedFormats.map((format, index) => {
                  const Icon = format.icon;
                  return (
                    <Card key={index} className="p-4">
                      <div className="text-center space-y-2">
                        <Icon className="w-6 h-6 text-primary mx-auto" />
                        <div>
                          <p className="font-medium">{format.ext}</p>
                          <p className="text-xs text-muted-foreground">{format.desc}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Uploading files...</span>
                        <span className="text-sm">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Uploaded Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" onClick={processFiles}>
                      Process Files
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="samples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Sample Datasets</CardTitle>
                  <CardDescription>
                    Pre-loaded datasets for testing and learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sampleData.map((sample, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <File className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{sample.name}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">{sample.size}</Badge>
                              <Badge variant="secondary">{sample.type}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm">
                            Load
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="remote" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Remote Data Sources</CardTitle>
                  <CardDescription>
                    Import data directly from public databases
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="text-center space-y-2">
                        <Database className="w-8 h-8 text-primary mx-auto" />
                        <h3 className="font-medium">NCBI GenBank</h3>
                        <p className="text-sm text-muted-foreground">
                          Access sequences from NCBI database
                        </p>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="text-center space-y-2">
                        <Database className="w-8 h-8 text-secondary mx-auto" />
                        <h3 className="font-medium">Ensembl</h3>
                        <p className="text-sm text-muted-foreground">
                          Genome annotations and variants
                        </p>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="accession">Accession Number / ID</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="accession"
                        placeholder="e.g., NM_000518.4 or ENSG00000139618"
                        className="flex-1"
                      />
                      <Button>Fetch</Button>
                    </div>
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

export default ImportData;