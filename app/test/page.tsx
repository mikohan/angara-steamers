import { BorderLightButton } from "@/components/common/BorderLightButton";
import { ButtonShiny } from "@/components/common/ButtonShiny";
import { CarpetSliderPerks } from "@/components/games/CarpetSliderPerks";
import SafetySection from "@/components/SafeShampoos";
import { Metadata } from "next";
import { Cloud, CloudUpload, CloudSun } from "lucide-react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Test() {
  return (
    <>
      <div className="max-w-full mx-auto mt-32">
        <div className="my-16">
          <CarpetSliderPerks />
        </div>
        <ButtonShiny />
        <BorderLightButton className="mb-8" text="Border Light" />
      </div>
      <div>
        <SafetySection />
      </div>
      <div>
        <Cloud />
        <CloudUpload />
        <CloudSun />
      </div>
    </>
  );
}
