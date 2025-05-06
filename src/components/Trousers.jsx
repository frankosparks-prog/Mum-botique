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

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Trousers() {
  const [trousers, setTrousers] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <p className="text-center text-gray-600 bg-pink-100 px-6 py-4 rounded-lg border border-pink-300">No trousers found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {trousers.map((trouser) => (
              <div
                key={trouser._id}
                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                data-aos="fade-up"
              >
                <img
                  src={trouser.image}
                  alt={trouser.name}
                  className="rounded-t-xl w-full h-60 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{trouser.name}</h3>
                  <p className="text-green-500 text-md font-medium mt-2">
                    ksh{trouser.price}
                  </p>
                  <Link to={`/product/${trouser._id}`}>
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

export default Trousers;
