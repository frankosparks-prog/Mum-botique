import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';

const sampleProducts = [
  {
    id: 1,
    name: 'Elegant Handbag',
    price: '$45.00',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Stylish Sunglasses',
    price: '$30.00',
    image:
      'https://images.unsplash.com/photo-1593032465171-d29f6e942f44?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Floral Dress',
    price: '$60.00',
    image:
      'https://images.unsplash.com/photo-1618354691321-00f6e1f91d14?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Gold Necklace',
    price: '$120.00',
    image:
      'https://images.unsplash.com/photo-1622445275682-cf86b2613e7b?auto=format&fit=crop&w=600&q=80',
  },
];

function Products() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-white text-gray-800 mt-[-1.9rem]">
      {/* Hero Section */}
      <div
        className="h-[350px] flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://picsum.photos/400/250?random=1')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1
          className="text-white text-4xl md:text-5xl font-bold z-10 drop-shadow-lg"
          data-aos="fade-up"
        >
          Our Collection
        </h1>
      </div>

      {/* Products Section */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2
          className="text-3xl font-semibold text-center mb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Handpicked for Elegance
        </h2>

        <div
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {sampleProducts.map((product, index) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={500 + index * 100}
              className="border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-t-xl w-full h-60 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-pink-500 text-md font-medium mt-2">
                  {product.price}
                </p>
                <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full font-medium transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Products;
