import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage your blogs.">
      <form onSubmit={submit} className="space-y-5">
        <Input label="Username" value={form.username} onChange={(v) => setForm({...form, username: v})} />
        <Input label="Password" type="password" value={form.password} onChange={(v) => setForm({...form, password: v})} />
        <button disabled={loading} className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account? <Link to="/register" className="font-semibold text-indigo-600">Register</Link>
      </p>
    </AuthLayout>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block font-semibold">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
    </label>
  );
}

export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-white p-7 shadow-sm md:p-9">
        <h1 className="text-3xl font-black">{title}</h1>
        <p className="mt-2 mb-7 text-slate-500">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
