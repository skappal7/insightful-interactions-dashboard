
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IntentData } from '@/utils/mockData';
import { getCompletionColor } from '@/utils/dashboardUtils';
import { X } from 'lucide-react';

interface IntentTableProps {
  data: IntentData[];
  title: string;
  selectedIntent: string | null;
  onSelectIntent: (intent: string | null) => void;
}

const IntentTable: React.FC<IntentTableProps> = ({ 
  data, 
  title, 
  selectedIntent, 
  onSelectIntent 
}) => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {selectedIntent && (
          <button
            onClick={() => onSelectIntent(null)}
            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" /> Clear filter
          </button>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="dashboard-table">
            <thead>
              <tr className="border-b">
                <th>Intent Name</th>
                <th className="text-right">Total</th>
                <th className="text-right">AI</th>
                <th className="text-right">Live Agent</th>
                <th className="text-center">Completion</th>
              </tr>
            </thead>
            <tbody>
              {data.map((intent) => (
                <tr 
                  key={intent.name} 
                  className={`text-sm hover:bg-muted/50 transition-colors cursor-pointer ${selectedIntent === intent.name ? 'bg-primary/10' : ''}`}
                  onClick={() => onSelectIntent(selectedIntent === intent.name ? null : intent.name)}
                >
                  <td className="font-medium">{intent.name}</td>
                  <td className="text-right">{Math.round(intent.total)}</td>
                  <td className="text-right">{Math.round(intent.aiCompleted)}</td>
                  <td className="text-right">{Math.round(intent.liveAgentCompleted)}</td>
                  <td className="text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompletionColor(intent.completionRate)}`}>
                      {Math.round(intent.completionRate)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntentTable;
