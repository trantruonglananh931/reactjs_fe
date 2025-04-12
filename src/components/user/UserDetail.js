import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, deleteUser } from '../../services/userApi';
import { toast } from 'react-toastify';
import Navigation_adm from '../Navigation_adm';
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
      <Navigation_adm />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-6 mb-6">
            {user.avatarUrl ? (
              <img className="h-24 w-24 rounded-full" src={user.avatarUrl} alt="User avatar" />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              <p className="text-gray-600">@{user.username}</p>
              <span className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${user.isDeleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {user.isDeleted ? 'Deleted' : 'Active'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Contact Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {user.email || 'N/A'}</p>
                <p><span className="font-medium">Phone:</span> {user.phone}</p>
                <p><span className="font-medium">Address:</span> {user.address}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Account Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Role:</span> {user.role?.name || 'N/A'}</p>
                <p><span className="font-medium">Status:</span> {user.status ? 'Active' : 'Inactive'}</p>
                <p><span className="font-medium">Login Count:</span> {user.loginCount}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            {!user.isDeleted && (
              <>
                <button
                  onClick={() => navigate(`/users/edit/${user._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                >
                  Delete User
                </button>
              </>
            )}
            <button
              onClick={() => navigate('/users')}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;