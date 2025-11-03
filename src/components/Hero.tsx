import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/hero-visual.jpg";

const Hero = () => {
  return (
    <section className="relative bg-background py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-[56px] lg:leading-[1.1]">
              Stop Competing for Bad MCA Leads. Start Converting with a Scalability Partner.
            </h1>
            <p className="mb-8 font-body text-lg text-text-secondary md:text-xl lg:leading-relaxed">
              We're not a lead vendor. We are a strategic data partner. Our model is simple: We only succeed when you scale.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button variant="default" size="lg" asChild>
                <a href="/contact">Request Pricing</a>
              </Button>
            </div>
            <p className="mt-6 font-body text-sm text-text-muted">
              Trusted by established MCA brokers and ISOs
            </p>
          </div>
          <div className="lg:col-span-2">
            <img
              src={heroVisual}
              alt="AI-powered MCA lead generation visualization showing data intelligence and exclusive leads"
              className="h-auto w-full rounded-lg shadow-card"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
