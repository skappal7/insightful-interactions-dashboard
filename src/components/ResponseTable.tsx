
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponseData } from '@/utils/mockData';
import { getCompletionColor } from '@/utils/dashboardUtils';
import { X } from 'lucide-react';

interface ResponseTableProps {
  data: ResponseData[];
  title: string;
  aiHandled: boolean;
  selectedResponse: string | null;
  onSelectResponse: (response: string | null) => void;
}

const ResponseTable: React.FC<ResponseTableProps> = ({ 
  data, 
  title, 
  aiHandled, 
  selectedResponse, 
  onSelectResponse 
}) => {
  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${aiHandled ? 'bg-dashboard-blue' : 'bg-dashboard-purple'}`}></span>
          {title}
        </CardTitle>
        {selectedResponse && (
          <button
            onClick={() => onSelectResponse(null)}
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
                <th>Query</th>
                <th className="text-right">Frequency</th>
                <th className="text-center">Completion</th>
              </tr>
            </thead>
            <tbody>
              {data.map((response) => (
                <tr 
                  key={response.query} 
                  className={`text-sm hover:bg-muted/50 transition-colors cursor-pointer ${selectedResponse === response.query ? 'bg-primary/10' : ''}`}
                  onClick={() => onSelectResponse(selectedResponse === response.query ? null : response.query)}
                >
                  <td className="font-medium truncate max-w-[200px]">{response.query}</td>
                  <td className="text-right">{Math.round(response.frequency)}</td>
                  <td className="text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompletionColor(response.completionRate)}`}>
                      {Math.round(response.completionRate)}%
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
