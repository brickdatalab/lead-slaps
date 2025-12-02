import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      {/* Diagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
          )`
        }}
      />
      {/* Radial gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)'
        }}
      />
      
      <div className="container relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <h2 className="mb-8 font-heading text-4xl font-bold text-primary-foreground md:text-[40px]">
          Ready to Stop Competing and Start Converting?
        </h2>
        <p className="mb-12 font-body text-lg text-white/90">
          Explore our product tiers, configure your data plan with powerful AI add-ons, and build the high-performance pipeline your team deserves.
        </p>
        <Button 
          variant="secondary" 
          size="lg" 
          asChild 
          className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <a href="/products">Build Your Plan</a>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
