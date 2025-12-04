import { Shield, Robot, ShieldCheck, TrendUp } from "@phosphor-icons/react";
import diverseBusinessImage from "@/assets/industries-diverse-businesses.png";

const WhyDifferent = () => {
  const features = [
    {
      icon: Shield,
      title: "True Exclusivity—One Buyer Per Lead",
      description:
        "Our top-tier leads are sold once and never resold. You get a clean, uncontested shot at the deal. No more competing with 10-20 other brokers for burned-out prospects.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance First (Consent, TCPA, DNC)",
      description:
        "We take compliance seriously. Every lead is verified for consent and scrubbed against DNC and known litigator lists. Full audit trails with timestamps, IP addresses, and opt-in copy included.",
    },
    {
      icon: Robot,
      title: "Real‑Time Delivery & Routing",
      description:
        "Leads are delivered to your CRM in under 60 seconds, with intelligent routing to get the right lead to the right rep, instantly. API, webhook, email, or SFTP—your choice.",
    },
    {
      icon: TrendUp,
      title: "Conversion Accountability, Not Just Volume",
      description:
        "Our success is tied to yours. We provide the data, strategy, and support you need to actually convert leads and grow your business. Quality over quantity, always.",
    },
  ];

  return (
    <section className="relative bg-slate-50 section-padding overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] decorative-blob decorative-blob-accent opacity-30" />
      
      <div className="container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Lead Slaps Is Different
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're not just a lead vendor—we're your strategic partner in growth
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                >
                  <div className="icon-container mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl blur-xl" />
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src={diverseBusinessImage}
                  alt="Diverse small business owners across industries served by Lead Slaps MCA leads"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
