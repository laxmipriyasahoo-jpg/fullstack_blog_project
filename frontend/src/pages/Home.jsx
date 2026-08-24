import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/blogs/")
      .then((res) => setBlogs(res.data))
      .catch(() => toast.error("Could not load blogs."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold text-indigo-200">FULL STACK BLOG PLATFORM</p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Share ideas. Build your audience. Tell your story.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
              A modern responsive blog application powered by React, Tailwind CSS, Django REST Framework and JWT authentication.
            </p>
            <Link
              to="/create"
              className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-bold text-indigo-700 hover:bg-indigo-50"
            >
              Start Writing
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Latest Blogs</h2>
            <p className="mt-2 text-slate-500">Explore stories from the community.</p>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center">
            <h3 className="text-xl font-bold">No blogs yet</h3>
            <p className="mt-2 text-slate-500">Be the first person to publish a blog.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        )}
      </section>
    </>
  );
}
