import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { OrderConfigurator } from "@/components/products/OrderConfigurator";
import { useInventorySegments } from "@/hooks/useInventorySegments";

const BuildDataSet = () => {
  const { segments } = useInventorySegments(60000);

  return (
    <main className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Build Your Data Set | Lead Slaps</title>
        <meta name="description" content="Configure your custom MCA lead data set with Lead Slaps. Choose a product, age band, and quantity." />
        <link rel="canonical" href="https://leadslaps.com/build-data-set" />
      </Helmet>
      <Navigation />
      
      <section className="section-padding">
        <div className="container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Configure Your File and Start Your Order
              </h1>
              <p className="text-lg text-slate-600">
                Build your order in three steps: choose a product, choose an age band, and set your quantity. We cap your request at live availability and hand off to a secure Square checkout.
              </p>
            </div>

            <OrderConfigurator
              segments={segments}
              initialProductKey={null}
              initialSegmentId={null}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BuildDataSet;
