import { useEffect } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes your leads 'exclusive'?",
      answer:
        "Unlike traditional providers who sell the same lead to 10-20 brokers, our Apex product offers 100% exclusivity - you're the only broker receiving that prospect. Our Alpha product limits competition to just 2-3 qualified brokers, still dramatically better than industry standard.",
    },
    {
      question: "How do you verify lead quality?",
      answer:
        "Every lead passes through our AI-powered verification system that validates business information, checks credit indicators, confirms contact accuracy, and screens against DNC/litigator databases. We also validate funding intent through behavioral signals and direct engagement metrics.",
    },
    {
      question: "What's the difference between your three products?",
      answer:
        "Direct Submissions are real-time leads from businesses actively seeking funding. Alpha Data provides semi-exclusive leads with controlled competition (2-3 brokers). Apex Data offers 100% exclusive leads with zero competition - you're the only broker working that prospect.",
    },
    {
      question: "How quickly can I start receiving leads?",
      answer:
        "After our initial strategy session where we define your ideal borrower profile and compliance requirements, we typically begin delivery within 5-7 business days. Our team handles all setup, verification, and integration work.",
    },
    {
      question: "What integrations do you support?",
      answer:
        "We offer seamless integrations with HubSpot, Salesforce, and thousands of other platforms via Zapier. We also support standard delivery methods including email, CSV export, and our real-time API for custom integrations.",
    },
    {
      question: "What if the leads don't convert?",
      answer:
        "We're a scalability partner, not a transactional vendor. If conversion rates aren't meeting expectations, we work with you to refine targeting criteria, adjust delivery volume, and optimize data quality. Our success is directly tied to your long-term ROI.",
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
            Your Core Questions About MCA Lead Generation
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
