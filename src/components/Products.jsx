// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Footer from './Footer';

// const sampleProducts = [
//   {
//     id: 1,
//     name: 'Elegant Handbag',
//     price: '$45.00',
//     image:
//       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
//   },
//   {
//     id: 2,
//     name: 'Stylish Sunglasses',
//     price: '$30.00',
//     image:
//       'https://images.unsplash.com/photo-1593032465171-d29f6e942f44?auto=format&fit=crop&w=600&q=80',
//   },
//   {
//     id: 3,
//     name: 'Floral Dress',
//     price: '$60.00',
//     image:
//       'https://images.unsplash.com/photo-1618354691321-00f6e1f91d14?auto=format&fit=crop&w=600&q=80',
//   },
//   {
//     id: 4,
//     name: 'Gold Necklace',
//     price: '$120.00',
//     image:
//       'https://images.unsplash.com/photo-1622445275682-cf86b2613e7b?auto=format&fit=crop&w=600&q=80',
//   },
// ];

// function Products() {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (
//     <div className="bg-white text-gray-800 mt-[-1.9rem]">
//       {/* Hero Section */}
//       <div
//         className="h-[350px] flex items-center justify-center bg-cover bg-center relative"
//         style={{
//           backgroundImage: "url('https://picsum.photos/400/250?random=1')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/40"></div>
//         <h1
//           className="text-white text-4xl md:text-5xl font-bold z-10 drop-shadow-lg"
//           data-aos="fade-up"
//         >
//           Our Collection
//         </h1>
//       </div>

//       {/* Products Section */}
//       <section className="py-14 px-6 max-w-7xl mx-auto">
//         <h2
//           className="text-3xl font-semibold text-center mb-10"
//           data-aos="fade-up"
//           data-aos-delay="200"
//         >
//           Handpicked for Elegance
//         </h2>

//         <div
//           className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//           data-aos="fade-up"
//           data-aos-delay="400"
//         >
//           {sampleProducts.map((product, index) => (
//             <div
//               key={product.id}
//               data-aos="fade-up"
//               data-aos-delay={500 + index * 100}
//               className="border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="rounded-t-xl w-full h-60 object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-pink-500 text-md font-medium mt-2">
//                   {product.price}
//                 </p>
//                 <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full font-medium transition">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; // ✅ Import Spinner

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Products() {
  const [elegantProducts, setElegantProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchElegantProducts = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/products/elegance`);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch products.");
        }

        setElegantProducts(result.products);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchElegantProducts();
  }, []);

  const totalPages = Math.ceil(elegantProducts.length / itemsPerPage);
  const paginatedProducts = elegantProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white text-gray-800 mt-[-1.9rem]">
      {/* Hero Section */}
      <div
        className="h-[350px] flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://picsum.photos/400/250?random=1')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1
          className="text-white text-4xl md:text-5xl font-bold z-10 drop-shadow-lg"
          data-aos="fade-up"
        >
          Our Collection
        </h1>
      </div>

      {/* Products Section */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2
          className="text-3xl font-semibold text-center mb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Handpicked for Elegance
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress size={40} style={{ color: "#ec4899" }} />{" "}
            {/* Pink Spinner */}
          </div>
        ) : error ? (
          // <p className="text-center text-red-500 text-lg">{error}</p>
          <p className="text-center text-red-500 text-lg font-semibold">
            {" "}
            Check your network connection and try again!!
          </p>
        ) : elegantProducts.length === 0 ? (
          <p className="text-center text-gray-600 bg-pink-100 px-6 py-4 rounded-lg border border-pink-300">
            No elegant products available.
          </p>
        ) : (
          <div
            className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {paginatedProducts.map((product, index) => (
              <div
                key={product._id}
                data-aos="fade-up"
                data-aos-delay={500 + index * 100}
                className="border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="rounded-t-xl w-full hover:opacity-90 transition object-contain"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-green-500 text-md font-medium mt-2">
                    ksh{product.price}
                  </p>

                  <Link to={`/product/${product._id}`}>
                    <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full font-medium transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-pink-900 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-pink-500 text-white"
                    : "bg-pink-100"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-pink-900 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
      </section>
      <Footer />
    </div>
  );
}

export default Products;
