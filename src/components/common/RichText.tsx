export function RichText({ html, as = 'span', className }: { html: string; as?: 'span' | 'p' | 'div' | 'li'; className?: string }) {
  const Tag = as;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
