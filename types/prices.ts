import { StaticImageData } from "next/image";
// Prices for couch and carpet cleaning
export interface IPrice {
  img: StaticImageData;
  url: string;
  category: string;
  item: string;
  priceBefore: number;
  priceAfter: number;
}
