import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroVisual from "@/assets/hero-data-analytics.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern-light opacity-50" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] decorative-blob decorative-blob-accent" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] decorative-blob decorative-blob-primary" />
      
      <div className="px-8 md:px-16 lg:px-24 relative">
        <div className="max-w-[1400px] mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Accent Line */}
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Buy MCA Leads That{" "}
                <span className="gradient-text">Actually Convert</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Premium merchant cash advance leads for sale — live transfers, real-time submissions, and aged lists. TCPA-compliant. Exclusive or shared. Delivered to your CRM in seconds.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                {["100% TCPA Compliant", "Verified Connectivity", "Real-Time Delivery"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                  asChild 
                  size="lg" 
                  className="px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl group"
                >
                  <a href="/products">
                    View Products
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-6 text-base font-semibold"
                >
                  <a href="/add-ons">Explore Add-Ons</a>
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  Trusted by <span className="font-semibold text-slate-700">500+</span> MCA brokers, ISOs, and funders
                </p>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl" />
              <div className="relative bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                <img
                  src={heroVisual}
                  alt="Real-time MCA lead analytics dashboard showing conversion rates and lead quality metrics"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-slate-100">
                <div className="text-2xl font-bold text-primary">32%</div>
                <div className="text-sm text-slate-600">Avg. Contact Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="hsl(var(--slate-50))"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
