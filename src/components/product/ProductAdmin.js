import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productApi.js';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ProductDetailModal from './ProductDetailModal'; // Import modal component

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(searchTerm ? { name: searchTerm } : {});
        setProducts(response.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xoá sản phẩm này?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
        alert("Xoá thành công");
      } catch (err) {
        alert("Lỗi khi xoá sản phẩm");
      }
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/aproducts/new')}
          className="bg-blue-600 hover:bg-blue-700 rounded-sm text-white px-4 py-2 flex items-center"
        >
          Thêm sản phẩm
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-sm overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Hình ảnh</th>
              <th className="py-3 px-4 text-left">Tên sản phẩm</th>
              <th className="py-3 px-4 text-left">Giá</th>
              <th className="py-3 px-4 text-left">Số lượng</th>
              <th className="py-3 px-4 text-left">Danh mục</th>
              <th className="py-3 px-4 text-left">Mô tả</th>
              <th className="py-3 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  Không tìm thấy sản phẩm
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const imgUrl = `http://localhost:3000/${product.imgUrl}`; 
                return (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <img
                        src={imgUrl}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-4 px-4 font-medium">{product.name}</td>
                    <td className="py-4 px-4">{product.price.toLocaleString()} VND</td>
                    <td className="py-4 px-4">{product.quantity}</td>
                    <td className="py-4 px-4">{product.category?.name || 'Chưa phân loại'}</td>
                    <td className="py-4 px-4 max-w-xs truncate" title={product.description}>
                      {product.description || 'Không có mô tả'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleViewProduct(product)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Xem chi tiết"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        
                        <Link
                          to={`/aproducts/edit/${product._id}`}
                          className="text-green-600 hover:text-green-800"
                          title="Chỉnh sửa"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Xoá sản phẩm"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị chi tiết sản phẩm */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductAdmin;
