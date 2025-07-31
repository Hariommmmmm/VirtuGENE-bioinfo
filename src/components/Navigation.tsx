import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dna, 
  Home, 
  Upload, 
  Search, 
  BarChart3, 
  FolderOpen, 
  Cpu, 
  Server, 
  User, 
  HelpCircle,
  Menu,
  X,
  Sparkles
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "gene-designer", label: "Gene Designer", icon: Dna },
    { id: "cross-species", label: "Cross-Species Designer", icon: Sparkles },
    { id: "import-data", label: "Import Data", icon: Upload },
    { id: "sequence-analysis", label: "Sequence Analysis", icon: Search },
    { id: "gwas-tools", label: "GWAS / MSA / Phylogenetic", icon: BarChart3 },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "simulations", label: "Simulations", icon: Cpu },
    { id: "hosts", label: "Hosts", icon: Server },
    { id: "profile", label: "Profile & Help", icon: User },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Card className={`
        fixed md:relative top-0 left-0 h-screen w-80 z-40 
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-gradient-to-b from-card to-muted border-r shadow-lg
      `}>
        <div className="p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Dna className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">VirtuGene</h1>
              <p className="text-xs text-muted-foreground">Bioinformatics Platform</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    w-full justify-start gap-3 h-12 text-left
                    ${isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-muted"
                    }
                  `}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.id === "cross-species" && (
                    <Badge variant="secondary" className="ml-auto">
                      AI
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Special Action Button */}
          <div className="mt-8">
            <Button 
              variant="hero" 
              className="w-full gap-2"
              onClick={() => onTabChange("cross-species")}
            >
              <Sparkles className="w-4 h-4" />
              Predict Cross-species Outcome
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Navigation;