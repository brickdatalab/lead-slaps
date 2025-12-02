import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Products", href: "/products" },
    { label: "Add-Ons", href: "/add-ons" },
    { label: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200 ${isScrolled ? "shadow-sm" : ""}`}>
      <nav className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="Lead Slaps Logo" className="h-10 w-10" />
          <span className="font-heading text-2xl font-bold text-primary">Lead Slaps</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative font-body text-sm font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
                isActiveLink(link.href)
                  ? "text-primary after:scale-x-100"
                  : "text-text-secondary hover:text-primary after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button variant="default" size="default" asChild className="border-2 border-primary transition-all hover:bg-background hover:text-primary">
            <a href="/products">Build Dataset</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 top-20 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu */}
          <div className="fixed left-0 right-0 top-20 z-50 bg-white shadow-lg lg:hidden animate-fade-in">
            <div className="container mx-auto flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-body text-lg font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="default" size="lg" asChild className="mt-4 border-2 border-primary transition-all hover:bg-background hover:text-primary">
                <a href="/products" onClick={() => setMobileMenuOpen(false)}>
                  Build Dataset
                </a>
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navigation;
