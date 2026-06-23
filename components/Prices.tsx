import { prices } from "@/data/prices";
import { PriceCard } from "@/components/PriceCard";
import { MiniCartSummary } from "@/components/MiniSummary";

export const Prices = () => (
  <section className="bg-primary/10 py-16">
    <div className="container px-6 mx-auto mt-16">
      <h2 className="font-gradient text-3xl text-center font-blauerSemibold mb-8">
        <span className="text-couchBlue">Prices</span> for Deep Steam Cleaning
        and Disinfection
      </h2>

      {/* MiniCart added once here at the top of the price content */}
      <div className="mb-12">
        <MiniCartSummary />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8 mt-8">
        {prices.map((price, i) => (
          <PriceCard key={i} {...price} />
        ))}
      </div>
    </div>
  </section>
);
