
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRole, getRoleById, updateRole } from '../../services/roleApi';
import { toast } from 'react-toastify';
const RoleForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      const fetchRole = async () => {
        try {
          setLoading(true);
          const response = await getRoleById(id);
          const role = response.data;
          setFormData({
            name: role.name,
            description: role.description || ''
          });
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
          toast.error('Failed to load role data');
        }
      };
      fetchRole();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        throw new Error('Role name is required');
      }

      const roleData = {
        name: formData.name,
        description: formData.description
      };

      if (isEdit) {
        await updateRole(id, roleData);
        toast.success('Role updated successfully');
      } else {
        await createRole(roleData);
        toast.success('Role created successfully');
      }

      navigate('/roles');
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} role`);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading form...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            {isEdit ? 'Edit Role' : 'Add New Role'}
          </h1>

          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Role Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/roles')}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                disabled={loading}
              >
                {isEdit ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default RoleForm;