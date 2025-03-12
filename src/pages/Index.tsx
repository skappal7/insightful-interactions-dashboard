
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import KPIWidget from '@/components/KPIWidget';
import IntentTable from '@/components/IntentTable';
import ResponseTable from '@/components/ResponseTable';
import SentimentTracker from '@/components/SentimentTracker';
import ExecutiveSummary from '@/components/ExecutiveSummary';
import FilterBar from '@/components/FilterBar';
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

const Index = () => {
  // Initialize state with mock data
  const [kpiData, setKpiData] = useState(generateKPIData());
  const [intentData, setIntentData] = useState(generateIntentData());
  const [responseData, setResponseData] = useState(generateResponseData());
  const [sentimentData, setSentimentData] = useState(generateSentimentData());
  const [trendData, setTrendData] = useState(generateTrendData());
  const [dateFilters, setDateFilters] = useState(generateDateFilters());
  const [selectedFilter, setSelectedFilter] = useState('Last 7 Days');
  
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
  }, []);
  
  return (
    <div className="container py-6 mx-auto max-w-7xl animate-fade-in">
      <DashboardHeader />
      
      <FilterBar 
        dateFilters={dateFilters}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {kpiData.map((kpi, index) => (
          <KPIWidget
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            unit={kpi.unit}
            trendData={trendData}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ResponseTable 
          data={aiResponses} 
          title="AI-Handled Responses" 
          aiHandled={true}
        />
        <ResponseTable 
          data={liveAgentResponses} 
          title="Live Agent-Handled Responses" 
          aiHandled={false}
        />
      </div>
      
      <SentimentTracker data={sentimentData} />
      
      <div className="mt-6">
        <ExecutiveSummary summaryHtml={summaryHtml} />
      </div>
    </div>
  );
};

export default Index;
