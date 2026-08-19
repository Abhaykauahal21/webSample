import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-neutral-900 mb-4">404</h1>
        <p className="text-neutral-600 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black/10 hover:bg-black/10 text-neutral-900 rounded-full transition-colors text-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
