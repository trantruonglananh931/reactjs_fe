import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom'
function AdminPage() {
  const { currentUser, logout } = useAuth();
     const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Trang Quản Trị</h1>
          
          <div className="mb-6">
            <p className="text-lg">Xin chào, <span className="font-semibold">{currentUser?.fullName}</span>!</p>
            <p className="text-gray-600">Bạn đang đăng nhập với quyền: <span className="font-medium text-indigo-600">{currentUser?.role}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Quản lý người dùng */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-3">Quản lý người dùng</h3>
              <p className="text-gray-600 mb-4">Xem, thêm, sửa, xóa người dùng trong hệ thống</p>
              <button 
                onClick={() => navigate('/admin/users')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Truy cập
              </button>
            </div>

            {/* Card Thống kê */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-3">Thống kê hệ thống</h3>
              <p className="text-gray-600 mb-4">Xem các báo cáo và thống kê hoạt động</p>
              <button 
                onClick={() => navigate('/admin/stats')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Truy cập
              </button>
            </div>

            {/* Card Cài đặt */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-3">Cài đặt hệ thống</h3>
              <p className="text-gray-600 mb-4">Cấu hình các thông số hệ thống</p>
              <button 
                onClick={() => navigate('/admin/settings')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Truy cập
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Công cụ nhanh</h2>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Tạo người dùng mới
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Xuất báo cáo
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Xóa dữ liệu test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;