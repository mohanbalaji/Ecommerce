// src/components/Navbar.js
import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import Search from './Search';

const Navbar = ({addToFavorites }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = query => {
    setSearchQuery(query);
    // Handle search functionality here, such as filtering products
    console.log('Search query:', query);
  };

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              className="h-8"
              src="/images/amazon.png"
              alt="Amazon logo"
            />
          </Link>
          <div>
            <div className="text-xs xl:text-sm">Deliver to</div>
            <div className="text-sm xl:text-base font-bold">
              United Kingdom
            </div>
          </div>
        </div>
        {/* Middle - Search component */}
        <div className="flex-grow px-4">
          <Search onSearch={handleSearch} />
        </div>
        {/* Right */}
        <div className="flex items-center space-x-4">
          {/* Account links */}
          <div className="mr-4">
            <div className="text-xs xl:text-sm">Hello, sign in</div>
            <div className="text-sm xl:text-base font-bold">
              Accounts & Lists
            </div>
          </div>
          <div className="mr-4">
            <div className="text-xs xl:text-sm">Returns</div>
            <div className="text-sm xl:text-base font-bold">& Orders</div>
          </div>
          <button /*onClick={() => addToFavorites()}*/ className="text-xs xl:text-sm">
            Add to Favorites
          </button>
          {/* Cart */}
          <Link to="/checkout">
            <div className="flex items-center">
              <ShoppingCartIcon className="h-6" />
              <div className="ml-2 font-bold">Amazon</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
