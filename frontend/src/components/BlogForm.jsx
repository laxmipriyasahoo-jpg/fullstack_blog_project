import { useEffect, useState } from "react";

export default function BlogForm({ initialData, onSubmit, buttonText }) {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        content: initialData.content || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
      <div>
        <label className="mb-2 block font-semibold">Blog Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          maxLength={200}
          placeholder="Enter your blog title"
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows="12"
          placeholder="Write your story..."
          className="w-full resize-y rounded-xl border px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
}
