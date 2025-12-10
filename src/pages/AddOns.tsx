import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Check, Brain, FileText, ShieldCheck, Lightning, Link, ArrowsClockwise, CheckCircle, X, ArrowRight, Sparkle, TrendUp, Star } from "@phosphor-icons/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AddOns = () => {
  const scrollToCTA = () => {
    document.getElementById('addons-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>AI-Powered MCA Lead Add-Ons - FundSense, StatementSnap, TrustDial | Lead Slaps</title>
        <meta name="description" content="Transform leads into winners with AI add-ons. FundSense scoring, StatementSnap underwriting, and TrustDial verification. Close faster, convert more." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "MCA Lead Add-Ons",
            "description": "AI-powered add-on services to enhance MCA lead performance",
            "numberOfItems": 3,
            "itemListElement": [
              {
                "@type": "Product",
                "position": 1,
                "name": "FundSense",
                "description": "AI-powered fundability scoring that prioritizes your pipeline with data-driven scores. Reveals hidden gold in your leads with 0-100 scores and A-F grades.",
                "brand": { "@type": "Brand", "name": "LeadSlaps" },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "price": "0.40"
                },
                "category": "Lead Scoring Services"
              },
              {
                "@type": "Product",
                "position": 2,
                "name": "StatementSnap",
                "description": "AI-powered pre-underwriting service that transforms raw data into underwriting-ready packages. Same-day turnaround with optional 2-4 hour rush.",
                "brand": { "@type": "Brand", "name": "LeadSlaps" },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "price": "10.00"
                },
                "category": "Pre-Underwriting Services"
              },
              {
                "@type": "Product",
                "position": 3,
                "name": "TrustDial",
                "description": "Omnichannel contact verification service that validates phone, email, and address data. Boosts connect rates by 25-40% by eliminating bad data.",
                "brand": { "@type": "Brand", "name": "LeadSlaps" },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "price": "0.45"
                },
                "category": "Data Verification Services"
              }
            ]
          })}
        </script>
      </Helmet>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-dot-pattern-light opacity-40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] decorative-blob decorative-blob-accent opacity-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] decorative-blob decorative-blob-primary opacity-15" />
        
        <div className="container-padding relative">
          <div className="max-w-4xl mx-auto py-16 md:py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              AI-Powered Intelligence
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Turn Every Lead Into a Winner with{" "}
              <span className="gradient-text">AI Add‑Ons</span>{" "}
              Built for MCA Pros
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Lead Slaps add-ons infuse your lead flow with underwriting intelligence, data accuracy, and prioritization—so you close faster with less effort. Layer these AI-powered enhancements onto any qualifying product to reveal hidden potential, validate contact data, and deliver underwriting-ready packages that put you ahead of the competition.
            </p>
          </div>
        </div>
      </section>

      {/* FundSense Section */}
      <section className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Content */}
              <div>
                <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Scoring
                </Badge>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  FundSense: AI-Powered Fundability Scoring
                </h2>
                
                <p className="text-lg text-slate-600 mb-2">
                  Prioritize your pipeline with data-driven fundability scores
                </p>
                
                <div className="metric-highlight mb-6">
                  <TrendUp className="w-4 h-4" />
                  Typical customers see 30-40% higher contact-to-close efficiency
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed">
                  FundSense is an AI-powered fundability score appended to each lead. It uses omni-channel data to assess a lead's potential and helps you prioritize your outreach. Instead of treating all leads equally, FundSense reveals the hidden gold in your pipeline, allowing you to focus your best reps on the leads most likely to convert.
                </p>
                
                <h4 className="font-semibold text-slate-900 mb-4">Key Features</h4>
                <ul className="space-y-3 mb-8">
                  {[
                    "Actionable scoring: 0—100 score with A—F grades and top drivers so reps know who to call and why.",
                    "Smart routing: Score-based assignment and sequencing to maximize closer time on high-likelihood deals.",
                    "Predictive signals: Incorporates omni-channel data to surface \"hidden gold.\"",
                    "Continuous refresh: Scores update as new data arrives; versioning ensures transparency.",
                    "Measurable lift: Typical customers see higher contact-to-close efficiency and reduced cost per funded deal."
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-semibold text-slate-900 mb-3">Use Cases</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Prioritize daily calling lists", "Segment campaigns (phone vs email)", "Post-campaign audit for reactivation"].map((useCase, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Right - Technical Details Card */}
              <div className="lg:sticky lg:top-24">
                <Card className="border border-slate-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-accent to-primary" />
                  <div className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Lightning className="w-4 h-4 text-accent" />
                      Technical Details
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-start py-3 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">Pricing</span>
                        <span className="text-slate-900 text-sm font-medium text-right">
                          Per-lead: $0.40 (tiered by volume)<br/>
                          Subscription: $299—$1,499/month
                        </span>
                      </div>
                      <div className="flex justify-between items-start py-3 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">Delivery</span>
                        <span className="text-slate-900 text-sm font-medium text-right">
                          API, dashboard export, CSV append, webhook
                        </span>
                      </div>
                      <div className="py-3">
                        <span className="text-slate-500 text-sm block mb-2">Data Fields</span>
                        <div className="flex flex-wrap gap-1">
                          {["fundability_score", "grade", "confidence", "top_signals", "risk_flags"].map((field, idx) => (
                            <code key={idx} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700">
                              {field}
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={scrollToCTA}
                      className="w-full mt-6 bg-accent hover:bg-accent/90 text-white"
                    >
                      Add to My Order
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* StatementSnap Section */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Technical Details Card (switched order for visual variety) */}
              <div className="lg:sticky lg:top-24 order-2 lg:order-1">
                <Card className="border border-slate-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-primary" />
                  <div className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Lightning className="w-4 h-4 text-blue-500" />
                      Technical Details
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-start py-3 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">Pricing</span>
                        <span className="text-slate-900 text-sm font-medium text-right">
                          Per completed package: $10<br/>
                          <span className="text-slate-500">(optional Rush +$30)</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-start py-3 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">Delivery</span>
                        <span className="text-slate-900 text-sm font-medium text-right max-w-[200px]">
                          Automated AI pipeline with human-in-the-loop QA. PDF + JSON output.
                        </span>
                      </div>
                      <div className="flex justify-between items-start py-3">
                        <span className="text-slate-500 text-sm">Compatibility</span>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">
                          Direct Submissions only
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={scrollToCTA}
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add to My Order
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </div>
              
              {/* Right - Content */}
              <div className="order-1 lg:order-2">
                <Badge className="bg-blue-50 text-blue-600 border-blue-200 mb-4">
                  <FileText className="w-3 h-3 mr-1" />
                  Pre-Underwriting
                </Badge>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  StatementSnap: AI-Powered Pre-Underwriting
                </h2>
                
                <p className="text-lg text-slate-600 mb-2">
                  Transform intake into underwriting-ready packages at lightning speed
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
                  <Sparkle className="w-4 h-4" />
                  Same-day turnaround standard. Rush option: 2-4 hours for hot deals.
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed">
                  StatementSnap is an AI-powered pre-underwriting service exclusive to our Direct Submissions product. It transforms raw data into underwriting-ready leads at lightning speed, saving you time and effort. It analyzes financial data, extracts key metrics, and delivers a decision-ready summary, allowing your team to move from intake to decisioning in a single step.
                </p>
                
                <h4 className="font-semibold text-slate-900 mb-4">Key Features</h4>
                <ul className="space-y-3 mb-8">
                  {[
                    "Pre-underwriting automation: Extracts and standardizes income, NSFs, days negative, seasonality, and stacking indicators.",
                    "Decision-ready output: PDF + JSON summary aligned to funder expectations.",
                    "Fast turnaround: Same-day standard; optional 2—4 hour rush for hot files.",
                    "Quality control: Human-in-the-loop verification on edge cases; confidence scores on all metrics.",
                    "Seamless delivery: Secure merchant intake, automated CRM/webhook delivery, audit trail for compliance."
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-semibold text-slate-900 mb-3">Use Cases</h4>
                <div className="flex flex-wrap gap-2">
                  {["Speed-to-underwrite for Direct Submissions", "Reduce ops burden by offloading bank statement parsing", "Improve funder acceptance with standardized packages"].map((useCase, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TrustDial Section */}
      <section className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Content */}
              <div>
                <Badge className="bg-green-50 text-green-600 border-green-200 mb-4">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Data Verification
                </Badge>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  TrustDial: Omnichannel Contact Verification
                </h2>
                
                <p className="text-lg text-slate-600 mb-2">
                  Verify names and contact info across every channel before your first dial
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-600 text-sm font-medium mb-6">
                  <TrendUp className="w-4 h-4" />
                  Boost connect rates by 25-40%. Eliminate wasted spend on bad data.
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed">
                  TrustDial is an omnichannel matching service that ensures the accuracy of names and contact information. It verifies and validates contact data across multiple channels, increasing your connection rates and reducing wasted outreach. TrustDial confirms you're talking to the right person, every time.
                </p>
                
                <h4 className="font-semibold text-slate-900 mb-4">Key Features</h4>
                <ul className="space-y-3 mb-8">
                  {[
                    "Omnichannel verification: Phone reachability/line type, email SMTP check, address DPV, and identity match in one pass.",
                    "Connection boost: \"Best channel\" and \"best time window\" recommendations increase live answers.",
                    "Waste reduction: Remove wrong numbers/disposable emails before a single dial or send.",
                    "Compliance-friendly: Flags risky records and line types to support TCPA-safe outreach.",
                    "Scalable modes: Real-time at capture and batch for existing databases with clear pass/fail fields."
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-semibold text-slate-900 mb-3">Use Cases</h4>
                <div className="flex flex-wrap gap-2">
                  {["Boost connect rates by verifying phone/email", "Eliminate wasted spend on bad data", "Compliance peace of mind by flagging risky records"].map((useCase, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Right - Technical Details Card */}
              <div className="lg:sticky lg:top-24">
                <Card className="border border-slate-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-green-500 to-accent" />
                  <div className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Lightning className="w-4 h-4 text-green-500" />
                      Technical Details
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-start py-3 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">Pricing</span>
                        <span className="text-slate-900 text-sm font-medium">
                          Per-lead: $0.45
                        </span>
                      </div>
                      <div className="flex justify-between items-start py-3 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">Delivery</span>
                        <span className="text-slate-900 text-sm font-medium text-right">
                          Real-time verification at lead creation and batch processing
                        </span>
                      </div>
                      <div className="py-3">
                        <span className="text-slate-500 text-sm block mb-2">Data Fields</span>
                        <div className="flex flex-wrap gap-1">
                          {["Verified Phone Type", "Connection Status", "Match Score", "Best Channel", "Reachability Score"].map((field, idx) => (
                            <code key={idx} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700">
                              {field}
                            </code>
                          ))}
                        </div>
                      </div>
                      <div className="py-3 border-t border-slate-100">
                        <span className="text-slate-500 text-sm block mb-2">Checks Performed</span>
                        <p className="text-slate-700 text-sm">
                          Phone reachability, email SMTP, postal address, business name-to-owner match, State DNC, Litigation Association
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={scrollToCTA}
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Add to My Order
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Matrix */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              How Add-Ons Work with Products
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-semibold rounded-tl-lg">Add-On</th>
                    <th className="px-6 py-4 text-center font-semibold">Direct Submissions</th>
                    <th className="px-6 py-4 text-center font-semibold">Alpha Data</th>
                    <th className="px-6 py-4 text-center font-semibold rounded-tr-lg">Pulse Data</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "FundSense", direct: true, alpha: true, pulse: true },
                    { name: "StatementSnap", direct: true, alpha: false, pulse: false },
                    { name: "TrustDial", direct: true, alpha: true, pulse: true },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                      <td className="px-6 py-4 text-center">
                        {row.direct ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                            <Check className="w-5 h-5 text-green-600" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full">
                            <X className="w-5 h-5 text-slate-400" />
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.alpha ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                            <Check className="w-5 h-5 text-green-600" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full">
                            <X className="w-5 h-5 text-slate-400" />
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.pulse ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                            <Check className="w-5 h-5 text-green-600" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full">
                            <X className="w-5 h-5 text-slate-400" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-center text-slate-500 text-sm mt-4">
              StatementSnap is exclusive to Direct Submissions. FundSense and TrustDial work with all product tiers.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Calculate Your Uplift
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Current Performance */}
              <Card className="p-6 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <span className="text-slate-600 font-bold text-sm">1</span>
                  </div>
                  Current Performance
                </h4>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Monthly lead volume:</span>
                      <span className="font-semibold text-slate-900">1,000</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-slate-400 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Contact rate:</span>
                      <span className="font-semibold text-slate-900">30%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-slate-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Close rate:</span>
                      <span className="font-semibold text-slate-900">8%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-slate-400 h-2 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* With Add-Ons */}
              <Card className="p-6 border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-white">
                <h4 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Sparkle className="w-4 h-4 text-accent" />
                  </div>
                  With Add-Ons (Estimated)
                </h4>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Projected contact rate:</span>
                      <span className="font-semibold text-accent">42% <span className="text-green-500">(+40%)</span></span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-accent to-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Projected close rate:</span>
                      <span className="font-semibold text-accent">11% <span className="text-green-500">(+37%)</span></span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-accent to-green-500 h-2 rounded-full" style={{ width: '11%' }}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-accent/20">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Additional deals/month:</span>
                      <span className="text-2xl font-bold text-accent">+47 deals</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={scrollToCTA}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base font-semibold shadow-lg"
              >
                See What You Could Gain
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Seamless Integration with Your Stack
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightning,
                  title: "Real-Time API",
                  description: "RESTful API with comprehensive docs, webhooks for instant delivery",
                  link: "View API Docs →",
                  color: "accent"
                },
                {
                  icon: Link,
                  title: "Native CRM Support",
                  description: "Direct integrations with HubSpot, Salesforce, Zoho, Pipedrive",
                  link: "Browse Integrations →",
                  color: "primary"
                },
                {
                  icon: ArrowsClockwise,
                  title: "Batch & Portal",
                  description: "CSV/Excel download, SFTP delivery, secure dashboard access",
                  link: "Learn More →",
                  color: "blue-500"
                }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 border border-slate-200 hover:shadow-md transition-shadow group">
                  <div className={`icon-container mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                  <a href="#" className="text-accent text-sm font-medium hover:underline">
                    {item.link}
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-slate-50 section-padding">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warning/10 rounded-full text-warning text-sm font-medium mb-4">
                <Star className="w-4 h-4 fill-current" />
                Success Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Real Results from Real Brokers
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  type: "ISO",
                  typeColor: "accent",
                  quote: "FundSense cut our cost-per-deal by 40%. We're calling the right people at the right time.",
                  metrics: ["40% ↓ Cost per Deal", "35% ↑ Close Rate"],
                  author: "Regional ISO, 12-rep team"
                },
                {
                  type: "DF",
                  typeColor: "blue-500",
                  quote: "StatementSnap saves us 6 hours per deal. We're underwriting in minutes, not days.",
                  metrics: ["6 hours ↓ per deal", "Same-day decisioning"],
                  author: "Direct Funder, $50M+ annual volume"
                },
                {
                  type: "MB",
                  typeColor: "green-500",
                  quote: "TrustDial eliminated 35% of our bad numbers before we dialed. Our reps are happier and more productive.",
                  metrics: ["35% ↓ Bad Data", "28% ↑ Connect Rate"],
                  author: "MCA Broker, 8-person team"
                }
              ].map((story, idx) => (
                <Card key={idx} className="quote-card p-6">
                  {/* Type Badge */}
                  <Badge className={`mb-4 ${
                    story.typeColor === 'accent' ? 'bg-accent/10 text-accent border-accent/20' :
                    story.typeColor === 'blue-500' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                    'bg-green-50 text-green-600 border-green-200'
                  }`}>
                    {story.type}
                  </Badge>
                  
                  <blockquote className="text-slate-700 text-sm leading-relaxed mb-6">
                    "{story.quote}"
                  </blockquote>
                  
                  {/* Metrics */}
                  <div className="space-y-2 mb-4">
                    {story.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="metric-highlight text-xs">
                        <TrendUp className="w-3 h-3" />
                        {metric}
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-slate-500 text-xs">— {story.author}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white section-padding">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "How are add-ons priced?", a: "Add-ons are priced either per-lead or via monthly subscription based on volume. Per-lead pricing ranges from $0.40 to $10.00 depending on the add-on and monthly volume. Subscriptions start at $299/month and include lead allowances." },
                { q: "Can I use add-ons with any product tier?", a: "FundSense and TrustDial work with all product tiers (Direct Submissions, Alpha Data, and Pulse Data). StatementSnap is exclusively available for Direct Submissions customers." },
                { q: "What's included in the subscription pricing?", a: "Subscription pricing includes a monthly lead allowance, priority support, dashboard access, and API/webhook integration. Overage pricing applies if you exceed your monthly allowance." },
                { q: "How do you ensure data accuracy?", a: "We use multi-source verification, human-in-the-loop QA for edge cases, and continuous monitoring. Every data point is cross-referenced and scored for confidence before delivery." },
                { q: "Are add-ons TCPA/CTIA compliant?", a: "Yes. All add-ons are designed with compliance in mind. TrustDial specifically flags risky records, and all services maintain audit trails for regulatory compliance." },
                { q: "Can I trial an add-on before committing?", a: "Yes. We offer proof-of-concept trials on your own data for qualified prospects. Contact sales to discuss trial options." },
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-slate-50 rounded-lg border border-slate-200 px-6">
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
      <section id="addons-cta" className="bg-primary section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.15)_0%,_transparent_70%)]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container-padding relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkle className="w-4 h-4" />
              Ready to Get Started?
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Build Your High-Performance Stack
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Configure your products and add-ons to see real-time pricing. Or request a custom proof-of-concept on your own data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base font-semibold shadow-lg"
              >
                <a href="/products">
                  Configure My Add‑Ons
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold backdrop-blur-sm"
              >
                <a href="/contact">See It on My Data</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AddOns;
