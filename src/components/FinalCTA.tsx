import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";

const FinalCTA = () => {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, rgba(20,184,166,0.15) 0%, transparent 70%)`,
          }}
        />
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-padding relative">
        <div className="max-w-4xl mx-auto py-20 md:py-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkle className="w-4 h-4" />
            Start Converting Today
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Stop Competing and{" "}
            <span className="text-accent">Start Converting?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore our product tiers, configure your data plan with powerful AI add-ons, and build the high-performance pipeline your team deserves.
          </p>
          
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
          >
            <a href="/build-data-set">
              Build Your Plan
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
