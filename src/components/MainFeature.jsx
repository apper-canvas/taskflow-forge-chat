import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isPast, parseISO } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import taskService from '../services/api/taskService'
import listService from '../services/api/listService'

const MainFeature = () => {
  const [tasks, setTasks] = useState([])
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    listId: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [tasksResult, listsResult] = await Promise.all([
        taskService.getAll(),
        listService.getAll()
      ])
      setTasks(tasksResult || [])
      setLists(listsResult || [])
      if (listsResult?.length > 0) {
        setFormData(prev => ({ ...prev, listId: listsResult[0].id }))
      }
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.id, formData)
        setTasks(prev => prev.map(task => 
          task.id === editingTask.id ? updatedTask : task
        ))
        toast.success('Task updated successfully!')
      } else {
        const newTask = await taskService.create({
          ...formData,
          status: 'pending'
        })
        setTasks(prev => [newTask, ...prev])
        toast.success('Task created successfully!')
      }
      
      closeModal()
    } catch (err) {
      toast.error(editingTask ? 'Failed to update task' : 'Failed to create task')
    }
  }

  const toggleTaskStatus = async (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed'
      const updatedTask = await taskService.update(taskId, { status: newStatus })
      
      setTasks(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ))
      
      toast.success(newStatus === 'completed' ? 'Task completed! 🎉' : 'Task reopened')
    } catch (err) {
      toast.error('Failed to update task status')
    }
  }

  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
      toast.success('Task deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task)
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        dueDate: task.dueDate || '',
        listId: task.listId
      })
    } else {
      setEditingTask(null)
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        listId: lists[0]?.id || ''
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      listId: lists[0]?.id || ''
    })
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && task.status === 'pending') ||
                         (selectedFilter === 'completed' && task.status === 'completed')
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority
    
    return matchesSearch && matchesFilter && matchesPriority
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'low': return 'bg-gray-100 text-gray-600 border-gray-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getListById = (listId) => lists.find(list => list.id === listId)

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    return isPast(parseISO(dueDate)) && !isToday(parseISO(dueDate))
  }

  if (loading) {
    return (
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
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-surface-900 mb-2">Something went wrong</h3>
        <p className="text-surface-600 mb-4">{error}</p>
        <button
          onClick={loadData}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={() => openModal()}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 font-medium"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            Add Task
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {(searchTerm || selectedFilter !== 'all' || selectedPriority !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedFilter('all')
                setSelectedPriority('all')
              }}
              className="px-3 py-2 text-sm text-surface-600 hover:text-surface-900 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
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
              <h3 className="text-lg font-medium text-surface-900 mb-2">
                {searchTerm || selectedFilter !== 'all' || selectedPriority !== 'all' 
                  ? 'No tasks match your filters' 
                  : 'No tasks yet'
                }
              </h3>
              <p className="text-surface-600 mb-4">
                {searchTerm || selectedFilter !== 'all' || selectedPriority !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first task to get started'
                }
              </p>
              {(!searchTerm && selectedFilter === 'all' && selectedPriority === 'all') && (
                <button
                  onClick={() => openModal()}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Create Task
                </button>
              )}
            </motion.div>
          ) : (
            filteredTasks.map((task) => {
              const taskList = getListById(task.listId)
              const isTaskOverdue = isOverdue(task.dueDate)
              
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`
                    bg-white rounded-lg border border-surface-200 p-6 hover:shadow-card transition-all duration-200
                    ${task.status === 'completed' ? 'opacity-75' : ''}
                    group
                  `}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`
                        flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                        ${task.status === 'completed' 
                          ? 'bg-secondary border-secondary' 
                          : 'border-surface-300 hover:border-primary'
                        }
                      `}
                    >
                      {task.status === 'completed' && (
                        <ApperIcon name="Check" className="w-4 h-4 text-white bounce-in" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className={`
                            text-lg font-medium mb-2 transition-all duration-200
                            ${task.status === 'completed' 
                              ? 'line-through text-surface-500' 
                              : 'text-surface-900'
                            }
                          `}>
                            {task.title}
                          </h3>
                          
                          {task.description && (
                            <p className={`
                              text-sm mb-3 transition-all duration-200
                              ${task.status === 'completed' 
                                ? 'line-through text-surface-400' 
                                : 'text-surface-600'
                              }
                            `}>
                              {task.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className={`px-2 py-1 rounded-full border text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)} Priority
                            </span>
                            
                            {taskList && (
                              <div className="flex items-center gap-1">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: taskList.color }}
                                />
                                <span className="text-surface-600">{taskList.name}</span>
                              </div>
                            )}
                            
                            {task.dueDate && (
                              <div className={`flex items-center gap-1 ${isTaskOverdue ? 'text-red-600' : 'text-surface-600'}`}>
                                <ApperIcon name="Calendar" className="w-3 h-3" />
                                <span>
                                  {isToday(parseISO(task.dueDate)) 
                                    ? 'Today' 
                                    : format(parseISO(task.dueDate), 'MMM d')
                                  }
                                  {isTaskOverdue && ' (Overdue)'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openModal(task)}
                            className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <ApperIcon name="Edit" className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 text-surface-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      {/* Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl w-full max-w-md glass-morphism"
            >
              <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-xl font-semibold text-surface-900 mb-6">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter task title..."
                      required
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows="3"
                      placeholder="Add description..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        List
                      </label>
                      <select
                        value={formData.listId}
                        onChange={(e) => setFormData(prev => ({ ...prev, listId: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {lists?.map(list => (
                          <option key={list.id} value={list.id}>
                            {list.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 text-surface-700 border border-surface-300 rounded-lg hover:bg-surface-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    {editingTask ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button - Mobile */}
      <button
        onClick={() => openModal()}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-200 flex items-center justify-center lg:hidden"
      >
        <ApperIcon name="Plus" className="w-6 h-6" />
      </button>
    </div>
  )
}

export default MainFeature