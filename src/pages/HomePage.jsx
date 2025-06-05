import { useState, useEffect, useCallback } from 'react';
      import { AnimatePresence, motion } from 'framer-motion';
      import { toast } from 'react-toastify';
      import ApperIcon from '@/components/ApperIcon';
      import taskService from '@/services/api/taskService';
      import listService from '@/services/api/listService';
      import DashboardLayout from '@/components/templates/DashboardLayout';
      import SearchInput from '@/components/molecules/SearchInput';
      import FilterGroup from '@/components/molecules/FilterGroup';
      import Button from '@/components/atoms/Button';
      import Text from '@/components/atoms/Text';
      import TaskCard from '@/components/molecules/TaskCard';
      import TaskFormModal from '@/components/organisms/TaskFormModal';

      const HomePage = () => {
        const [sidebarOpen, setSidebarOpen] = useState(true);
        const [isMobile, setIsMobile] = useState(false);

        const [tasks, setTasks] = useState([]);
        const [lists, setLists] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [editingTask, setEditingTask] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');
        const [selectedFilter, setSelectedFilter] = useState('all');
        const [selectedPriority, setSelectedPriority] = useState('all');
        const [formData, setFormData] = useState({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: '',
          listId: ''
        });

        useEffect(() => {
          const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
              setSidebarOpen(false);
            }
          };

          checkMobile();
          window.addEventListener('resize', checkMobile);
          return () => window.removeEventListener('resize', checkMobile);
        }, []);

        const loadData = useCallback(async () => {
          setLoading(true);
          try {
            const [tasksResult, listsResult] = await Promise.all([
              taskService.getAll(),
              listService.getAll()
            ]);
            setTasks(tasksResult || []);
            setLists(listsResult || []);
            if (listsResult?.length > 0) {
              setFormData(prev => ({ ...prev, listId: listsResult[0].id }));
            }
          } catch (err) {
            setError(err.message);
            toast.error('Failed to load data');
          } finally {
            setLoading(false);
          }
        }, []);

        useEffect(() => {
          loadData();
        }, [loadData]);

        const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.title.trim()) return;

          try {
            if (editingTask) {
              const updatedTask = await taskService.update(editingTask.id, formData);
              setTasks(prev => prev.map(task =>
                task.id === editingTask.id ? updatedTask : task
              ));
              toast.success('Task updated successfully!');
            } else {
              const newTask = await taskService.create({
                ...formData,
                status: 'pending'
              });
              setTasks(prev => [newTask, ...prev]);
              toast.success('Task created successfully!');
            }

            closeModal();
          } catch (err) {
            toast.error(editingTask ? 'Failed to update task' : 'Failed to create task');
          }
        };

        const toggleTaskStatus = async (taskId) => {
          const task = tasks.find(t => t.id === taskId);
          if (!task) return;

          try {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            const updatedTask = await taskService.update(taskId, { status: newStatus });

            setTasks(prev => prev.map(t =>
              t.id === taskId ? updatedTask : t
            ));

            toast.success(newStatus === 'completed' ? 'Task completed! 🎉' : 'Task reopened');
          } catch (err) {
            toast.error('Failed to update task status');
          }
        };

        const deleteTask = async (taskId) => {
          if (!window.confirm('Are you sure you want to delete this task?')) return;

          try {
            await taskService.delete(taskId);
            setTasks(prev => prev.filter(task => task.id !== taskId));
            toast.success('Task deleted successfully!');
          } catch (err) {
            toast.error('Failed to delete task');
          }
        };

        const openModal = (task = null) => {
          if (task) {
            setEditingTask(task);
            setFormData({
              title: task.title,
              description: task.description || '',
              priority: task.priority,
              dueDate: task.dueDate || '',
              listId: task.listId
            });
          } else {
            setEditingTask(null);
            setFormData({
              title: '',
              description: '',
              priority: 'medium',
              dueDate: '',
              listId: lists[0]?.id || ''
            });
          }
          setIsModalOpen(true);
        };

        const closeModal = () => {
          setIsModalOpen(false);
          setEditingTask(null);
          setFormData({
            title: '',
            description: '',
            priority: 'medium',
            dueDate: '',
            listId: lists[0]?.id || ''
          });
        };

        const filteredTasks = tasks.filter(task => {
          const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 task.description?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = selectedFilter === 'all' ||
                                 (selectedFilter === 'active' && task.status === 'pending') ||
                                 (selectedFilter === 'completed' && task.status === 'completed');
          const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;

          return matchesSearch && matchesFilter && matchesPriority;
        });

        const getListById = (listId) => lists.find(list => list.id === listId);

        const handleViewToggle = (view) => {
          // Placeholder functionality for future features
          if (view === 'calendar') {
            alert('Calendar view coming soon!');
          } else if (view === 'board') {
            alert('Board view coming soon!');
          }
        };

        const handleSettingsClick = () => {
          alert('Settings panel coming soon!');
        };

        if (loading) {
          return (
            <DashboardLayout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isMobile={isMobile}
              handleViewToggle={handleViewToggle}
              handleSettingsClick={handleSettingsClick}
            >
              <div className="max-w-4xl mx-auto">
                <div className="animate-pulse space-y-6">
                  <div className="h-12 bg-surface-200 rounded-lg"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-24 bg-surface-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            </DashboardLayout>
          );
        }

        if (error) {
          return (
            <DashboardLayout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isMobile={isMobile}
              handleViewToggle={handleViewToggle}
              handleSettingsClick={handleSettingsClick}
            >
              <div className="max-w-4xl mx-auto text-center py-12">
                <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <Text variant="h3" className="mb-2">Something went wrong</Text>
                <Text variant="p" className="mb-4">{error}</Text>
                <Button
                  onClick={loadData}
                  className="px-4 py-2 rounded-lg"
                  variant="primary"
                >
                  Try Again
                </Button>
              </div>
            </DashboardLayout>
          );
        }

        return (
          <DashboardLayout
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
            handleViewToggle={handleViewToggle}
            handleSettingsClick={handleSettingsClick}
          >
            <div className="max-w-4xl mx-auto">
              {/* Search and Filters */}
              <div className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <SearchInput searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />
                  <Button
                    onClick={() => openModal()}
                    className="px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
                    variant="primary"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    Add Task
                  </Button>
                </div>

                <FilterGroup
                  selectedFilter={selectedFilter}
                  onFilterChange={(e) => setSelectedFilter(e.target.value)}
                  selectedPriority={selectedPriority}
                  onPriorityChange={(e) => setSelectedPriority(e.target.value)}
                  onClearFilters={() => {
                    setSearchTerm('');
                    setSelectedFilter('all');
                    setSelectedPriority('all');
                  }}
                  showClearButton={searchTerm || selectedFilter !== 'all' || selectedPriority !== 'all'}
                />
              </div>

              {/* Task List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredTasks.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ApperIcon name="CheckCircle" className="w-8 h-8 text-surface-400" />
                      </div>
                      <Text variant="h3" className="mb-2">
                        {searchTerm || selectedFilter !== 'all' || selectedPriority !== 'all'
                          ? 'No tasks match your filters'
                          : 'No tasks yet'
                        }
                      </Text>
                      <Text variant="p" className="mb-4">
                        {searchTerm || selectedFilter !== 'all' || selectedPriority !== 'all'
                          ? 'Try adjusting your search or filters'
                          : 'Create your first task to get started'
                        }
                      </Text>
                      {(!searchTerm && selectedFilter === 'all' && selectedPriority === 'all') && (
                        <Button
                          onClick={() => openModal()}
                          className="px-6 py-3 rounded-lg"
                          variant="primary"
                        >
                          Create Task
                        </Button>
                      )}
                    </motion.div>
                  ) : (
                    filteredTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggleStatus={toggleTaskStatus}
                        onEdit={openModal}
                        onDelete={deleteTask}
                        getListById={getListById}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>

              <TaskFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                editingTask={editingTask}
                lists={lists}
              />

              {/* Floating Action Button - Mobile */}
              <Button
                onClick={() => openModal()}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center lg:hidden"
                variant="primary"
              >
                <ApperIcon name="Plus" className="w-6 h-6" />
              </Button>
            </div>
          </DashboardLayout>
        );
      };

      export default HomePage;