import { MagnifyingGlass, Brain, PaperPlaneTilt } from "@phosphor-icons/react";
import dashboardImage from "@/assets/dashboard-crm-interface.png";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: MagnifyingGlass,
      title: "Capture and Qualify Fresh Merchant Cash Advance Leads",
      description:
        "We capture high-intent leads from multiple sources, including inbound web forms, partner data, and proprietary intent signals. Every lead is pre-qualified based on your criteria and consent is verified at the source.",
    },
    {
      number: "02",
      icon: Brain,
      title: "Score, Enrich, and Route in Real Time",
      description:
        "Our AI models score each lead for fundability, enrich it with critical data points (revenue, time-in-business), and validate it for TCPA/DNC compliance. This ensures you get the most accurate and actionable data.",
    },
    {
      number: "03",
      icon: PaperPlaneTilt,
      title: "Deliver Exclusive Leads or Live Transfers to Your CRM",
      description:
        "We deliver exclusive leads directly to your CRM or dialer via real-time API, webhook, or other integrations. For qualified prospects, we can initiate a live transfer, connecting your closers with interested merchants instantly.",
    },
  ];

  return (
    <section className="relative bg-white section-padding overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-primary-subtle" />
      
      <div className="container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-primary/5 rounded-full text-primary text-sm font-medium mb-4">
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Our AI‑Powered MCA Lead Generation Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From capture to conversion, our platform ensures every lead is qualified, compliant, and ready to close
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block step-connector" />
                )}
                
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                  {/* Step Number & Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="step-number">{step.number}</div>
                    <div className="icon-container-sm">
                      <step.icon className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-xl" />
            <div className="relative bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
              <img
                src={dashboardImage}
                alt="Real-time MCA lead dashboard with analytics and scoring"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
