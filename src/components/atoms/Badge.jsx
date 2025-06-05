import React from 'react';

      const Badge = ({ children, className = '' }) => {
        return (
          <span className={`px-2 py-1 rounded-full border text-xs font-medium ${className}`}>
            {children}
          </span>
        );
      };

      export default Badge;