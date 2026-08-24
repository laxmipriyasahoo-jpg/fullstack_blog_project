import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import BlogForm from "../components/BlogForm";

export default function CreateBlog() {
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      await api.post("/blogs/", data);
      toast.success("Blog published!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Could not create blog.");
      throw error;
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-black">Write a New Blog</h1>
      <p className="mb-7 text-slate-500">Share something useful with your readers.</p>
      <BlogForm onSubmit={submit} buttonText="Publish Blog" />
    </section>
  );
}
