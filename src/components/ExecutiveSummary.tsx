
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExecutiveSummaryProps {
  summaryHtml: string;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summaryHtml }) => {
  return (
    <Card className="dashboard-card col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Executive Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: summaryHtml }}
        />
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;
