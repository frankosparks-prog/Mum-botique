// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Footer from "./Footer";

// const sampleTops = [
//   {
//     id: 1,
//     name: "Floral Crop Top",
//     price: "$32.00",
//     image:
//       "https://images.unsplash.com/photo-1621784561047-4214bfa3b360?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     name: "Chiffon Blouse",
//     price: "$39.00",
//     image:
//       "https://images.unsplash.com/photo-1618221677496-d7b8be8e71b3?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 3,
//     name: "Casual Tee",
//     price: "$25.00",
//     image:
//       "https://images.unsplash.com/photo-1593032465175-b80f0b238e43?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 4,
//     name: "Boho Top",
//     price: "$36.00",
//     image:
//       "https://images.unsplash.com/photo-1520975922071-ebc9c1e7fb1e?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// function Tops() {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   return (
//     <div className="bg-white text-gray-800 mt-[-1.9rem]">
//       {/* Hero Section */}
//       <div
//         className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
//         style={{
//           backgroundImage: "url('https://picsum.photos/800/350?random=10')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/40" />
//         <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
//           Trendy Tops Collection
//         </h1>
//       </div>

//       {/* Tops Grid */}
//       <section className="py-14 px-6 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-semibold text-center mb-10">
//           Fresh Looks. Everyday Comfort.
//         </h2>
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {sampleTops.map((top) => (
//             <div
//               key={top.id}
//               className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
//               data-aos="fade-up"
//             >
//               <img
//                 src={top.image}
//                 alt={top.name}
//                 className="rounded-t-xl w-full h-60 object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-semibold">{top.name}</h3>
//                 <p className="text-pink-500 text-md font-medium mt-2">
//                   {top.price}
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

// export default Tops;

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaHeart } from "react-icons/fa";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Tops() {
  const [tops, setTops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch tops by category
    const fetchTops = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/products/category/Tops`);
        const data = await res.json();
        if (data.success) {
          setTops(data.products);
        } else {
          console.error("Failed to fetch tops:", data.message);
        }
      } catch (err) {
        console.error("Error fetching tops:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTops();
  }, []);

  const handleLike = async (productId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/products/like/${productId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        setTops((prevTops) =>
          prevTops.map((top) =>
            top._id === productId ? { ...top, likes: data.likes } : top
          )
        );
        const newHeart = { id: Date.now(), productId };
        setFloatingHearts((prev) => [...prev, newHeart]);

        // Remove after animation
        setTimeout(() => {
          setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 1200);
      }
    } catch (error) {
      console.error("Failed to like product:", error);
    }
  };

  const totalPages = Math.ceil(tops.length / itemsPerPage);
  const paginatedProducts = tops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white text-gray-800 mt-[-1.9rem]">
      {/* Hero Section */}
      <div
        className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/800/350?random=10')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
          Trendy Tops Collection
        </h1>
      </div>

      {/* Tops Grid */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Fresh Looks. Everyday Comfort.
        </h2>

        {loading ? (
          <div className="flex justify-center mt-20">
            <CircularProgress size={40} sx={{ color: "#ec4899" }} />
          </div>
        ) : tops.length === 0 ? (
          <p className="text-center text-gray-600 bg-pink-100 px-6 py-4 rounded-lg border border-pink-300">
            No tops found.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((top) => (
              <div
                key={top._id}
                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                data-aos="fade-up"
              >
                {/* Floating hearts */}
                {floatingHearts
                  .filter((h) => h.productId === top._id)
                  .map((heart) => (
                    <div
                      key={heart.id}
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500 text-2xl pointer-events-none"
                      style={{
                        animation: "floatHeart 1.2s ease-out forwards",
                      }}
                    >
                      ❤️❤️
                    </div>
                  ))}

                <img
                  src={top.images?.[0]}
                  alt={top.name}
                  className="rounded-t-xl w-full h-60 object-cover"
                />

                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{top.name}</h3>
                  <p className="text-green-500 text-md font-medium mt-2">
                    ksh{top.price}
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <Link to={`/product/${top._id}`}>
                      <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full font-medium transition">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleLike(top._id)}
                      className="relative flex items-center justify-center gap-1 p-2 rounded-full border-2 transition-all bg-red-100 border-red-500 text-red-500 hover:text-white hover:bg-red-600 mt-4"
                      title="Like this product"
                    >
                      <FaHeart className="text-pink-500" />
                      <span>{top.likes || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-4">
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
                currentPage === i + 1 ? "bg-pink-500 text-white" : "bg-pink-100"
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

export default Tops;
