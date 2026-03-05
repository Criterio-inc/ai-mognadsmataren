'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { getAllScopes, getScope } from '@/lib/scopes';
import type { ScopeId } from '@/lib/scopes';
import {
  ArrowRight,
  BarChart3,
  Users,
  Lightbulb,
  Clock,
  TrendingUp,
  Sparkles,
  Mail,
  Brain,
  Monitor,
} from 'lucide-react';

interface LandingPageProps {
  onStart: (scopeId: ScopeId) => void;
}

const scopeIcons: Record<string, typeof Brain> = {
  ai: Brain,
  digital: Monitor,
};

const scopeColors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  ai: {
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    border: 'border-teal-500',
    text: 'text-teal-600 dark:text-teal-400',
    gradient: 'from-teal-500 to-teal-600',
  },
  digital: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-500',
    text: 'text-orange-600 dark:text-orange-400',
    gradient: 'from-orange-500 to-orange-600',
  },
};

// Preview dimension bars per scope (example data)
const scopePreviewDimensions: Record<string, Array<{ sv: string; en: string; score: number; color: string }>> = {
  ai: [
    { sv: 'Strategi & Ledarskap', en: 'Strategy & Leadership', score: 4.2, color: 'bg-teal-500' },
    { sv: 'Data & Infrastruktur', en: 'Data & Infrastructure', score: 3.6, color: 'bg-cyan-500' },
    { sv: 'Styrning & Etik', en: 'Governance & Ethics', score: 3.8, color: 'bg-orange-500' },
    { sv: 'Kompetens & Kultur', en: 'Competence & Culture', score: 3.4, color: 'bg-emerald-500' },
  ],
  digital: [
    { sv: 'Gemensam Bild', en: 'Shared Understanding', score: 3.9, color: 'bg-orange-500' },
    { sv: 'Strategisk Koppling', en: 'Strategic Alignment', score: 3.2, color: 'bg-amber-500' },
    { sv: 'Ledarskap & Kultur', en: 'Leadership & Culture', score: 4.1, color: 'bg-teal-500' },
    { sv: 'Organisatorisk Förmåga', en: 'Organizational Capability', score: 3.5, color: 'bg-cyan-500' },
  ],
};

const scopeInsights: Record<string, { sv: string[]; en: string[] }> = {
  ai: {
    sv: [
      'Starkt strategiskt ledarskap och tydlig AI-vision på ledningsnivå.',
      'Potential att förbättra AI-kompetens och kultur i hela organisationen.',
      'Rekommendation: Kartlägg er status gentemot EU AI Act och formalisera AI-styrning.',
    ],
    en: [
      'Strong strategic leadership and clear AI vision at management level.',
      'Potential to improve AI competence and culture across the organization.',
      'Recommendation: Map your status against the EU AI Act and formalize AI governance.',
    ],
  },
  digital: {
    sv: [
      'God förståelse för digitaliseringens betydelse i ledningsgruppen.',
      'Potential att stärka den strategiska kopplingen mellan IT och verksamhetsmål.',
      'Rekommendation: Skapa en tydlig digital handlingsplan med mätbara mål.',
    ],
    en: [
      'Good understanding of the importance of digitalization in the leadership team.',
      'Potential to strengthen the strategic alignment between IT and business goals.',
      'Recommendation: Create a clear digital action plan with measurable goals.',
    ],
  },
};

