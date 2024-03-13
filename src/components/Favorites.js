import React from 'react';

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map(product => (
          <div key={product.id} className="border rounded-md p-4 bg-gray-100">
            <img src={product.image} alt={product.title} className="w-full h-400 mb-2 rounded" />
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <div className="flex justify-between items-center">
                <span className="font-bold">{product.price}$</span>
                <span className="text-yellow-500">{product.rating.rate} ({product.rating.count} reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
