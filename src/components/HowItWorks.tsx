const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Define Your Strategy",
      description:
        "Tell us your ideal borrower profile, volume needs, and compliance requirements.",
    },
    {
      number: "02",
      title: "We Source & Validate",
      description:
        "Our AI-powered systems source, verify, and exclusivity-lock your data, ensuring quality and low competition.",
    },
    {
      number: "03",
      title: "Scale Predictably",
      description:
        "We launch delivery, provide weekly reporting, and iterate with you to ensure your pipeline is always full and your ROI is climbing.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-background py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-primary md:text-[40px]">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary">
            Partner with us in three simple steps
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-surface">
                <span className="text-3xl font-bold text-primary">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-text-secondary">
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
