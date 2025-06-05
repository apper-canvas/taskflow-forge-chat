import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import Text from '@/components/atoms/Text';
      import ListMenuItem from '@/components/molecules/ListMenuItem';

      const Sidebar = ({ isOpen, isMobile, onClose }) => {
        return (
          <motion.aside
            initial={{ x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`
              fixed lg:relative top-0 left-0 h-full w-280 lg:w-72
              bg-white border-r border-surface-200 z-30
              ${isMobile ? 'shadow-xl' : ''}
            `}
          >
            <div className="p-6 border-b border-surface-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
                </div>
                <Text variant="h1">TaskFlow</Text>
              </div>
            </div>

            <nav className="p-4">
              <div className="space-y-2">
                <ListMenuItem name="All Tasks" count={12} iconName="List" isActive />
                <ListMenuItem name="Work Projects" count={8} color="#EF4444" /> {/* Red-500 */}
                <ListMenuItem name="Personal" count={4} color="#3B82F6" /> {/* Blue-500 */}
                <ListMenuItem name="Learning" count={0} color="#22C55E" /> {/* Green-500 */}
              </div>

              <ListMenuItem name="Add List" iconName="Plus" isAddButton className="mt-6" />
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-surface-100 rounded-lg p-4">
                <Text variant="h4" className="mb-2">Productivity Insights</Text>
                <Text variant="small">Your productivity insights will appear here</Text>
              </div>
            </div>
          </motion.aside>
        );
      };

      export default Sidebar;