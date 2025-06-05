import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import Text from '@/components/atoms/Text';

      const ListMenuItem = ({ name, count, color, iconName, onClick, isActive = false, isAddButton = false }) => {
        return (
          <Button
            onClick={onClick}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg"
            variant={isAddButton ? 'add-list' : (isActive ? 'sidebar-active' : 'sidebar-inactive')}
          >
            {iconName ? (
              <ApperIcon name={iconName} className="w-4 h-4" />
            ) : (
              color && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            )}
            <Text variant="span" className="font-medium">
              {name}
            </Text>
            {count !== undefined && (
              <Text variant={isActive ? 'list-count-primary' : 'list-count-secondary'}>
                {count}
              </Text>
            )}
          </Button>
        );
      };

      export default ListMenuItem;