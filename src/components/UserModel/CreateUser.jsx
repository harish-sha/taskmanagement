import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const CreateUser = ({ setOpenCreateUser, openCreateUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    assignedTo: ''
  });
  
  const [errors, setErrors] = useState({});

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
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Handle user creation logic here
      console.log('User created:', formData);
      toast.success("New User created successfully")
      setOpenCreateUser(false); // Close the modal after successful creation
    }
  };

  const userFormRef = useRef()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userFormRef.current && !userFormRef.current.contains(event.target)) {
        setOpenCreateUser(false); // Close the modal if click is outside
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setOpenCreateUser]);
  
  return (
    <>
      {openCreateUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 bg-opacity-50 z-50">
          <div ref={userFormRef} className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Create New User</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                </label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select Role</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Assigned to
                </label>
                <select
                    id="assignedTo"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Assigned To</option>
                    <option value="manager 1">Manager 1</option>
                    <option value="manager 2">Manager 2</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setOpenCreateUser(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUser;
