import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const staticCoupons = [
  {
    id: 1,
    code: "WELCOME20",
    value: 20,
    type: "percentage",
    minimumPurchase: 50,
    startDate: "2025-01-01",
    expirationDate: "2025-12-31",
    maxUsage: 100,
    maxUsagePerUser: 1,
    status: "active"
  },
  {
    id: 2,
    code: "SAVE50OFF",
    value: 50,
    type: "fixed",
    minimumPurchase: 100,
    startDate: "2025-01-15",
    expirationDate: "2025-02-15",
    maxUsage: null,
    maxUsagePerUser: 2,
    status: "active"
  },
  {
    id: 3,
    code: "SUMMER15",
    value: 15,
    type: "percentage",
    minimumPurchase: 30,
    startDate: "2025-06-01",
    expirationDate: "2025-08-31",
    maxUsage: 200,
    maxUsagePerUser: 1,
    status: "inactive"
  },
];

export default function CouponManagement() {
  const [coupons, setCoupons] = useState(staticCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    value: '',
    type: 'percentage',
    minimumPurchase: '0',
    startDate: '',
    expirationDate: '',
    maxUsage: '',
    maxUsagePerUser: '1',
    status: 'active'
  });

  const handleOpenModal = (coupon = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        value: coupon.value.toString(),
        type: coupon.type,
        minimumPurchase: coupon.minimumPurchase.toString(),
        startDate: coupon.startDate,
        expirationDate: coupon.expirationDate,
        maxUsage: coupon.maxUsage ? coupon.maxUsage.toString() : '',
        maxUsagePerUser: coupon.maxUsagePerUser.toString(),
        status: coupon.status
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: '',
        value: '',
        type: 'percentage',
        minimumPurchase: '0',
        startDate: '',
        expirationDate: '',
        maxUsage: '',
        maxUsagePerUser: '1',
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
    setFormData({
      code: '',
      value: '',
      type: 'percentage',
      minimumPurchase: '0',
      startDate: '',
      expirationDate: '',
      maxUsage: '',
      maxUsagePerUser: '1',
      status: 'active'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.code.length < 6 || formData.code.length > 20) {
      alert('Coupon code must be between 6 and 20 characters');
      return;
    }
    
    if (formData.type === 'percentage' && parseFloat(formData.value) > 100) {
      alert('Percentage value cannot exceed 100%');
      return;
    }
    
    if (new Date(formData.expirationDate) <= new Date(formData.startDate)) {
      alert('Expiration date must be after start date');
      return;
    }
    
    if (editingCoupon) {
      // Update coupon
      setCoupons(coupons.map(c => 
        c.id === editingCoupon.id 
          ? { 
              ...editingCoupon, 
              ...formData, 
              value: parseFloat(formData.value),
              minimumPurchase: parseFloat(formData.minimumPurchase),
              maxUsage: formData.maxUsage ? parseInt(formData.maxUsage) : null,
              maxUsagePerUser: parseInt(formData.maxUsagePerUser)
            }
          : c
      ));
    } else {
      // Create new coupon
      const newCoupon = {
        id: coupons.length + 1,
        ...formData,
        value: parseFloat(formData.value),
        minimumPurchase: parseFloat(formData.minimumPurchase),
        maxUsage: formData.maxUsage ? parseInt(formData.maxUsage) : null,
        maxUsagePerUser: parseInt(formData.maxUsagePerUser)
      };
      setCoupons([...coupons, newCoupon]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  return (
    <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-playfair text-gray-900">
          Coupon Management
        </h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-brandRed text-white rounded-lg hover:bg-hoverBrandRed transition-colors duration-300 font-montserrat text-sm font-medium"
        >
          <Plus size={18} />
          Add New Coupon
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Code</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Value</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Min Purchase</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Expires</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Max Usage</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <span className="font-montserrat font-semibold text-gray-900">{coupon.code}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-900">
                    {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-montserrat font-medium bg-blue-100 text-blue-700 capitalize">
                    {coupon.type}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-700">${coupon.minimumPurchase}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-600 text-sm">{coupon.expirationDate}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-700">
                    {coupon.maxUsage ? coupon.maxUsage : '∞'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-montserrat font-medium ${
                    coupon.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(coupon)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold font-playfair text-gray-900">
                {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                  Coupon Code (6-20 characters)
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                  minLength={6}
                  maxLength={20}
                  required
                />
                <p className="mt-1 text-xs font-montserrat text-gray-500">
                  {formData.code.length}/20 characters
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                    Discount Value {formData.type === 'percentage' && '(Max 100%)'}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={formData.type === 'percentage' ? 100 : undefined}
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                    Discount Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                    required
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                  Minimum Purchase ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.minimumPurchase}
                  onChange={(e) => setFormData({ ...formData, minimumPurchase: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                    Max Usage (Optional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxUsage}
                    onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                    placeholder="Leave empty for unlimited"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                    Max Usage Per User
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxUsagePerUser}
                    onChange={(e) => setFormData({ ...formData, maxUsagePerUser: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={formData.expirationDate}
                    min={formData.startDate || undefined}
                    onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-montserrat"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brandRed text-white rounded-lg hover:bg-hoverBrandRed transition-colors font-montserrat"
                >
                  {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

