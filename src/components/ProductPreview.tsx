import { ArrowRight } from "lucide-react";

const ProductPreview = () => {
  const products = [
    {
      title: "Direct Submissions",
      description:
        "Real-time lead capture from businesses actively seeking funding",
      href: "/products",
    },
    {
      title: "Alpha Data",
      description:
        "Semi-exclusive leads with controlled competition for predictable conversion",
      href: "/products",
    },
    {
      title: "Apex Data",
      description:
        "100% exclusive, zero-competition leads for maximum close rates",
      href: "/products",
    },
  ];

  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-primary md:text-[40px]">
            Three Products. Three Strategies. One Goal: Your Success.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-lg bg-card p-10 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <h3 className="mb-4 text-2xl font-semibold text-text-primary">
                {product.title}
              </h3>
              <p className="mb-6 text-base leading-relaxed text-text-secondary">
                {product.description}
              </p>
              <a
                href={product.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
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