export function LandingPage({ onStart }: LandingPageProps) {
  const { locale } = useAssessmentStore();
  const [selectedScope, setSelectedScope] = useState<ScopeId>('ai');
  const allScopes = getAllScopes();

  const currentScope = getScope(selectedScope);
  const colors = scopeColors[selectedScope];
  const previewDims = scopePreviewDimensions[selectedScope];
  const insights = scopeInsights[selectedScope];

  const handleStartAssessment = () => {
    onStart(selectedScope);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-24">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <Image
            src="/critero-icon.svg"
            alt="Critero"
            width={120}
            height={72}
            className="h-16 w-auto"
          />
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {locale === 'sv' ? 'Mognadsmätaren' : 'Maturity Meter'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === 'sv'
              ? 'Välj vilken mognad du vill mäta och få en detaljerad rapport med AI-genererade insikter'
              : 'Choose which maturity to measure and get a detailed report with AI-generated insights'}
          </p>
        </motion.div>

        {/* Scope Selector Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8"
        >
          {allScopes.map((scope) => {
            const Icon = scopeIcons[scope.id] || Brain;
            const isSelected = selectedScope === scope.id;
            const sColors = scopeColors[scope.id];

            return (
              <motion.button
                key={scope.id}
                onClick={() => setSelectedScope(scope.id as ScopeId)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? `${sColors.bg} ${sColors.border} shadow-lg`
                    : 'bg-card border-border hover:border-muted-foreground/30'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="scope-indicator"
                    className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r ${sColors.gradient}`}
                  />
                )}

                <Icon className={`w-10 h-10 mb-3 ${isSelected ? sColors.text : 'text-muted-foreground'}`} />

                <h3 className={`text-xl font-bold mb-1 ${isSelected ? 'text-foreground' : 'text-card-foreground'}`}>
                  {scope.name[locale]}
                </h3>

                <p className="text-sm text-muted-foreground mb-3">
                  {scope.description[locale]}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5" />
                    {scope.questionCount} {locale === 'sv' ? 'frågor' : 'questions'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    {scope.dimensionCount} {locale === 'sv' ? 'dimensioner' : 'dimensions'}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-2 italic">
                  {scope.targetAudience[locale]}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20"
        >
          <motion.button
            onClick={handleStartAssessment}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${colors.gradient} text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
          >
            {locale === 'sv'
              ? `Starta ${currentScope.name[locale].toLowerCase()}-mätningen`
              : `Start ${currentScope.name[locale].toLowerCase()} assessment`}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="text-sm text-muted-foreground mt-3">
            {locale === 'sv'
              ? `${currentScope.questionCount} påståenden \u00b7 ${currentScope.dimensionCount} dimensioner \u00b7 ca ${currentScope.questionCount <= 25 ? '10-15' : '15-20'} minuter`
              : `${currentScope.questionCount} statements \u00b7 ${currentScope.dimensionCount} dimensions \u00b7 approx. ${currentScope.questionCount <= 25 ? '10-15' : '15-20'} minutes`}
          </p>
        </motion.div>

        {/* Report Teaser Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-24"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {locale === 'sv' ? 'Se vad du får' : 'See what you get'}
            </h2>
            <p className="text-muted-foreground">
              {locale === 'sv'
                ? 'En detaljerad rapport med grafer, analyser och AI-genererade insikter'
                : 'A detailed report with graphs, analysis and AI-generated insights'}
            </p>
          </div>

          {/* Report Preview Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-8 shadow-2xl border border-stone-700 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Left side - Gauge and Score */}
              <div className="space-y-6">
                <div className="bg-stone-800/50 rounded-xl p-6 backdrop-blur">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-medium text-stone-300">
                      {locale === 'sv'
                        ? `Er ${currentScope.name[locale].toLowerCase()}snivå`
                        : `Your ${currentScope.name[locale].toLowerCase()} level`}
                    </span>
                  </div>

                  {/* Simulated Gauge */}
                  <div className="relative h-32 flex items-center justify-center">
                    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#44403c"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 20 100 A 80 80 0 0 1 140 35"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#F5A623" />
                          <stop offset="100%" stopColor="#c96442" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                      <span className="text-4xl font-bold text-white">3.8</span>
                      <span className="text-xs text-stone-400">{locale === 'sv' ? 'av 5' : 'of 5'}</span>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-full">
                      {locale === 'sv' ? 'Nivå 4: Skalande' : 'Level 4: Scaling'}
                    </span>
                  </div>
                </div>

                {/* Dimension bars - dynamic per selected scope */}
                <div className="bg-stone-800/50 rounded-xl p-6 backdrop-blur">
                  <div className="text-sm font-medium text-stone-300 mb-4">
                    {locale === 'sv' ? 'Resultat per dimension' : 'Results by dimension'}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedScope}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {previewDims.map((dim, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-stone-400">{dim[locale]}</span>
                            <span className="text-white font-medium">{dim.score}</span>
                          </div>
                          <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(dim.score / 5) * 100}%` }}
                              transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                              className={`h-full ${dim.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right side - AI Insights */}
              <div className="bg-stone-800/50 rounded-xl p-6 backdrop-blur h-fit">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-medium text-stone-300">
                    {locale === 'sv' ? 'AI-genererade insikter' : 'AI-generated insights'}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedScope}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-sm text-stone-300"
                  >
                    {[
                      { icon: '\u2713', iconColor: 'bg-emerald-500/20', textColor: 'text-emerald-400' },
                      { icon: '!', iconColor: 'bg-orange-500/20', textColor: 'text-orange-400' },
                      { icon: '\u2192', iconColor: 'bg-teal-500/20', textColor: 'text-teal-400' },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="flex gap-3"
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full ${item.iconColor} flex items-center justify-center`}>
                          <span className={`${item.textColor} text-xs`}>{item.icon}</span>
                        </div>
                        <p>{insights[locale][idx]}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 pt-4 border-t border-stone-700">
                  <p className="text-xs text-stone-500 italic">
                    {locale === 'sv'
                      ? '* Exempelrapport \u2013 dina faktiska resultat baseras på dina svar'
                      : '* Example report \u2013 your actual results are based on your answers'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA in preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <button
                onClick={handleStartAssessment}
                className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105`}
              >
                {locale === 'sv' ? 'Få din egen rapport' : 'Get your own report'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-24"
        >
          {[
            {
              icon: BarChart3,
              sv: { title: 'Evidensbaserad', description: 'Vetenskapligt förankrade frågor' },
              en: { title: 'Evidence-based', description: 'Scientifically grounded questions' },
            },
            {
              icon: Clock,
              sv: { title: 'Snabb mätning', description: 'Genomför på 10-20 minuter' },
              en: { title: 'Quick assessment', description: 'Complete in 10-20 minutes' },
            },
            {
              icon: Lightbulb,
              sv: { title: 'AI-insikter', description: 'Personliga rekommendationer' },
              en: { title: 'AI insights', description: 'Personalized recommendations' },
            },
            {
              icon: Users,
              sv: { title: 'Teamjämförelse', description: 'Se aggregerade resultat' },
              en: { title: 'Team comparison', description: 'View aggregated results' },
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 300 }}
                className="bg-card backdrop-blur rounded-xl p-6 shadow-lg cursor-pointer border border-border text-center"
              >
                <Icon className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h3 className="font-semibold text-card-foreground mb-1">
                  {feature[locale].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature[locale].description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Why measure maturity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {locale === 'sv' ? 'Varför mäta mognad?' : 'Why measure maturity?'}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {locale === 'sv'
                ? 'En mognadsmätning skapar ett gemensamt och verifierbart nuläge för hela organisationen. Den flyttar dialogen från upplevda behov och lösryckta initiativ till en sammanhängande förståelse för var ni faktiskt befinner er.'
                : 'A maturity assessment creates a shared and verifiable baseline for the entire organization. It shifts the dialogue from perceived needs and disconnected initiatives to a coherent understanding of where you actually stand.'}
            </p>
            <p>
              {locale === 'sv'
                ? 'Oavsett om det gäller AI-mognad eller digital mognad ger en strukturerad bedömning er verktygen att prioritera rätt, identifiera styrkor och svagheter, och agera proaktivt.'
                : 'Whether it concerns AI maturity or digital maturity, a structured assessment gives you the tools to prioritize correctly, identify strengths and weaknesses, and act proactively.'}
            </p>
            <p className="font-medium text-foreground">
              {locale === 'sv'
                ? 'Resultatet är en förflyttning som bygger på genomförbarhet, tydligt ansvar och ett tempo som organisationen faktiskt klarar att hålla över tid.'
                : 'The result is a transformation built on feasibility, clear accountability and a pace the organization can actually sustain over time.'}
            </p>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-card backdrop-blur rounded-2xl p-8 shadow-lg border border-border text-center"
        >
          <h2 className="text-2xl font-bold text-card-foreground mb-8">
            {locale === 'sv' ? 'Så här fungerar det' : 'How it works'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                sv: { title: 'Välj & Genomför', description: 'Välj AI- eller digital mognad och svara på påståendena individuellt' },
                en: { title: 'Choose & Complete', description: 'Select AI or digital maturity and respond to the statements individually' },
              },
              {
                step: 2,
                sv: { title: 'Analysera', description: 'Se individuella och aggregerade resultat per dimension med AI-genererade insikter' },
                en: { title: 'Analyze', description: 'View individual and aggregated results per dimension with AI-generated insights' },
              },
              {
                step: 3,
                sv: { title: 'Agera', description: 'Använd insikterna för att planera er organisations nästa steg' },
                en: { title: 'Act', description: 'Use the insights to plan your organization\'s next steps' },
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">
                  {item[locale].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item[locale].description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team version CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-8 text-center border border-stone-700"
        >
          <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {locale === 'sv' ? 'Vill ni mäta hela organisationens mognad?' : 'Want to assess your entire organization\'s maturity?'}
          </h3>
          <p className="text-stone-300 mb-6 max-w-xl mx-auto">
            {locale === 'sv'
              ? 'Få aggregerade resultat med flera svaranden, jämförelseanalys och professionell facilitering av er mognadsmätning.'
              : 'Get aggregated results with multiple respondents, comparative analysis and professional facilitation of your maturity assessment.'}
          </p>
          <a
            href="mailto:kontakt@criteroconsulting.se?subject=Mognadsmätning – förfrågan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            {locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
          </a>
          <p className="mt-4 text-sm text-stone-400">
            kontakt@criteroconsulting.se
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 pt-8 border-t border-border"
        >
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/critero-logo.svg"
              alt="Critero"
              width={160}
              height={80}
              className="h-16 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              &copy; Critero AB
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
