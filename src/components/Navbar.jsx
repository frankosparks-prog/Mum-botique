import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import {
  HomeIcon,
  InfoIcon,
  MegaphoneIcon,
  HandCoinsIcon,
  CalendarIcon,
} from "lucide-react";
import ScrollToTop from "./scrollTop";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Categories from "./Categories";
import Contact from "./Contact";
import NotFound from "./NotFound";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const links = [
    { path: "/", name: "Home", icon: <HomeIcon size={20} /> },
    { path: "/about", name: "About", icon: <InfoIcon size={20} /> },
    { path: "/products", name: "Products", icon: <MegaphoneIcon size={20} /> },
    { path: "/categories", name: "Categories", icon: <HandCoinsIcon size={20} /> },
    { path: "/contact", name: "Contact Us", icon: <CalendarIcon size={20} /> },
  ];

  return (
    <div className="nav font-sans">
      <ScrollToTop />

      {/* Header */}
      <header className="flex items-center justify-between fixed top-0 w-full z-[1000] px-4 py-2 bg-pink-600 shadow-md">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/Beauty-logo.jpg"
            alt="Beauty Boutique Logo"
            className="h-12 md:h-14 rounded-full border-2 border-white"
          />
          <span className="text-white font-bold text-2xl md:text-3xl font-serif drop-shadow">
            Beauty Boutique
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl hover:scale-110 transition-transform focus:outline-none"
          onClick={() => setIsNavOpen(true)}
          aria-label="Open Menu"
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {links.map((link, idx) => (
            <Nav.Link
              key={idx}
              as={Link}
              to={link.path}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-black font-semibold border-2 border-pink-800 shadow hover:bg-pink-700 hover:text-white transition-all"
            >
              {link.icon}
              <span>{link.name}</span>
            </Nav.Link>
          ))}
        </nav>
      </header>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 w-[70%] max-w-xs h-full bg-white z-[9999] shadow-xl transform ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-pink-600">
          <div className="flex items-center space-x-2">
            <img
              src="/images/Beauty-logo.jpg"
              alt="Logo"
              className="h-10 rounded-full border-2 border-white"
            />
            <span className="text-white text-xl font-bold font-serif">
              Beauty Boutique
            </span>
          </div>
          <button
            onClick={() => setIsNavOpen(false)}
            className="text-white text-2xl hover:text-gray-300 focus:outline-none"
            aria-label="Close Menu"
          >
            ✖
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col px-6 py-4 space-y-4">
          {links.map((link, idx) => (
            <Nav.Link
              key={idx}
              as={Link}
              to={link.path}
              className="flex items-center space-x-3 px-4 py-2 bg-pink-50 rounded-full shadow hover:bg-pink-200 hover:scale-105 transition-all duration-300"
              onClick={() => setIsNavOpen(false)}
            >
              <div className="w-6 h-6 flex items-center justify-center text-pink-700">{link.icon}</div>
              <span className="text-black text-base font-medium">{link.name}</span>
            </Nav.Link>
          ))}
        </nav>

        {/* Get Started CTA */}
        <div className="absolute bottom-6 w-full flex justify-center">
          <Link
            to="/contributions"
            onClick={() => setIsNavOpen(false)}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all"
          >
            Get Started 🚀
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[9998]"
          onClick={() => setIsNavOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-24">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default Navbar;

// src/components/Navbar.js


// import React, { useState } from "react";
// import { Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import {
//   HomeIcon,
//   InfoIcon,
//   MegaphoneIcon,
//   HandCoinsIcon,
//   CalendarIcon,
// } from "lucide-react";

// const Navbar = () => {
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   const links = [
//     { path: "/", name: "Home", icon: <HomeIcon size={20} /> },
//     { path: "/about", name: "About", icon: <InfoIcon size={20} /> },
//     { path: "/products", name: "Products", icon: <MegaphoneIcon size={20} /> },
//     { path: "/categories", name: "Categories", icon: <HandCoinsIcon size={20} /> },
//     { path: "/contact", name: "Contact Us", icon: <CalendarIcon size={20} /> },
//   ];

//   return (
//     <header className="flex items-center justify-between fixed top-0 w-full z-[1000] px-4 py-2 bg-pink-600 shadow-md">
//       <div className="flex items-center space-x-3">
//         <img
//           src="/images/Beauty-logo.jpg"
//           alt="Beauty Boutique Logo"
//           className="h-12 md:h-14 rounded-full border-2 border-white"
//         />
//         <span className="text-white font-bold text-2xl md:text-3xl font-serif drop-shadow">
//           Beauty Boutique
//         </span>
//       </div>

//       <button
//         className="md:hidden text-white text-3xl hover:scale-110 transition-transform focus:outline-none"
//         onClick={() => setIsNavOpen(true)}
//         aria-label="Open Menu"
//       >
//         ☰
//       </button>

//       <nav className="hidden md:flex items-center space-x-4">
//         {links.map((link, idx) => (
//           <Nav.Link
//             key={idx}
//             as={Link}
//             to={link.path}
//             className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-black font-semibold border-2 border-pink-800 shadow hover:bg-pink-700 hover:text-white transition-all"
//           >
//             {link.icon}
//             <span>{link.name}</span>
//           </Nav.Link>
//         ))}
//       </nav>

//       {/* Desktop Navigation */}
//       <nav className="hidden md:flex items-center space-x-4">
//           {links.map((link, idx) => (
//             <Nav.Link
//               key={idx}
//               as={Link}
//               to={link.path}
//               className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-black font-semibold border-2 border-pink-800 shadow hover:bg-pink-700 hover:text-white transition-all"
//             >
//               {link.icon}
//               <span>{link.name}</span>
//             </Nav.Link>
//           ))}
//         </nav>
//       {/* Sidebar Mobile */}
//       <div
//         className={`fixed top-0 left-0 w-[70%] max-w-xs h-full bg-white z-[9999] shadow-xl transform ${
//           isNavOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-500 ease-in-out`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between px-4 py-4 bg-pink-600">
//           <div className="flex items-center space-x-2">
//             <img
//               src="/images/Beauty-logo.jpg"
//               alt="Logo"
//               className="h-10 rounded-full border-2 border-white"
//             />
//             <span className="text-white text-xl font-bold font-serif">
//               Beauty Boutique
//             </span>
//           </div>
//           <button
//             onClick={() => setIsNavOpen(false)}
//             className="text-white text-2xl hover:text-gray-300 focus:outline-none"
//             aria-label="Close Menu"
//           >
//             ✖
//           </button>
//         </div>

//         {/* Sidebar Links */}
//         <nav className="flex flex-col px-6 py-4 space-y-4">
//           {links.map((link, idx) => (
//             <Nav.Link
//               key={idx}
//               as={Link}
//               to={link.path}
//               className="flex items-center space-x-3 px-4 py-2 bg-pink-50 rounded-full shadow hover:bg-pink-200 hover:scale-105 transition-all duration-300"
//               onClick={() => setIsNavOpen(false)}
//             >
//               <div className="w-6 h-6 flex items-center justify-center text-pink-700">{link.icon}</div>
//               <span className="text-black text-base font-medium">{link.name}</span>
//             </Nav.Link>
//           ))}
//         </nav>

//         {/* Get Started CTA */}
//         <div className="absolute bottom-6 w-full flex justify-center">
//           <Nav.Link
//             to="/contributions"
//             onClick={() => setIsNavOpen(false)}
//             className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all"
//           >
//             Get Started 🚀
//           </Nav.Link>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isNavOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-[9998]"
//           onClick={() => setIsNavOpen(false)}
//         />
//       )}
//     </header>
    
//   );
// };

// export default Navbar;
