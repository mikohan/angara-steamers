export function SlimCTA() {
  return (
    <section className="py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Header/Copy */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Couch look tired?
          </h3>
          <p className="text-muted text-sm md:text-base">
            Get professional upholstery cleaning today.
          </p>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4">
          <span className="hidden md:block font-medium text-foreground">
            Call <span className="text-primary font-bold">1-800-FRESHEN</span>
          </span>
          <button className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all active:scale-95">
            GET FREE QUOTE
          </button>
        </div>
      </div>
    </section>
  );
}
