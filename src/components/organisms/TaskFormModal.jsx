import React from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import FormField from '@/components/molecules/FormField';
      import Button from '@/components/atoms/Button';

      const TaskFormModal = ({
        isOpen,
        onClose,
        formData,
        setFormData,
        handleSubmit,
        editingTask,
        lists
      }) => {
        if (!isOpen) return null;

        const priorityOptions = [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ];

        const listOptions = lists.map(list => ({
          value: list.id,
          label: list.name
        }));

        return (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={onClose}
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
                      <FormField
                        label="Title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter task title..."
                        required
                        autoFocus
                      />

                      <FormField
                        label="Description"
                        type="textarea"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Add description..."
                        rows="3"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          label="Priority"
                          type="select"
                          value={formData.priority}
                          onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                          options={priorityOptions}
                        />

                        <FormField
                          label="List"
                          type="select"
                          value={formData.listId}
                          onChange={(e) => setFormData(prev => ({ ...prev, listId: e.target.value }))}
                          options={listOptions}
                        />
                      </div>

                      <FormField
                        label="Due Date"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      />
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2"
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 px-4 py-2"
                        variant="primary"
                      >
                        {editingTask ? 'Update' : 'Create'}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };

      export default TaskFormModal;