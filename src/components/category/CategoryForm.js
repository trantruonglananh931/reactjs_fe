import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, getCategoryById, updateCategory } from '../../services/categoryApi';
import { toast } from 'react-toastify';
const CategoryForm = ({ isEdit = false }) => {
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
      const fetchCategory = async () => {
        try {
          setLoading(true);
          const response = await getCategoryById(id);
          const category = response.data;
          setFormData({
            name: category.name,
            description: category.description || ''
          });
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
          toast.error('Failed to load category data');
        }
      };
      fetchCategory();
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
        throw new Error('Category name is required');
      }

      const categoryData = {
        name: formData.name,
        description: formData.description
      };

      if (isEdit) {
        await updateCategory(id, categoryData);
        toast.success('Category updated successfully');
      } else {
        await createCategory(categoryData);
        toast.success('Category created successfully');
      }

      navigate('/categories');
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} category`);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading form...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            {isEdit ? 'Edit Category' : 'Add New Category'}
          </h1>

          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name *</label>
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
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
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

export default CategoryForm;