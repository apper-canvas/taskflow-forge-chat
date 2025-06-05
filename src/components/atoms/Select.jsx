import React from 'react';

      const Select = ({ value, onChange, options, className = '', ...props }) => {
        const baseStyle = 'w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent';
        return (
          <select
            value={value}
            onChange={onChange}
            className={`${baseStyle} ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      };

      export default Select;