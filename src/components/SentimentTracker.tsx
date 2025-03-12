
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '@/utils/mockData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import SentimentDistribution from './sentiment/SentimentDistribution';
import SentimentMovement from './sentiment/SentimentMovement';
import SentimentSummary from './sentiment/SentimentSummary';
import { 
  calculateDistribution, 
  calculateMovement, 
  calculateEffectiveness, 
  ensureData 
} from './sentiment/sentimentUtils';

interface SentimentTrackerProps {
  data: SentimentData[];
}

const SentimentTracker: React.FC<SentimentTrackerProps> = ({ data }) => {
  // Calculate sentiment distributions
  const startDistribution = calculateDistribution(data, 'startSentiment');
  const midDistribution = calculateDistribution(data, 'midSentiment');
  const endDistribution = calculateDistribution(data, 'endSentiment');
  
  // Calculate movement and effectiveness
  const movementData = calculateMovement(data);
  const effectivenessData = calculateEffectiveness(data);
  
  // Ensure we have data to display
  const safeStartDistribution = ensureData(startDistribution);
  const safeMidDistribution = ensureData(midDistribution);
  const safeEndDistribution = ensureData(endDistribution);
  const safeMovementData = ensureData(movementData);
  const safeEffectivenessData = ensureData(effectivenessData);
  
  return (
    <Card className="dashboard-card col-span-full overflow-visible">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Sentiment Analysis & Movement</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-white dark:bg-slate-800 shadow-lg p-2">
              <p className="w-64">Analysis of customer sentiment throughout conversations and how it changes over time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SentimentDistribution 
            startDistribution={safeStartDistribution} 
            midDistribution={safeMidDistribution} 
            endDistribution={safeEndDistribution} 
          />
          
          <SentimentMovement 
            movementData={safeMovementData} 
            effectivenessData={safeEffectivenessData} 
          />
        </div>
        
        <SentimentSummary 
          startDistribution={startDistribution} 
          midDistribution={midDistribution} 
          endDistribution={endDistribution} 
        />
      </CardContent>
    </Card>
  );
};

export default SentimentTracker;
