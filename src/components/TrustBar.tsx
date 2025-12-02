import { Shield, CheckCircle, Target, Zap } from "lucide-react";

const TrustBar = () => {
  const features = [
    { icon: Shield, text: "100% TCPA Compliant" },
    { icon: CheckCircle, text: "Verified Connectivity" },
    { icon: Target, text: "High-Intent Prospects" },
    { icon: Zap, text: "Real-Time Delivery" },
  ];

  return (
    <section className="bg-slate-50 py-8 md:py-12">
      <div className="container-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="sr-only">Trusted by Top MCA Brokers, ISOs, and Funders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="icon-container">
                  <feature.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-700 text-sm md:text-base">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
