
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { PhoneCall, Bot, Users, ArrowRight, MessageSquare, ThumbsUp, AlertCircle, Book, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { KPIData, IntentData, SentimentData } from '@/utils/mockData';

interface CustomerJourneyTabProps {
  kpiData: KPIData[];
  sentimentData: SentimentData[];
  topCompletedIntents: IntentData[];
}

const CustomerJourneyTab: React.FC<CustomerJourneyTabProps> = ({
  kpiData,
  sentimentData,
  topCompletedIntents
}) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedIntent, setSelectedIntent] = useState<string>('billing');
  
  // Calculate basic metrics from KPI data
  const totalConversations = kpiData.find(k => k.title === 'Total Conversations')?.value || 0;
  const digitalAgentPercentage = 75; // 75% of calls are handled by digital agent (mock data)
  const digitalAgentCalls = Math.round(totalConversations * (digitalAgentPercentage / 100));
  const liveAgentCalls = totalConversations - digitalAgentCalls;
  
  const escalations = kpiData.find(k => k.title === 'Escalations')?.value || 0;
  const resolvedByDigital = digitalAgentCalls - escalations;
  
  // Calculate sentiment improvements
  const positiveResolutions = Math.round(escalations * 0.65); // 65% of escalations end with positive sentiment
  
  // Make journey nodes responsive to the selected intent
  const intentFilter = selectedIntent.toLowerCase();
  const intentMultiplier = {
    'billing': 1.2,
    'account': 0.9,
    'support': 1.1,
    'technical': 0.8,
    'product': 1.0
  }[intentFilter] || 1;
  
  // Adjusted metrics based on selected intent
  const adjustedDigitalCalls = Math.round(digitalAgentCalls * intentMultiplier);
  const adjustedLiveCalls = Math.round(liveAgentCalls * intentMultiplier);
  const adjustedEscalations = Math.round(escalations * intentMultiplier);
  const adjustedResolved = Math.round(resolvedByDigital * intentMultiplier);
  const adjustedPositive = Math.round(positiveResolutions * intentMultiplier);
  
  // Animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Generate intent-specific data
  const getIntentData = (stageName: string) => {
    return topCompletedIntents.map(intent => {
      const baseValue = intent.total;
      const stageMultipliers = {
        'total': 1,
        'digital': 0.75,
        'live': 0.25,
        'resolved': 0.60,
        'escalated': 0.15,
        'positive': 0.10
      };
      
      return {
        name: intent.name,
        value: Math.round(baseValue * (stageMultipliers[stageName as keyof typeof stageMultipliers] || 1))
      };
    });
  };
  
  // Customer journey stages data
  const journeyStages = [
    {
      id: 'total',
      title: 'Total Conversations',
      value: totalConversations,
      icon: PhoneCall,
      color: '#6366F1',
      description: 'All customer interactions across all channels',
      data: getIntentData('total')
    },
    {
      id: 'digital',
      title: 'Digital Agent',
      value: adjustedDigitalCalls,
      percentage: Math.round((adjustedDigitalCalls / totalConversations) * 100),
      icon: Bot,
      color: '#0EA5E9',
      description: 'Conversations initially handled by the AI agent',
      data: getIntentData('digital')
    },
    {
      id: 'live',
      title: 'Live Agent',
      value: adjustedLiveCalls,
      percentage: Math.round((adjustedLiveCalls / totalConversations) * 100),
      icon: Users,
      color: '#8B5CF6',
      description: 'Conversations initially routed to live agents',
      data: getIntentData('live')
    },
    {
      id: 'resolved',
      title: 'Resolved by Digital',
      value: adjustedResolved,
      percentage: Math.round((adjustedResolved / adjustedDigitalCalls) * 100),
      icon: ThumbsUp,
      color: '#10B981',
      description: 'Successfully resolved by the digital agent without escalation',
      data: getIntentData('resolved')
    },
    {
      id: 'escalated',
      title: 'Escalated',
      value: adjustedEscalations,
      percentage: Math.round((adjustedEscalations / adjustedDigitalCalls) * 100),
      icon: RefreshCw,
      color: '#F97316',
      description: 'Transferred from digital to live agent',
      data: getIntentData('escalated')
    },
    {
      id: 'positive',
      title: 'Positive Resolution',
      value: adjustedPositive,
      percentage: Math.round((adjustedPositive / adjustedEscalations) * 100),
      icon: MessageSquare,
      color: '#34D399',
      description: 'Escalated conversations with positive sentiment outcome',
      data: getIntentData('positive')
    }
  ];
  
  // CSAT data over time for journeys
  const csatJourneyData = [
    { name: 'Initial', digital: 75, live: 70 },
    { name: 'Mid-conversation', digital: 72, live: 73 },
    { name: 'Post-resolution', digital: 78, live: 85 },
    { name: ' 24h Later', digital: 82, live: 88 }
  ];
  
  // Journey stories
  const journeyStories = [
    {
      title: "Billing Inquiry Resolution",
      description: "Customer contacted about unexpected charges. Digital agent identified the issue as a recurring subscription charge, explained the billing cycle, and offered cancellation options. Customer was satisfied with the information and chose to keep the subscription.",
      type: "success",
      agentType: "digital",
      intents: ["billing", "subscription", "charges"],
      satisfaction: 90
    },
    {
      title: "Technical Support Escalation",
      description: "Customer contacted about network connectivity issues. Digital agent ran diagnostics and suggested basic troubleshooting, but customer had already tried those steps. Conversation escalated to live agent who identified a regional outage and provided estimated resolution time.",
      type: "escalation-positive",
      agentType: "both",
      intents: ["technical", "network", "connectivity"],
      satisfaction: 85
    },
    {
      title: "Account Access Recovery",
      description: "Customer locked out of account after multiple failed login attempts. Digital agent verified identity and guided through security questions. After providing temporary access code, customer regained account access and was prompted to reset password.",
      type: "success",
      agentType: "digital",
      intents: ["account", "login", "security"],
      satisfaction: 95
    }
  ];
  
  // Interactive journey path visualization - active node state
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Journey Analysis</h2>
        
        <div className="flex items-center gap-4">
          <Select value={selectedIntent} onValueChange={setSelectedIntent}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Intent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="billing">Billing Intents</SelectItem>
              <SelectItem value="account">Account Intents</SelectItem>
              <SelectItem value="support">Support Intents</SelectItem>
              <SelectItem value="technical">Technical Issues</SelectItem>
              <SelectItem value="product">Product Inquiries</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Journey Overview</TabsTrigger>
          <TabsTrigger value="pathways">Customer Pathways</TabsTrigger>
          <TabsTrigger value="stories">Journey Stories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {journeyStages.map((stage) => (
                  <motion.div 
                    key={stage.id}
                    className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow"
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: stage.color }}
                      >
                        <stage.icon className="h-5 w-5" />
                      </div>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{stage.description}</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                    <h3 className="font-medium text-sm">{stage.title}</h3>
                    <p className="text-2xl font-bold mt-1">{stage.value.toLocaleString()}</p>
                    {stage.percentage && (
                      <p className="text-xs text-muted-foreground mt-1">{stage.percentage}% of previous stage</p>
                    )}
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View Intent Breakdown
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">{stage.title} Intents</h4>
                          <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={stage.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{fontSize: 10}} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill={stage.color} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-10">
                <h3 className="font-medium text-lg mb-3">CSAT Throughout Journey</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={csatJourneyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="digital" stroke="#0EA5E9" name="Digital Agent Journey" strokeWidth={2} />
                      <Line type="monotone" dataKey="live" stroke="#8B5CF6" name="Live Agent Journey" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pathways">
          <Card>
            <CardHeader>
              <CardTitle>Customer Pathways Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative p-8 overflow-x-auto">
                <div className="min-w-[900px] flex justify-around items-center">
                  {/* First Node - Total Calls */}
                  <div className="relative">
                    <motion.div 
                      className={`cursor-pointer transition-all duration-300 ${activeNode === 'total' ? 'scale-110' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveNode(activeNode === 'total' ? null : 'total')}
                    >
                      <div 
                        className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white mx-auto"
                        style={{ backgroundColor: '#6366F1' }}
                      >
                        <PhoneCall className="h-8 w-8 mb-1" />
                        <div className="text-xs font-medium">Total</div>
                        <div className="text-xs">{totalConversations.toLocaleString()}</div>
                      </div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {activeNode === 'total' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 z-10"
                        >
                          <h4 className="text-sm font-medium mb-2">Intent Distribution</h4>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={getIntentData('total')}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={50}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={(entry) => entry.name.split(' ')[0]}
                                >
                                  {getIntentData('total').map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#0EA5E9', '#F97316', '#10B981', '#8B5CF6', '#F43F5E'][index % 5]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Arrows */}
                  <motion.div 
                    className="flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center mb-8">
                      <ArrowRight className="h-8 w-8 text-muted-foreground" />
                      <div className="ml-2 text-xs text-muted-foreground">
                        <div>{Math.round(digitalAgentPercentage)}%</div>
                      </div>
                    </div>
                    <div className="flex items-center mt-8">
                      <ArrowRight className="h-8 w-8 text-muted-foreground" />
                      <div className="ml-2 text-xs text-muted-foreground">
                        <div>{100 - Math.round(digitalAgentPercentage)}%</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Second Nodes - Digital and Live */}
                  <div className="flex flex-col justify-center gap-16">
                    {/* Digital Agent Node */}
                    <div className="relative">
                      <motion.div 
                        className={`cursor-pointer transition-all duration-300 ${activeNode === 'digital' ? 'scale-110' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setActiveNode(activeNode === 'digital' ? null : 'digital')}
                      >
                        <div 
                          className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white mx-auto"
                          style={{ backgroundColor: '#0EA5E9' }}
                        >
                          <Bot className="h-8 w-8 mb-1" />
                          <div className="text-xs font-medium">Digital</div>
                          <div className="text-xs">{adjustedDigitalCalls.toLocaleString()}</div>
                        </div>
                      </motion.div>
                      
                      <AnimatePresence>
                        {activeNode === 'digital' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 z-10"
                          >
                            <h4 className="text-sm font-medium mb-2">Digital Agent Intents</h4>
                            <div className="h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={getIntentData('digital')}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={(entry) => entry.name.split(' ')[0]}
                                  >
                                    {getIntentData('digital').map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={['#0EA5E9', '#F97316', '#10B981', '#8B5CF6', '#F43F5E'][index % 5]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Live Agent Node */}
                    <div className="relative">
                      <motion.div 
                        className={`cursor-pointer transition-all duration-300 ${activeNode === 'live' ? 'scale-110' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setActiveNode(activeNode === 'live' ? null : 'live')}
                      >
                        <div 
                          className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white mx-auto"
                          style={{ backgroundColor: '#8B5CF6' }}
                        >
                          <Users className="h-8 w-8 mb-1" />
                          <div className="text-xs font-medium">Live</div>
                          <div className="text-xs">{adjustedLiveCalls.toLocaleString()}</div>
                        </div>
                      </motion.div>
                      
                      <AnimatePresence>
                        {activeNode === 'live' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 z-10"
                          >
                            <h4 className="text-sm font-medium mb-2">Live Agent Intents</h4>
                            <div className="h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={getIntentData('live')}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={(entry) => entry.name.split(' ')[0]}
                                  >
                                    {getIntentData('live').map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={['#0EA5E9', '#F97316', '#10B981', '#8B5CF6', '#F43F5E'][index % 5]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Arrows */}
                  <motion.div 
                    className="flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center mb-8">
                      <ArrowRight className="h-8 w-8 text-muted-foreground" />
                      <div className="ml-2 text-xs text-muted-foreground">
                        <div>{100 - Math.round((escalations / digitalAgentCalls) * 100)}%</div>
                      </div>
                    </div>
                    <div className="flex items-center mt-8">
                      <ArrowRight className="h-8 w-8 text-muted-foreground" />
                      <div className="ml-2 text-xs text-muted-foreground">
                        <div>{Math.round((escalations / digitalAgentCalls) * 100)}%</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Third Nodes - Resolved and Escalated */}
                  <div className="flex flex-col justify-center gap-16">
                    {/* Resolved Node */}
                    <div className="relative">
                      <motion.div 
                        className={`cursor-pointer transition-all duration-300 ${activeNode === 'resolved' ? 'scale-110' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setActiveNode(activeNode === 'resolved' ? null : 'resolved')}
                      >
                        <div 
                          className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white mx-auto"
                          style={{ backgroundColor: '#10B981' }}
                        >
                          <ThumbsUp className="h-8 w-8 mb-1" />
                          <div className="text-xs font-medium">Resolved</div>
                          <div className="text-xs">{adjustedResolved.toLocaleString()}</div>
                        </div>
                      </motion.div>
                      
                      <AnimatePresence>
                        {activeNode === 'resolved' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 z-10"
                          >
                            <h4 className="text-sm font-medium mb-2">Resolved Intents</h4>
                            <div className="h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={getIntentData('resolved')}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={(entry) => entry.name.split(' ')[0]}
                                  >
                                    {getIntentData('resolved').map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={['#0EA5E9', '#F97316', '#10B981', '#8B5CF6', '#F43F5E'][index % 5]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Escalated Node */}
                    <div className="relative">
                      <motion.div 
                        className={`cursor-pointer transition-all duration-300 ${activeNode === 'escalated' ? 'scale-110' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setActiveNode(activeNode === 'escalated' ? null : 'escalated')}
                      >
                        <div 
                          className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white mx-auto"
                          style={{ backgroundColor: '#F97316' }}
                        >
                          <RefreshCw className="h-8 w-8 mb-1" />
                          <div className="text-xs font-medium">Escalated</div>
                          <div className="text-xs">{adjustedEscalations.toLocaleString()}</div>
                        </div>
                      </motion.div>
                      
                      <AnimatePresence>
                        {activeNode === 'escalated' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 z-10"
                          >
                            <h4 className="text-sm font-medium mb-2">Escalation Intents</h4>
                            <div className="h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={getIntentData('escalated')}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={(entry) => entry.name.split(' ')[0]}
                                  >
                                    {getIntentData('escalated').map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={['#0EA5E9', '#F97316', '#10B981', '#8B5CF6', '#F43F5E'][index % 5]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Arrow to Positive Resolution */}
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <ArrowRight className="h-8 w-8 text-muted-foreground" />
                    <div className="ml-2 text-xs text-muted-foreground">
                      <div>{Math.round((positiveResolutions / escalations) * 100)}%</div>
                    </div>
                  </motion.div>
                  
                  {/* Fourth Node - Positive Resolution */}
                  <div className="relative">
                    <motion.div 
                      className={`cursor-pointer transition-all duration-300 ${activeNode === 'positive' ? 'scale-110' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveNode(activeNode === 'positive' ? null : 'positive')}
                    >
                      <div 
                        className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white mx-auto"
                        style={{ backgroundColor: '#34D399' }}
                      >
                        <MessageSquare className="h-8 w-8 mb-1" />
                        <div className="text-xs font-medium">Positive</div>
                        <div className="text-xs">{adjustedPositive.toLocaleString()}</div>
                      </div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {activeNode === 'positive' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-60 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 z-10"
                        >
                          <h4 className="text-sm font-medium mb-2">Positive Resolution Intents</h4>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={getIntentData('positive')}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={50}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={(entry) => entry.name.split(' ')[0]}
                                >
                                  {getIntentData('positive').map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#0EA5E9', '#F97316', '#10B981', '#8B5CF6', '#F43F5E'][index % 5]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="text-center text-xs text-muted-foreground mt-8">
                  Click on any node to see intent distribution details
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stories">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {journeyStories.map((story, index) => (
                  <motion.div 
                    key={index}
                    className="bg-card rounded-lg border hover:shadow-md transition-shadow"
                    variants={itemVariants}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Book className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">{story.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{story.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {story.intents.map((intent, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                            {intent}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          story.type === 'success' 
                            ? 'bg-green-100 text-green-800' 
                            : story.type === 'escalation-positive'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {story.type === 'success' 
                            ? 'Success' 
                            : story.type === 'escalation-positive'
                            ? 'Positive Escalation'
                            : 'Issue'
                          }
                        </span>
                        
                        <span className="text-xs font-medium">
                          CSAT: {story.satisfaction}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Journey Insights</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500 w-4 h-4 mt-1 flex-shrink-0"></div>
                      <p>Digital agents successfully resolve 75% of billing inquiries without escalation.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-500 w-4 h-4 mt-1 flex-shrink-0"></div>
                      <p>Technical issues have the highest escalation rate (45%), but 70% result in positive outcomes.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 w-4 h-4 mt-1 flex-shrink-0"></div>
                      <p>Account-related inquiries show improved CSAT scores when handled by digital agents first, even if later escalated.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-purple-500 w-4 h-4 mt-1 flex-shrink-0"></div>
                      <p>Journey satisfaction scores drop 15% when customers need to repeat information during an escalation.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerJourneyTab;
