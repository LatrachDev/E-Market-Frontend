import React, { useState } from 'react';
import SellerSidebar from '../../components/Seller/Layouts/SellerSidebar';
import MyProducts from '../../components/Seller/MyProducts';
import Orders from '../../components/Seller/Orders';
import CouponManagement from '../../components/Seller/CouponManagement';

const navLinks = [
  { id: 'overview', label: 'Dashboard Overview', icon: '🏠' },
  { id: 'my-products', label: 'My Products', icon: '🛍️' },
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'coupon-management', label: 'Manage Coupons', icon: '🎫' },
];

const sectionHeaders = {
  overview: {
    title: 'Seller Dashboard Overview',
    subtitle: 'Monitor your products, orders, and revenue with real-time insights and quick actions.',
  },
  'my-products': {
    title: 'My Products',
    subtitle: 'View and manage all your listed products in one place.',
  },
  orders: {
    title: 'Orders',
    subtitle: 'Track all orders for your products with detailed customer information.',
  },
  'coupon-management': {
    title: 'Coupon Management',
    subtitle: 'Create and manage discount coupons for your products.',
  },
};

function SellerPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const currentHeader = sectionHeaders[activeSection];

  const renderSection = () => {
    switch (activeSection) {
      case 'my-products':
        return <MyProducts />;

      case 'orders':
        return <Orders />;

      case 'coupon-management':
        return <CouponManagement />;

      case 'overview':
      default:
        return (
          <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-xl border border-brandRed/10 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-montserrat text-gray-600 mb-2">Total Products</h3>
                <p className="text-3xl font-bold font-playfair text-brandRed">24</p>
              </div>
              <div className="rounded-xl border border-brandRed/10 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-montserrat text-gray-600 mb-2">Total Orders</h3>
                <p className="text-3xl font-bold font-playfair text-brandRed">156</p>
              </div>
              <div className="rounded-xl border border-brandRed/10 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-montserrat text-gray-600 mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold font-playfair text-brandRed">$12,450</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold font-playfair text-gray-900 mb-4">
              Dashboard Overview
            </h2>
            <p className="text-sm font-montserrat text-gray-600">
              Welcome to your seller dashboard. Use the navigation menu to manage your products, view orders, and create coupons.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#fef7f5] via-white to-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <SellerSidebar
          navLinks={navLinks}
          activeSection={activeSection}
          onSelect={setActiveSection}
        />

        <main className="flex-1 lg:max-h-screen lg:overflow-y-auto">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10">
            <div className="mb-4">
              <h1 className="text-3xl font-semibold font-playfair text-gray-900 mb-2">
                {currentHeader.title}
              </h1>
              <p className="text-sm font-montserrat text-gray-600">
                {currentHeader.subtitle}
              </p>
            </div>

            <section className="space-y-10">
              {renderSection()}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SellerPage;

