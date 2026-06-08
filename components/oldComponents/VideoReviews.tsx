import { Tag } from "@/components/oldComponents/Tag";
import { VideoComponentTestimonials } from "./VideoComponentTestimonials";
import Test3Poster from "@/public/oldMedia/couch/test3.jpg";
import Test2Poster from "@/public/oldMedia/couch/test2.jpg";
import Test1Poster from "@/public/oldMedia/couch/test1.jpg";

export const VideoReviews = () => {
  return (
    <div>
      <div className="container px-8 mx-auto">
        {/* Vertical flex for all boxes on the page. */}
        <div className="flex flex-col justify-center items-center mt-8">
          <Tag text="Safe for Pets and Children" className="hidden md:block" />
          <h2 className="text-3xl md:text-5xl font-gradient font-blauerSemibold text-center font-gradient">
            What people say about us
          </h2>
          <h3 className="subheader text-center mt-2">
            Helped 1000+ families - fast, safe, professional
          </h3>
          {/* Common container */}
          <div className="flex flex-col md:flex-row gap-8 pt-16">
            <div className="md:max-w-[33%]">
              <VideoComponentTestimonials
                source="oldMedia/videos/test1.mp4"
                autoPlay={false}
                muted={false}
                poster={Test1Poster.src}
              />
            </div>

            <div className="md:max-w-[33%]">
              <VideoComponentTestimonials
                loop={false}
                source="oldMedia/videos/test2.mp4"
                autoPlay={false}
                muted={false}
                poster={Test2Poster.src}
              />
            </div>
            <div className="md:max-w-[33%]">
              <VideoComponentTestimonials
                source="oldMedia/videos/test3.mp4"
                autoPlay={false}
                muted={false}
                poster={Test3Poster.src}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
