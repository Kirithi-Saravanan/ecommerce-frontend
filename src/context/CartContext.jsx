import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  // =========================
  // FETCH CART
  // =========================
  const fetchCart = async () => {
    if (!token) {
      setCart({ products: [] });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://ecommerce-backend-zoi2.onrender.com/cart", {
        headers: {
          Authorization: token,
        },
      });

      if (res.status === 401) {
        sessionStorage.clear();
        setCart({ products: [] });
        return;
      }

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Cart fetch failed", err);
      setCart({ products: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (productId) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    await fetch("https://ecommerce-backend-zoi2.onrender.com/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ productId }),
    });

    fetchCart();
  };

  // =========================
  // UPDATE QTY
  // =========================
  const updateQty = async (productId, change) => {
    if (!token) return;

    await fetch("hhttps://ecommerce-backend-zoi2.onrender.com/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ productId, change }),
    });

    fetchCart();
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeItem = async (productId) => {
    if (!token) return;

    await fetch(`https://ecommerce-backend-zoi2.onrender.com/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        increaseQty: (id) => updateQty(id, 1),
        decreaseQty: (id) => updateQty(id, -1),
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
