const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Capture and Qualify Fresh Merchant Cash Advance Leads",
      description:
        "We capture high-intent leads from multiple sources, including inbound web forms, partner data, and proprietary intent signals. Every lead is pre-qualified based on your criteria and consent is verified at the source.",
    },
    {
      number: "02",
      title: "Score, Enrich, and Route in Real Time",
      description:
        "Our AI models score each lead for fundability, enrich it with critical data points (revenue, time-in-business), and validate it for TCPA/DNC compliance. This ensures you get the most accurate and actionable data.",
    },
    {
      number: "03",
      title: "Deliver Exclusive Leads or Live Transfers to Your CRM",
      description:
        "We deliver exclusive leads directly to your CRM or dialer via real-time API, webhook, or other integrations. For qualified prospects, we can initiate a live transfer, connecting your closers with interested merchants instantly.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-background py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-4xl font-bold text-primary md:text-[40px]">
            How Our AI‑Powered MCA Lead Generation Works
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-surface">
                <span className="font-heading text-3xl font-bold text-primary">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-4 font-heading text-2xl font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="font-body text-base leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
