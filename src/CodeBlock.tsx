import SyntaxHighlighter from 'react-syntax-highlighter'

export default function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <SyntaxHighlighter language={language}>
      {code}
    </SyntaxHighlighter>
  );
}