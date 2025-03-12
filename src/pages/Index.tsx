
import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/DashboardHeader';
import KPIWidget from '@/components/KPIWidget';
import IntentTable from '@/components/IntentTable';
import ResponseTable from '@/components/ResponseTable';
import SentimentTracker from '@/components/SentimentTracker';
import ExecutiveSummary from '@/components/ExecutiveSummary';
import FilterBar from '@/components/FilterBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  generateKPIData, 
  generateIntentData, 
  generateResponseData, 
  generateSentimentData,
  generateTrendData,
  generateDateFilters,
  KPIData,
  IntentData
} from '@/utils/mockData';
import { 
  getTopIntents, 
  getTopResponses, 
  calculateSentimentImprovement,
  generateExecutiveSummary
} from '@/utils/dashboardUtils';
import { LayoutDashboard, Users, Bot, MessageSquare } from 'lucide-react';

const kpiDescriptions = {
  'Total Conversations': 'The total number of conversations between customers and AI or live agents',
  'Unique Users': 'The number of distinct users who initiated conversations',
  'Total Requests': 'The total number of individual requests made across all conversations',
  'Recognition %': 'Percentage of user intents that were correctly recognized by the AI',
  'Completion %': 'Percentage of requests that were successfully completed without escalation',
  'Escalations': 'Number of conversations that were escalated to live agents'
};

