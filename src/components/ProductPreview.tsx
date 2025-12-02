import { ProductTierCard } from "@/components/products/ProductTierCard";
import { useNavigate } from "react-router-dom";

const ProductPreview = () => {
  const navigate = useNavigate();

  const handleStartOrder = (productKey: string) => {
    navigate(`/products#order-configurator`);
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-4xl font-bold text-primary md:text-[40px]">
            Three MCA Data Tiers. One Clean Pipeline.
          </h2>
          <p className="mt-4 mx-auto max-w-3xl font-body text-lg text-text-secondary">
            Every merchant starts as a Direct Submission and ages into Alpha Data, then Pulse Data. Each record lives in exactly one band at a time, so you never pay fresh prices for aged data or buy the same record twice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-4">
          <ProductTierCard
            tier="Premium tier"
            title="Direct Submissions"
            description="Real-time and near-real-time submissions for teams that win on speed-to-contact and disciplined follow-up."
            features={[
              "< 15 days – $3.00 / record",
              "15–30 days – $2.00 / record",
              "Strict caps to avoid oversold lists"
            ]}
            onStartOrder={() => handleStartOrder('direct_submissions')}
          />
          <ProductTierCard
            tier="Growth tier"
            title="Alpha Data"
            description="Smart-aged submissions from the last 6 months, ideal for blending phone, SMS, and email into one consistent pipeline."
            features={[
              "30–90 days – $1.00 / record",
              "90–180 days – $0.75 / record",
              "Built for sustainable, predictable volume"
            ]}
            onStartOrder={() => handleStartOrder('alpha_data')}
            featured
          />
          <ProductTierCard
            tier="Scale tier"
            title="Pulse Data"
            description="6–24 month MCA data priced for high-volume dialing, SMS reactivation, and long-tail email campaigns."
            features={[
              "180–365 days – $0.50 / record",
              "1–2 years – $0.25 / record",
              "Optimized for big floors & nurture programs"
            ]}
            onStartOrder={() => handleStartOrder('pulse_data')}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
