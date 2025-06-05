import React from 'react';
      import { AnimatePresence } from 'framer-motion';
      import Sidebar from '@/components/organisms/Sidebar';
      import IconButton from '@/components/atoms/IconButton';
      import ViewToggle from '@/components/molecules/ViewToggle';

      const DashboardLayout = ({
        sidebarOpen,
        setSidebarOpen,
        isMobile,
        children,
        handleViewToggle,
        handleSettingsClick
      }) => {
        return (
          <div className="min-h-screen bg-surface-50 flex">
            <AnimatePresence>
              {sidebarOpen && (
                <Sidebar isOpen={sidebarOpen} isMobile={isMobile} onClose={() => setSidebarOpen(false)} />
              )}
            </AnimatePresence>

            {isMobile && sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div className="flex-1 flex flex-col min-h-screen">
              <header className="bg-white border-b border-surface-200 px-4 lg:px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <IconButton
                      iconName="Menu"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="p-2"
                    />

                    <ViewToggle activeView="list" onViewToggle={handleViewToggle} />
                  </div>

                  <IconButton
                    iconName="Settings"
                    onClick={handleSettingsClick}
                    className="p-2"
                  />
                </div>
              </header>

              <main className="flex-1 p-4 lg:p-6">
                {children}
              </main>
            </div>
          </div>
        );
      };

      export default DashboardLayout;