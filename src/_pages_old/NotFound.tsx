import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, BookOpen, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const helpfulLinks = [
    { href: "/", label: "Home", icon: Home, description: "Return to the homepage" },
    { href: "/blog", label: "Blog", icon: BookOpen, description: "Read our fitness articles" },
    { href: "/about", label: "About Us", icon: Users, description: "Learn about Forge" },
  ];

  return (
    <>
      <SEOHead
        title="Page Not Found - Forge"
        description="The page you're looking for doesn't exist. Navigate back to Forge to discover AI-powered personal training and custom workout plans."
        canonicalPath="/404"
        noindex={true}
      />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved. 
            Let's get you back on track to your fitness journey.
          </p>

          <div className="grid gap-4 mb-8">
            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{link.label}</p>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
