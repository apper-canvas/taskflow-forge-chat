import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Button from './Button';

      const IconButton = ({ iconName, onClick, className = '', iconClass = 'w-5 h-5', ...props }) => {
        return (
          <Button onClick={onClick} className={className} variant="icon-ghost" {...props}>
            <ApperIcon name={iconName} className={iconClass} />
          </Button>
        );
      };

      export default IconButton;