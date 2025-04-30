import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-700 to-pink-400 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-6 md:mb-0 max-w-lg">
            <h2 className="text-4xl font-bold mb-4 text-gray-100">MC Boutique</h2>
            <p className="text-lg text-gray-200">
              Discover timeless elegance with our premium MC products.
            </p>
          </div>
          
          {/* Footer Links */}
          <div className="flex flex-wrap md:flex-nowrap justify-between space-x-12">
            <div className="mb-6 md:mb-0">
              <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
              <ul>
                <li><Link to="/" className="text-gray-900 font-semibold hover:text-pink-200">Home</Link></li>
                <li><Link to="/products" className="text-gray-900 font-semibold hover:text-pink-200">Shop</Link></li>
                <li><Link to="/contact" className="text-gray-900 font-semibold hover:text-pink-200">Contact Us</Link></li>
                <li><Link to="/about" className="text-gray-900 font-semibold hover:text-pink-200">About</Link></li>
              </ul>
            </div>
            
            <div className="mb-6 md:mb-0">
              <h3 className="font-semibold text-xl mb-4">Customer Service</h3>
              <ul>
                <li><Link to="/faq" className="text-gray-900 font-semibold hover:text-pink-200">FAQ</Link></li>
                <li><Link to="/returns" className="text-gray-900 font-semibold hover:text-pink-200">Returns</Link></li>
                <li><Link to="/shipping" className="text-gray-900 font-semibold hover:text-pink-200">Shipping</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-900 font-semibold hover:text-pink-200">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="mb-6 md:mb-0">
              <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
              <ul>
                <li className="text-gray-900 font-semibold">Email: contact@MCboutique.com</li>
                <li className="text-gray-900 font-semibold">Phone: (123) 456-7890</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-400 pt-8">
          <p className="text-sm text-gray-200">© 2025 MC Boutique. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-3xl text-gray-900 font-semibold hover:text-pink-200 transition-all" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl text-gray-900 font-semibold hover:text-pink-200 transition-all" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-3xl text-gray-900 font-semibold hover:text-pink-200 transition-all" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-3xl text-gray-900 font-semibold hover:text-pink-200 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
