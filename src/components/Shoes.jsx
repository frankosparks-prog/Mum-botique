// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Footer from "./Footer";

// const sampleShoes = [
//   {
//     id: 1,
//     name: "Chunky Heels",
//     price: "$48.00",
//     image:
//       "https://images.unsplash.com/photo-1583001750752-0cf2b02e7f91?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 2,
//     name: "Elegant Sandals",
//     price: "$42.00",
//     image:
//       "https://images.unsplash.com/photo-1603808033193-d219c1ab163d?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 3,
//     name: "Classic Black Pumps",
//     price: "$58.00",
//     image:
//       "https://images.unsplash.com/photo-1581785977773-2ec8d84d5f33?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     id: 4,
//     name: "Trendy Sneakers",
//     price: "$65.00",
//     image:
//       "https://images.unsplash.com/photo-1561808844-3000e58e0824?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// function Shoes() {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   return (
//     <div className="bg-white text-gray-800 mt-[-1.9rem]">
//       {/* Hero Section */}
//       <div
//         className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
//         style={{
//           backgroundImage: "url('https://picsum.photos/800/350?random=8')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/40" />
//         <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
//           Step Into Style
//         </h1>
//       </div>

//       {/* Products Grid */}
//       <section className="py-14 px-6 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-semibold text-center mb-10">
//           Chic Footwear for Every Occasion
//         </h2>
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {sampleShoes.map((shoe) => (
//             <div
//               key={shoe.id}
//               className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
//               data-aos="fade-up"
//             >
//               <img
//                 src={shoe.image}
//                 alt={shoe.name}
//                 className="rounded-t-xl w-full h-60 object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-semibold">{shoe.name}</h3>
//                 <p className="text-pink-500 text-md font-medium mt-2">
//                   {shoe.price}
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

// export default Shoes;

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchShoes = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/products/category/Shoes`); // replace with your actual backend host if needed
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch shoes.");
        }

        setShoes(result.products || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  return (
    <div className="bg-white text-gray-800 mt-[-1.9rem]">
      {/* Hero Section */}
      <div
        className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/800/350?random=8')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
          Step Into Style
        </h1>
      </div>

      {/* Products Section */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Chic Footwear for Every Occasion
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress size={40} style={{ color: "#ec4899" }} />
          </div>
        ) : error ? (
          // <p className="text-center text-red-500 text-lg">{error}</p>
          <p className="text-center text-red-500 text-lg font-semibold"> Check your network connection and try again!!</p>
        ) : shoes.length === 0 ? (
          <p className="text-center text-gray-600 bg-pink-100 px-6 py-4 rounded-lg border border-pink-300">
            No shoes found in this category.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {shoes.map((shoe, index) => (
              <div
                key={shoe._id}
                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="rounded-t-xl w-full h-60 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{shoe.name}</h3>
                  <p className="text-green-500 text-md font-medium mt-2">
                    ksh{shoe.price}
                  </p>
                  <Link to={`/product/${shoe._id}`}>
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

export default Shoes;
