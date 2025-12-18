import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { CheckCircle, Lightning, Clock, ArrowRight, ShieldCheck, Database, TrendUp, Warning } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TriggerLeads = () => {
  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>Merchant Cash Advance Trigger Leads | Real-Time & Exclusive | Lead Slaps</title>
        <meta name="description" content="Buy high-intent merchant cash advance trigger leads. Captured in real-time and delivered instantly to your CRM via API or webhook. Stop calling dead numbers." />
        <link rel="canonical" href="https://leadslaps.com/merchant-cash-advance-trigger-leads" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Merchant Cash Advance Trigger Leads",
            "description": "Real-time, exclusive merchant cash advance trigger leads delivered instantly via webhook or API. < 15 minute latency.",
            "brand": {
              "@type": "Brand",
              "name": "LeadSlaps"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "3.50",
              "availability": "https://schema.org/InStock",
              "url": "https://leadslaps.com/merchant-cash-advance-trigger-leads"
            },
            "category": "Lead Generation Services",
            "potentialAction": {
              "@type": "BuyAction",
              "target": "https://leadslaps.com/build-data-set"
            }
          })}
        </script>
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 rounded-full text-red-600 text-sm font-medium mb-6 border border-red-100">
              <Lightning className="w-4 h-4" />
              Real-Time Delivery
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Merchant Cash Advance <span className="gradient-text">Trigger Leads</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Don't wait for data to age. Capture high-intent business owners the exact moment they apply for funding. Delivered to your CRM in seconds, not hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl group bg-accent hover:bg-accent/90"
              >
                <a href="/build-data-set">
                  Get Trigger Leads
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base font-semibold"
              >
                <a href="#how-it-works">
                  How It Works
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop / Definition */}
      <section className="bg-slate-50 section-padding" id="how-it-works">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  What Are MCA Trigger Leads?
                </h2>
                <div className="prose prose-lg text-slate-600">
                  <p className="mb-4">
                    <strong>Trigger leads</strong> are generated when a business owner performs a high-intent action—like searching for "business loans," filling out a funding application, or clicking a targeted finance ad.
                  </p>
                  <p className="mb-6">
                    Unlike aged lists that have been sitting in a database for weeks, trigger leads represent <strong>active demand</strong>. These merchants are looking for capital <em>right now</em>.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Captured via direct web forms & inbound API",
                      "Timestamped to the second",
                      "Exclusive or semi-exclusive distribution",
                      "Higher conversion rates due to immediate intent"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="relative">
                <Card className="p-8 border-slate-200 shadow-lg bg-white relative z-10">
                  <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Speed Wins Deals</h3>
                      <p className="text-sm text-slate-500">Response time vs. Conversion Rate</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700">1 Minute Response (Trigger Lead)</span>
                        <span className="font-bold text-green-600">391% Lift</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700">1 Hour Response</span>
                        <span className="font-bold text-slate-600">36% Lift</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3">
                        <div className="bg-slate-400 h-3 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700">24+ Hour Response (Aged)</span>
                        <span className="font-bold text-slate-400">Baseline</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3">
                        <div className="bg-slate-300 h-3 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-6 text-center italic">
                    *Source: Lead Response Management Study
                  </p>
                </Card>
                {/* Decorative blob behind card */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-accent/5 rounded-xl border border-accent/10 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Integration */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Instant Delivery to Your CRM
            </h2>
            <p className="text-lg text-slate-600">
              Speed is the only variable you control. We push leads to your system the second they are verified.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Database,
                title: "Webhook / API",
                desc: "Universal JSON payload compatible with any modern CRM or dialer."
              },
              {
                icon: ShieldCheck,
                title: "TCPA Verified",
                desc: "TrustedForm / Jornaya certificates included with every trigger record."
              },
              {
                icon: TrendUp,
                title: "Exclusive Routing",
                desc: "Logic that ensures you aren't competing with 10 other brokers instantly."
              }
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 border border-slate-200 hover:border-accent/30 transition-colors text-center group">
                <div className="w-12 h-12 mx-auto bg-primary/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Product Map */}
      <section className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
                    Product: Direct Submissions
                  </Badge>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Our "Direct Submissions" Tier = Trigger Leads
                  </h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    When you configure your order on Lead Slaps, select <strong>Direct Submissions</strong> to access our real-time trigger feed.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="font-medium text-slate-700">Freshness</span>
                      <span className="font-semibold text-slate-900">0 - 24 Hours</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="font-medium text-slate-700">Exclusivity</span>
                      <span className="font-semibold text-slate-900">Semi-Exclusive (Capped)</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="font-medium text-slate-700">Starting Price</span>
                      <span className="font-semibold text-accent">$3.50 / lead</span>
                    </div>
                  </div>

                  <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <a href="/build-data-set">Buy Trigger Leads Now</a>
                  </Button>
                </div>
                
                <div className="bg-slate-100 p-8 md:p-12 flex flex-col justify-center items-center text-center border-l border-slate-200">
                  <Warning className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Stop Buying "Full Packs"</h3>
                  <p className="text-sm text-slate-600 mb-6 max-w-xs mx-auto">
                    Most vendors hide their trigger leads in "blended" files to sell you junk. We don't. You pick the exact age band you want.
                  </p>
                  <div className="w-full bg-white rounded-lg p-4 border border-slate-200 text-left text-sm">
                    <div className="flex items-center gap-2 mb-2 text-green-600 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Direct Submissions (Triggers)
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                      Alpha Data (Aged 30-90d)
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                      Pulse Data (Aged 6mo+)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TriggerLeads;
