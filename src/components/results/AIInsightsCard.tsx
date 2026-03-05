'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ArrowRight, Loader2 } from 'lucide-react';

interface AIInsights {
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  nextSteps: string[];
}

interface AIInsightsCardProps {
  insights: AIInsights | null;
  isLoading: boolean;
  locale: 'sv' | 'en';
}

export function AIInsightsCard({ insights, isLoading, locale }: AIInsightsCardProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-8">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-slate-600 dark:text-slate-300">
            {locale === 'sv' ? 'Genererar AI-insikter...' : 'Generating AI insights...'}
          </span>
        </div>
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  const sections = [
    {
      title: locale === 'sv' ? 'Sammanfattning' : 'Summary',
      icon: Sparkles,
      content: insights.summary,
      type: 'text' as const,
      color: 'teal',
    },
    {
      title: locale === 'sv' ? 'Era styrkor' : 'Your strengths',
      icon: TrendingUp,
      content: insights.strengths,
      type: 'list' as const,
      color: 'emerald',
    },
    {
      title: locale === 'sv' ? 'Utvecklingsområden' : 'Areas for improvement',
      icon: AlertTriangle,
      content: insights.improvements,
      type: 'list' as const,
      color: 'amber',
    },
    {
      title: locale === 'sv' ? 'Rekommendationer' : 'Recommendations',
      icon: Lightbulb,
      content: insights.recommendations,
      type: 'list' as const,
      color: 'blue',
    },
    {
      title: locale === 'sv' ? 'Nästa steg' : 'Next steps',
      icon: ArrowRight,
      content: insights.nextSteps,
      type: 'list' as const,
      color: 'violet',
    },
  ];

  const colorClasses = {
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-900/30',
      icon: 'text-teal-700 dark:text-teal-400',
      border: 'border-teal-200 dark:border-teal-800',
    },
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      icon: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
    amber: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      icon: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      icon: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
    },
    violet: {
      bg: 'bg-violet-100 dark:bg-violet-900/30',
      icon: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-200 dark:border-violet-800',
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {locale === 'sv' ? 'AI-genererade insikter' : 'AI-generated insights'}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const colors = colorClasses[section.color as keyof typeof colorClasses];

          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${index === 0 ? 'md:col-span-2' : ''} bg-white dark:bg-slate-800 rounded-xl shadow-lg border ${colors.border} overflow-hidden`}
            >
              {/* Header */}
              <div className={`${colors.bg} px-4 py-3 flex items-center gap-2`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {section.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-4">
                {section.type === 'text' ? (
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {section.content as string}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {(section.content as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.icon.replace('text-', 'bg-')}`} />
                        <span className="text-slate-700 dark:text-slate-300 text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
