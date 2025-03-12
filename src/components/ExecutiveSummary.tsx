
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface ExecutiveSummaryProps {
  summaryHtml: string;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summaryHtml }) => {
  return (
    <Card className="dashboard-card col-span-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Executive Summary</CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoCircledIcon className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="w-64">Summary of key performance metrics and insights across AI and live agent interactions</p>
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent>
        <div 
          className="text-sm leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: summaryHtml }}
        />
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;
