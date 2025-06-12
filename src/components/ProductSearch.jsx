import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ProductSearch = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/products`);
        const data = await res.json();
        setAllProducts(data.products);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, allProducts]);

  return (
    <div className="w-full">
      <input
        type="text"
        className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <div className="max-h-80 overflow-y-auto space-y-3">
        {results.length === 0 && query.length > 1 && (
          <p className="text-gray-500 text-center">No products found.</p>
        )}
        {results.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            onClick={onClose}
            className="flex items-center gap-4 border-b pb-3 hover:bg-pink-50 px-2 py-1 rounded transition"
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-14 h-14 object-cover rounded"
            />
            <div>
              <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-green-600">Ksh {product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
