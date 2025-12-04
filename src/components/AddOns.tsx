import { Sparkle, ListChecks, Phone } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const AddOns = () => {
  const addOns = [
    {
      icon: Sparkle,
      title: "AI Lead Scoring for MCA",
      description:
        "Our AI models score every lead for fundability, allowing you to prioritize your outreach and focus on the deals most likely to close.",
    },
    {
      icon: ListChecks,
      title: "Data Enrichment & Verification (TCPA/DNC)",
      description:
        "We enrich your leads with critical data points and verify them for TCPA/DNC compliance, ensuring accuracy and protecting your business.",
    },
    {
      icon: Phone,
      title: "Managed Outreach Sequences",
      description:
        "Let us handle the initial outreach. We can deploy automated, multi-channel sequences to warm up your leads before they hit your sales floor.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-4xl font-bold text-primary md:text-[40px]">
            Boost Conversions with Add‑Ons
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {addOns.map((addOn) => (
            <div key={addOn.title} className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-surface">
                <addOn.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-semibold text-text-primary">
                {addOn.title}
              </h3>
              <p className="font-body text-base text-text-secondary">{addOn.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/add-ons">
              Explore Add-Ons <span className="ml-2">→</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddOns;
