import { IPrice } from "@/types";
import SmalCouchImage from "@/public/oldMedia/couch/prices/sofa.png";
import SmalLShapedImage from "@/public/oldMedia/couch/prices/smallLShaped.png";
import LargeSectionalImage from "@/public/oldMedia/couch/prices/largeSecional.png";
import ArmChairImage from "@/public/oldMedia/couch/prices/armchair.png";
import MattressImage from "@/public/oldMedia/couch/prices/mattress.png";
import BedImage from "@/public/oldMedia/couch/prices/bed.png";
import RugImage from "@/public/oldMedia/couch/prices/rug.png";
import CarpetImage from "@/public/oldMedia/couch/prices/carpet.png";

export const prices: IPrice[] = [
  // --- Sofas ---
  {
    img: SmalCouchImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/sofa.png",
    category: "Sofas",
    item: "Love Seat",
    priceBefore: 180,
    priceAfter: 145,
  },
  {
    img: SmalCouchImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/sofa.png",
    category: "Sofas",
    item: "3 seat Sofa",
    priceBefore: 210,
    priceAfter: 165,
  },

  // --- L-Shaped Couch ---
  {
    img: SmalLShapedImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/smallLShaped.png",
    category: "L-Shaped Couch",
    item: "3-4 Seater",
    priceBefore: 230,
    priceAfter: 195,
  },
  {
    img: SmalLShapedImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/smallLShaped.png",
    category: "L-Shaped Couch",
    item: "5-6 seater",
    priceBefore: 310,
    priceAfter: 245,
  },

  // --- Large Sectional ---
  {
    img: LargeSectionalImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/largeSecional.png",
    category: "Large Sectional",
    item: "7-8 Seater",
    priceBefore: 380,
    priceAfter: 295,
  },
  {
    img: LargeSectionalImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/largeSecional.png",
    category: "Large Sectional",
    item: "9+ Seater",
    priceBefore: 430,
    priceAfter: 395,
  },

  // --- Chairs ---
  {
    img: ArmChairImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/armchair.png",
    category: "Chairs",
    item: "Armchair",
    priceBefore: 110,
    priceAfter: 85,
  },
  {
    img: ArmChairImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/armchair.png",
    category: "Chairs",
    item: "Dining Chair",
    priceBefore: 35,
    priceAfter: 25,
  },

  // --- Mattresses ---
  {
    img: MattressImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/mattress.png",
    category: "Mattresses",
    item: "Queen",
    priceBefore: 155,
    priceAfter: 115,
  },
  {
    img: MattressImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/mattress.png",
    category: "Mattresses",
    item: "King",
    priceBefore: 179,
    priceAfter: 135,
  },

  // --- Bed ---
  {
    img: BedImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/bed.png",
    category: "Bed",
    item: "Head Board",
    priceBefore: 110,
    priceAfter: 85,
  },
  {
    img: BedImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/bed.png",
    category: "Bed",
    item: "Bed Frame",
    priceBefore: 165,
    priceAfter: 120,
  },

  // --- Carpets ---
  {
    img: CarpetImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/carpet.png",
    category: "Carpets",
    item: "1 room carpet",
    priceBefore: 120,
    priceAfter: 90,
  },
  {
    img: CarpetImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/carpet.png",
    category: "Carpets",
    item: "3 rooms carpet",
    priceBefore: 290,
    priceAfter: 240,
  },

  // --- Area Rugs ---
  {
    img: RugImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/rug.png",
    category: "Area Rugs",
    item: "10x10 Area Rug",
    priceBefore: 110,
    priceAfter: 90,
  },
  {
    img: RugImage,
    url: "https://ik.imagekit.io/angara/Couch/prices/rug.png",
    category: "Area Rugs",
    item: "5x5 Area Rug",
    priceBefore: 90,
    priceAfter: 60,
  },
];
