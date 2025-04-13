import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoles } from '../../services/roleApi';
import { createUser, getUserById, updateUser } from '../../services/userApi';
import { toast } from 'react-toastify';

const UserForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
    role: '',
    avatarUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const rolesResponse = await getRoles();
        setRoles(rolesResponse.data || []);

        if (isEdit && id) {
          const userResponse = await getUserById(id);
          const user = userResponse.data;
          setFormData({
            username: user.username,
            password: '', 
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            address: user.address,
            role: user.role?._id || '',
            avatarUrl: user.avatarUrl || ''
          });
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to load form data');
      }
    };

    fetchData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);  
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatarUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (!formData.username.trim()) throw new Error('Username is required');
      if (!isEdit && !formData.password) throw new Error('Password is required');
      if (!formData.fullName.trim()) throw new Error('Full name is required');
      if (!formData.phone.trim()) throw new Error('Phone is required');
      if (!formData.address.trim()) throw new Error('Address is required');
      if (!formData.role) throw new Error('Role is required');
  
      const userData = new FormData();
      userData.append('username', formData.username);
      userData.append('email', formData.email);
      userData.append('fullName', formData.fullName);
      userData.append('phone', formData.phone);
      userData.append('address', formData.address);
      userData.append('role', formData.role);
  
      if (formData.password) {
        userData.append('password', formData.password);
      }
  
      if (avatarFile) {
        userData.append('avatarUrl', avatarFile);
      }
  
      if (isEdit) {
        await updateUser(id, userData);
        toast.success('User updated successfully');
      } else {
        await createUser(userData);
        toast.success('User created successfully');
      }
  
      navigate('/users');
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} user`);
      setLoading(false);
    }
  };
  
  if (loading) return <div className="text-center py-8">Loading form...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-sm shadow-md p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isEdit ? 'Edit User' : 'Add New User'}
          </h1>

          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isEdit} 
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {isEdit ? 'New Password (leave blank to keep current)' : 'Password *'}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required={!isEdit}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role *</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">Avatar</label>
                <input
                  type="file"
                  id="avatarUrl"
                  name="avatarUrl"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.avatarUrl && (
                  <div className="mt-2">
                    <img src={formData.avatarUrl} alt="Avatar preview" className="h-16 w-16 rounded-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-sm"
                disabled={loading}
              >
                {isEdit ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
