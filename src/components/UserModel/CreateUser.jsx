import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import UniversalButton from '../common/UniversalButton';
import InputField from '../common/InputField';
import AnimatedDropdown from '../common/AnimatedDropdown';

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

  const handleDropdownChange = (name, selectedValue) => {
  setFormData((prev) => ({
    ...prev,
    [name]: selectedValue === "no-selection" ? "" : selectedValue,
  }));
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
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Create New User</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <InputField
                  label="Username"
                  type="text"
                  id="username"
                  name="username"
                  placeholder='Enter username'
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              <div className="mb-4">
                <InputField
                  label="Email"
                  type="email"
                  id="email"
                  placeholder='Enter email'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <InputField
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  placeholder='password'
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="mb-6">
                <AnimatedDropdown
                id="role"
                name="role"
                label="Role"
                value={formData.role}
                placeholder="Select Role"
                options={[
                  { label: "Manager", value: "manager" },
                  { label: "User", value: "user" },
                ]}
                onChange={handleDropdownChange}
              />
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>

              <div className="mb-4">
              <AnimatedDropdown
                id="assignedTo"
                name="assignedTo"
                label="Assigned to"
                value={formData.assignedTo}
                placeholder="Select Assigned to..."
                options={[
                  { label: "manager 1", value: "manager 1" },
                  { label: "manager 1", value: "manager 1" },
                ]}
                onChange={handleDropdownChange}
              />
              {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
            </div>

              <div className="flex justify-between">
                <UniversalButton
                  label="Cancel"
                  type="button"
                  onClick={() => setOpenCreateUser(false)}
                  variant="danger"
                />
                <UniversalButton
                  label="Create User"
                  type="submit"
                  variant="primary"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUser;
