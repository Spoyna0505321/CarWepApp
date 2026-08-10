import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold tracking-widest text-white">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-400">
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}