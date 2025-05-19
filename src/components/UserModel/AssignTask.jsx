import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AssignTask = ({ setAssignTask, assignTask }) => {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    task: '',
    assignedDate: today,
    dueDate: '',
    assignedBy: user.username,
    priority: '',
    status: '',
  });
  
  
  const [errors, setErrors] = useState({});
  const taskFormRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const newErrors = {};
    if (!formData.task) newErrors.task = 'Task is required';
    if (!formData.assignedBy) newErrors.assignedBy = 'Assigned By is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.status) newErrors.status = 'Status is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Handle task assignment logic here
      console.log('Task Assigned:', formData);
      toast.success("Task assigned successfully")
      setAssignTask(false); // Close the modal after successful assignment
    }
  };

  // Close modal if clicked outside the form
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (taskFormRef.current && !taskFormRef.current.contains(event.target)) {
        setAssignTask(false); // Close the modal if click is outside
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setAssignTask]);

  return (
    <>
      {assignTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 bg-opacity-50 z-50">
          <div ref={taskFormRef} className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Assign New Task</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="task" className="block text-sm font-medium text-gray-700">
                  Task
                </label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.task && <p className="text-red-500 text-sm">{errors.task}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="assignedDate" className="block text-sm font-medium text-gray-700">
                  Assigned Date
                </label>
                <input
                  type="date"
                  id="assignedDate"
                  name="assignedDate"
                  value={formData.assignedDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="assignedBy" className="block text-sm font-medium text-gray-700">
                  Assigned By
                </label>
                <input
                  type="text"
                  id="assignedBy"
                  name="assignedBy"
                  value={formData.assignedBy}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.assignedBy && <p className="text-red-500 text-sm">{errors.assignedBy}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setAssignTask(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignTask;
