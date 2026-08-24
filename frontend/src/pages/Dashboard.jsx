import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import BlogCard from "../components/BlogCard";

export default function Dashboard() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = () => {
    api.get("/my-blogs/")
      .then((res) => setBlogs(res.data))
      .catch(() => toast.error("Could not load your blogs."))
      .finally(() => setLoading(false));
  };

  useEffect(loadBlogs, []);

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog permanently?")) return;
    try {
      await api.delete(`/blogs/${id}/`);
      setBlogs((current) => current.filter((blog) => blog.id !== id));
      toast.success("Blog deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 flex flex-col justify-between gap-5 rounded-2xl bg-indigo-600 p-7 text-white md:flex-row md:items-center">
        <div>
          <p className="text-indigo-200">Dashboard</p>
          <h1 className="mt-1 text-3xl font-black">Hello, {user?.username} 👋</h1>
          <p className="mt-2 text-indigo-100">Manage all your published posts here.</p>
        </div>
        <Link to="/create" className="rounded-xl bg-white px-5 py-3 text-center font-bold text-indigo-700">
          + New Blog
        </Link>
      </div>

      {loading ? (
        <p className="py-10 text-center text-slate-500">Loading...</p>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <h2 className="text-2xl font-bold">You haven't published anything yet.</h2>
          <Link to="/create" className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Create Your First Blog</Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} mine onDelete={deleteBlog} />
          ))}
        </div>
      )}
    </section>
  );
}
