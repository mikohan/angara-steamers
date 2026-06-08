import Image from "next/image";
import MeVasyaImage from "@/public/oldMedia/couch/me-vasya-bottom.png";

export const Team = () => (
  <section className="bg-gradient mt-16">
    <div className="px-6 container mx-auto">
      <div className="flex flex-col justify-center items-center">
        <h2 className="heading-h2 mt-8 text-center">Our Team</h2>
        <h3 className="heading-h3 text-center mt-4">
          We bring it back—fast, safe, professional
        </h3>
        <div className="mt-16 flex flex-col md:flex-row md:gap-8 font-blauerRegular">
          <Image
            alt="our team"
            src={MeVasyaImage}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);
