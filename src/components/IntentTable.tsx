
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IntentData } from '@/utils/mockData';
import { getCompletionColor } from '@/utils/dashboardUtils';

interface IntentTableProps {
  data: IntentData[];
  title: string;
}

const IntentTable: React.FC<IntentTableProps> = ({ data, title }) => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
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
                <tr key={intent.name} className="text-sm hover:bg-muted/50 transition-colors">
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
