import { Quotes, TrendUp, Star } from "@phosphor-icons/react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "We switched to Lead Slaps after burning through $50K on recycled leads from other providers. Within 30 days, our contact rate went from 8% to 32%, and our funded rate doubled. The exclusivity is real—we're not competing with 15 other brokers anymore.",
      author: "Michael Rodriguez",
      role: "Senior Partner at Capital Bridge Funding",
      metric: "4x increase in contact rate",
      metricValue: "4x",
    },
    {
      quote:
        "The live transfers are game-changing. Our closers are talking to merchants who actually want funding, not cold prospects. We went from 60 dials per funded deal to just 12. ROI is 3.5x what we were getting with aged lists.",
      author: "Sarah Chen",
      role: "VP of Sales at Apex Business Capital",
      metric: "3.5x ROI improvement",
      metricValue: "3.5x",
    },
    {
      quote:
        "TCPA compliance was our biggest concern after getting hit with a lawsuit from our previous lead vendor. Lead Slaps provides full audit trails, consent verification, and DNC scrubbing. We sleep better at night knowing we're protected.",
      author: "David Thompson",
      role: "Compliance Officer at Merchant Growth Partners",
      metric: "Zero compliance issues in 18 months",
      metricValue: "0",
    },
  ];

  return (
    <section className="relative bg-white section-padding overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white" />
      
      <div className="container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warning/10 rounded-full text-warning text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-current" />
              Trusted Results
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Results from MCA Brokers and Funders
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real results from ISOs and direct funders using Lead Slaps
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="quote-card p-6 flex flex-col h-full"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quotes className="w-8 h-8 text-accent/30" />
                </div>
                
                {/* Quote Text */}
                <blockquote className="text-slate-700 text-sm leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="font-semibold text-slate-900 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {testimonial.role}
                  </div>
                  
                  {/* Metric Highlight */}
                  <div className="mt-4">
                    <div className="metric-highlight">
                      <TrendUp className="w-4 h-4" />
                      {testimonial.metric}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
