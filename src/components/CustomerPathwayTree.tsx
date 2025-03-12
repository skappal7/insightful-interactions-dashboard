
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, ChevronDown, Users, Bot, MessageSquare, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define tree node structure
interface TreeNode {
  id: string;
  name: string;
  type: 'ai' | 'agent' | 'customer' | 'system';
  children?: TreeNode[];
  data?: {
    duration?: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
    time?: string;
    message?: string;
  };
}

interface CustomerPathwayTreeProps {
  title: string;
  data: TreeNode[];
}

// Component for each tree node
const TreeNodeComponent: React.FC<{ 
  node: TreeNode; 
  level: number;
  expanded: Record<string, boolean>;
  toggleExpand: (id: string) => void;
}> = ({ node, level, expanded, toggleExpand }) => {
  const isExpanded = expanded[node.id];
  const hasChildren = node.children && node.children.length > 0;
  
  // Get icon based on node type
  const getNodeIcon = () => {
    switch (node.type) {
      case 'ai': return <Bot className="h-4 w-4 text-blue-500" />;
      case 'agent': return <Users className="h-4 w-4 text-purple-500" />;
      case 'customer': return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'system': return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Get color class based on sentiment
  const getSentimentColor = () => {
    if (!node.data?.sentiment) return '';
    
    switch (node.data?.sentiment) {
      case 'positive': return 'border-l-green-500';
      case 'neutral': return 'border-l-yellow-500';
      case 'negative': return 'border-l-red-500';
      default: return '';
    }
  };
  
  return (
    <div className={cn("pl-4", level > 0 ? "ml-4 border-l border-dashed border-gray-300" : "")}>
      <div 
        className={cn(
          "flex items-center gap-2 py-1.5 hover:bg-muted/50 rounded px-2 cursor-pointer transition-colors",
          node.data?.sentiment ? `border-l-2 ${getSentimentColor()}` : ""
        )}
        onClick={() => hasChildren && toggleExpand(node.id)}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )
        ) : (
          <div className="w-4" />
        )}
        
        <span className="flex items-center gap-2">
          {getNodeIcon()}
          <span className="font-medium">{node.name}</span>
        </span>
        
        {node.data?.duration && (
          <span className="text-xs text-muted-foreground ml-auto">{node.data.duration}</span>
        )}
        
        {node.data?.time && (
          <span className="text-xs text-muted-foreground ml-auto">{node.data.time}</span>
        )}
      </div>
      
      {hasChildren && isExpanded && node.children?.map((child) => (
        <TreeNodeComponent 
          key={child.id} 
          node={child} 
          level={level + 1} 
          expanded={expanded}
          toggleExpand={toggleExpand}
        />
      ))}
      
      {/* Show message content if available and expanded */}
      {node.data?.message && isExpanded && (
        <div className="ml-10 pl-4 border-l border-dashed border-gray-300 py-2 text-sm text-muted-foreground">
          {node.data.message}
        </div>
      )}
    </div>
  );
};

const CustomerPathwayTree: React.FC<CustomerPathwayTreeProps> = ({ title, data }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  
  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    
    const expandNode = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        allExpanded[node.id] = true;
        if (node.children) {
          expandNode(node.children);
        }
      });
    };
    
    expandNode(data);
    setExpanded(allExpanded);
  };
  
  const collapseAll = () => {
    setExpanded({});
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="flex gap-2">
            <button 
              onClick={expandAll}
              className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80 transition-colors"
            >
              Expand All
            </button>
            <button 
              onClick={collapseAll}
              className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.map(node => (
          <TreeNodeComponent 
            key={node.id} 
            node={node} 
            level={0} 
            expanded={expanded}
            toggleExpand={toggleExpand}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CustomerPathwayTree;
