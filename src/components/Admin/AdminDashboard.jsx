// import React, { useState } from "react";
// import { Outlet, NavLink, Navigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen font-dancing">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen ? "block" : "hidden"
//         } md:block w-64 bg-gray-800 text-white p-4 fixed md:relative z-20 h-full top-0`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-pink-400">MC Botique</h2>
//           <button
//             className="md:hidden text-lg font-semibold hover:text-pink-400"
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             ✕
//           </button>
//         </div>
//         <nav>
//           <ul>
//             <li className="mb-4">
//               <NavLink
//                 to="visitors"
//                 className={({ isActive }) =>
//                   `text-lg font-semibold no-underline ${
//                     isActive ? "text-pink-400" : "hover:text-pink-400"
//                   }`
//                 }
//               >
//                 Visitor Details
//               </NavLink>
//             </li>

//             <li className="mb-4">
//               <NavLink
//                 to="managedProducts"
//                 className={({ isActive }) =>
//                   `text-lg font-semibold no-underline ${
//                     isActive ? "text-pink-400" : "hover:text-pink-400"
//                   }`
//                 }
//               >
//                 Managed Products
//               </NavLink>
//             </li>
            
//             <li className="mb-4">
//               <NavLink
//                 to="payments"
//                 className={({ isActive }) =>
//                   `text-lg font-semibold no-underline ${
//                     isActive ? "text-pink-400" : "hover:text-pink-400"
//                   }`
//                 }
//               >
//                 Payments
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main
//         className={`flex-1 bg-gray-100 p-6 md:ml-64 ml-0 ${isSidebarOpen ? "ml-0" : "pl-4"} overflow-y-auto`}
//         style={{ marginLeft: isSidebarOpen ? 0 : '2rem' }}
//       >
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//           <button
//             className="md:hidden text-lg font-semibold text-gray-800 hover:text-pink-400"
//             onClick={() => setIsSidebarOpen(true)}
//           >
//             ☰
//           </button>
//         </div>
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// // Redirect to Users Details as the default page
// export const AdminRoutes = () => {
//   return <Navigate to="visitors" replace />;
// };


import React, { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen font-dancing">
      {/* Sidebar */}
      <aside
        className={`mt-[-1.9rem]  fixed ${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-gray-800 text-white p-4 fixed md:relative z-20 h-full top-0`}
      >
        <div className="flex justify-between items-center mb-6 mt-20 md:mt-0">
          <h2 className="text-2xl font-bold text-pink-400">MamaChris Botique</h2>
          <button
            className="md:hidden text-lg font-semibold hover:text-pink-400"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <NavLink
                to="visitors"
                className={({ isActive }) =>
                  `text-lg font-semibold no-underline ${
                    isActive ? "text-pink-400" : "hover:text-pink-400"
                  }`
                }
              >
                Visitor Details
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="payments"
                className={({ isActive }) =>
                  `text-lg font-semibold no-underline ${
                    isActive ? "text-pink-400" : "hover:text-pink-400"
                  }`
                }
              >
                Payments
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="products"
                className={({ isActive }) =>
                  `text-lg font-semibold no-underline ${
                    isActive ? "text-pink-400" : "hover:text-pink-400"
                  }`
                }
              >
                Manage Products
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 bg-gray-100 p-6 md:ml-64 ml-0 mt-[-1.9rem] ${isSidebarOpen ? "ml-0" : "pl-4"} overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Admin Dashboard</h1>
          <button
            className="md:hidden text-lg font-semibold text-gray-800 hover:text-pink-400"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

// Redirect to Products List as the default page
export const AdminRoutes = () => {
  return <Navigate to="products" replace />;
};

export default AdminDashboard;
