
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponseData } from '@/utils/mockData';
import { getCompletionColor } from '@/utils/dashboardUtils';

interface ResponseTableProps {
  data: ResponseData[];
  title: string;
  aiHandled: boolean;
}

const ResponseTable: React.FC<ResponseTableProps> = ({ data, title, aiHandled }) => {
  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${aiHandled ? 'bg-dashboard-blue' : 'bg-dashboard-purple'}`}></span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="dashboard-table">
            <thead>
              <tr className="border-b">
                <th>Query</th>
                <th className="text-right">Frequency</th>
                <th className="text-center">Completion</th>
              </tr>
            </thead>
            <tbody>
              {data.map((response) => (
                <tr key={response.query} className="text-sm hover:bg-muted/50 transition-colors">
                  <td className="font-medium truncate max-w-[200px]">{response.query}</td>
                  <td className="text-right">{response.frequency}</td>
                  <td className="text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompletionColor(response.completionRate)}`}>
                      {response.completionRate.toFixed(1)}%
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

export default ResponseTable;
