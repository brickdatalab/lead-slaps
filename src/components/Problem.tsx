const Problem = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-12">
        <h2 className="mb-8 font-heading text-4xl font-bold text-primary md:text-[40px]">
          Why Most Working Capital Leads Are Low Quality (The Race to the Bottom)
        </h2>
        <p className="mb-6 font-body text-lg leading-relaxed text-text-primary">
          The problem isn't your sales team; it's your vendor's business model. Traditional providers sell the same lead to 10-20 brokers, creating prospect burnout and making conversion nearly impossible. This forces good brokers to compete on price, not value, destroying margins and morale. This "Race to the Bottom" is characterized by:
        </p>
        <ul className="mx-auto max-w-2xl space-y-3 text-left font-body text-lg text-text-primary">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
            <span>Shared lists and recycled data</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
            <span>Non-consented contacts</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
            <span>Lagged delivery times</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
            <span>No accountability for lead quality</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Problem;
