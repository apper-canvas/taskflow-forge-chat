import React from 'react';

      const Text = ({ children, variant, className = '' }) => {
        let textStyle = '';
        switch (variant) {
          case 'h1':
            textStyle = 'text-xl font-semibold text-surface-900';
            break;
          case 'h2':
            textStyle = 'text-xl font-semibold text-surface-900';
            break;
          case 'h3':
            textStyle = 'text-lg font-medium text-surface-900';
            break;
          case 'h4':
            textStyle = 'text-sm font-medium text-surface-700';
            break;
          case 'p':
            textStyle = 'text-surface-600';
            break;
          case 'small':
            textStyle = 'text-xs text-surface-500';
            break;
          case 'span':
            textStyle = 'text-surface-600'; // Default for span, can be overridden by className
            break;
          case 'list-count-primary':
            textStyle = 'ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full';
            break;
          case 'list-count-secondary':
            textStyle = 'ml-auto text-xs text-surface-400';
            break;
          default:
            textStyle = '';
        }

        const Tag = variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4' ? variant : (variant === 'p' ? 'p' : 'span');

        return (
          <Tag className={`${textStyle} ${className}`}>
            {children}
          </Tag>
        );
      };

      export default Text;