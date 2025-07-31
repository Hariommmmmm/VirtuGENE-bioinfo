import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Dna, 
  Clock, 
  BarChart3,
  Sparkles,
  Upload,
  Search
} from "lucide-react";

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

const Dashboard = ({ onTabChange }: DashboardProps) => {
  const currentTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const quickStats = [
    { title: "Active Projects", value: "12", icon: Activity, color: "text-primary" },
    { title: "Analyses Complete", value: "48", icon: TrendingUp, color: "text-secondary" },
    { title: "Sequences Processed", value: "156", icon: Dna, color: "text-accent" },
    { title: "Processing Time Saved", value: "24h", icon: Clock, color: "text-science" },
  ];

  const recentActivity = [
    { action: "BLAST Analysis", sequence: "Gene_Sample_001", status: "Complete", time: "2 hours ago" },
    { action: "Motif Detection", sequence: "Protein_Seq_A", status: "Processing", time: "30 minutes ago" },
    { action: "Cross-Species Prediction", sequence: "Hybrid_Test_01", status: "Complete", time: "1 hour ago" },
    { action: "GWAS Analysis", sequence: "Population_Study", status: "Queued", time: "5 minutes ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to VirtuGene</h1>
            <p className="text-lg opacity-90 mb-4">
              Advanced Bioinformatics Platform for Gene Analysis & Cross-Species Prediction
            </p>
            <p className="text-sm opacity-75">
              Current Time (IST): {currentTime}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              v2.1.0
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Get started with your bioinformatics analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-6 flex-col gap-3"
              onClick={() => onTabChange("import-data")}
            >
              <Upload className="w-8 h-8 text-primary" />
              <div className="text-center">
                <div className="font-semibold">Import Sequence Data</div>
                <div className="text-sm text-muted-foreground">Upload FASTA, GB, or JSON files</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-6 flex-col gap-3"
              onClick={() => onTabChange("sequence-analysis")}
            >
              <Search className="w-8 h-8 text-secondary" />
              <div className="text-center">
                <div className="font-semibold">Run BLAST Analysis</div>
                <div className="text-sm text-muted-foreground">Compare sequences with databases</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-6 flex-col gap-3"
              onClick={() => onTabChange("cross-species")}
            >
              <Sparkles className="w-8 h-8 text-accent" />
              <div className="text-center">
                <div className="font-semibold">AI Cross-Species</div>
                <div className="text-sm text-muted-foreground">Predict hybrid outcomes</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest bioinformatics analyses and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.sequence}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={
                      activity.status === "Complete" ? "default" : 
                      activity.status === "Processing" ? "secondary" : "outline"
                    }
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* India Footer */}
      <Card className="bg-gradient-to-r from-saffron via-white to-green">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-8 h-6 bg-saffron"></div>
            <div className="w-8 h-6 bg-white border"></div>
            <div className="w-8 h-6 bg-green"></div>
          </div>
          <p className="text-lg font-bold text-navy">
            🇮🇳 PROUDLY MADE IN BHARAT 🇮🇳
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Contact us: virtugene@gmail.com | WhatsApp: +91-XXXXXXXXXX
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;