
import React from 'react';
import { DateFilter } from '@/utils/mockData';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface FilterBarProps {
  dateFilters: DateFilter[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  selectedIntent?: string;
  onIntentChange?: (intent: string) => void;
  selectedAgent?: string;
  onAgentChange?: (agent: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  dateFilters, 
  selectedFilter, 
  onFilterChange,
  selectedIntent = 'all-intents',
  onIntentChange = () => {},
  selectedAgent = 'all-agents',
  onAgentChange = () => {},
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-card rounded-lg border p-4 mb-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium text-sm">Time Period:</span>
        <div className="flex flex-wrap gap-2">
          {dateFilters.map((filter) => (
            <Button
              key={filter.label}
              variant={selectedFilter === filter.label ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter.label)}
              className="h-8 transition-all duration-200"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Select 
          value={selectedIntent} 
          onValueChange={onIntentChange}
        >
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Filter by Intent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-intents">All Intents</SelectItem>
            <SelectItem value="account">Account Intents</SelectItem>
            <SelectItem value="billing">Billing Intents</SelectItem>
            <SelectItem value="support">Support Intents</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={selectedAgent} 
          onValueChange={onAgentChange}
        >
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Filter by Agent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-agents">All Agents</SelectItem>
            <SelectItem value="ai-only">AI Only</SelectItem>
            <SelectItem value="live-only">Live Agents Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
