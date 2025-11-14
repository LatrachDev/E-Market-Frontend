import React from 'react';
import { Eye } from 'lucide-react';

const staticOrders = [
  {
    orderId: "ORD-001",
    clientName: "John Doe",
    productName: "Modern Ceramic Computer",
    quantity: 2,
    amount: 70.74,
    date: "2025-01-15",
    status: "Delivered"
  },
  {
    orderId: "ORD-002",
    clientName: "Jane Smith",
    productName: "Licensed Rubber Shoes",
    quantity: 1,
    amount: 14.74,
    date: "2025-01-14",
    status: "Processing"
  },
  {
    orderId: "ORD-003",
    clientName: "Mike Johnson",
    productName: "Fresh Gold Pants",
    quantity: 3,
    amount: 180.96,
    date: "2025-01-13",
    status: "Shipped"
  },
  {
    orderId: "ORD-004",
    clientName: "Sarah Williams",
    productName: "Premium Skincare Serum",
    quantity: 1,
    amount: 89.99,
    date: "2025-01-12",
    status: "Delivered"
  },
  {
    orderId: "ORD-005",
    clientName: "David Brown",
    productName: "Designer Handbag",
    quantity: 1,
    amount: 249.99,
    date: "2025-01-11",
    status: "Pending"
  },
  {
    orderId: "ORD-006",
    clientName: "Emily Davis",
    productName: "Modern Ceramic Computer",
    quantity: 1,
    amount: 35.37,
    date: "2025-01-10",
    status: "Delivered"
  },
];

export default function Orders() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-playfair text-gray-900">
          Orders
        </h2>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat text-sm">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Client Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Product</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staticOrders.map((order) => (
              <tr key={order.orderId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <span className="font-montserrat font-semibold text-gray-900">{order.orderId}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-700">{order.clientName}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-700">{order.productName}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-700">{order.quantity}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat font-semibold text-gray-900">${order.amount.toFixed(2)}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-600 text-sm">{order.date}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-montserrat font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                    <Eye size={18} className="text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

