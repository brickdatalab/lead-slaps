import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "My conversion rate doubled. DirectMCA's leads are actually exclusive. I'm not fighting 10 other brokers for the same deal.",
      author: "Mike R., Senior Broker",
    },
    {
      quote:
        "Finally, a lead provider that actually cares about my ROI. These aren't just leads - it's a partnership.",
      author: "Sarah T., Funding Manager",
    },
    {
      quote:
        "The data quality is unmatched. Every lead is verified, compliant, and ready to close.",
      author: "James K., ISO Owner",
    },
  ];

  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-primary md:text-[40px]">
            Don't Just Take Our Word For It
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-card p-8 shadow-card"
            >
              <Quote className="mb-4 h-8 w-8 text-accent" />
              <p className="mb-6 text-base leading-relaxed text-text-primary">
                "{testimonial.quote}"
              </p>
              <p className="text-sm font-semibold text-text-secondary">
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
