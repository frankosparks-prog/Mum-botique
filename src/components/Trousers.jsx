// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Footer from "./Footer";

// const sampleTrousers = [
//   {
//     id: 1,
//     name: "Slim Fit Jeans",
//     price: "$40.00",
//     image:
//       "https://images.unsplash.com/photo-1580244792694-b3517c908923?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     name: "Chino Pants",
//     price: "$45.00",
//     image:
//       "https://images.unsplash.com/photo-1605713547975-909b34ff5c56?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 3,
//     name: "Wide Leg Trousers",
//     price: "$55.00",
//     image:
//       "https://images.unsplash.com/photo-1627220551117-86c2ccbcf92d?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 4,
//     name: "Cargo Pants",
//     price: "$50.00",
//     image:
//       "https://images.unsplash.com/photo-1603785381983-3811f703ae68?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// function Trousers() {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   return (
//     <div className="bg-white text-gray-800 mt-[-1.9rem]">
//       {/* Hero Section */}
//       <div
//         className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
//         style={{
//           backgroundImage: "url('https://picsum.photos/800/350?random=12')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/40" />
//         <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
//           Stylish Trousers Collection
//         </h1>
//       </div>

//       {/* Trousers Grid */}
//       <section className="py-14 px-6 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-semibold text-center mb-10">
//           Comfort Meets Style.
//         </h2>
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {sampleTrousers.map((trouser) => (
//             <div
//               key={trouser.id}
//               className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
//               data-aos="fade-up"
//             >
//               <img
//                 src={trouser.image}
//                 alt={trouser.name}
//                 className="rounded-t-xl w-full h-60 object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-semibold">{trouser.name}</h3>
//                 <p className="text-pink-500 text-md font-medium mt-2">
//                   {trouser.price}
//                 </p>
//                 {/* To view details, click the button below:on view components */}
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

// export default Trousers;

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaHeart } from "react-icons/fa";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Trousers() {
  const [trousers, setTrousers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch trousers by category
    const fetchTrousers = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/products/category/Trousers`);
        const data = await res.json();
        if (data.success) {
          setTrousers(data.products);
        } else {
          console.error("Failed to fetch trousers:", data.message);
        }
      } catch (err) {
        console.error("Error fetching trousers:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrousers();
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
        setTrousers((prevTrousers) =>
          prevTrousers.map((trouser) =>
            trouser._id === productId
              ? { ...trouser, likes: data.likes }
              : trouser
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

  const totalPages = Math.ceil(trousers.length / itemsPerPage);
  const paginatedProducts = trousers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white text-gray-800 mt-[-1.9rem]">
      {/* Hero Section */}
      <div
        className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/800/350?random=12')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
          Stylish Trousers Collection
        </h1>
      </div>

      {/* Products Grid */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Comfort Meets Style.
        </h2>

        {loading ? (
          <div className="flex justify-center mt-20">
            <CircularProgress size={40} sx={{ color: "#ec4899" }} />
          </div>
        ) : trousers.length === 0 ? (
          <p className="text-center text-gray-600 bg-pink-100 px-6 py-4 rounded-lg border border-pink-300">
            No trousers found.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((trouser) => (
              <div
                key={trouser._id}
                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                data-aos="fade-up"
              >
                {/* Floating hearts */}
                {floatingHearts
                  .filter((h) => h.productId === trouser._id)
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
                  src={trouser.images?.[1]}
                  alt={trouser.name}
                  className="rounded-t-xl w-full hover:opacity-90 transition object-contain"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{trouser.name}</h3>
                  <p className="text-green-500 text-md font-medium mt-2">
                    ksh{trouser.price}
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <Link to={`/product/${trouser._id}`}>
                      <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full font-medium transition">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleLike(trouser._id)}
                      className="relative flex items-center justify-center gap-1 p-2 rounded-full border-2 transition-all bg-red-100 border-red-500 text-red-500 hover:text-white hover:bg-red-600 mt-4"
                      title="Like this product"
                    >
                      <FaHeart className="text-pink-500" />
                      <span>{trouser.likes || 0}</span>
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

export default Trousers;
