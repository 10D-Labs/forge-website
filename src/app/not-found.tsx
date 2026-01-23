import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-barlow-condensed text-8xl md:text-9xl font-black text-primary mb-4">
          404
        </h1>
        <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary font-barlow mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 font-barlow-condensed text-sm font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-forge-orange-dark transition-all btn-neon"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
