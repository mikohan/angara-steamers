import ReactMarkdown, { Components } from "react-markdown";

// Define the components object using the Components type
const components: Components = {
  h1: ({ node, ...props }) => <h2 {...props} />,
};

export function RichTextRenderer({ content }: { content: string }) {
  if (!content) return null;

  return (
    // The 'prose' class now has real HTML tags to style!
    <div className="prose max-w-none md:prose-lg prose-headings:text-foreground prose-li:text-foreground text-foreground prose-strong:text-foreground">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
