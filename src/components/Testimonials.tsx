import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "My conversion rate doubled. DirectMCA's leads are actually exclusive. I'm not fighting 10 other brokers for the same deal.",
      author: "John Doe, ABC Funding",
    },
    {
      quote:
        "The quality is night and day. We went from a 2% to a 10% contact rate overnight. This is the only lead source we use now.",
      author: "Jane Smith, XYZ Capital",
    },
  ];

  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-4xl font-bold text-primary md:text-[40px]">
            Results from Brokers Like You
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-card p-8 shadow-card"
            >
              <Quote className="mb-4 h-8 w-8 text-accent" />
              <p className="mb-6 font-body text-base leading-relaxed text-text-primary">
                "{testimonial.quote}"
              </p>
              <p className="font-body text-sm font-semibold text-text-secondary">
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
