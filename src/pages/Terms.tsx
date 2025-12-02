import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Terms of Service | Lead Slaps</title>
        <meta name="description" content="Terms of Service for Lead Slaps - Premium MCA lead provider." />
      </Helmet>
      <Navigation />
      <section className="bg-white py-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-12">
          <h1 className="mb-8 font-heading text-4xl font-bold text-primary md:text-5xl">
            Terms of Service
          </h1>
          <p className="font-body text-lg text-text-secondary">
            Content coming soon.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Terms;
