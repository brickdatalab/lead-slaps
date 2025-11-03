import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-12">
        <h2 className="mb-8 font-heading text-4xl font-bold md:text-[40px]">
          Stop Competing. Start Scaling.
        </h2>
        <p className="mb-12 font-body text-lg opacity-90">
          Your brokerage can't scale on burnt-out leads. Partner with a data provider that's actually invested in your ROI. Stop wasting your team's morale on leads they can't close.
        </p>
        <Button
          variant="secondary"
          size="lg"
          asChild
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          <a href="/contact">Request Pricing</a>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
