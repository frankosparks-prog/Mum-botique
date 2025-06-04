// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const initialForm = {
//   name: "",
//   description: "",
//   price: "",
//   category: "",
//   isFeatured: false,
//   isElegancePick: false,
//   images: [],
// };

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState(initialForm);
//   const [editId, setEditId] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [fileInput, setFileInput] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(`${SERVER_URL}/api/products`);
//       const data = await res.json();
//       setProducts(data.products);
//     } catch (err) {
//       toast.error("Failed to load products");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleImageUpload = (e) => {
//     setFileInput(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     for (const key in form) {
//       if (key !== "images") formData.append(key, form[key]);
//     }
//     if (fileInput) {
//       for (let i = 0; i < fileInput.length; i++) {
//         formData.append("images", fileInput[i]);
//       }
//     }

//     const method = editId ? "PUT" : "POST";
//     const endpoint = editId
//       ? `${SERVER_URL}/api/products/${editId}`
//       : `${SERVER_URL}/api/products`;

//     try {
//       const res = await fetch(endpoint, {
//         method,
//         body: formData,
//       });
//       if (!res.ok) throw new Error("Upload failed");

//       toast.success(editId ? "Product updated" : "Product added");
//       setForm(initialForm);
//       setFileInput(null);
//       setEditId(null);
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleEdit = (product) => {
//     setForm({ ...product, images: [] });
//     setEditId(product._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await fetch(`${SERVER_URL}/api/products/${id}`, { method: "DELETE" });
//       toast.success("Product deleted");
//       fetchProducts();
//     } catch (err) {
//       toast.error("Failed to delete");
//     }
//   };

//   const filteredProducts = products.filter((p) => {
//     if (filter === "all") return true;
//     if (filter === "featured") return p.isFeatured;
//     if (filter === "elegance") return p.isElegancePick;
//     return p.category === filter;
//   });

//   return (
//     <div className="p-6 space-y-8">
//       <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 rounded shadow space-y-4"
//         encType="multipart/form-data"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleInputChange}
//             placeholder="Product Name"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleInputChange}
//             placeholder="Price"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="category"
//             value={form.category}
//             onChange={handleInputChange}
//             placeholder="Category"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="file"
//             name="images"
//             multiple
//             onChange={handleImageUpload}
//             className="border p-2 rounded"
//           />
//         </div>
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleInputChange}
//           placeholder="Description"
//           className="border p-2 rounded w-full"
//           rows={3}
//         ></textarea>
//         <div className="flex gap-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="isFeatured"
//               checked={form.isFeatured}
//               onChange={handleInputChange}
//             />
//             Featured
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="isElegancePick"
//               checked={form.isElegancePick}
//               onChange={handleInputChange}
//             />
//             Elegance Pick
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           {editId ? "Update Product" : "Add Product"}
//         </button>
//       </form>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 items-center">
//         <button
//           className={`px-3 py-1 rounded border ${filter === "all" ? "bg-blue-500 text-white" : ""}`}
//           onClick={() => setFilter("all")}
//         >
//           All
//         </button>
//         <button
//           className={`px-3 py-1 rounded border ${filter === "featured" ? "bg-blue-500 text-white" : ""}`}
//           onClick={() => setFilter("featured")}
//         >
//           Featured
//         </button>
//         <button
//           className={`px-3 py-1 rounded border ${filter === "elegance" ? "bg-blue-500 text-white" : ""}`}
//           onClick={() => setFilter("elegance")}
//         >
//           Elegance Pick
//         </button>
//         {/* Add dynamic category filters if needed */}
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {filteredProducts.map((product) => (
//           <div key={product._id} className="bg-white p-4 rounded shadow">
//             <img
//               src={product.images?.[0]}
//               alt={product.name}
//               className="h-40 w-full object-cover rounded mb-2"
//             />
//             <h3 className="font-bold text-lg">{product.name}</h3>
//             <p className="text-sm text-gray-600">{product.description}</p>
//             <div className="flex justify-between items-center mt-2">
//               <span className="font-semibold text-green-700">Ksh {product.price}</span>
//               <div className="space-x-2">
//                 <button
//                   onClick={() => handleEdit(product)}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product._id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const categories = ["Trousers", "Tops", "Dresses", "Shoes"];

const initialForm = {
  name: "",
  description: "",
  price: "",            // as string
  category: "",
  isFeatured: false,
  isElegancePick: false,
  images: [],           // array of URLs
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/products`);
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const currentImages = form.images || [];

    // Limit to 3 images total
    if (currentImages.length + files.length > 3) {
      toast.error("You can upload a maximum of 3 images.");
      return;
    }

    const uploadedUrls = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("image", files[i]);

      try {
        const res = await fetch(`${SERVER_URL}/api/upload/image`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          uploadedUrls.push(data.imageUrl);
        } else {
          toast.error(`Failed to upload image ${i + 1}`);
        }
      } catch (err) {
        toast.error(`Error uploading image ${i + 1}`);
      }
    }

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure at least one image is uploaded before submitting
    if (!form.images || form.images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    // Convert price from string to number
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      isFeatured: form.isFeatured,
      isElegancePick: form.isElegancePick,
      images: form.images,
    };

    const method = editId ? "PUT" : "POST";
    const endpoint = editId
      ? `${SERVER_URL}/api/products/${editId}`
      : `${SERVER_URL}/api/products`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Product upload failed");

      toast.success(editId ? "Product updated" : "Product added");
      setForm(initialForm);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category: product.category,
      isFeatured: product.isFeatured,
      isElegancePick: product.isElegancePick,
      images: product.images || [],   // prefill with existing images
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`${SERVER_URL}/api/products/${id}`, { method: "DELETE" });
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const filteredProducts = products.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.isFeatured;
    if (filter === "elegance") return p.isElegancePick;
    return p.category === filter;
  });

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageUpload}
            className="border p-2 rounded"
          />
          <div className="flex gap-2 flex-wrap">
            {form.images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`preview-${idx}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 rounded w-full"
          rows={3}
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleInputChange}
            />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isElegancePick"
              checked={form.isElegancePick}
              onChange={handleInputChange}
            />
            Elegance Pick
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          className={`px-3 py-1 rounded border ${
            filter === "all" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            filter === "featured" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setFilter("featured")}
        >
          Featured
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            filter === "elegance" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setFilter("elegance")}
        >
          Elegance Pick
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded border ${
              filter === cat ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold text-green-700">
                Ksh {product.price}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
