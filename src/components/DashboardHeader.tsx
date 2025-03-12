
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Interactions Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor AI performance metrics, sentiment analysis, and live agent escalations
        </p>
      </div>
      <div className="flex items-center gap-4">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Power_bi_logo_black.svg" 
          alt="Power BI Logo" 
          className="h-8"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
