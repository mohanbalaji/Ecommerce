// src/components/Search.js
import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <SearchIcon className="absolute top-0 right-0 mr-4 mt-3 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default Search;
