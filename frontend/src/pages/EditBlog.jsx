import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import BlogForm from "../components/BlogForm";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blogs/${id}/`)
      .then((res) => setBlog(res.data))
      .catch(() => {
        toast.error("Blog not found.");
        navigate("/dashboard");
      });
  }, [id, navigate]);

  const submit = async (data) => {
    try {
      await api.put(`/blogs/${id}/`, data);
      toast.success("Blog updated!");
      navigate(`/blogs/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Could not update blog.");
      throw error;
    }
  };

  if (!blog) return <p className="py-20 text-center">Loading...</p>;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-7 text-3xl font-black">Edit Blog</h1>
      <BlogForm initialData={blog} onSubmit={submit} buttonText="Update Blog" />
    </section>
  );
}
