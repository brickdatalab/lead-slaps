import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductTierCard } from "@/components/products/ProductTierCard";
import { InventoryDashboard } from "@/components/products/InventoryDashboard";
import { OrderConfigurator } from "@/components/products/OrderConfigurator";
import { useInventorySegments, ProductKey } from "@/hooks/useInventorySegments";
import { Shield, Lock, CheckCircle, Target, Sparkles, Phone, ShieldCheck, ArrowRight, Database } from "lucide-react";

const Products = () => {
  const { segments, isLoading, error, lastRefreshed, refresh } = useInventorySegments(60000);
  const [selectedProductKey, setSelectedProductKey] = useState<ProductKey | null>(null);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);

  const scrollToConfigurator = () => {
    document.getElementById('order-configurator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductSelect = (productKey: ProductKey) => {
    setSelectedProductKey(productKey);
    setSelectedSegmentId(null);
    scrollToConfigurator();
  };

  const handleSegmentSelect = (productKey: ProductKey, segmentId: string) => {
    setSelectedProductKey(productKey);
    setSelectedSegmentId(segmentId);
    scrollToConfigurator();
  };

  const verificationSteps = [
    {
      num: 1,
      icon: Target,
      title: "High-intent data sourcing",
      desc: "Sources are direct web forms, inbound funnels, and vetted partners—not scraped directories or bulk business databases."
    },
    {
      num: 2,
      icon: Sparkles,
      title: "Automated data hygiene",
      desc: "Phone/email validation, deduplication, standardizing fields, and suppression list checks ensure clean, deliverable records."
    },
    {
      num: 3,
      icon: Phone,
      title: "Live-agent intent verification",
      desc: "For premium tiers, agents confirm reachability and ongoing funding interest before records are sold."
    },
    {
      num: 4,
      icon: ShieldCheck,
      title: "Compliance & 1:1 consent",
      desc: "TCPA/1:1-consent alignment and auditable consent trails to protect your campaigns and reputation."
    },
  ];

  return (
    <>
      <Helmet>
        <title>MCA Lead Products | Live Transfers, Fresh Submissions & Aged Leads | Lead Slaps</title>
        <meta name="description" content="Buy verified MCA leads with live availability. Direct Submissions, Alpha Data, and Pulse Data tiers. TCPA-compliant, exclusive leads delivered to your CRM." />
      </Helmet>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-dot-pattern-light opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] decorative-blob decorative-blob-primary opacity-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] decorative-blob decorative-blob-accent opacity-15" />
        
        <div className="container-padding relative">
          <div className="max-w-4xl mx-auto py-16 md:py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full text-primary text-sm font-medium mb-6">
              <Database className="w-4 h-4" />
              MCA Lead Products
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Buy Verified Merchant Cash Advance Leads{" "}
              <span className="gradient-text">That Convert</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop wasting budget on recycled MCA data and oversold 'full packs.' Lead Slaps gives you a clean, tiered pipeline of Direct Submissions, Alpha Data, and Pulse Data—each verified, age-banded, and capped so you know exactly what you're buying.
            </p>
            
            <p className="text-sm text-slate-500 mb-8">Page last updated: November 2025</p>
            
            <Button 
              onClick={scrollToConfigurator}
              size="lg"
              className="px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl group"
            >
              Create Dataset
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-slate-50 py-6 border-y border-slate-200">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm">
              {[
                { icon: Shield, text: "TCPA & 1:1 consent-aligned sourcing" },
                { icon: Sparkles, text: "Data hygiene pipeline & 97%+ deliverability" },
                { icon: Lock, text: "Encrypted, PCI-compliant checkout via Square" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Are MCA Leads */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              What Are MCA Leads (And Why Most Providers Fail You?)
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                <strong className="text-slate-900">Merchant Cash Advance (MCA) leads are businesses that have expressed interest in receiving an advance on future revenue in exchange for fast, flexible funding.</strong>
              </p>
              
              <p className="text-slate-600 leading-relaxed mb-6">
                These leads are the fuel for brokers, ISOs, and funders—but the market is flooded with recycled data, blended lists, and resold "full packs" that burn through your budget without delivering results.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <p className="text-slate-700 leading-relaxed m-0">
                  Lead Slaps runs a single clean pipeline with clear age bands and hard caps. Every record moves through <strong>Direct Submissions → Alpha Data → Pulse Data</strong>, so you never pay premium prices for aged data or buy the same lead twice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tiers */}
      <section className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Three MCA Data Tiers. One Clean Pipeline.
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Every merchant starts as a Direct Submission and ages into Alpha Data, then Pulse Data. Each record lives in exactly one band at a time, so you never pay fresh prices for aged data or buy the same record twice.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ProductTierCard
                tier="Freshest"
                title="Direct Submissions"
                description="0–30 days old. Hot leads actively seeking funding, with maximum exclusivity and conversion potential."
                features={[
                  "0–30 days old",
                  "$6.50/lead - $10.00/lead",
                  "Sold once, never resold",
                  "Real-time capture & delivery"
                ]}
                onStartOrder={() => handleProductSelect('direct_submissions')}
              />
              <ProductTierCard
                tier="Best Value"
                title="Alpha Data"
                description="30–180 days old. Solid prospects at a balanced price point—ideal for scaling pipeline."
                features={[
                  "30–180 days old",
                  "$2.50/lead - $5.00/lead",
                  "Verified fundability indicators",
                  "High-volume availability"
                ]}
                onStartOrder={() => handleProductSelect('alpha_data')}
                featured
              />
              <ProductTierCard
                tier="Scale Play"
                title="Pulse Data"
                description="180 days–2 years old. Budget-friendly aged data for nurture campaigns, dialers, and high-volume outreach."
                features={[
                  "180 days - 2 years old",
                  "$0.15/lead - $0.50/lead",
                  "Mass volume available",
                  "Dialer & email optimized"
                ]}
                onStartOrder={() => handleProductSelect('pulse_data')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Dashboard */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Pricing and Live Availability Dashboard
              </h2>
              <p className="text-lg text-slate-600">
                Pricing is per record. The table below combines per-band pricing with live availability so you can see what's on the shelf before you start an order.
              </p>
            </div>

            <InventoryDashboard
              segments={segments}
              isLoading={isLoading}
              error={error}
              lastRefreshed={lastRefreshed}
              onSegmentSelect={handleSegmentSelect}
            />
          </div>
        </div>
      </section>

      {/* Order Configurator */}
      <section id="order-configurator" className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Configure Your File and Start Your Order
              </h2>
              <p className="text-lg text-slate-600">
                Build your order in three steps: choose a product, choose an age band, and set your quantity. We cap your request at live availability and hand off to a secure Square checkout.
              </p>
            </div>

            <OrderConfigurator
              segments={segments}
              initialProductKey={selectedProductKey}
              initialSegmentId={selectedSegmentId}
            />
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="bg-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary-subtle" />
        
        <div className="container-padding relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
                <ShieldCheck className="w-4 h-4" />
                Quality Guarantee
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our 4-Step Verification Process: How We Guarantee Quality
              </h2>
              <p className="text-lg text-slate-600">
                <strong>High-performing MCA campaigns start with verified data, not just more data.</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {verificationSteps.map((step, index) => (
                <div key={step.num} className="relative">
                  {/* Connector Line */}
                  {index < verificationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-slate-300 to-slate-200" />
                  )}
                  
                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all text-center h-full">
                    {/* Step Number */}
                    <div className="step-number mx-auto mb-4">{step.num}</div>
                    
                    {/* Icon */}
                    <div className="icon-container mx-auto mb-4">
                      <step.icon className="w-5 h-5" />
                    </div>
                    
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clear ROI */}
      <section className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                The Clear ROI: What to Expect from Our Data
              </h2>
            </div>
            
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                <strong className="text-slate-900">Properly worked MCA data consistently outperforms cheap, recycled lists</strong>—aged segments can convert in the low double digits, while fresh streams often yield 2–3× more funded deals per dollar spent than generic 'full packs.'
              </p>
              
              <p className="text-slate-600 mb-8">
                Exact results depend on scripting, follow-up, underwriting speed, and team experience—but the pattern holds: clean, age-banded data beats blended mystery lists.
              </p>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4">Illustrative outcome:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    Mid-sized ISO blends Direct, Alpha, and Pulse.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    Direct goes to closers; Alpha supports pipeline; Pulse feeds dialers and email.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    Over 90 days, cost per funded deal drops by focusing on highest-yield bands and using Pulse to keep floors productive.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-warning/5 to-warning/10 rounded-xl p-8 border border-warning/20">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                A Warning for Brokers: Avoiding "Full Pack" Scams
              </h2>
              
              <p className="text-slate-700 mb-6">
                <strong>'Full pack' lists bundle random data sources, hide age and sourcing, and are usually sold to as many buyers as possible.</strong>
              </p>
              
              <p className="text-slate-600 mb-6">
                This burns broker floors with dial fatigue, duplicate outreach, and compliance risks.
              </p>
              
              <h4 className="font-semibold text-slate-900 mb-4">How Lead Slaps differs:</h4>
              <ul className="space-y-3">
                {[
                  { label: "Defined products:", text: "Clear descriptions of Direct, Alpha, and Pulse, including age bands, pricing, and caps." },
                  { label: "Enforced capacity:", text: "Hard caps and live availability; segments close when sold out." },
                  { label: "Compliance-first:", text: "Focus on TCPA and 1:1 consent instead of scraped data." },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">
                      <strong className="text-slate-900">{item.label}</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions About MCA Leads
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "Do MCA leads really work?",
                  a: "Yes—when they are verified, compliant, and matched to a team with a clear follow-up plan. Most horror stories come from recycled lists and oversold data. High-quality data plus disciplined process is what works."
                },
                {
                  q: "How are your MCA leads verified?",
                  a: "Our leads go through a four-step process: high-intent sourcing, automated data hygiene, optional live-agent checks for some tiers, and a compliance review focused on TCPA and 1:1 consent. This includes phone/email validation, deduplication, standardizing fields, suppression list checks, and auditable consent trails."
                },
                {
                  q: "What is the difference between Direct Submissions, Alpha Data, and Pulse Data?",
                  a: "Direct Submissions are under 30 days old and priced as premium records; Alpha Data covers 30–180 days; Pulse Data covers 180 days to two years and is priced for large-volume campaigns. Direct is for speed-to-contact teams, Alpha balances volume and quality, and Pulse is optimized for high-volume dialing and nurture programs."
                },
                {
                  q: "Can I filter MCA leads by state, industry, or other criteria?",
                  a: "In most cases, yes—geography, industry, and other MCA fit variables can be applied at the file level. For complex lender rules or custom segmentation, we recommend scheduling a data strategist call before checkout to ensure your file matches your underwriting criteria."
                },
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-white rounded-lg border border-slate-200 px-6">
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-primary py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.15)_0%,_transparent_70%)]" />
        
        <div className="container-padding relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Design Your Data Plan. Scale Without Burn.
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Pick your stream, age bands, and volume, then lock in allocation before the best segments sell out. Or bring us your current funnel and we'll help you design a file that fits the way your team actually sells.
            </p>
            <Button
              onClick={scrollToConfigurator}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base font-semibold shadow-lg"
            >
              Start Order
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Products;
