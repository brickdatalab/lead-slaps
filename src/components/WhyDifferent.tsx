import { Shield, Sparkles, CheckCircle, TrendingUp } from "lucide-react";

const WhyDifferent = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "True Exclusivity",
      description:
        "We structurally limit competition to give you a clean, uncontested shot at the deal. No more racing 10 other brokers to the same burned-out lead.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Verification",
      description:
        "Our proprietary systems verify every data point, ensuring the highest levels of accuracy and connectivity. You get data you can actually use.",
    },
    {
      icon: Shield,
      title: "Proactive Compliance Shield",
      description:
        "We scrub every lead against national DNC lists and known litigator databases *before* you get it, protecting your business from legal risk.",
    },
    {
      icon: TrendingUp,
      title: "Built to Scale",
      description:
        "Our model is designed for your growth. From our tiered products to our data add-ons, every part of our system is built to fuel your long-term success.",
    },
  ];

  return (
    <section id="why-us" className="bg-surface py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-primary md:text-[40px]">
            The Direct MCA Leads Difference
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
