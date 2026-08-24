import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
      <div>
        <p className="text-7xl font-black text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Go Home</Link>
      </div>
    </div>
  );
}
