// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Footer from "./Footer";

// const sampleDresses = [
//   {
//     id: 1,
//     name: "Classic Red Dress",
//     price: "$55.00",
//     image:
//       "https://images.unsplash.com/photo-1520962911891-6c70399c3e4e?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     name: "Summer Floral Dress",
//     price: "$65.00",
//     image:
//       "https://images.unsplash.com/photo-1551854716-8b811be39e7c?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 3,
//     name: "Elegant Evening Gown",
//     price: "$120.00",
//     image:
//       "https://images.unsplash.com/photo-1519741491149-6c79fbe5e0b7?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 4,
//     name: "Boho Maxi Dress",
//     price: "$70.00",
//     image:
//       "https://images.unsplash.com/photo-1571508601938-3beaaa3f1e7d?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// function Dresses() {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   return (
//     <div className="bg-white text-gray-800 mt-[-1.9rem]">
//       {/* Hero Section */}
//       <div
//         className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
//         style={{
//           backgroundImage: "url('https://picsum.photos/800/350?random=6')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/40" />
//         <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
//           Dresses Collection
//         </h1>
//       </div>

//       {/* Products Grid */}
//       <section className="py-14 px-6 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-semibold text-center mb-10">
//           Grace in Every Stitch
//         </h2>
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {sampleDresses.map((dress) => (
//             <div
//               key={dress.id}
//               className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
//               data-aos="fade-up"
//             >
//               <img
//                 src={dress.image}
//                 alt={dress.name}
//                 className="rounded-t-xl w-full h-60 object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-semibold">{dress.name}</h3>
//                 <p className="text-pink-500 text-md font-medium mt-2">
//                   {dress.price}
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

// export default Dresses;

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Dresses() {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch dresses by category
    const fetchDresses = async () => {
      try {
        const res = await fetch(
          `${SERVER_URL}/api/products/category/Dresses`
        );
        const data = await res.json();
        if (data.success) {
          setDresses(data.products);
        } else {
          console.error("Failed to fetch dresses:", data.message);
        }
      } catch (err) {
        console.error("Error fetching dresses:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

  return (
    <div className="bg-white text-gray-800 mt-[-1.9rem]">
      {/* Hero Section */}
      <div
        className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/800/350?random=6')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
          Dresses Collection
        </h1>
      </div>

      {/* Products Grid */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Grace in Every Stitch
        </h2>

        {loading ? (
          <div className="flex justify-center mt-20">
            <CircularProgress size={40} sx={{ color: "#ec4899" }} />
          </div>
        ) : dresses.length === 0 ? (
          <p className="text-center text-gray-600 bg-pink-100 px-6 py-4 rounded-lg border border-pink-300">
            No dresses found.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dresses.map((dress) => (
              <div
                key={dress._id}
                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                data-aos="fade-up"
              >
                <img
                  src={dress.images?.[0]}
                  alt={dress.name}
                  className="rounded-t-xl w-full h-60 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{dress.name}</h3>
                  <p className="text-green-500 text-md font-medium mt-2">
                    ksh{dress.price}
                  </p>
                  <Link to={`/product/${dress._id}`}>
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

export default Dresses;
