const Delivery = () => {
  const integrations = [
    { name: "HubSpot", logo: "🔄" },
    { name: "Salesforce", logo: "☁️" },
    { name: "Zapier", logo: "⚡" },
    { name: "Email", logo: "📧" },
    { name: "CSV", logo: "📊" },
    { name: "API", logo: "🔌" },
  ];

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-12">
        <h2 className="mb-8 text-4xl font-bold text-primary md:text-[40px]">
          Seamless Delivery, Right Where You Work
        </h2>
        <p className="mb-12 text-lg text-text-secondary">
          Get your leads delivered how you want them. We offer seamless integrations with HubSpot, Salesforce, and thousands of other apps via Zapier, plus standard delivery via email, CSV, or our real-time API.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-surface text-3xl">
                {integration.logo}
              </div>
              <span className="text-sm font-medium text-text-secondary">
                {integration.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Delivery;
