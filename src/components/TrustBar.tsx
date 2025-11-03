import { Shield, TrendingUp, Users, CheckCircle } from "lucide-react";

const TrustBar = () => {
  const features = [
    {
      icon: CheckCircle,
      text: "100% Exclusive Data Options",
    },
    {
      icon: TrendingUp,
      text: "Built for Broker ROI",
    },
    {
      icon: Shield,
      text: "No 'Race to the Bottom' Model",
    },
    {
      icon: Users,
      text: "Vetted, High-Intent Prospects",
    },
  ];

  return (
    <section className="bg-surface py-12">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <feature.icon className="h-6 w-6 flex-shrink-0 text-accent" />
              <span className="font-body text-base font-semibold text-text-primary">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
