type Props = {
  text: string;
};
export const Tag = ({ text }: Props) => (
  <div className="mt-8 inline-flex justify-center w-64 py-2 px-4 border border-primary/50 rounded-2xl text-primary-800">
    {text}
  </div>
);
