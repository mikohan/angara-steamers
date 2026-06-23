import DoneIcone from "@/public/oldMedia/couch/done.svg";
import Image from "next/image";
export const ProcessSmall = () => (
  <div className="flex flex-col gap-8 md:gap-16 pb-8 md:pb-16 md:max-w-3xl md:items-center">
    <h2 className="mt-8 text-3xl md:text-5xl font-gradient font-blauerSemibold text-center tracking-tight">
      We perform a 4-step deep cleaning procedure for your couch that includes:
    </h2>
    <ul className="text-xl md:text-2xl font-blauerMedium text-couchBlue flex flex-col gap-4">
      <li className="flex gap-2 items-center">
        <Image alt="done icon" src={DoneIcone} height={24} width={24} />
        <div>Eco-Shampoo Treatment</div>
      </li>
      <li className="flex gap-2 items-center">
        <Image alt="done icon" src={DoneIcone} height={24} width={24} />
        <div>Stain & Odor Removal</div>
      </li>
      <li className="flex gap-2 items-center">
        <Image alt="done icon" src={DoneIcone} height={24} width={24} />
        <div>200°F Steam Cleaning</div>
      </li>
      <li className="flex gap-2 items-center">
        <Image alt="done icon" src={DoneIcone} height={24} width={24} />
        <div>Full Sanitizing</div>
      </li>
      <li className="flex gap-2 items-center">
        <Image alt="done icon" src={DoneIcone} height={24} width={24} />
        <div>
          <a href="https://share.google/oDULc3KpCXQC52z9f">4.9 Google Rated</a>
        </div>
      </li>
    </ul>
    <p className="font-gradinet text-center text-xl md:text-3xl tracking-tight font-blauerMedium">
      Best Price Guarantee: find service with everything included for less and
      we’ll beat it.
    </p>
  </div>
);
