import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import UniversalButton from '../common/UniversalButton';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import InputField from '../common/InputField';
import AnimatedDropdown from '../common/AnimatedDropdown';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

const AssignTask = ({ setAssignTask, assignTask }) => {
  const { user } = useAuth();
  const taskFormRef = useRef();

  const [formData, setFormData] = useState({
    task: '',
    assignedDate: new Date(),
    dueDate: null,
    assignedBy: user.username,
    assignedTo: '',
    priority: '',
    status: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const assignedDate = formData.assignedDate;
    const dueDate = formData.dueDate;

    if (!formData.task) newErrors.task = 'Task is required';
    if (!formData.assignedBy) newErrors.assignedBy = 'Assigned By is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assigned To is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.status) newErrors.status = 'Status is required';

    if (!formData.assignedDate) {
      newErrors.assignedDate = 'Assigned Date is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due Date is required';
    } else if (dueDate <= assignedDate) {
      newErrors.dueDate = 'Due Date must be after Assigned Date';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      toast.success('Task assigned successfully');
      console.log('Task Assigned:', formData);
      setAssignTask(false); // Close modal
    }
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (taskFormRef.current && !taskFormRef.current.contains(event.target)) {
        setAssignTask(false);
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 bg-opacity-50 p-4 z-[999]">
        <div className="bg-white rounded-lg shadow-lg max-w-md p-6 max-h-[90vh] overflow-y-auto  invisible-scrollbar">
        
         <div className='relative mb-6'>
            <div className='flex justify-between items-center'>
              <h2 className="text-2xl font-semibold">Assign New Task</h2>
              <IconButton
                onClick={() => setAssignTask(false)}
                sx={{
                  color: 'gray',
                }}
                aria-label="close drawer"
                size="large"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputField
                label="Task"
                type="text"
                id="task"
                name="task"
                placeholder="Task"
                value={formData.task}
                onChange={handleChange}
              />
              {errors.task && <p className="text-red-500 text-sm">{errors.task}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="assignedDate" className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Date
              </label>
              <Calendar
                id="assignedDate"
                name="assignedDate"
                value={formData.assignedDate}
                onChange={handleChange}
                showIcon
                dateFormat="dd/mm/yy"
                className="w-full"
                style={{ height: '2.1rem', fontSize: '0.875rem' }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <Calendar
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                showIcon
                dateFormat="dd/mm/yy"
                minDate={formData.assignedDate}
                className="w-full"
                style={{ height: '2.1rem', fontSize: '0.875rem' }}
              />
              {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
            </div>

            <div className="mb-4">
              <InputField
                label="Assigned By"
                placeholder="Assigned By"
                id="assignedBy"
                name="assignedBy"
                value={formData.assignedBy}
                onChange={(e, selectedValue) => handleChange(selectedValue)}

              />
              {errors.assignedBy && <p className="text-red-500 text-sm">{errors.assignedBy}</p>}
            </div>

            <div className="mb-4">
              <InputField
                label="Assigned To"
                placeholder='assignedTo'
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
              />
              {errors.assignedTo && <p className="text-red-500 text-sm">{errors.assignedTo}</p>}
            </div>

            <div className="mb-4">
              <AnimatedDropdown
                id="priority"
                name="priority"
                label="Priority"
                options={[
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" },
                ]}
                value={formData.priority}
                placeholder="Select Priority..."
                onChange={(selectedValue) =>
                setFormData((prev) => ({
                  ...prev,
                  priority: selectedValue,
                }))
              }
              />
              {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
            </div>

            <div className="mb-4">
            <AnimatedDropdown
              id="status"
              name="status"
              label="Status"
              value={formData.status}
              placeholder="Select Status..."
              options={[
                { label: "Pending", value: "pending" },
                { label: "In Progress", value: "in-progress" },
                { label: "Completed", value: "completed" },
              ]}
              onChange={(selectedValue) =>
                setFormData((prev) => ({
                  ...prev,
                  status: selectedValue,
                }))
              }
            />
              {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
            </div>


            <div className="flex justify-between">
              {/* <UniversalButton label="Cancel" onClick={() => setAssignTask(false)} variant="danger" /> */}
              <UniversalButton label="Assign Task" variant="primary" type="submit" />
            </div>
          </form>
        </div>
      </div>
    )}
  </>
);

};

export default AssignTask;
