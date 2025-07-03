import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaHeart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import "../index.css"; // Import global styles


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [related, setRelated] = useState([]);
  const [likes, setLikes] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const phoneNumber = "254708127470";

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[activeImageIndex]);
    }
  }, [activeImageIndex, product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/products/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data.product);
        setSelectedImage(data.product.images?.[0]);
        setLikes(data.product.likes || 0);

        // Fetch related products
        const category = data.product.category;
        const relatedRes = await fetch(`${SERVER_URL}/api/products`);
        const allProducts = await relatedRes.json();

        const filtered = allProducts.products.filter(
          (p) => p._id !== productId && p.category === category
        );
        setRelated(filtered);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="flex justify-center mt-20">
        <CircularProgress size={40} sx={{ color: "#ec4899" }} />
      </div>
    );
  }

  const handleLike = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/products/like/${productId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        setLikes(data.likes);
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

  // const handleImageClick = (image) => setSelectedImage(image);
  const message = `Hi, I'm interested in the product: ${product.name}.( ${product.images?.[0]} ). Please provide more details.`;
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const openModalAtIndex = (index) => {
    setActiveImageIndex(index);
    // setIsModalOpen(true);
  };

  return (
    <>
      {product && (
        <Helmet>
          <title>{product.name} | Beauty Boutique</title>
          <meta
            name="description"
            content={`Discover ${product.name}. Buy now from Beauty Boutique — Affordable. Elegant. Fast.`}
          />
          <meta property="og:title" content={product.name} />
          <meta
            property="og:description"
            content={`Explore ${product.name} now on Beauty Boutique.`}
          />
          <meta property="og:image" content={product.images?.[0]} />
          <meta
            property="og:url"
            content={`https://mcbotique.site/product/${productId}`}
          />
          <link
            rel="canonical"
            href={`https://mcbotique.site/product/${productId}`}
          />
        </Helmet>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center w-full">
            {/* Main Image with Hover Zoom */}
            <div
              className="relative w-full max-w-3xl h-[500px] overflow-hidden rounded-xl shadow-lg bg-gray-100 group cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => openModalAtIndex(idx)}
                  className={`w-24 h-24 rounded-lg object-cover cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-pink-700"
                      : "border-gray-300"
                  } hover:scale-105 transition`}
                  alt="Thumbnail"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
            <div className="text-3xl font-semibold text-green-600 inconsolata-font">
              Ksh {product.price}
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="d">
                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-green-600 text-white text-lg rounded-full shadow-md hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-2xl" />
                  Buy/Book via WhatsApp
                </a>
              </div>
              {/* Floating hearts */}
              {floatingHearts
                .filter((h) => h.productId === product._id)
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
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  // className="text-pink-600 text-2xl hover:text-pink-800 transition h-8 w-8 flex items-center justify-center"
                  className="p-3 rounded-full border-2 transition-all bg-red-100 border-red-500 text-red-500 hover:text-pink-800"
                  title="Like this product"
                >
                  <FaHeart />
                </button>
                <span className="text-gray-700 text-md font-semibold mt-4 underline hover:text-pink-600 transition bg-pink-100 px-2 py-1 rounded-lg">
                  {likes} like{likes !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text33xl font-semibold text-gray-800 mb-6 text-center inconsolata-font underline">
              Related Products
            </h2>

            <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar">
              {related.map((rel) => (
                <div
                  key={rel._id}
                  className="min-w-[250px] bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 items-center text-center"
                >
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {rel.name}
                  </h3>
                  <p className="text-green-600 font-medium inconsolata-font text-lg">Ksh {rel.price}</p>

                  <Link
                    to={`/product/${rel._id}`}
                    className=" inline-block text-pink-600 hover:text-pink-700 transition-all font-bold  inconsolata-font"
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)} // close on backdrop click
        >
          <div
            className="relative max-w-5xl w-[90%] h-[80vh] bg-white rounded-lg overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()} // prevent modal from closing on image click
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 p-2 rounded-full z-50"
            >
              ✕
            </button>

            {/* Prev Button */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === 0 ? product.images.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-40 hover:bg-opacity-70 p-2 rounded-full"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === product.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-40 hover:bg-opacity-70 p-2 rounded-full"
            >
              ›
            </button>

            {/* Modal Image */}
            <img
              src={product.images[activeImageIndex]}
              alt="Zoomed"
              className="w-full h-full object-contain bg-black"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductDetailPage;
