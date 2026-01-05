import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-neutral-950 to-neutral-900 p-6">
      {/* Main Content */}
      <div className="w-full max-w-2xl text-center px-6 py-12 sharp-shadow animate-fade-in">
        <h1 className="text-8xl md:text-9xl font-extrabold text-neutral-100 tracking-tighter leading-none select-none">
          404
        </h1>

        <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-neutral-100">
          Page Not Found
        </h2>

        <p className="mt-3 text-neutral-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block border border-neutral-700 hover:bg-neutral-800/50 hover:border-neutral-600 transition-all duration-200 text-neutral-300 px-6 py-3 text-sm uppercase tracking-wider rounded-sm"
        >
          Return to Home
        </Link>
      </div>

      {/* Brand Footer */}
      <div className="absolute bottom-6 left-6 text-white">
        <h2 className="text-2xl font-bold">TENDOR</h2>
        <p className="text-neutral-400 text-sm mt-1">Connect with us</p>
      </div>
    </div>
  );
}