import React from 'react';

      const Button = ({ children, onClick, className = '', type = 'button', variant = 'primary', ...props }) => {
        const baseStyle = 'transition-colors';
        let variantStyle = '';

        switch (variant) {
          case 'primary':
            variantStyle = 'bg-primary text-white hover:bg-primary-dark';
            break;
          case 'secondary':
            variantStyle = 'bg-surface-100 text-surface-700 border border-surface-300 hover:bg-surface-50';
            break;
          case 'ghost':
            variantStyle = 'text-surface-600 hover:bg-surface-100';
            break;
          case 'danger-ghost':
            variantStyle = 'text-surface-400 hover:text-red-600 hover:bg-red-50';
            break;
          case 'icon-ghost':
            variantStyle = 'p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg';
            break;
          case 'toggle-active':
            variantStyle = 'px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md';
            break;
          case 'toggle-inactive':
            variantStyle = 'px-3 py-1.5 text-sm font-medium text-surface-600 hover:text-surface-900';
            break;
          case 'sidebar-active':
            variantStyle = 'text-primary bg-primary/10';
            break;
          case 'sidebar-inactive':
            variantStyle = 'text-surface-600 hover:bg-surface-100';
            break;
          case 'add-list':
            variantStyle = 'text-surface-500 hover:text-surface-700';
            break;
          case 'clear-filters':
            variantStyle = 'text-surface-600 hover:text-surface-900';
            break;
          case 'task-checkbox':
            variantStyle = 'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center';
            break;
          default:
            variantStyle = 'bg-primary text-white hover:bg-primary-dark';
        }

        return (
          <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variantStyle} ${className}`}
            {...props}
          >
            {children}
          </button>
        );
      };

      export default Button;