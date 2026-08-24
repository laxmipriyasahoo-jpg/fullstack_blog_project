import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { AuthLayout } from "./Login";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      const data = error.response?.data;
      const message = data
        ? Object.values(data).flat().join(" ")
        : "Registration failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Join the BlogSphere community.">
      <form onSubmit={submit} className="space-y-5">
        {[
          ["username", "Username", "text"],
          ["email", "Email", "email"],
          ["password", "Password", "password"],
        ].map(([name, label, type]) => (
          <label key={name} className="block">
            <span className="mb-2 block font-semibold">{label}</span>
            <input
              type={type}
              value={form[name]}
              onChange={(e) => setForm({...form, [name]: e.target.value})}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        ))}
        <button disabled={loading} className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already registered? <Link to="/login" className="font-semibold text-indigo-600">Login</Link>
      </p>
    </AuthLayout>
  );
}
