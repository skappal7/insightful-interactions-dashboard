
import React from 'react';
import { DateFilter } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface FilterBarProps {
  dateFilters: DateFilter[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  dateFilters, 
  selectedFilter, 
  onFilterChange
}) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-card rounded-lg border p-4 mb-6 animate-fade-in shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <span className="font-medium text-sm text-primary">Time Period:</span>
        <div className="flex flex-wrap gap-2">
          {dateFilters.map((filter) => (
            <Button
              key={filter.label}
              variant={selectedFilter === filter.label ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter.label)}
              className={`h-8 transition-all duration-200 ${
                selectedFilter === filter.label ? 'shadow-sm' : ''
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
