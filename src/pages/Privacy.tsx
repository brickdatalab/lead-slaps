import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Privacy Policy | Lead Slaps</title>
        <meta name="description" content="Privacy Policy for Lead Slaps - Learn how we protect your data." />
      </Helmet>
      <Navigation />
      <section className="bg-white py-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-12">
          <h1 className="mb-8 font-heading text-4xl font-bold text-primary md:text-5xl">
            Privacy Policy
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

export default Privacy;
