import { useState } from "react";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import GeneDesigner from "./GeneDesigner";
import CrossSpeciesDesigner from "./CrossSpeciesDesigner";
import ImportData from "./ImportData";

const VirtuGeneApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onTabChange={setActiveTab} />;
      case "gene-designer":
        return <GeneDesigner />;
      case "cross-species":
        return <CrossSpeciesDesigner />;
      case "import-data":
        return <ImportData />;
      case "sequence-analysis":
        return <div className="p-8 text-center text-muted-foreground">BLAST Analysis - Coming Soon</div>;
      case "gwas-tools":
        return <div className="p-8 text-center text-muted-foreground">GWAS Tools - Coming Soon</div>;
      case "projects":
        return <div className="p-8 text-center text-muted-foreground">Projects - Coming Soon</div>;
      case "simulations":
        return <div className="p-8 text-center text-muted-foreground">Simulations - Coming Soon</div>;
      case "hosts":
        return <div className="p-8 text-center text-muted-foreground">Hosts - Coming Soon</div>;
      case "profile":
        return <div className="p-8 text-center text-muted-foreground">Profile & Help - Coming Soon</div>;
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 md:ml-0 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default VirtuGeneApp;