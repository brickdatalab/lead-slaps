import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  return (
    <section id="faq" className="bg-background py-24">
      <div className="container mx-auto max-w-4xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-primary md:text-[40px]">
            Your Core Questions About MCA Lead Generation
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-text-secondary">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
