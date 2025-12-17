import { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cards from "./Cards";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = async (productId) => {
    await addToCart(productId);
    navigate("/cart");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {products.map((product) => (
            <Cards
              key={product.product_id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
