'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function GuideContent({ markdown }: { markdown: string }) {
  return (
    <article className="prose prose-stone dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200 prose-h2:dark:border-slate-700 prose-h2:pb-2 prose-h3:text-lg prose-h3:mt-6 prose-h4:text-base prose-a:text-amber-600 prose-a:dark:text-amber-400 prose-blockquote:border-l-amber-500 prose-blockquote:bg-slate-50 prose-blockquote:dark:bg-slate-900/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-table:text-sm prose-th:bg-slate-100 prose-th:dark:bg-slate-700 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-hr:border-slate-200 prose-hr:dark:border-slate-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}
