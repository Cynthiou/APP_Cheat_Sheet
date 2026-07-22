export type ContentKind = 'lesson' | 'template' | 'guide';

export type ContentStatus = 'ready' | 'planned';

export type Technology =
  | 'tools'
  | 'git'
  | 'methodology'
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'node'
  | 'express'
  | 'sql'
  | 'database'
  | 'auth'
  | 'deployment'
  | 'testing'
  | 'advanced';

export type CodeLanguage =
  | 'bash'
  | 'html'
  | 'css'
  | 'scss'
  | 'javascript'
  | 'typescript'
  | 'tsx'
  | 'jsx'
  | 'json'
  | 'sql'
  | 'text';

export interface CodeBlock {
  id: string;
  filename?: string;
  language: CodeLanguage;
  code: string;
  label?: string;
}

export interface Replacement {
  token: string;
  description: string;
}

export interface ContentBase {
  id: string;
  slug: string;
  kind: ContentKind;
  status: ContentStatus;
  title: string;
  shortTitle?: string;
  summary: string;
  technology: Technology;
  tomeId: string;
  aliases: string[];
  keywords: string[];
  relatedContentIds: string[];
  lessonId?: string;
  templateId?: string;
  guideIds?: string[];
  resources?: ResourceLink[];
}

export type ResourceKind = 'doc' | 'tool' | 'tuto';
export interface ResourceLink {
  label: string;
  url: string;
  kind: ResourceKind;
  note?: string;
}

export type LessonBlock =
  | { type: 'paragraph'; html: string }
  | { type: 'code'; block: CodeBlock }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'note'; variant: 'image' | 'convention'; html: string }
  | { type: 'situation'; html: string };

export interface LessonSection {
  id: string;
  title: string;
  blocks: LessonBlock[];
}

export interface LessonContent extends ContentBase {
  kind: 'lesson';
  status: 'ready';
  utility: string;
  intro: string;
  sections: LessonSection[];
  pitfalls?: string[];
  takeaways: string[];
}

export interface TemplateVariant {
  id: string;
  label: string;
  description?: string;
  codeBlocks: CodeBlock[];
  replacements: Replacement[];
  placement?: string;
  preview?: string;
}

export interface TemplateContent extends ContentBase {
  kind: 'template';
  status: 'ready';
  lede: string;
  variants: TemplateVariant[];
}

export interface GuideStep {
  id: string;
  title: string;
  goal: string;
  files: string[];
  explanation?: string;
  codeBlocks: CodeBlock[];
  result?: string;
  relatedContentIds: string[];
}

export interface GuideContent extends ContentBase {
  kind: 'guide';
  status: 'ready';
  objective: string;
  preview: string;
  files: string[];
  steps: GuideStep[];
  finalResult: string;
  pitfalls?: string[];
  variations?: string[];
  usesContentIds?: string[];
}

export interface PlannedContent extends ContentBase {
  status: 'planned';
}

export type ReadyContent = LessonContent | TemplateContent | GuideContent;
export type Content = ReadyContent | PlannedContent;

export function isReady(c: Content): c is ReadyContent {
  return c.status === 'ready';
}
export function isLesson(c: Content): c is LessonContent {
  return c.status === 'ready' && c.kind === 'lesson';
}
export function isTemplate(c: Content): c is TemplateContent {
  return c.status === 'ready' && c.kind === 'template';
}
export function isGuide(c: Content): c is GuideContent {
  return c.status === 'ready' && c.kind === 'guide';
}

export interface Tome {
  id: string;
  title: string;
  technology: Technology;
  subtitle?: string;
}

export interface TechnologyMeta {
  id: Technology;
  label: string;
}
