import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // import the AOS styles
import Footer from "./Footer";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      easing: "ease-in-out", // easing function
      once: true, // ensures animation runs only once
    });
  }, []);

  return (
    <>
    <div className="bg-pink-50 min-h-screen flex flex-col justify-center items-center mt-[-1.9rem]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-16 md:py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
          Welcome to MC Boutique ✨
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Explore a collection of classic, elegant, and timeless beauty products
        </p>

        {/* Hero Buttons */}
        <div className="flex space-x-6">
          <Link
            to="/products"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
          <Link
            to="/contact"
            className="border-2 border-pink-600 hover:bg-pink-600 text-pink-600 hover:text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Product 1 */}
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              data-aos="fade-up"
            >
              <img
                src="https://picsum.photos/400/250?random=4"
                alt="Product 1"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Product Name</h3>
                <p className="text-gray-600 mt-2">$49.99</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block text-pink-600 hover:text-pink-700 transition-all"
                >
                  View Product
                </Link>
              </div>
            </div>
            {/* Product 2 */}
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              data-aos="fade-up"
            >
              <img
                src="https://picsum.photos/400/250?random=6"
                alt="Product 2"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Product Name</h3>
                <p className="text-gray-600 mt-2">$39.99</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block text-pink-600 hover:text-pink-700 transition-all"
                >
                  View Product
                </Link>
              </div>
            </div>
            {/* Product 3 */}
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              data-aos="fade-up"
            >
              <img
                src="https://picsum.photos/400/250?random=7"
                alt="Product 3"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Product Name</h3>
                <p className="text-gray-600 mt-2">$59.99</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block text-pink-600 hover:text-pink-700 transition-all"
                >
                  View Product
                </Link>
              </div>
            </div>
            {/* Product 4 */}
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              data-aos="fade-up"
            >
              <img
                src="https://picsum.photos/400/250?random=8"
                alt="Product 4"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Product Name</h3>
                <p className="text-gray-600 mt-2">$69.99</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block text-pink-600 hover:text-pink-700 transition-all"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}

export default Home;
