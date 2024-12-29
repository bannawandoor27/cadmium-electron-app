import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Typography } from "@/components/ui/typography";
import { Copy } from "lucide-react";
import CodeBlock from "@/components/custom/global/code-block";

export interface RagInferenceProps {
  ragResponse: string | undefined;
}

export function RagInference({ ragResponse }: RagInferenceProps) {
  if (!ragResponse) {
    return (
      <Typography
        variant="sm"
        className="text-center text-gray-400 my-8"
      >
        No inference found to resolve
      </Typography>
    );
  }

  const handleCopySuccess = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-8 rounded-lg shadow-lg">
      <Typography
        variant="small"
        className="font-semibold text-lg text-gray-100 mb-6"
      >
        Steps to Resolve
      </Typography>
      <div className="text-sm leading-7 text-gray-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || ""); // Extract language
              const language = match ? match[1].toLowerCase() : "code"; // Use lowercase language or default to "code"
              const code = String(children).replace(/\n$/, "");

              return match ? (
                <div
                  className="relative my-4 bg-gray-800 border border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Typography
                      variant="sm"
                      className="text-gray-400"
                    >
                      {language}
                    </Typography>
                    <button
                      onClick={() => handleCopySuccess(code)}
                      className="flex items-center text-xs cursor-pointer text-gray-400 hover:text-gray-300 bg-gray-700 px-2 py-1 rounded-md"
                    >
                      <Copy width={16} className="mr-1" /> Copy
                    </button>
                  </div>
                  <CodeBlock codeString={code} />
                </div>
              ) : (
                <code
                  className="inline-block bg-gray-800 text-gray-100 px-3 py-1 rounded-md text-sm font-mono italic shadow-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            strong: ({ ...props }) => (
              <strong
                className="font-bold text-gray-100 shadow-sm"
                {...props}
              />
            ),
            h1: ({ ...props }) => (
              <h1
                className="text-3xl font-bold text-gray-100 border-b border-gray-700 mb-6 pb-2 shadow-lg"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="text-2xl font-semibold text-gray-200 my-5"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="text-xl font-semibold text-gray-300 my-4"
                {...props}
              />
            ),
            p: ({ ...props }) => (
              <p
                className="my-4 text-gray-300"
                {...props}
              />
            ),
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-8 bg-gray-800 text-blue-400 italic p-4 my-6 rounded-lg border-gradient-to-r from-blue-500 to-blue-300"
                {...props}
              />
            ),
            ul: ({ ...props }) => (
              <ul
                className="list-disc list-inside my-4 text-gray-300 space-y-2"
                {...props}
              />
            ),
            ol: ({ ...props }) => (
              <ol
                className="list-decimal list-inside my-4 text-gray-300 space-y-2"
                {...props}
              />
            ),
            a: ({ ...props }) => (
              <a
                className="text-blue-400 underline hover:text-blue-300 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            img: ({ ...props }) => (
              <img
                className="my-6 rounded-lg shadow-md border border-gray-700"
                alt=""
                {...props}
              />
            ),
            table: ({ ...props }) => (
              <table
                className="table-auto w-full border-collapse border border-gray-700 my-4 bg-gray-800 text-gray-300 rounded-lg overflow-hidden"
                {...props}
              />
            ),
            th: ({ ...props }) => (
              <th
                className="border border-gray-700 bg-gray-700 p-3 text-left font-semibold text-gray-200 sticky top-0"
                {...props}
              />
            ),
            td: ({ ...props }) => (
              <td
                className="border border-gray-700 p-3 text-gray-300"
                {...props}
              />
            ),
          }}
        >
          {ragResponse}
        </ReactMarkdown>
      </div>
    </div>
  );
}
