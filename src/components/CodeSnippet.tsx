import { Terminal } from "lucide-react";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export const CodeSnippet = ({ code }: CodeSnippetProps) => {
  return (
    <div className="group relative">
      <div className="absolute top-4 left-4 text-neutral-600 group-hover:text-neutral-400 transition-colors">
        <Terminal size={14} />
      </div>
      <pre className="code-block pl-10 shadow-xl overflow-hidden">
        <code className="text-blue-400"># R Analysis Snippet</code>
        <br />
        {code}
      </pre>
    </div>
  );
};
