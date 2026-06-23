import { BorderLightButton } from "@/components/common/BorderLightButton";
import { ButtonShiny } from "@/components/common/ButtonShiny";
import SafetySection from "@/components/SafeShampoos";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Test() {
  return (
    <>
      <div className="max-w-[20%] mx-auto mt-32">
        <ButtonShiny />
        <BorderLightButton className="mt-4" text="Border Light" />
      </div>
      <div>
        <SafetySection />
      </div>
    </>
  );
}
