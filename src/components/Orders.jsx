import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const fetchOrders = async () => {
    // 🔐 If not logged in → login
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://ecommerce-backend-zoi2.onrender.com/orders", {
        headers: {
          Authorization: token,
        },
      });

      // 🔴 Token expired / invalid
      if (res.status === 401) {
        sessionStorage.clear();
        navigate("/login");
        return;
      }

      const data = await res.json();

      // ✅ Always ensure array
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Orders fetch failed", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    await fetch(`https://ecommerce-backend-zoi2.onrender.com/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    fetchOrders();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-black p-6 mb-8"
            >
              {/* HEADER */}
              <div className="flex justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">
                    Ordered on
                  </p>
                  <p className="font-semibold">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Order Status
                  </p>
                  <p className="font-semibold text-green-700">
                    {order.orderStatus}
                  </p>
                </div>
              </div>

              <hr />

              {/* ITEMS */}
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-6 py-6"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-28 h-40 object-cover border"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">
                      {item.name}
                    </p>
                    <p className="text-sm">
                      Rs. {item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    Rs. {item.price * item.quantity}
                  </p>
                </div>
              ))}

              <hr />

              {/* ADDRESS */}
              <div className="mt-4">
                <p>
                  <b>Address:</b> {order.address}
                </p>
                <p>
                  <b>Payment:</b> {order.paymentMethod} (
                  {order.paymentStatus})
                </p>
              </div>

              {/* TOTAL + CANCEL */}
              <div className="mt-6 flex justify-between items-center">
                <p className="font-bold text-lg">
                  Total: Rs. {order.totalAmount}
                </p>

                {order.orderStatus === "Placed" && (
                  <button
                    onClick={() =>
                      cancelOrder(order._id)
                    }
                    className="border border-red-500 text-red-600
                               px-6 py-2 hover:bg-red-50"
                  >
                    Cancel Order
                  </button>
                )}

                {order.orderStatus === "Cancelled" && (
                  <span className="text-red-600 font-semibold">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
