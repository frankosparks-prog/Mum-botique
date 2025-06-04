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

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Tops() {
  const [tops, setTops] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <p className="text-center text-gray-600 bg-pink-100 px-6 py-4 rounded-lg border border-pink-300">No tops found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tops.map((top) => (
              <div
                key={top._id}
                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                data-aos="fade-up"
              >
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
                  <Link to={`/product/${top._id}`}>
                  <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full font-medium transition">
                    View Details
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Tops;
