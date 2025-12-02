import { Shield, CheckCircle, Target, Zap } from "lucide-react";

const TrustBar = () => {
  const features = [
    {
      icon: Shield,
      text: "100% TCPA Compliant",
    },
    {
      icon: CheckCircle,
      text: "Verified Connectivity",
    },
    {
      icon: Target,
      text: "High-Intent Prospects",
    },
    {
      icon: Zap,
      text: "Real-Time Delivery",
    },
  ];

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-primary md:text-3xl">
          Trusted by Top MCA Brokers, ISOs, and Funders
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-5 w-5 flex-shrink-0 text-primary" />
              </div>
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
