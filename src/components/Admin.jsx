import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Admin = () => {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!productId || !name || !price || !imageUrl) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: Number(productId),   // ✅ MANUAL PRODUCT ID
          name,
          price: Number(price),
          image_url: imageUrl,              // ✅ CORRECT FIELD
          rating: 0,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to add product");
        return;
      }

      setMessage("Product added successfully!");

      setProductId("");
      setName("");
      setPrice("");
      setImageUrl("");

      setTimeout(() => {
        setMessage("");
        navigate("/products");
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-[80vh]">
        <form
          onSubmit={handleAdd}
          className="w-[500px]  m-4 p-6 rounded-md border-2 border-slate-700 flex flex-col"
        >
          <h2 className="text-2xl font-bold mx-auto mb-4">
            Add Product
          </h2>

          {/* PRODUCT ID */}
          <label className="text-xl px-2 mt-4">Product ID</label>
          <input
            className="w-full p-2 rounded-md border-2 border-gray-300 m-2"
            type="number"
            placeholder="Unique Product ID (eg: 101)"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          {/* NAME */}
          <label className="text-xl px-2 mt-4">Name</label>
          <input
            className="w-full p-2 rounded-md border-2 border-gray-300 m-2"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* PRICE */}
          <label className="text-xl px-2 mt-4">Price</label>
          <input
            className="w-full p-2 rounded-md border-2 border-gray-300 m-2"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* IMAGE */}
          <label className="text-xl px-2 mt-4">Image URL</label>
          <input
            className="w-full p-2 rounded-md border-2 border-gray-300 m-2"
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button
            type="submit"
            className="bg-black text-white rounded-md p-3 mt-6 w-[150px] mx-auto hover:bg-gray-900"
          >
            Add Product
          </button>

          {message && (
            <p className="text-green-600 font-semibold text-center mt-4">
              {message}
            </p>
          )}
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Admin;
