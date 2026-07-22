import { Highlight, themes } from 'prism-react-renderer';
import type { CodeBlock as CodeBlockData } from '@/types/content';
import { prismLanguage } from '@/utils/highlight';
import { CopyButton } from './CopyButton';

interface Props {
  block: CodeBlockData;
}

const PLAIN = /^(text|txt|plaintext|plain|none)$/i;

export function CodeBlock({ block }: Props) {
  if (PLAIN.test(block.language || '')) {
    return (
      <div className="memo">
        <div className="memo-bar">
          <svg className="memo-ico" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path d="M14 3v4h4M8.5 12h7M8.5 15.5h7M8.5 19h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <span className="memo-name">{block.filename || 'À copier tel quel'}</span>
          <CopyButton code={block.code} />
        </div>
        <pre className="memo-pre">{block.code}</pre>
      </div>
    );
  }

  return (
    <div className="code">
      <div className="cbar">
        <span className="d d1" />
        <span className="d d2" />
        <span className="d d3" />
        {block.filename && <span className="fname">{block.filename}</span>}
        <CopyButton code={block.code} />
      </div>
      <Highlight theme={themes.oneDark} code={block.code} language={prismLanguage(block.language)}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="code-pre">
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line });
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, k) => {
                    const tokenProps = getTokenProps({ token });
                    return <span key={k} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
