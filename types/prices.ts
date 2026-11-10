import { StaticImageData } from "next/image";
// Prices for couch and carpet cleaning
export interface IPrice {
  img: StaticImageData;
  url: string;
  category: string;
  item: string;
  size?: string; // short size line shown under the item name
  priceBefore: number;
  priceAfter: number;
}
