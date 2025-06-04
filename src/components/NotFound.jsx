// import React from 'react';
// import { Link } from 'react-router-dom';

// const NotFound = () => {
//   return (
//     <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black mt-[-2.9rem] text-white">
//       {/* Animated floating blobs background */}
//       <div className="absolute inset-0 overflow-hidden z-0">
//         <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-floatSlow" />
//         <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500 opacity-30 rounded-full filter blur-3xl animate-floatReverse" />
//       </div>

//       {/* Glassmorphic content card */}
//       <div className="relative z-10 text-center px-8 py-12 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl max-w-lg mx-auto border border-white border-opacity-20">
//         <img src="/images/Beauty-logo.jpg" alt="Logo" className="w-16 h-16 mx-auto mb-4 opacity-80 rounded" />
//         <h1 className="text-7xl font-black text-pink-500 mb-4 tracking-wide">404</h1>
//         <h2 className="text-3xl font-semibold mb-2">Oops! Page not found</h2>
//         <p className="text-base text-gray-600 mb-6">
//           The page you’re looking for doesn’t exist, was moved, or is temporarily unavailable.
//         </p>
//         <Link
//           to="/"
//           className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
//         >
//           Return Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default NotFound;

import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
// import { Engine } from 'tsparticles-engine';
import { loadBasic } from 'tsparticles-basic';

const NotFound = () => {
  const particlesInit = async (engine) => {
    await loadBasic(engine); // ✅ Loads basic presets and avoids `checkVersion` issues
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black mt-[-2.9rem] text-white">
      {/* Particle background */}
      <Particles
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "#000" } },
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 2 },
            move: { enable: true, speed: 1 },
            links: {
              enable: true,
              color: "#ffffff",
              distance: 120,
              opacity: 0.3,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Glass card */}
      <div className="relative z-10 text-center px-8 py-12 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl max-w-lg mx-auto border border-white border-opacity-20">
        <img
          src="/images/Beauty-logo.jpg"
          alt="Logo"
          className="w-16 h-16 mx-auto mb-4 opacity-80 rounded"
        />
        <h1 className="text-7xl font-black text-pink-500 tracking-wide mb-4">404</h1>
        <h2 className="text-3xl text-black font-semibold mb-2">Oops! Page not found</h2>
        <p className="text-base text-gray-600 mb-6">
          The page you’re looking for doesn’t exist, was moved, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
