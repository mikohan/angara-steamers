import Image from "next/image";
import { problems } from "@/data/problems"; // Array of texts and images
import { ProcessSmall } from "@/components/ProcessSmall";
import { Tag } from "@/components/Tag";

export const Problem = () => (
  <section className="bg-gradient">
    <div className="px-6 container mx-auto">
      <div className="flex flex-col justify-center items-center">
        <Tag text="Problems We Solve" />
        <h2 className="mt-8 text-3xl md:text-5xl font-gradient font-blauerSemibold text-center tracking-tight">
          Think your couch is ruined?
        </h2>
        <h3 className="subheader text-center mt-4">
          We bring it back—fast, safe, professional
        </h3>
        <div className="mt-16 flex flex-col md:flex-row md:gap-8 font-blauerRegular">
          {problems.map((obj, i) => (
            <div key={i} className="">
              <div className="relative h-60 w-full mb-4">
                <Image
                  alt={`Image of problem we solve-${i}`}
                  // src={obj.img}
                  src={obj.url}
                  className="w-full h-auto object-cover rounded-2xl"
                  fill
                  priority={i === 0} // High priority for the first item
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 1280px) 300px, (min-width: 460px) 90vw, 300px"
                />
              </div>
              <p className="text-primary-800 text-center mb-16">{obj.text}</p>
            </div>
          ))}
        </div>
        <ProcessSmall />
      </div>
    </div>
  </section>
);
