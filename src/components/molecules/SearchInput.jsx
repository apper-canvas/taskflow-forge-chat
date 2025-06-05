import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Input from '@/components/atoms/Input';

      const SearchInput = ({ searchTerm, onSearchChange, placeholder = 'Search tasks...' }) => {
        return (
          <div className="flex-1 relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full pl-10 pr-4 py-3"
            />
          </div>
        );
      };

      export default SearchInput;