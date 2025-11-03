import { useEffect } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What are exclusive MCA leads?",
      answer:
        "Exclusive MCA leads are merchant cash advance leads that are sold to only one buyer. This means you are the only broker receiving that specific lead at that time, giving you an uncontested opportunity to connect with the merchant and close the deal without competition.",
    },
    {
      question: "Aged MCA leads vs fresh submissions: which converts better?",
      answer:
        "It depends on your strategy. Fresh submissions generally have higher intent and convert faster, but at a higher cost. Aged leads have a lower cost per lead (CPL) and can be highly effective for teams with a consistent, multi-touch follow-up process. We recommend a blended approach for most teams.",
    },
    {
      question: "How do MCA live transfers work?",
      answer:
        "An MCA live transfer is a pre-qualified, interested merchant who is transferred directly to your sales team in a live phone call. Our team handles the initial contact and qualification, and when the merchant expresses interest, we connect them to your closer instantly.",
    },
    {
      question: "Are your MCA leads TCPA compliant?",
      answer:
        "Yes. We take compliance very seriously. All of our leads are generated from sources where clear consent has been given, and we scrub every lead against national DNC lists and known litigator databases before delivery.",
    },
    {
      question: "How fast are leads delivered to my CRM?",
      answer:
        "For our fresh submission and live transfer products, leads are delivered in real-time, typically in under 60 seconds. We use webhooks and direct API integrations to ensure instant delivery to your CRM or dialer.",
    },
  ];

  useEffect(() => {
    // Add FAQPage schema markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="faq" className="bg-background px-6 py-24 lg:px-12">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-4xl font-bold text-primary md:text-[40px]">
            MCA Leads FAQ
          </h2>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg bg-surface p-8">
              <h3 className="mb-4 font-heading text-xl font-semibold text-text-primary">
                {faq.question}
              </h3>
              <p className="font-body text-base leading-relaxed text-text-secondary">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
