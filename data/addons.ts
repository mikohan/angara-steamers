// Add-ons customers can put in the cart next to the main items.
// Price is per piece of furniture. Change prices here.
export interface IAddOn {
  item: string; // cart line name
  description: string;
  price: number;
}

export const addOns: IAddOn[] = [
  {
    item: "Pet hair removal",
    description: "We pull the fur out of the fabric before the steam clean.",
    price: 30,
  },
  {
    item: "Pill removal",
    description: "We shave off the fuzz balls so the fabric looks smooth again.",
    price: 30,
  },
];
