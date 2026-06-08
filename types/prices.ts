import { StaticImageData } from "next/image";
// Prices for couch and carpet cleaning
export interface IItem {
  item: string;
  priceBefore: number;
  priceAfter: number;
}
export interface IPrice {
  img: StaticImageData;
  url: string;
  category: string;
  items: IItem[];
}
