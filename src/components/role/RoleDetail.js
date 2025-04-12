import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoleById, deleteRole } from '../../services/roleApi';
import { toast } from 'react-toastify';
import Navigation_adm from '../Navigation_adm';
const RoleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        setLoading(true);
        const response = await getRoleById(id);
        setRole(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to load role details');
      }
    };

    fetchRole();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(id);
        toast.success('Role deleted successfully');
        navigate('/roles');
      } catch (err) {
        toast.error('Failed to delete role');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading role details...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!role) return <div className="text-center py-8">Role not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation_adm />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{role.name}</h1>
            <span className={`px-2 py-1 text-xs rounded-full ${role.isDelete ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {role.isDelete ? 'Deleted' : 'Active'}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600">
              {role.description || 'No description available.'}
            </p>
          </div>

        
          
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;