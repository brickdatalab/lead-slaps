import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-slate-200 bg-white transition-shadow duration-200 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="Lead Slaps Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold text-primary">Lead Slaps</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ outline: "none", boxShadow: "none" }}
              className={`relative text-base font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
                isActive(link.href)
                  ? "text-primary after:scale-x-100"
                  : "text-slate-600 hover:text-primary after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Build Dataset Button */}
          <a
            href="/build-data-set"
            className="rounded-md border-2 border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-primary"
          >
            Build Dataset
          </a>
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
          <div
            className="fixed inset-0 top-20 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 right-0 top-20 z-50 bg-white shadow-lg lg:hidden">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ outline: "none", boxShadow: "none" }}
                  className={`text-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-slate-600 hover:text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/build-data-set"
                className="mt-4 rounded-md border-2 border-primary bg-primary px-5 py-3 text-center text-base font-semibold text-white transition-all hover:bg-transparent hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Build Dataset
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navigation;