const Index = () => {
  // Initialize state with mock data
  const [kpiData, setKpiData] = useState(generateKPIData());
  const [intentData, setIntentData] = useState(generateIntentData());
  const [responseData, setResponseData] = useState(generateResponseData());
  const [sentimentData, setSentimentData] = useState(generateSentimentData());
  const [trendData, setTrendData] = useState(generateTrendData());
  const [dateFilters, setDateFilters] = useState(generateDateFilters());
  const [selectedFilter, setSelectedFilter] = useState('Last 7 Days');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Derived data
  const topCompletedIntents = getTopIntents(intentData, true);
  const topIncompleteIntents = getTopIntents(intentData, false);
  const aiResponses = getTopResponses(responseData, true);
  const liveAgentResponses = getTopResponses(responseData, false);
  const sentimentImprovement = calculateSentimentImprovement(sentimentData);
  
  // Executive summary
  const summaryHtml = generateExecutiveSummary(
    kpiData.map(kpi => ({ title: kpi.title, trend: kpi.trend })),
    sentimentImprovement,
    kpiData.find(kpi => kpi.title === 'Escalations')?.value || 0,
    kpiData.find(kpi => kpi.title === 'Recognition %')?.value || 0,
    kpiData.find(kpi => kpi.title === 'Completion %')?.value || 0
  );
  
  // Handle filter change (simulated data refresh)
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    
    // Simulate data changes when filter changes
    setTimeout(() => {
      // Create slightly different KPI data
      const newKpiData = generateKPIData().map(kpi => ({
        ...kpi,
        value: kpi.value * (0.9 + Math.random() * 0.2),
        trend: kpi.trend * (0.8 + Math.random() * 0.4),
      }));
      
      // Create slightly different intent data
      const newIntentData = generateIntentData().map(intent => ({
        ...intent,
        total: intent.total * (0.9 + Math.random() * 0.2),
        aiCompleted: intent.aiCompleted * (0.9 + Math.random() * 0.2),
        liveAgentCompleted: intent.liveAgentCompleted * (0.9 + Math.random() * 0.2),
        completionRate: intent.completionRate * (0.9 + Math.random() * 0.2),
      }));
      
      // Update state with new data
      setKpiData(newKpiData);
      setIntentData(newIntentData);
      setTrendData(generateTrendData());
      
      // Filter sentiment data based on the selected time period
      const filteredSentimentData = generateSentimentData().slice(
        0, 
        filter === 'Today' ? 20 : 
        filter === 'Yesterday' ? 25 : 
        filter === 'Last 7 Days' ? 70 : 100
      );
      setSentimentData(filteredSentimentData);
    }, 300);
  };
  
  // Animation effect - staggered entrance
  useEffect(() => {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-scale-in');
      }, 100 * index);
    });
  }, [activeTab]);

  // Generate trend data for bar charts
  const generateBarData = () => {
    return [
      { name: 'Mon', ai: 120, agent: 45 },
      { name: 'Tue', ai: 132, agent: 49 },
      { name: 'Wed', ai: 101, agent: 52 },
      { name: 'Thu', ai: 134, agent: 47 },
      { name: 'Fri', ai: 190, agent: 60 },
      { name: 'Sat', ai: 90, agent: 30 },
      { name: 'Sun', ai: 85, agent: 25 },
    ];
  };

  const barData = generateBarData();
  
  return (
    <div className="container py-6 mx-auto max-w-7xl animate-fade-in">
      <DashboardHeader />
      
      <FilterBar 
        dateFilters={dateFilters}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full bg-background border-b mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <LayoutDashboard className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="digital-agent" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Bot className="h-4 w-4" />
            <span>Digital Agent</span>
          </TabsTrigger>
          <TabsTrigger value="live-agents" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Users className="h-4 w-4" />
            <span>Live Agents</span>
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <MessageSquare className="h-4 w-4" />
            <span>Sentiment Analysis</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {kpiData.map((kpi, index) => (
              <KPIWidget
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                trend={kpi.trend}
                unit={kpi.unit}
                trendData={trendData}
                description={kpiDescriptions[kpi.title as keyof typeof kpiDescriptions]}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <IntentTable 
              data={topCompletedIntents} 
              title="Top Completed Intents" 
            />
            <IntentTable 
              data={topIncompleteIntents} 
              title="Top Incomplete Intents" 
            />
          </div>
          
          <div className="mt-6">
            <ExecutiveSummary summaryHtml={summaryHtml} />
          </div>
        </TabsContent>
        
        <TabsContent value="digital-agent" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
            {kpiData.slice(0, 3).map((kpi, index) => (
              <KPIWidget
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                trend={kpi.trend}
                unit={kpi.unit}
                trendData={trendData}
                description={kpiDescriptions[kpi.title as keyof typeof kpiDescriptions]}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="dashboard-card overflow-hidden transition-all duration-300">
              <CardContent className="p-4">
                <h3 className="text-base font-medium mb-4">AI Handled Conversations (7-Day Trend)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ai" fill="#60A5FA" name="AI Handled" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <ResponseTable 
              data={aiResponses} 
              title="AI-Handled Responses" 
              aiHandled={true}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <IntentTable 
              data={topCompletedIntents.filter(intent => intent.aiCompleted > intent.liveAgentCompleted)} 
              title="Top AI-Completed Intents" 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="live-agents" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
            {kpiData.slice(3, 6).map((kpi, index) => (
              <KPIWidget
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                trend={kpi.trend}
                unit={kpi.unit}
                trendData={trendData}
                description={kpiDescriptions[kpi.title as keyof typeof kpiDescriptions]}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="dashboard-card overflow-hidden transition-all duration-300">
              <CardContent className="p-4">
                <h3 className="text-base font-medium mb-4">Live Agent Escalations (7-Day Trend)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="agent" fill="#A78BFA" name="Agent Handled" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <ResponseTable 
              data={liveAgentResponses} 
              title="Live Agent-Handled Responses" 
              aiHandled={false}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <IntentTable 
              data={topIncompleteIntents.filter(intent => intent.liveAgentCompleted > intent.aiCompleted)} 
              title="Top Live Agent-Completed Intents" 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="sentiment" className="mt-0">
          <SentimentTracker data={sentimentData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="dashboard-card overflow-hidden transition-all duration-300">
              <CardContent className="p-4">
                <h3 className="text-base font-medium mb-4">Sentiment Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { date: 'Mon', positive: 40, neutral: 30, negative: 30 },
                    { date: 'Tue', positive: 35, neutral: 35, negative: 30 },
                    { date: 'Wed', positive: 45, neutral: 30, negative: 25 },
                    { date: 'Thu', positive: 50, neutral: 25, negative: 25 },
                    { date: 'Fri', positive: 55, neutral: 30, negative: 15 },
                    { date: 'Sat', positive: 60, neutral: 25, negative: 15 },
                    { date: 'Sun', positive: 65, neutral: 20, negative: 15 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="positive" stroke="#34D399" name="Positive" />
                    <Line type="monotone" dataKey="neutral" stroke="#FBBF24" name="Neutral" />
                    <Line type="monotone" dataKey="negative" stroke="#F87171" name="Negative" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card overflow-hidden transition-all duration-300">
              <CardContent className="p-4">
                <h3 className="text-base font-medium mb-4">Sentiment Improvement by Agent Type</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { agent: 'AI Assistant', improved: 65, worsened: 15, unchanged: 20 },
                    { agent: 'Live Agent', improved: 80, worsened: 5, unchanged: 15 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="agent" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="improved" stackId="a" fill="#34D399" name="Improved" />
                    <Bar dataKey="unchanged" stackId="a" fill="#94A3B8" name="Unchanged" />
                    <Bar dataKey="worsened" stackId="a" fill="#F87171" name="Worsened" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
