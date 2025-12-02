import { Linkedin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.svg";

const Footer = () => {
  const footerLinks = {
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    solutions: [
      { label: "Products", href: "/products" },
      { label: "Add-Ons", href: "/add-ons" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "TCPA Compliance", href: "/tcpa" },
    ],
  };

  return (
    <footer className="border-t border-border bg-slate-900 py-16">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Contact Information */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+18555323362"
                  className="font-body text-sm text-slate-300 transition-all hover:text-white hover:underline underline-offset-2"
                >
                  (855) LEAD-MCA
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:sales@leadslaps.com"
                  className="font-body text-sm text-slate-300 transition-all hover:text-white hover:underline underline-offset-2"
                >
                  sales@leadslaps.com
                </a>
              </li>
            </ul>
            <p className="mt-4 font-body text-xs text-slate-400">
              Monday - Friday: 9am - 6pm EST<br />
              Response time: Under 2 hours
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-slate-300 transition-all hover:text-white hover:underline underline-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Solutions
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-slate-300 transition-all hover:text-white hover:underline underline-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-slate-300 transition-all hover:text-white hover:underline underline-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Lead Slaps Logo" className="h-8 w-8" />
            <p className="font-body text-sm text-slate-300">
              © 2025 Lead Slaps. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/company/leadslaps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/leadslaps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors hover:text-primary"
              aria-label="X (Twitter)"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
