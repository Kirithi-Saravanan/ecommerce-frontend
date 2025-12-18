import { useContext, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem } =
    useContext(CartContext);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const cartItems = cart.products || [];

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const token = sessionStorage.getItem("token");

    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    const res = await fetch("https://ecommerce-backend-zoi2.onrender.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        address,
        paymentMethod,
      }),
    });

    if (!res.ok) {
      alert("Order failed");
      return;
    }

    alert("Order placed successfully 🎉");
    setAddress("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {/* CART ITEMS */}
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-6 bg-white shadow p-4 mb-4"
              >
                {/* IMAGE */}
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-24 h-32 object-cover"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.product.name}
                  </h3>
                  <p className="text-sm">
                    Rs. {item.product.price}
                  </p>
                </div>

                {/* QUANTITY CONTROLS (SQUARE) */}
                <div className="flex items-center border">
                  <button
                    onClick={() =>
                      decreaseQty(item.product.product_id)
                    }
                    className="w-8 h-8 flex items-center justify-center
                               border-r text-lg
                               hover:bg-gray-200 transition"
                  >
                    −
                  </button>

                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item.product.product_id)
                    }
                    className="w-8 h-8 flex items-center justify-center
                               border-l text-lg
                               hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeItem(item.product.product_id)
                  }
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* ADDRESS */}
            <textarea
              className="w-full border p-3 mb-4"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

            {/* PAYMENT */}
            <select
              className="w-full border p-3 mb-6"
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
            </select>

            {/* TOTAL */}
            <div className="flex justify-between font-bold mb-4">
              <span>Total</span>
              <span>Rs. {totalAmount}</span>
            </div>

            {/* CHECKOUT */}
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3
                         hover:bg-gray-900 transition"
            >
              Checkout
            </button>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
