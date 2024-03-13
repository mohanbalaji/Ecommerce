import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const ProductList = ({ addToFavorites }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState('light'); // Default mode is light

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark'); // Toggle dark mode on body
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceRangeChange = e => {
    const { name, value } = e.target;
    setPriceRange(prevRange => ({ ...prevRange, [name]: value }));
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (priceRange.min && priceRange.max) {
      filtered = filtered.filter(product =>
        product.price >= parseInt(priceRange.min) && product.price <= parseInt(priceRange.max)
      );
    }
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    return filtered;
  }, [products, searchQuery, priceRange, category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceRange, category]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="number"
          placeholder="Min Price"
          name="min"
          value={priceRange.min}
          onChange={handlePriceRangeChange}
          className="border rounded-md py-1 px-2 mr-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          name="max"
          value={priceRange.max}
          onChange={handlePriceRangeChange}
          className="border rounded-md py-1 px-2 mr-2"
        />
        <select value={category} onChange={handleCategoryChange} className="border rounded-md py-1 px-2">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-md py-1 px-2 ml-2"
        />
      </div>
      <div className={mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
        {/* Toggle button */}
        <button onClick={toggleMode}>Toggle Dark Mode</button>
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map(product => (
            <div key={product.id} className={`border rounded-md p-4 ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
              <div className="relative">
                <button /*onClick={() => addToFavorites(product.id)}*/ className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21l-1.306-1.287C5.658 15.14 2 12.271 2 8.5 2 5.463 4.462 3 7.5 3c1.74 0 3.272 1.226 4.5 2.532C13.228 4.226 14.76 3 16.5 3 19.538 3 22 5.463 22 8.5c0 3.771-3.658 6.64-8.694 11.213L12 21z" />
                  </svg>
                </button>
              </div>
              <img src={product.image} alt={product.title} className="w-full h-400 mb-2 rounded" />
              <div className="flex flex-col justify-between">
                <h3 className={`text-lg font-semibold mb-2 ${mode === 'light' ? 'text-black' : 'text-white'}`}>{product.title}</h3>
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${mode === 'light' ? 'text-black' : 'text-white'}`}>{product.price}$</span>
                  <span className={`text-yellow-500 ${mode === 'light' ? 'text-black' : 'text-white'}`}>{product.rating.rate} ({product.rating.count} reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav>
          <ul className="pagination grid grid-cols-5 gap-4">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
              <li key={index} className="page-item">
                <button onClick={() => paginate(index + 1)} className="page-link bg-white border border-gray-300 px-4 py-2 transition-colors duration-150 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-200">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
