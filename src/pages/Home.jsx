import { useState, useEffect } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion, AnimatePresence } from 'framer-motion'

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleViewToggle = (view) => {
    // Placeholder functionality for future features
    if (view === 'calendar') {
      alert('Calendar view coming soon!')
    } else if (view === 'board') {
      alert('Board view coming soon!')
    }
  }

  const handleSettingsClick = () => {
    alert('Settings panel coming soon!')
  }

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
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
                <h1 className="text-xl font-semibold text-surface-900">TaskFlow</h1>
              </div>
            </div>
            
            <nav className="p-4">
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg">
                  <ApperIcon name="List" className="w-4 h-4" />
                  All Tasks
                  <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">12</span>
                </button>
                
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  Work Projects
                  <span className="ml-auto text-xs text-surface-400">8</span>
                </button>
                
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Personal
                  <span className="ml-auto text-xs text-surface-400">4</span>
                </button>
                
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-surface-600 hover:bg-surface-100 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Learning
                  <span className="ml-auto text-xs text-surface-400">0</span>
                </button>
              </div>
              
              <button className="w-full mt-6 flex items-center gap-3 px-3 py-2 text-sm text-surface-500 hover:text-surface-700 transition-colors">
                <ApperIcon name="Plus" className="w-4 h-4" />
                Add List
              </button>
            </nav>
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-surface-100 rounded-lg p-4">
                <h3 className="text-sm font-medium text-surface-700 mb-2">Productivity Insights</h3>
                <p className="text-xs text-surface-500">Your productivity insights will appear here</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-surface-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors"
              >
                <ApperIcon name="Menu" className="w-5 h-5" />
              </button>
              
              <div className="hidden sm:flex items-center gap-2 bg-surface-100 rounded-lg p-1">
                <button className="px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md">
                  List
                </button>
                <button 
                  onClick={() => handleViewToggle('calendar')}
                  className="px-3 py-1.5 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors"
                >
                  Calendar
                </button>
                <button 
                  onClick={() => handleViewToggle('board')}
                  className="px-3 py-1.5 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors"
                >
                  Board
                </button>
              </div>
            </div>
            
            <button
              onClick={handleSettingsClick}
              className="p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors"
            >
              <ApperIcon name="Settings" className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Feature */}
        <main className="flex-1 p-4 lg:p-6">
          <MainFeature />
        </main>
      </div>
    </div>
  )
}

export default Home