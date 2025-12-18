import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ cart is an ARRAY (so .map() always works)
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  // =========================
  // FETCH CART
  // =========================
  const fetchCart = async () => {
    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://ecommerce-backend-zoi2.onrender.com/cart",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.status === 401) {
        sessionStorage.clear();
        setCart([]);
        setLoading(false);
        return;
      }

      const data = await res.json();

      // ✅ backend returns { products: [...] }
      setCart(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      console.error("Cart fetch failed", err);
      setCart([]);
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

    try {
      await fetch(
        "https://ecommerce-backend-zoi2.onrender.com/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ productId }),
        }
      );

      fetchCart();
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQty = async (productId, change) => {
    if (!token) return;

    try {
      await fetch(
        "https://ecommerce-backend-zoi2.onrender.com/cart",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ productId, change }),
        }
      );

      fetchCart();
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeItem = async (productId) => {
    if (!token) return;

    try {
      await fetch(
        `https://ecommerce-backend-zoi2.onrender.com/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.error("Remove item failed", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,          // ✅ array → safe to do cart.map()
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
