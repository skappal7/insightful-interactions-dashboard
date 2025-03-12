
import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Digital | Live Agent Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Analytics and insights for AI and human agent interactions across customer touchpoints
        </p>
        <div className="mt-2 px-3 py-1.5 bg-yellow-100 border border-yellow-300 rounded-md text-xs text-yellow-800">
          Note: This dashboard is a wireframe for demonstration purposes only. The actual implementation may differ.
        </div>
      </div>
      <div className="flex items-center gap-4">
        <img 
          src="https://humach.com/wp-content/uploads/2023/01/HuMach_logo-bold.png" 
          alt="Humach Logo" 
          className="h-8"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
