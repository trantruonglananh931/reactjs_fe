import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, deleteCategory } from '../../services/categoryApi';
import { toast } from 'react-toastify';
import {
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await getCategoryById(id);
        setCategory(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to load category details');
      }
    };

    fetchCategory();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        toast.success('Category deleted successfully');
        navigate('/categories');
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading category details...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!category) return <div className="text-center py-8">Category not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container rounded-sm mx-auto px-4 py-8">
        <div className="bg-white rounded-sm shadow-md p-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
            <span className="text-sm text-gray-500">Slug: {category.slug}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600">
              {category.description || 'No description available.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;