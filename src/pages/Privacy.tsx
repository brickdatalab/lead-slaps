import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Privacy Policy | Lead Slaps</title>
        <meta name="description" content="Privacy Policy for Lead Slaps - Learn how we collect, use, and protect your data. CCPA and TCPA disclosures included." />
      </Helmet>
      <Navigation />
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 lg:px-12">
          <article className="rounded-lg bg-white p-8 shadow-sm md:p-12">
            <h1 className="mb-2 font-heading text-3xl font-bold text-slate-900 md:text-4xl">
              Privacy Policy
            </h1>
            <p className="mb-8 text-sm text-slate-500">
              <strong>Last Updated:</strong> November 18, 2025
            </p>

            <div className="prose prose-slate max-w-none">
              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">1. Introduction</h2>
              <p className="mb-4 text-slate-700">
                <a href="/" className="font-semibold text-primary hover:underline">LeadSlaps.com</a> ("Company", "we", "our", "us") respects your privacy and is committed to protecting the personal and business information we process. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, purchase our services, or when we process data for our lead generation products.
              </p>
              <p className="mb-4 font-semibold text-slate-900">
                By accessing our website or purchasing our leads, you agree to the terms of this Privacy Policy.
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">2. Scope of Policy</h2>
              <p className="mb-4 text-slate-700">This policy applies to two distinct categories of information:</p>
              <ol className="mb-4 list-decimal pl-6 text-slate-700">
                <li><strong>Client Data:</strong> Information we collect from <em>you</em> (the lead buyer/broker) to process orders and manage your account.</li>
                <li><strong>Lead Data:</strong> Business and contact information of third-party merchants that we compile, aggregate, and sell as part of our products (Live Transfers, Fresh Leads, Aged Data).</li>
              </ol>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">3. Information We Collect</h2>

              <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-800">A. From Our Clients (You)</h3>
              <p className="mb-4 text-slate-700">When you register, purchase leads, or contact us, we collect:</p>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Identity Data:</strong> Name, company name, job title.</li>
                <li><strong>Contact Data:</strong> Email address, phone number, billing address.</li>
                <li><strong>Financial Data:</strong> Credit card details or bank account information (processed via our secure third-party payment processors; we do not store full credit card numbers).</li>
                <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products you have purchased from us.</li>
              </ul>

              <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-800">B. Lead Data (The Product)</h3>
              <p className="mb-4 text-slate-700">We aggregate business information from various sources to create our lead products. This may include:</p>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Business Identifiers:</strong> Business name, owner name, business address.</li>
                <li><strong>Contact Details:</strong> Phone numbers, email addresses.</li>
                <li><strong>Firmographic Data:</strong> Industry type, time in business, estimated monthly revenue.</li>
                <li><strong>Funding Intent:</strong> Self-reported interest in working capital or business loans.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">4. How We Use Your Information</h2>

              <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-800">A. Use of Client Data</h3>
              <p className="mb-4 text-slate-700">We use your data to:</p>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li>Process and deliver your orders.</li>
                <li>Manage your account and provide customer support.</li>
                <li>Send you transactional emails (invoices, order confirmations).</li>
                <li>Send marketing communications regarding new lead batches or discounts (you may opt-out at any time).</li>
              </ul>

              <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-800">B. Use of Lead Data</h3>
              <p className="mb-4 text-slate-700">
                <strong>WE SELL LEAD DATA.</strong> The primary purpose of collecting Lead Data is to license, sell, or transfer it to our Clients (commercial lenders, brokers, and funders) for their marketing purposes.
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">5. Disclosure of Information</h2>
              <p className="mb-4 text-slate-700">We may share information with:</p>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Service Providers:</strong> Third parties who perform services on our behalf, such as payment processing (e.g., Stripe, Authorize.net), data analysis, email delivery, and hosting services.</li>
                <li><strong>Clients (Buyers):</strong> We disclose Lead Data to our paid subscribers and purchasers as part of our commercial services.</li>
                <li><strong>Legal Obligations:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">6. Data Security</h2>
              <p className="mb-4 text-slate-700">
                We use administrative, technical, and physical security measures to help protect your personal information. These measures include SSL encryption for payment data and restricted access protocols for our databases. However, please be aware that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">7. Your Rights & State-Specific Disclosures</h2>

              <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-800">A. Delaware Residents (DOPPA)</h3>
              <p className="mb-4 text-slate-700">In accordance with the Delaware Online Privacy and Protection Act:</p>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Do Not Track (DNT):</strong> Our website does not currently respond to browser "Do Not Track" signals.</li>
                <li><strong>Online Erasure:</strong> If you are a Delaware resident under 18, you may request the removal of content you have posted to our site.</li>
              </ul>

              <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-800">B. California Residents (CCPA/CPRA)</h3>
              <p className="mb-4 text-slate-700">If you are a resident of California, you have specific rights regarding your personal information:</p>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Right to Know:</strong> You may request that we disclose the categories and specific pieces of personal information we have collected about you.</li>
                <li><strong>Right to Delete:</strong> You may request that we delete any personal information we have collected from you, subject to certain exceptions.</li>
                <li><strong>Right to Opt-Out of Sale:</strong> <strong>WE SELL PERSONAL INFORMATION</strong> (as defined by CCPA). You have the right to opt-out of the sale of your personal information. To exercise this right, please contact us at the email below with the subject line "Do Not Sell My Info."</li>
                <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising any of these rights.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">8. TCPA and Consent Disclaimer</h2>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>For Clients:</strong> By providing your phone number to LeadSlaps.com, you consent to receive calls and text messages from us regarding your orders and account status, including via automated technology.</li>
                <li><strong>For Lead Data:</strong> We make reasonable efforts to ensure our Lead Data is aggregated from compliant sources. However, as stated in our <a href="/terms" className="font-medium text-primary hover:underline">Terms and Conditions</a>, <strong>you (the Client) are the initiator</strong> of any communication with these leads and assume all liability for compliance with the TCPA and DNC regulations.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">9. Data Retention</h2>
              <p className="mb-4 text-slate-700">
                We retain Client Data for as long as your account is active or as needed to provide you services. We retain Lead Data for a period deemed commercially relevant or as required by law. We may retain certain information for legitimate business purposes or to comply with legal obligations (e.g., tax and accounting).
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">10. Children's Privacy</h2>
              <p className="mb-4 text-slate-700">
                Our services are strictly B2B and intended for individuals aged 18 or older. We do not knowingly collect information from children under 13.
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">11. Changes to This Policy</h2>
              <p className="mb-4 text-slate-700">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">12. Contact Us</h2>
              <p className="mb-4 text-slate-700">
                If you have questions or comments about this policy, or to exercise your privacy rights, please contact us at:
              </p>
              <address className="mb-4 not-italic text-slate-700">
                <strong><a href="/" className="text-primary hover:underline">LeadSlaps.com</a></strong><br />
                <strong>Email:</strong>{" "}
                <a href="mailto:support@leadslaps.com" className="font-medium text-primary hover:underline">
                  support@leadslaps.com
                </a>
              </address>

              <hr className="my-8 border-slate-200" />
              <p className="text-center text-sm italic text-slate-500">
                End of Privacy Policy
              </p>
              <p className="mt-6 text-center text-sm text-slate-600">
                For more information, please review our <a href="/terms" className="font-medium text-primary hover:underline">Terms and Conditions</a>.
              </p>
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Privacy;
