import { cn } from "@/lib/utils";
type Props = {
  text: string;
  className?: string;
};
export const Tag = ({ text, className }: Props) => (
  <div
    className={cn(
      "inline-flex justify-center w-64 py-2 px-4 border border-primary/50 rounded-2xl text-primary",
      className,
    )}
  >
    {text}
  </div>
);
