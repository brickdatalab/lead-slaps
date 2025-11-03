import { ArrowRight } from "lucide-react";

const ProductPreview = () => {
  const products = [
    {
      title: "Live Transfer MCA Leads",
      subtitle: "Real Conversations, Real Intent",
      description:
        "For teams that want to speak directly with qualified, interested merchants. We handle the initial contact and transfer the call to your closer.",
      href: "/products",
    },
    {
      title: "Fresh Submission Exclusive MCA Leads",
      subtitle: "",
      description:
        "Our premier offering. Real-time, consent-based leads from direct web form submissions, sold only to you.",
      href: "/products",
    },
    {
      title: "Aged MCA Leads",
      subtitle: "Qualified, Lower CPL",
      description:
        "High-quality, curated aged leads for teams that need consistent volume at a lower cost per lead. Perfect for multi-touch campaigns.",
      href: "/products",
    },
  ];

  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-4xl font-bold text-primary md:text-[40px]">
            Choose the Right MCA Leads for Your Pipeline
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-lg bg-card p-10 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <h3 className="mb-2 font-heading text-2xl font-semibold text-text-primary">
                {product.title}
              </h3>
              {product.subtitle && (
                <p className="mb-4 font-body text-sm font-medium text-accent">
                  {product.subtitle}
                </p>
              )}
              <p className="mb-6 font-body text-base leading-relaxed text-text-secondary">
                {product.description}
              </p>
              <a
                href={product.href}
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent transition-colors hover:text-accent/80"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
