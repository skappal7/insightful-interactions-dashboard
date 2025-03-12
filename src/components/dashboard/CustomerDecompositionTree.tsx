
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SentimentData, IntentData } from '@/utils/mockData';
import { ArrowDownToLine, ArrowRightToLine } from 'lucide-react';

interface TreeNodeProps {
  label: string;
  value: number | string;
  percentage?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
  children?: React.ReactNode;
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ label, value, percentage, sentiment, children, level }) => {
  const getSentimentColor = (sentiment?: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-300';
      case 'neutral': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'negative': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };
  
  const width = level === 0 ? 'w-full' : level === 1 ? 'w-[48%]' : 'w-[30%]';
  
  return (
    <div className={`${width} flex flex-col`}>
      <div className={`rounded-lg border p-3 ${getSentimentColor(sentiment)} mb-2`}>
        <div className="font-medium">{label}</div>
        <div className="text-lg font-bold">{value}</div>
        {percentage !== undefined && (
          <div className="text-xs opacity-80">{percentage}% of total</div>
        )}
      </div>
      
      {children && (
        <div className="flex flex-col">
          <div className="flex justify-center py-2">
            <ArrowDownToLine className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

interface CustomerDecompositionTreeProps {
  totalConversations: number;
  sentimentData: SentimentData[];
  topIntents: IntentData[];
}

const CustomerDecompositionTree: React.FC<CustomerDecompositionTreeProps> = ({ 
  totalConversations, 
  sentimentData, 
  topIntents 
}) => {
  // Calculate metrics for the tree
  const aiHandledCount = sentimentData.filter(s => s.aiHandled).length;
  const liveAgentCount = sentimentData.filter(s => !s.aiHandled).length;
  
  const aiPercentage = Math.round((aiHandledCount / totalConversations) * 100);
  const livePercentage = Math.round((liveAgentCount / totalConversations) * 100);
  
  // Calculate AI metrics
  const aiEscalatedCount = sentimentData.filter(s => s.aiHandled && s.escalated).length;
  const aiResolvedCount = aiHandledCount - aiEscalatedCount;
  
  const aiEscalatedPercentage = Math.round((aiEscalatedCount / aiHandledCount) * 100);
  const aiResolvedPercentage = Math.round((aiResolvedCount / aiHandledCount) * 100);
  
  // Calculate Live Agent metrics
  const liveResolvedCount = sentimentData.filter(s => !s.aiHandled && s.endSentiment !== 'negative').length;
  const liveUnresolvedCount = liveAgentCount - liveResolvedCount;
  
  const liveResolvedPercentage = Math.round((liveResolvedCount / liveAgentCount) * 100);
  const liveUnresolvedPercentage = Math.round((liveUnresolvedCount / liveAgentCount) * 100);
  
  return (
    <Card className="dashboard-card overflow-hidden transition-all duration-300">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Customer Journey Decomposition</h3>
        
        <div className="flex flex-col items-center">
          {/* Root node */}
          <TreeNode 
            label="Total Conversations" 
            value={totalConversations} 
            level={0}
          >
            {/* First level splits */}
            <TreeNode 
              label="Digital Agent Handled" 
              value={aiHandledCount} 
              percentage={aiPercentage}
              sentiment="neutral"
              level={1}
            >
              {/* AI second level */}
              <TreeNode 
                label="Escalated to Live Agent" 
                value={aiEscalatedCount} 
                percentage={aiEscalatedPercentage}
                sentiment="negative"
                level={2}
              />
              <TreeNode 
                label="Resolved by Digital Agent" 
                value={aiResolvedCount} 
                percentage={aiResolvedPercentage}
                sentiment="positive"
                level={2}
              />
            </TreeNode>
            
            <TreeNode 
              label="Live Agent Handled" 
              value={liveAgentCount} 
              percentage={livePercentage}
              sentiment="neutral"
              level={1}
            >
              {/* Live Agent second level */}
              <TreeNode 
                label="Successfully Resolved" 
                value={liveResolvedCount} 
                percentage={liveResolvedPercentage}
                sentiment="positive"
                level={2}
              />
              <TreeNode 
                label="Resolution Incomplete" 
                value={liveUnresolvedCount} 
                percentage={liveUnresolvedPercentage}
                sentiment="negative"
                level={2}
              />
            </TreeNode>
          </TreeNode>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-2">Key Insights:</h4>
          <ul className="text-sm space-y-2">
            <li>• Digital agents handle {aiPercentage}% of total customer conversations</li>
            <li>• {aiResolvedPercentage}% of digital agent conversations are resolved without escalation</li>
            <li>• Live agents successfully resolve {liveResolvedPercentage}% of their conversations</li>
            <li>• Top resolved intent: {topIntents[0]?.intent || 'N/A'} ({topIntents[0]?.completionRate || 0}% completion)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDecompositionTree;
