import React from 'react';
      import { motion } from 'framer-motion';
      import { format, isToday, parseISO, isPast } from 'date-fns';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import Badge from '@/components/atoms/Badge';
      import Text from '@/components/atoms/Text';

      const getPriorityColor = (priority) => {
        switch (priority) {
          case 'high': return 'bg-red-100 text-red-800 border-red-200';
          case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
          case 'low': return 'bg-gray-100 text-gray-600 border-gray-200';
          default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
      };

      const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return isPast(parseISO(dueDate)) && !isToday(parseISO(dueDate));
      };

      const TaskCard = ({ task, onToggleStatus, onEdit, onDelete, getListById }) => {
        const taskList = getListById(task.listId);
        const isTaskOverdue = isOverdue(task.dueDate);
        const isCompleted = task.status === 'completed';

        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              bg-white rounded-lg border border-surface-200 p-6 hover:shadow-card transition-all duration-200
              ${isCompleted ? 'opacity-75' : ''}
              group
            `}
          >
            <div className="flex items-start gap-4">
              <Button
                onClick={() => onToggleStatus(task.id)}
                variant="task-checkbox"
                className={`${isCompleted ? 'bg-secondary border-secondary' : 'border-surface-300 hover:border-primary'}`}
              >
                {isCompleted && (
                  <ApperIcon name="Check" className="w-4 h-4 text-white bounce-in" />
                )}
              </Button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <Text
                      variant="h3"
                      className={`mb-2 transition-all duration-200 ${isCompleted ? 'line-through text-surface-500' : 'text-surface-900'}`}
                    >
                      {task.title}
                    </Text>

                    {task.description && (
                      <Text
                        variant="p"
                        className={`text-sm mb-3 transition-all duration-200 ${isCompleted ? 'line-through text-surface-400' : 'text-surface-600'}`}
                      >
                        {task.description}
                      </Text>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)} Priority
                      </Badge>

                      {taskList && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: taskList.color }}
                          />
                          <Text variant="span">{taskList.name}</Text>
                        </div>
                      )}

                      {task.dueDate && (
                        <div className={`flex items-center gap-1 ${isTaskOverdue ? 'text-red-600' : 'text-surface-600'}`}>
                          <ApperIcon name="Calendar" className="w-3 h-3" />
                          <Text variant="span">
                            {isToday(parseISO(task.dueDate))
                              ? 'Today'
                              : format(parseISO(task.dueDate), 'MMM d')
                            }
                            {isTaskOverdue && ' (Overdue)'}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={() => onEdit(task)}
                      className="p-2"
                      variant="ghost"
                    >
                      <ApperIcon name="Edit" className="w-4 h-4 text-surface-400 hover:text-primary" />
                    </Button>
                    <Button
                      onClick={() => onDelete(task.id)}
                      className="p-2"
                      variant="ghost"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4 text-surface-400 hover:text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      };

      export default TaskCard;