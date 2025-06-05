import React from 'react';
      import Button from '@/components/atoms/Button';

      const ViewToggle = ({ activeView, onViewToggle }) => {
        return (
          <div className="hidden sm:flex items-center gap-2 bg-surface-100 rounded-lg p-1">
            <Button
              onClick={() => onViewToggle('list')}
              variant={activeView === 'list' ? 'toggle-active' : 'toggle-inactive'}
            >
              List
            </Button>
            <Button
              onClick={() => onViewToggle('calendar')}
              variant={activeView === 'calendar' ? 'toggle-active' : 'toggle-inactive'}
            >
              Calendar
            </Button>
            <Button
              onClick={() => onViewToggle('board')}
              variant={activeView === 'board' ? 'toggle-active' : 'toggle-inactive'}
            >
              Board
            </Button>
          </div>
        );
      };

      export default ViewToggle;