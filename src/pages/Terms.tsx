import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Terms and Conditions | Lead Slaps</title>
        <meta name="description" content="Terms and Conditions for Lead Slaps - Premium MCA lead provider. Read our policies on compliance, refunds, and data usage." />
      </Helmet>
      <Navigation />
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 lg:px-12">
          <article className="rounded-lg bg-white p-8 shadow-sm md:p-12">
            <h1 className="mb-2 font-heading text-3xl font-bold text-slate-900 md:text-4xl">
              Terms and Conditions
            </h1>
            <p className="mb-8 text-sm text-slate-500">
              <strong>Last Updated:</strong> November 18, 2025
            </p>

            <div className="prose prose-slate max-w-none">
              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
              <p className="mb-4 text-slate-700">
                Welcome to <a href="/" className="font-semibold text-primary hover:underline">LeadSlaps.com</a> ("Company", "we", "our", "us"). By accessing our website, purchasing leads, creating an account, or using our services, you ("Client", "User", "Buyer") agree to be bound by these Terms and Conditions ("Terms").
              </p>
              <p className="mb-4 font-semibold text-slate-900">
                IF YOU DO NOT AGREE WITH THESE TERMS, DO NOT PURCHASE LEADS OR USE OUR SERVICES.
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">2. Nature of Services</h2>
              <p className="mb-4 text-slate-700">
                LeadSlaps.com provides B2B lead generation services specifically for the Merchant Cash Advance (MCA) and alternative business lending industry. Our products include:
              </p>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Live Transfers:</strong> Real-time telephonic connections with prospective merchants.</li>
                <li><strong>Fresh Leads:</strong> Real-time data submissions delivered via email or CRM integration.</li>
                <li><strong>Aged Leads:</strong> Historical data lists sold "As-Is."</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">3. Compliance and Data Usage (TCPA, DNC, & CAN-SPAM)</h2>
              <p className="mb-4 font-semibold text-slate-900">
                THIS SECTION IS CRITICAL. PLEASE READ CAREFULLY.
              </p>
              <p className="mb-4 text-slate-700">
                You acknowledge and agree that you are solely responsible for your use of any data or leads provided by LeadSlaps.com.
              </p>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>TCPA Compliance:</strong> You represent and warrant that you will comply with all federal and state laws, including but not limited to the <strong>Telephone Consumer Protection Act (TCPA)</strong>, the <strong>Telemarketing Sales Rule (TSR)</strong>, and the <strong>CAN-SPAM Act</strong>.</li>
                <li><strong>Do Not Call (DNC) Responsibility:</strong> It is <strong>your sole responsibility</strong> to scrub all phone numbers against the National Do Not Call Registry, state DNC registries, and your internal DNC list prior to dialing. LeadSlaps.com makes no representation that the leads provided are DNC-compliant at the moment of your outreach.</li>
                <li><strong>Dialing Technology:</strong> You agree that you will not use an Automatic Telephone Dialing System (ATDS), "robocalls," or pre-recorded voice messages to contact leads purchased from us unless you have independently verified that you possess the necessary prior express written consent to do so.</li>
                <li><strong>Initiator Status:</strong> You acknowledge that for any call or text message you send to a lead, you are the "initiator" of the communication.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">4. No Guarantees of Performance</h2>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>"As-Is" Sale:</strong> All leads and data are sold "AS IS" and "WHERE IS." We make no representations or warranties regarding the accuracy, validity, convertibility, or profitability of the data.</li>
                <li><strong>Business Risk:</strong> You acknowledge that the MCA industry involves significant financial risk. LeadSlaps.com is a lead provider, not a marketing agency or underwriter. We are not responsible for your inability to close deals, fund merchants, or generate ROI.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">5. Refund and Replacement Policy</h2>
              <p className="mb-4 text-slate-700">
                Due to the digital and irrevocable nature of our products, <strong>ALL SALES ARE FINAL.</strong> We do not offer cash refunds under any circumstances. We offer a limited replacement policy strictly as follows:
              </p>

              <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-800">A. Live Transfers</h3>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Billable Lead:</strong> Any call that lasts longer than <strong>60 seconds</strong> (the "Buffer") is considered a billable lead and is non-refundable.</li>
                <li><strong>Replacements:</strong> You may request a replacement ONLY if the call is disconnected or determined to be invalid <em>within</em> the 60-second Buffer.</li>
                <li><strong>Exclusions:</strong> We do not replace leads based on the merchant's credit score, monthly revenue, or "change of mind" after the Buffer period.</li>
              </ul>

              <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-800">B. Fresh & Aged Data</h3>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Aged Leads:</strong> Sold strictly "As-Is" with no replacement policy. Pricing reflects the potential for disconnected numbers or decayed data.</li>
                <li><strong>Fresh Leads:</strong> You may flag a lead for review within <strong>24 hours</strong> of receipt ONLY if the phone number is disconnected or the contact information is clearly fabricated (e.g., "Mickey Mouse").</li>
                <li><strong>Verification:</strong> Our Quality Assurance team reserves the right to verify all replacement claims. If validated, a store credit will be issued.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">6. Payment and No Chargeback Policy</h2>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Payment:</strong> All orders must be paid in full prior to delivery.</li>
                <li><strong>WAIVER OF CHARGEBACK RIGHTS:</strong> By purchasing from LeadSlaps.com, you explicitly waive your right to initiate a chargeback or dispute with your credit card issuer or bank for any reason, including "services not received" or "not as described," provided we have delivered the data files or transfer attempts.</li>
                <li><strong>Breach of Contract:</strong> Any chargeback attempt will be considered a material breach of these Terms. We reserve the right to report such actions to credit bureaus, industry blacklists, and collections agencies. You agree to pay all costs associated with collecting unpaid debts, including legal fees and a $250 administrative fee per dispute.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">7. Intellectual Property & Non-Resale</h2>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>License:</strong> You are granted a limited, non-exclusive, non-transferable license to use the leads for your internal marketing purposes only.</li>
                <li><strong>Prohibition on Resale:</strong> You may <strong>NOT</strong> resell, license, rent, share, publish, or distribute our leads or data to any third party, including other brokers, lenders, or marketing agencies. Violation of this clause will result in immediate termination of your account and legal action for damages.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">8. Limitation of Liability</h2>
              <p className="mb-4 text-sm uppercase text-slate-700">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, LEADSLAPS.COM, ITS OWNERS, AFFILIATES, AND EMPLOYEES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES.
              </p>
              <p className="mb-4 font-semibold text-slate-900">
                OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY AND ALL CLAIMS SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO US FOR THE SPECIFIC BATCH OF LEADS GIVING RISE TO THE CLAIM.
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">9. Indemnification</h2>
              <p className="mb-4 text-slate-700">
                You agree to indemnify, defend, and hold harmless LeadSlaps.com, its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
              </p>
              <ol className="mb-4 list-decimal pl-6 text-slate-700">
                <li>Your violation of these Terms.</li>
                <li>Your violation of any law or regulation (specifically TCPA, TSR, or DNC rules).</li>
                <li>Your use or misuse of the leads provided.</li>
                <li>Any dispute between you and a merchant contacted via our leads.</li>
              </ol>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">10. Dispute Resolution: Arbitration & Class Action Waiver</h2>
              <ul className="mb-4 list-disc pl-6 text-slate-700">
                <li><strong>Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of the <strong>State of Delaware</strong>, without regard to its conflict of law principles.</li>
                <li><strong>Binding Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to these Terms or the breach thereof shall be settled by binding arbitration administered by the American Arbitration Association (AAA) in the State of Delaware. Judgment on the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof.</li>
                <li><strong>Class Action Waiver:</strong> YOU AND LEADSLAPS.COM AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.</li>
              </ul>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">11. Severability</h2>
              <p className="mb-4 text-slate-700">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable.
              </p>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900">12. Modifications</h2>
              <p className="mb-4 text-slate-700">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after any changes constitutes your acceptance of the new Terms.
              </p>

              <hr className="my-8 border-slate-200" />
              <p className="text-center text-sm italic text-slate-500">
                End of Terms and Conditions
              </p>
              <p className="mt-6 text-center text-sm text-slate-600">
                For more information, please review our <a href="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</a> or contact us at{" "}
                <a href="mailto:support@leadslaps.com" className="font-medium text-primary hover:underline">support@leadslaps.com</a>.
              </p>
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Terms;
