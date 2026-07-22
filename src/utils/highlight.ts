import type { CodeLanguage } from '@/types/content';

export function prismLanguage(language: CodeLanguage): string {
  switch (language) {
    case 'tsx':
      return 'tsx';
    case 'jsx':
      return 'jsx';
    case 'typescript':
      return 'tsx';
    case 'javascript':
      return 'jsx';
    case 'html':
      return 'markup';
    case 'css':
      return 'css';
    case 'scss':
      return 'css';
    case 'json':
      return 'json';
    case 'sql':
      return 'sql';
    case 'bash':
      return 'bash';
    case 'text':
    default:
      return 'text';
  }
}
