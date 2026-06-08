import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Import your images
import Ava1 from "@/public/oldMedia/couch/ava1.png";
import Ava2 from "@/public/oldMedia/couch/ava2.png";
import Ava3 from "@/public/oldMedia/couch/ava3.png";

export function AvatarGroup() {
  const avatarArr = [Ava1, Ava2, Ava3];

  return (
    <div className="flex -space-x-3 md:-space-x-4">
      {avatarArr.map((src, i) => (
        <Avatar
          key={i}
          // Uses your theme's background for the border to create the "gap" effect
          className="ring-2 ring-background/40 w-8 h-8 md:w-12 md:h-12"
        >
          <AvatarImage src={src.src} alt="Customer" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}

      {/* Placeholder Avatar using your primary color */}
      <Avatar className="border-2 border-primary/40 w-8 h-8 md:w-12 md:h-12  text-primary">
        <AvatarFallback className="text-[10px] md:text-xs font-bold bg-primary/30">
          +99
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
