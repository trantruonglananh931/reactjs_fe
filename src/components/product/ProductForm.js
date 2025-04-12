import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../../services/api';
import Navigation_adm from '../Navigation_adm';
const ProductForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    category: '',
    imgURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real app, you would fetch categories from your backend
  useEffect(() => {
    // Mock categories - replace with actual API call
    setCategories([
      { _id: '1', name: 'Electronics' },
      { _id: '2', name: 'Clothing' },
      { _id: '3', name: 'Books' },
    ]);

    if (isEdit && id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await getProductById(id);
          const product = response.data;
          setFormData({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description || '',
            category: product.category?.name || '',
            imgURL: product.imgURL || ''
          });
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get token from storage
      if (!token) throw new Error('Authentication required');

      const productData = {
        name: formData.name,
        price: formData.price,
        quantity: formData.quantity,
        description: formData.description,
        category: formData.category,
        imgURL: formData.imgURL
      };

      if (isEdit) {
        await updateProduct(id, productData, token);
      } else {
        await createProduct(productData, token);
      }
      navigate('/products');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation_adm />
      <div className="product-form bg-white rounded-sm shadow-md m-4 p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-sm"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-sm"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-sm"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-sm"
                rows="3"
              ></textarea>
            </div>

            <div>
  <label className="block text-gray-700 mb-2">Tải ảnh lên</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full px-4 py-2 border rounded-sm"
      />
    </div>


            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-sm rounded hover:bg-blue-700"
              >
                {isEdit ? 'Update' : 'Add Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;