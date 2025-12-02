import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BuildDataSet = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Build Your Data Set | Lead Slaps</title>
        <meta name="description" content="Configure your custom MCA lead data set with Lead Slaps." />
        <link rel="canonical" href="https://leadslaps.com/build-data-set" />
      </Helmet>
      <Navigation />
      <div className="section-padding container-padding">
        {/* Content will be added here */}
      </div>
      <Footer />
    </main>
  );
};

export default BuildDataSet;
