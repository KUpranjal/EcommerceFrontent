import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Utils/userSlice";
import product from "./product";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const Home = () => {
  const [products] = useState(product);
  const dispatch = useDispatch();

  const sent = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Latest Electronics
        </h2>
        <p className="text-gray-500 mt-1">
          Top quality gadgets at best prices
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition flex flex-col h-full"
          >
            {/* Image */}
            <div className="bg-gray-50 p-6 flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-44 object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col h-full">
              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>

              {/* Category */}
              <p className="text-xs text-blue-600 uppercase mt-1">
                {item.category}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400 mt-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-gray-300" />
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {item.desc}
              </p>

              {/* Price & Stock */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-gray-900">
                  ₹{item.price}
                </span>
                <span className="text-xs text-green-600">
                  In Stock: {item.quantity}
                </span>
              </div>

              {/* Add to Cart → FIXED BOTTOM */}
              <div className="mt-auto pt-4">
                <button
                  onClick={() => sent(item)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
