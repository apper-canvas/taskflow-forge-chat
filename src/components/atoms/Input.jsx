import React from 'react';

      const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
        const baseStyle = 'w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all';
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseStyle} ${className}`}
            {...props}
          />
        );
      };

      export default Input;