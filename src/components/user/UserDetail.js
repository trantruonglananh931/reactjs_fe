import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, deleteUser } from '../../services/userApi';
import { toast } from 'react-toastify';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserById(id);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to load user details');
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully');
        navigate('/users');
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading user details...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!user) return <div className="text-center py-8">User not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-sm shadow-xl p-6 max-w-4xl mx-auto">
          {/* Avatar and User Info */}
          <div className="flex items-center space-x-6 mb-6">
            {user.avatarUrl ? (
              <img className="h-28 w-28 rounded-full border-2 border-gray-300" src={`http://localhost:3000/${user.avatarUrl}`} alt="User avatar" />
            ) : (
              <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-600">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">{user.fullName}</h1>
              <p className="text-lg text-gray-600">@{user.username}</p>
              <span className={`mt-2 inline-block px-4 py-2 text-xs rounded-full ${user.isDeleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {user.isDeleted ? 'Deleted' : 'Active'}
              </span>
            </div>
          </div>

          {/* Contact and Account Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-3">Contact Information</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Email:</span> {user.email || 'N/A'}</p>
                <p><span className="font-semibold">Phone:</span> {user.phone || 'N/A'}</p>
                <p><span className="font-semibold">Address:</span> {user.address || 'N/A'}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-3">Account Information</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Role:</span> {user.role?.name || 'N/A'}</p>
                <p><span className="font-semibold">Status:</span> {user.status ? 'Active' : 'Inactive'}</p>
                <p><span className="font-semibold">Login Count:</span> {user.loginCount || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
