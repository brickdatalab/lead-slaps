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
        <title>Buy MCA Leads | Exclusive Merchant Cash Advance Leads</title>
        <meta name="description" content="Buy exclusive MCA leads with transparent pricing. Verified merchant cash advance leads delivered fresh. TCPA compliant. Higher conversions." />
        <link rel="canonical" href="https://leadslaps.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "MCA Leads",
            "description": "Buy exclusive, verified merchant cash advance leads for ISOs and direct funders. Fresh trigger leads, live transfers, and aged MCA leads with transparent pricing and real-time delivery.",
            "brand": {
              "@type": "Brand",
              "name": "LeadSlaps"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "lowPrice": "0.35",
              "highPrice": "85.00",
              "offerCount": "3",
              "url": "https://leadslaps.com/products"
            },
            "category": "Lead Generation Services",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Organization",
                "name": "Regional ISO"
              },
              "reviewBody": "FundSense cut our cost-per-deal by 40%. We're calling the right people at the right time."
            }
          })}
        </script>
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
