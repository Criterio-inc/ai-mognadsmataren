import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GuideContent } from './GuideContent';

export default function GuidePage() {
  const filePath = path.join(process.cwd(), 'KONSULTGUIDE.md');
  const markdown = fs.readFileSync(filePath, 'utf-8');

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Tillbaka till projekt
      </Link>

      <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-8 md:p-12">
        <GuideContent markdown={markdown} />
      </div>
    </div>
  );
}
