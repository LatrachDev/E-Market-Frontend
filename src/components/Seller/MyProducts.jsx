import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, X } from 'lucide-react';

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop";

// Static categories (in real app, these would come from API)
const staticCategories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Footwear' },
  { id: '4', name: 'Beauty' },
  { id: '5', name: 'Home' },
];

const staticProducts = [
  {
    _id: 1,
    title: "Modern Ceramic Computer",
    description: "Dibbert, Moore and Thiel's most advanced Hat technology",
    price: 35.37,
    ex_price: 45.37,
    stock: 58,
    primaryImage: PLACEHOLDER_IMAGE,
    secondaryImages: [],
    categories: ['1'],
    published: true
  },
  {
    _id: 2,
    title: "Licensed Rubber Shoes",
    description: "Soft Shirt designed with Aluminum for glossy performance",
    price: 14.74,
    ex_price: null,
    stock: 98,
    primaryImage: PLACEHOLDER_IMAGE,
    secondaryImages: [],
    categories: ['3'],
    published: true
  },
  {
    _id: 3,
    title: "Fresh Gold Pants",
    description: "New cyan Bacon with ergonomic design for defenseless comfort",
    price: 60.32,
    ex_price: 75.32,
    stock: 21,
    primaryImage: PLACEHOLDER_IMAGE,
    secondaryImages: [],
    categories: ['2'],
    published: false
  },
];

export default function MyProducts() {
  const [products, setProducts] = useState(staticProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    ex_price: '',
    stock: '0',
    primaryImage: '',
    secondaryImages: [],
    categories: [],
    published: false
  });
  const [newSecondaryImage, setNewSecondaryImage] = useState('');

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        ex_price: product.ex_price ? product.ex_price.toString() : '',
        stock: product.stock.toString(),
        primaryImage: product.primaryImage || '',
        secondaryImages: product.secondaryImages || [],
        categories: product.categories || [],
        published: product.published || false
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        ex_price: '',
        stock: '0',
        primaryImage: '',
        secondaryImages: [],
        categories: [],
        published: false
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      ex_price: '',
      stock: '0',
      primaryImage: '',
      secondaryImages: [],
      categories: [],
      published: false
    });
    setNewSecondaryImage('');
  };

  const handleAddSecondaryImage = () => {
    if (newSecondaryImage.trim()) {
      setFormData({
        ...formData,
        secondaryImages: [...formData.secondaryImages, newSecondaryImage.trim()]
      });
      setNewSecondaryImage('');
    }
  };

  const handleRemoveSecondaryImage = (index) => {
    setFormData({
      ...formData,
      secondaryImages: formData.secondaryImages.filter((_, i) => i !== index)
    });
  };

  const handleCategoryChange = (categoryId) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(categoryId)
        ? formData.categories.filter(id => id !== categoryId)
        : [...formData.categories, categoryId]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (parseFloat(formData.price) < 0) {
      alert('Price cannot be negative');
      return;
    }
    
    if (formData.ex_price && parseFloat(formData.ex_price) < 0) {
      alert('Ex-price cannot be negative');
      return;
    }
    
    if (parseInt(formData.stock) < 0) {
      alert('Stock cannot be negative');
      return;
    }
    
    if (formData.categories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    if (editingProduct) {
      // Update product
      setProducts(products.map(p => 
        p._id === editingProduct._id 
          ? { 
              ...editingProduct, 
              ...formData, 
              price: parseFloat(formData.price),
              ex_price: formData.ex_price ? parseFloat(formData.ex_price) : null,
              stock: parseInt(formData.stock)
            }
          : p
      ));
    } else {
      // Create new product
      const newProduct = {
        _id: products.length + 1,
        ...formData,
        price: parseFloat(formData.price),
        ex_price: formData.ex_price ? parseFloat(formData.ex_price) : null,
        stock: parseInt(formData.stock)
      };
      setProducts([...products, newProduct]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-playfair text-gray-900">
          My Products
        </h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-brandRed text-white rounded-lg hover:bg-hoverBrandRed transition-colors duration-300 font-montserrat text-sm font-medium"
        >
          <Plus size={18} />
          Add New Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Product</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold font-montserrat text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.primaryImage || PLACEHOLDER_IMAGE}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold font-montserrat text-gray-900">{product.title}</p>
                      <p className="text-sm font-montserrat text-gray-500 line-clamp-1">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <span className="font-montserrat text-gray-900 font-semibold">${product.price.toFixed(2)}</span>
                    {product.ex_price && (
                      <span className="ml-2 font-montserrat text-gray-400 text-sm line-through">
                        ${product.ex_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-montserrat text-gray-700">{product.stock} units</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-montserrat font-medium ${
                    product.published
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {product.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                      <Eye size={18} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
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
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold font-playfair text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                  Product Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                    Ex-Price ($) (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.ex_price}
                    onChange={(e) => setFormData({ ...formData, ex_price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                  Categories * (Select at least one)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {staticCategories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="w-4 h-4 text-brandRed border-gray-300 rounded focus:ring-brandRed"
                      />
                      <span className="font-montserrat text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                  Primary Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.primaryImage}
                  onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.primaryImage && (
                  <img
                    src={formData.primaryImage}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium font-montserrat text-gray-700 mb-2">
                  Secondary Images (Optional)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={newSecondaryImage}
                    onChange={(e) => setNewSecondaryImage(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed font-montserrat"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={handleAddSecondaryImage}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-montserrat text-sm"
                  >
                    Add
                  </button>
                </div>
                {formData.secondaryImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.secondaryImages.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Secondary ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSecondaryImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-brandRed border-gray-300 rounded focus:ring-brandRed"
                />
                <label htmlFor="published" className="font-montserrat text-sm text-gray-700 cursor-pointer">
                  Publish this product
                </label>
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
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
