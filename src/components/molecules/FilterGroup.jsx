import React from 'react';
      import Select from '@/components/atoms/Select';
      import Button from '@/components/atoms/Button';

      const FilterGroup = ({
        selectedFilter,
        onFilterChange,
        selectedPriority,
        onPriorityChange,
        onClearFilters,
        showClearButton
      }) => {
        const filterOptions = [
          { value: 'all', label: 'All Tasks' },
          { value: 'active', label: 'Active' },
          { value: 'completed', label: 'Completed' },
        ];

        const priorityOptions = [
          { value: 'all', label: 'All Priorities' },
          { value: 'high', label: 'High Priority' },
          { value: 'medium', label: 'Medium Priority' },
          { value: 'low', label: 'Low Priority' },
        ];

        return (
          <div className="flex flex-wrap gap-2">
            <Select
              value={selectedFilter}
              onChange={onFilterChange}
              options={filterOptions}
              className="px-3 py-2 text-sm"
            />
            <Select
              value={selectedPriority}
              onChange={onPriorityChange}
              options={priorityOptions}
              className="px-3 py-2 text-sm"
            />
            {showClearButton && (
              <Button onClick={onClearFilters} className="px-3 py-2 text-sm" variant="clear-filters">
                Clear filters
              </Button>
            )}
          </div>
        );
      };

      export default FilterGroup;