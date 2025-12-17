import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ STORE SESSION DATA
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("email", email);

      // ✅ NOTIFY CART CONTEXT
      window.dispatchEvent(new Event("auth-change"));

      // REDIRECT
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex justify-center items-center px-4 py-8">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm border border-gray-200 rounded-lg p-6 shadow-sm space-y-4"
        >
          <h1 className="text-xl font-semibold text-center mb-4">
            Login
          </h1>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Email"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Password"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="w-full bg-black text-white py-2 rounded">
            Login
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
