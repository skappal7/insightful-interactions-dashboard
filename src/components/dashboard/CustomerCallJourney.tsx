
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Bot, PhoneCall, Check, AlertTriangle, ThumbsUp, Info } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { IntentData } from '@/utils/types/dashboardTypes';

interface CustomerCallJourneyProps {
  totalCalls: number;
  digitalAgentCalls: number;
  liveAgentCalls: number;
  escalatedCalls: number;
  positiveSentimentCalls: number;
  topIntents: IntentData[];
  selectedIntent: string;
  onIntentSelect?: (intent: string) => void;
}

const CustomerCallJourney: React.FC<CustomerCallJourneyProps> = ({
  totalCalls,
  digitalAgentCalls,
  liveAgentCalls,
  escalatedCalls,
  positiveSentimentCalls,
  topIntents,
  selectedIntent,
  onIntentSelect
}) => {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  
  // Calculate percentages
  const digitalAgentPercentage = Math.round((digitalAgentCalls / totalCalls) * 100);
  const liveAgentPercentage = Math.round((liveAgentCalls / totalCalls) * 100);
  const escalatedPercentage = Math.round((escalatedCalls / digitalAgentCalls) * 100);
  const resolvedByDigitalPercentage = 100 - escalatedPercentage;
  const positiveSentimentPercentage = Math.round((positiveSentimentCalls / escalatedCalls) * 100);
  
  // Generate intent data for each stage
  const getStageIntents = (stage: string) => {
    // In a real app, this would filter intents based on the stage
    // Here we're just re-using the same data with slightly adjusted values
    switch(stage) {
      case 'total':
        return topIntents.map(intent => ({
          name: intent.name,
          value: intent.total
        }));
      case 'digital':
        return topIntents.map(intent => ({
          name: intent.name,
          value: intent.aiCompleted
        }));
      case 'live':
        return topIntents.map(intent => ({
          name: intent.name,
          value: intent.liveAgentCompleted
        }));
      case 'escalated':
        return topIntents.map(intent => ({
          name: intent.name,
          value: Math.round(intent.total * (1 - intent.completionRate/100))
        }));
      case 'positive':
        return topIntents.map(intent => ({
          name: intent.name,
          value: Math.round(intent.liveAgentCompleted * 0.7) // Assuming 70% positive sentiment
        }));
      default:
        return [];
    }
  };

  // Animation configuration
  const nodeAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  const lineAnimation = {
    hidden: { pathLength: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeInOut"
      }
    })
  };

  // Node component with popover for intent data
  const JourneyNode = ({ 
    id, 
    icon: Icon, 
    title, 
    count, 
    percentage, 
    color, 
    index,
    description
  }: { 
    id: string;
    icon: React.ElementType;
    title: string;
    count: number;
    percentage: number;
    color: string;
    index: number;
    description: string;
  }) => (
    <TooltipProvider>
      <Popover
        open={expandedNode === id}
        onOpenChange={(open) => setExpandedNode(open ? id : null)}
      >
        <PopoverTrigger asChild>
          <motion.div
            className={`flex flex-col items-center relative`}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={nodeAnimation}
            whileHover={{ scale: 1.05 }}
            role="button"
            aria-expanded={expandedNode === id}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-2`}
                  style={{ backgroundColor: color }}
                >
                  <Icon className="h-8 w-8" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{description}</p>
                <p className="mt-1 font-bold">{count.toLocaleString()} calls ({percentage}%)</p>
                <p className="text-xs mt-1">Click for more details</p>
              </TooltipContent>
            </Tooltip>
            <div className="text-center">
              <div className="text-sm font-medium">{title}</div>
              <div className="text-sm text-muted-foreground">{count.toLocaleString()} ({percentage}%)</div>
            </div>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: color }}
              >
                <Icon className="h-3 w-3" />
              </div>
              <h4 className="font-semibold">{title} Intents</h4>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getStageIntents(id)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill={color} 
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => {
                      if (onIntentSelect) {
                        const intentName = data.payload.name as string;
                        onIntentSelect(intentName.toLowerCase().includes("account") ? "account" : 
                                      intentName.toLowerCase().includes("billing") ? "billing" : 
                                      intentName.toLowerCase().includes("support") ? "support" : 
                                      "all-intents");
                      }
                    }}
                    cursor="pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );

  return (
    <Card className="dashboard-card animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Customer Call Journey</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Visual representation of call flow from initial contact through resolution.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative py-8 overflow-x-auto min-h-[300px]">
          <div className="flex justify-between items-start min-w-[900px]">
            {/* Total Calls Node */}
            <JourneyNode 
              id="total"
              icon={PhoneCall} 
              title="Total Calls" 
              count={totalCalls} 
              percentage={100} 
              color="#6366F1" 
              index={0}
              description="Total number of customer calls received"
            />
            
            <div className="relative flex-1 flex flex-col items-center justify-center">
              <svg className="absolute top-16 w-full h-8">
                <motion.path
                  d="M0,16 L160,16"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={lineAnimation}
                />
              </svg>
              
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex flex-col">
              {/* Digital Agent Node */}
              <JourneyNode 
                id="digital"
                icon={Bot} 
                title="Digital Agent" 
                count={digitalAgentCalls} 
                percentage={digitalAgentPercentage} 
                color="#0EA5E9" 
                index={1}
                description="Calls handled by the digital agent"
              />
              
              <div className="h-16"></div>
              
              {/* Live Agent Node */}
              <JourneyNode 
                id="live"
                icon={Users} 
                title="Live Agent" 
                count={liveAgentCalls} 
                percentage={liveAgentPercentage} 
                color="#8B5CF6" 
                index={2}
                description="Calls handled directly by live agents"
              />
            </div>
            
            <div className="relative flex-1 flex flex-col items-center">
              <svg className="absolute top-16 w-full h-64">
                {/* Line to Resolved by Digital */}
                <motion.path
                  d="M0,16 L80,16 Q100,16 100,36 L100,64 Q100,84 120,84 L160,84"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={lineAnimation}
                />
                
                {/* Line to Escalated */}
                <motion.path
                  d="M0,16 L80,16 Q100,16 100,36 L100,144 Q100,164 120,164 L160,164"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={lineAnimation}
                />
              </svg>
              
              <div className="absolute top-[84px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
              
              <div className="absolute top-[164px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex flex-col">
              {/* Resolved by Digital Node */}
              <JourneyNode 
                id="resolved-digital"
                icon={Check} 
                title="Resolved by Digital" 
                count={digitalAgentCalls - escalatedCalls} 
                percentage={resolvedByDigitalPercentage} 
                color="#10B981" 
                index={3}
                description="Calls successfully resolved by the digital agent"
              />
              
              <div className="h-16"></div>
              
              {/* Escalated Node */}
              <JourneyNode 
                id="escalated"
                icon={AlertTriangle} 
                title="Escalated" 
                count={escalatedCalls} 
                percentage={escalatedPercentage} 
                color="#F97316" 
                index={4}
                description="Calls escalated from digital to live agents"
              />
            </div>
            
            <div className="relative flex-1 flex flex-col items-center">
              <svg className="absolute top-[164px] w-full h-32">
                {/* Line to Positive Sentiment */}
                <motion.path
                  d="M0,16 L160,16"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  variants={lineAnimation}
                />
              </svg>
              
              <div className="absolute top-[164px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            
            {/* Positive Sentiment Node */}
            <JourneyNode 
              id="positive"
              icon={ThumbsUp} 
              title="Positive Outcome" 
              count={positiveSentimentCalls} 
              percentage={positiveSentimentPercentage} 
              color="#34D399" 
              index={5}
              description="Escalated calls with positive sentiment resolution"
            />
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4 text-center">
          Click on any node to see intent distribution. Data is filtered based on your date and intent selections.
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCallJourney;
