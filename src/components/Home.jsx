import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = async (productId) => {
    await addToCart(productId);  // ✅ add product
    navigate("/cart");           // ✅ NOW GO TO CART
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-6">
        <h1 className="text-2xl font-semibold">Welcome to KIRAA</h1>
        <p className="text-sm text-gray-600">Styles for every mood.</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
          {products.map((product) => (
            <Cards
              key={product.product_id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
