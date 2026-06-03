import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0C0C0C] selection:bg-primary selection:text-primary-foreground">
      <Card className="w-full max-w-md mx-4 bg-[#141414] border-white/10">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex flex-col items-center mb-6 gap-4">
            <div className="p-4 bg-white/5 rounded-full">
              <AlertCircle className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">404 - Page Not Found</h1>
          </div>

          <p className="text-white/60 mb-8 leading-relaxed">
            The page you are looking for doesn't exist or has been moved to a new digital dimension.
          </p>

          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
