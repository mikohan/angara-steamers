import ReactMarkdown from "react-markdown";

export function RichTextRenderer({ content }: { content: string }) {
  if (!content) return null;

  return (
    // The 'prose' class now has real HTML tags to style!
    <div className="prose max-w-none md:prose-lg prose-headings:text-foreground prose-li:text-foreground text-foreground prose-strong:text-foreground">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
