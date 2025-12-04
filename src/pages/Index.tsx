import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import ProductPreview from "@/components/ProductPreview";
import SEOContent from "@/components/SEOContent";
import AddOns from "@/components/AddOns";
import WhyDifferent from "@/components/WhyDifferent";
import Delivery from "@/components/Delivery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Buy Exclusive & Verified MCA Leads | Fresh Trigger Leads | Competitive Pricing</title>
        <meta name="description" content="Buy merchant cash advance leads with transparent pricing. Exclusive, verified, and fresh MCA trigger leads delivered in real-time. TCPA compliant, no competition, higher conversions." />
        <link rel="canonical" href="https://leadslaps.com/" />
      </Helmet>
      <Navigation />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Problem />
      <Solution />
      <ProductPreview />
      <SEOContent />
      <AddOns />
      <WhyDifferent />
      <Delivery />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
