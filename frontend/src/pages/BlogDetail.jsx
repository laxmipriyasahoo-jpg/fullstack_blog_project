import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blogs/${id}/`)
      .then((res) => setBlog(res.data))
      .catch(() => {
        toast.error("Blog not found.");
        navigate("/");
      });
  }, [id, navigate]);

  const deleteBlog = async () => {
    if (!window.confirm("Delete this blog permanently?")) return;
    try {
      await api.delete(`/blogs/${id}/`);
      toast.success("Blog deleted.");
      navigate("/dashboard");
    } catch {
      toast.error("You can only delete your own blog.");
    }
  };

  if (!blog) return <p className="py-20 text-center">Loading...</p>;

  const owner = user?.username === blog.author_name;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/" className="text-sm font-semibold text-indigo-600">← Back to blogs</Link>
      <div className="mt-7 rounded-2xl border bg-white p-6 shadow-sm md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <span>By {blog.author_name}</span>
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
        <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">{blog.title}</h1>
        <div className="mt-8 whitespace-pre-wrap text-lg leading-9 text-slate-700">{blog.content}</div>

        {owner && (
          <div className="mt-10 flex gap-3 border-t pt-6">
            <Link to={`/edit/${blog.id}`} className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white">Edit</Link>
            <button onClick={deleteBlog} className="rounded-lg border border-red-200 px-5 py-2.5 font-semibold text-red-600">Delete</button>
          </div>
        )}
      </div>
    </article>
  );
}
