
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SentimentTracker from '@/components/SentimentTracker';
import { SentimentData } from '@/utils/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CalendarIcon, FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SentimentTabProps {
  sentimentData: SentimentData[];
}

const SentimentTab: React.FC<SentimentTabProps> = ({ sentimentData }) => {
  // Filter states
  const [timeRange, setTimeRange] = useState<string>('week');
  const [intent, setIntent] = useState<string>('billing');
  const [agentType, setAgentType] = useState<string>('ai-only');

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card rounded-lg border p-4 mb-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-sm">Time Period:</span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={timeRange === 'today' ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange('today')}
              className="h-8 transition-all duration-200"
            >
              Today
            </Button>
            <Button
              variant={timeRange === 'yesterday' ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange('yesterday')}
              className="h-8 transition-all duration-200"
            >
              Yesterday
            </Button>
            <Button
              variant={timeRange === 'week' ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange('week')}
              className="h-8 transition-all duration-200"
            >
              Last 7 Days
            </Button>
            <Button
              variant={timeRange === 'month' ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange('month')}
              className="h-8 transition-all duration-200"
            >
              Last 30 Days
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Intent:</span>
            <Select 
              value={intent} 
              onValueChange={setIntent}
            >
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Filter by Intent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account">Account Intents</SelectItem>
                <SelectItem value="billing">Billing Intents</SelectItem>
                <SelectItem value="support">Support Intents</SelectItem>
                <SelectItem value="technical">Technical Issues</SelectItem>
                <SelectItem value="product">Product Inquiries</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Agent:</span>
            <Select 
              value={agentType} 
              onValueChange={setAgentType}
            >
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Filter by Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-only">AI Only</SelectItem>
                <SelectItem value="live-only">Live Agents Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
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
    </>
  );
};

export default SentimentTab;
