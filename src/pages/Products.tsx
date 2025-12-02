import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductTierCard } from "@/components/products/ProductTierCard";
import { InventoryDashboard } from "@/components/products/InventoryDashboard";
import { OrderConfigurator } from "@/components/products/OrderConfigurator";
import { useInventorySegments, ProductKey } from "@/hooks/useInventorySegments";
import { Shield, Lock, CheckCircle } from "lucide-react";

const Products = () => {
  const { segments, isLoading, error, lastRefreshed, refresh } = useInventorySegments(60000); // Auto-refresh every 60s
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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>MCA Lead Products | Live Transfers, Fresh Submissions & Aged Leads | Lead Slaps</title>
        <meta name="description" content="Buy MCA leads by age and product tier: Direct Submissions (premium), Alpha Data (growth), and Pulse Data (scale). Real-time inventory and transparent pricing." />
        <link rel="canonical" href="https://leadslaps.com/products" />
      </Helmet>
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <h1 className="mb-6 text-center font-headline text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary">
            Buy Verified Merchant Cash Advance Leads That Convert
          </h1>
          <p className="mx-auto max-w-4xl text-center font-body text-lg md:text-xl leading-relaxed text-foreground/80 mb-4">
            Stop wasting budget on recycled MCA data and oversold 'full packs.' Lead Slaps gives you a clean, tiered pipeline of Direct Submissions, Alpha Data, and Pulse Data—each verified, age-banded, and capped so you know exactly what you're buying.
          </p>
          <p className="text-center text-sm text-muted-foreground mb-8">
            Page last updated: November 2025
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" asChild className="border-2 border-primary transition-all hover:bg-background hover:text-primary">
              <a href="#order-configurator">Create Dataset</a>
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12">
            <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <Shield className="h-6 w-6 text-accent shrink-0" />
              <p className="text-sm">TCPA & 1:1 consent-aligned sourcing</p>
            </div>
            <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <CheckCircle className="h-6 w-6 text-accent shrink-0" />
              <p className="text-sm">Data hygiene pipeline & 97%+ deliverability</p>
            </div>
            <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <Lock className="h-6 w-6 text-accent shrink-0" />
              <p className="text-sm">Encrypted, PCI-compliant checkout via Square</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Are MCA Leads */}
      <section className="bg-slate-50 px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 font-headline text-3xl md:text-4xl font-bold text-primary">
            What Are MCA Leads (And Why Most Providers Fail You?)
          </h2>
          <p className="mb-4 text-foreground/80">
            <strong>Merchant Cash Advance (MCA) leads are businesses that have expressed interest in receiving an advance on future revenue in exchange for fast, flexible funding.</strong>
          </p>
          <p className="mb-4 text-foreground/80">
            These leads are the fuel for brokers, ISOs, and funders—but the market is flooded with recycled data, blended lists, and resold "full packs" that burn through your budget without delivering results.
          </p>
          <p className="text-foreground/80">
            Lead Slaps runs a single clean pipeline with clear age bands and hard caps. Every record moves through Direct Submissions → Alpha Data → Pulse Data, so you never pay premium prices for aged data or buy the same lead twice.
          </p>
        </div>
      </section>

      {/* Product Tiers */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-4 text-center font-headline text-3xl md:text-4xl font-bold text-primary">
            Three MCA Data Tiers. One Clean Pipeline.
          </h2>
          <p className="mx-auto max-w-3xl text-center text-foreground/80 mb-12">
            Every merchant starts as a Direct Submission and ages into Alpha Data, then Pulse Data. Each record lives in exactly one band at a time, so you never pay fresh prices for aged data or buy the same record twice.
          </p>

          <div className="grid md:grid-cols-3 gap-8 pt-4">
            <ProductTierCard
              tier="Premium tier"
              title="Direct Submissions"
              description="Real-time and near-real-time submissions for teams that win on speed-to-contact and disciplined follow-up."
              features={[
                "< 15 days – $3.00 / record",
                "15–30 days – $2.00 / record",
                "Strict caps to avoid oversold lists"
              ]}
              onStartOrder={() => handleProductSelect('direct_submissions')}
            />
            <ProductTierCard
              tier="Growth tier"
              title="Alpha Data"
              description="Smart-aged submissions from the last 6 months, ideal for blending phone, SMS, and email into one consistent pipeline."
              features={[
                "30–90 days – $1.00 / record",
                "90–180 days – $0.75 / record",
                "Built for sustainable, predictable volume"
              ]}
              onStartOrder={() => handleProductSelect('alpha_data')}
              featured
            />
            <ProductTierCard
              tier="Scale tier"
              title="Pulse Data"
              description="6–24 month MCA data priced for high-volume dialing, SMS reactivation, and long-tail email campaigns."
              features={[
                "180–365 days – $0.50 / record",
                "1–2 years – $0.25 / record",
                "Optimized for big floors & nurture programs"
              ]}
              onStartOrder={() => handleProductSelect('pulse_data')}
            />
          </div>
        </div>
      </section>

      {/* Pricing Dashboard */}
      <section className="bg-slate-50 px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-4 font-headline text-3xl md:text-4xl font-bold text-primary">
            Pricing and Live Availability Dashboard
          </h2>
          <p className="mb-8 text-foreground/80 max-w-3xl">
            Pricing is per record. The table below combines per-band pricing with live availability so you can see what's on the shelf before you start an order.
          </p>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-4 font-headline text-3xl md:text-4xl font-bold text-primary">
            Configure Your File and Start Your Order
          </h2>
          <p className="mb-12 text-foreground/80 max-w-3xl">
            Build your order in three steps: choose a product, choose an age band, and set your quantity. We cap your request at live availability and hand off to a secure Square checkout.
          </p>
          <OrderConfigurator
            segments={segments}
            initialProductKey={selectedProductKey || undefined}
            initialSegmentId={selectedSegmentId || undefined}
          />
        </div>
      </section>

      {/* Verification Process */}
      <section className="bg-slate-50 px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-6 font-headline text-3xl md:text-4xl font-bold text-primary text-center">
            Our 4-Step Verification Process: How We Guarantee Quality
          </h2>
          <p className="mb-12 text-foreground/80 text-center max-w-3xl mx-auto">
            <strong>High-performing MCA campaigns start with verified data, not just more data.</strong>
          </p>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-slate-300" />
            
            {[
              { num: 1, icon: "🎯", title: "High-intent data sourcing", desc: "Sources are direct web forms, inbound funnels, and vetted partners—not scraped directories or bulk business databases." },
              { num: 2, icon: "🧹", title: "Automated data hygiene", desc: "Phone/email validation, deduplication, standardizing fields, and suppression list checks ensure clean, deliverable records." },
              { num: 3, icon: "📞", title: "Live-agent intent verification", desc: "For premium tiers, agents confirm reachability and ongoing funding interest before records are sold." },
              { num: 4, icon: "✅", title: "Compliance & 1:1 consent", desc: "TCPA/1:1-consent alignment and auditable consent trails to protect your campaigns and reputation." },
            ].map((step) => (
              <div key={step.num} className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4 shadow-md">
                    {step.num}
                  </div>
                  <div className="text-2xl mb-3">{step.icon}</div>
                  <h3 className="font-semibold text-lg text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clear ROI */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 font-headline text-3xl md:text-4xl font-bold text-primary">
            The Clear ROI: What to Expect from Our Data
          </h2>
          <p className="mb-4 text-foreground/80">
            <strong>Properly worked MCA data consistently outperforms cheap, recycled lists—aged segments can convert in the low double digits, while fresh streams often yield 2–3× more funded deals per dollar spent than generic 'full packs.'</strong>
          </p>
          <p className="mb-6 text-foreground/80">
            Exact results depend on scripting, follow-up, underwriting speed, and team experience—but the pattern holds: clean, age-banded data beats blended mystery lists.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-primary mb-4">Illustrative outcome:</h3>
            <ul className="space-y-2 text-foreground/80">
              <li>• Mid-sized ISO blends Direct, Alpha, and Pulse.</li>
              <li>• Direct goes to closers; Alpha supports pipeline; Pulse feeds dialers and email.</li>
              <li>• Over 90 days, cost per funded deal drops by focusing on highest-yield bands and using Pulse to keep floors productive.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Warning About Full Packs */}
      <section className="bg-slate-50 px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-6 font-headline text-3xl md:text-4xl font-bold text-primary">
            A Warning for Brokers: Avoiding "Full Pack" Scams
          </h2>
          <p className="mb-4 text-foreground/80">
            <strong>'Full pack' lists bundle random data sources, hide age and sourcing, and are usually sold to as many buyers as possible.</strong>
          </p>
          <p className="mb-6 text-foreground/80">
            This burns broker floors with dial fatigue, duplicate outreach, and compliance risks.
          </p>
          <h3 className="font-semibold text-lg text-primary mb-4">How Lead Slaps differs:</h3>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span><strong>Defined products:</strong> Clear descriptions of Direct, Alpha, and Pulse, including age bands, pricing, and caps.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span><strong>Enforced capacity:</strong> Hard caps and live availability; segments close when sold out.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span><strong>Compliance-first:</strong> Focus on TCPA and 1:1 consent instead of scraped data.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-8 font-headline text-3xl md:text-4xl font-bold text-primary">
            Frequently Asked Questions About MCA Leads
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="q1" className="border border-border rounded-lg px-6 py-2 transition-all hover:bg-slate-50 data-[state=open]:border-l-4 data-[state=open]:border-l-primary data-[state=open]:bg-slate-50">
              <AccordionTrigger className="text-left font-semibold py-4">
                Do MCA leads really work?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 pb-6">
                <p className="mb-3">
                  <strong>Yes—when they are verified, compliant, and matched to a team with a clear follow-up plan.</strong>
                </p>
                <p>
                  Most horror stories come from recycled lists and oversold data. High-quality data plus disciplined process is what works.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2" className="border border-border rounded-lg px-6 py-2 transition-all hover:bg-slate-50 data-[state=open]:border-l-4 data-[state=open]:border-l-primary data-[state=open]:bg-slate-50">
              <AccordionTrigger className="text-left font-semibold py-4">
                How are your MCA leads verified?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 pb-6">
                <p className="mb-3">
                  <strong>Our leads go through a four-step process: high-intent sourcing, automated data hygiene, optional live-agent checks for some tiers, and a compliance review focused on TCPA and 1:1 consent.</strong>
                </p>
                <p>
                  This includes phone/email validation, deduplication, standardizing fields, suppression list checks, and auditable consent trails.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3" className="border border-border rounded-lg px-6 py-2 transition-all hover:bg-slate-50 data-[state=open]:border-l-4 data-[state=open]:border-l-primary data-[state=open]:bg-slate-50">
              <AccordionTrigger className="text-left font-semibold py-4">
                What is the difference between Direct Submissions, Alpha Data, and Pulse Data?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 pb-6">
                <p className="mb-3">
                  <strong>Direct Submissions are under 30 days old and priced as premium records; Alpha Data covers 30–180 days; Pulse Data covers 180 days to two years and is priced for large-volume campaigns.</strong>
                </p>
                <p>
                  Direct is for speed-to-contact teams, Alpha balances volume and quality, and Pulse is optimized for high-volume dialing and nurture programs.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4" className="border border-border rounded-lg px-6 py-2 transition-all hover:bg-slate-50 data-[state=open]:border-l-4 data-[state=open]:border-l-primary data-[state=open]:bg-slate-50">
              <AccordionTrigger className="text-left font-semibold py-4">
                Can I filter MCA leads by state, industry, or other criteria?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 pb-6">
                <p className="mb-3">
                  <strong>In most cases, yes—geography, industry, and other MCA fit variables can be applied at the file level.</strong>
                </p>
                <p>
                  For complex lender rules or custom segmentation, we recommend scheduling a data strategist call before checkout to ensure your file matches your underwriting criteria.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-50 px-6 py-20 lg:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-headline text-3xl md:text-4xl font-bold text-primary">
            Design Your Data Plan. Scale Without Burn.
          </h2>
          <p className="mb-8 text-foreground/80 max-w-3xl mx-auto">
            Pick your stream, age bands, and volume, then lock in allocation before the best segments sell out. Or bring us your current funnel and we'll help you design a file that fits the way your team actually sells.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={scrollToConfigurator} className="border-2 border-primary transition-all hover:bg-background hover:text-primary">
              Start order
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
