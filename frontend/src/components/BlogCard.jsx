import { Link } from "react-router-dom";

export default function BlogCard({ blog, mine = false, onDelete }) {
  const preview =
    blog.content.length > 150
      ? `${blog.content.slice(0, 150)}...`
      : blog.content;

  return (
    <article className="flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-3 flex items-center justify-between gap-3 text-sm text-slate-500">
        <span>By {blog.author_name}</span>
        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
      </div>

      <h2 className="mb-3 text-xl font-bold text-slate-900">{blog.title}</h2>
      <p className="mb-6 flex-1 whitespace-pre-line leading-7 text-slate-600">{preview}</p>

      <div className="flex flex-wrap gap-3">
        <Link
          to={`/blogs/${blog.id}`}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Read More
        </Link>

        {mine && (
          <>
            <Link
              to={`/edit/${blog.id}`}
              className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(blog.id)}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
}
