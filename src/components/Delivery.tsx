import { Zap, Database, Mail, ArrowRight } from "lucide-react";

const Delivery = () => {
  const methods = [
    {
      icon: Zap,
      title: "Real-Time API/Webhook",
      description:
        "Instant delivery via RESTful API or webhook. We also support scheduled SFTP drops and simple email/CSV delivery.",
    },
    {
      icon: Database,
      title: "Major CRM Integrations",
      description:
        "Salesforce, HubSpot, Zoho, Zapier (for thousands of other apps).",
    },
    {
      icon: Mail,
      title: "Dialer Integrations",
      description:
        "Five9, RingCentral, CallTools, and other major dialers supported.",
    },
  ];

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-4xl font-bold text-primary md:text-[40px]">
            Real‑Time Delivery and CRM Integrations (Salesforce, HubSpot, Zoho, Zapier)
          </h2>
          <p className="font-body text-lg text-text-secondary">
            Get your leads delivered how you want them. We offer seamless integrations with all major CRMs and dialers.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {methods.map((method) => (
            <div key={method.title} className="rounded-lg bg-surface p-8">
              <method.icon className="mb-4 h-10 w-10 text-accent" />
              <h3 className="mb-3 font-heading text-xl font-semibold text-text-primary">
                {method.title}
              </h3>
              <p className="mb-4 font-body text-base leading-relaxed text-text-secondary">
                {method.description}
              </p>
              <a
                href="/products"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent transition-colors hover:text-accent/80"
              >
                See All Integrations <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Delivery;
