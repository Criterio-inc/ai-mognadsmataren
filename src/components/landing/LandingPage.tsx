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
  Target,
  Shield,
  Compass,
  ChevronRight,
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
    { sv: 'Prioritering & Beslut', en: 'Prioritization & Decisions', score: 4.1, color: 'bg-teal-500' },
    { sv: 'Genomförande', en: 'Execution', score: 3.5, color: 'bg-cyan-500' },
  ],
};

const scopeInsights: Record<string, { sv: string[]; en: string[] }> = {
  ai: {
    sv: [
      'Starkt strategiskt ledarskap och tydlig AI-vision i ledningen.',
      'Potential att utveckla AI-kompetens och experimentkultur bredare i organisationen.',
      'Rekommendation: Kartlägg er position gentemot EU AI Act och formalisera AI-styrning.',
    ],
    en: [
      'Strong strategic leadership and clear AI vision at management level.',
      'Potential to develop AI competence and experimentation culture more broadly.',
      'Recommendation: Map your position against the EU AI Act and formalize AI governance.',
    ],
  },
  digital: {
    sv: [
      'Ledningsgruppen delar en god förståelse för vad digitalisering innebär.',
      'Den strategiska kopplingen mellan digitala initiativ och verksamhetsmål kan stärkas.',
      'Rekommendation: Skapa en tydlig digital handlingsplan med mätbara mål och tydligt ägarskap.',
    ],
    en: [
      'The leadership team shares a good understanding of what digitalization means.',
      'The strategic connection between digital initiatives and business goals can be strengthened.',
      'Recommendation: Create a clear digital action plan with measurable goals and clear ownership.',
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
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5">
            {locale === 'sv' ? 'Mognadsmätaren' : 'The Maturity Meter'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
            {locale === 'sv'
              ? 'Hur redo är er ledningsgrupp att leda den digitala förflyttningen?'
              : 'How ready is your leadership team to lead the digital transformation?'}
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {locale === 'sv'
              ? 'Mognadsmätaren hjälper er att kartlägga nuläget inom AI-mognad och digital mognad. Resultatet ger en tydlig bild av styrkor, luckor och var ni bör börja.'
              : 'The Maturity Meter helps you map your current state in AI maturity and digital maturity. The results give a clear picture of strengths, gaps and where to begin.'}
          </p>
        </motion.div>

        {/* Why it matters - leadership angle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-3xl mx-auto mb-16 mt-10"
        >
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              {locale === 'sv' ? 'Varför mognad avgör förflyttningen' : 'Why maturity determines the transformation'}
            </h2>
            <div className="space-y-3 text-muted-foreground text-[15px] leading-relaxed">
              <p>
                {locale === 'sv'
                  ? 'De flesta organisationer har ambitioner att utnyttja AI och digitalisering, men få har en realistisk bild av sin faktiska förmåga. Utan den bilden blir initiativ fragmenterade, investeringar svåra att prioritera och förankringen i ledningen otillräcklig.'
                  : 'Most organizations have ambitions to leverage AI and digitalization, but few have a realistic picture of their actual capability. Without that picture, initiatives become fragmented, investments hard to prioritize, and leadership buy-in insufficient.'}
              </p>
              <p>
                {locale === 'sv'
                  ? 'Mognad handlar inte om teknik i första hand. Det handlar om ledningsgruppens gemensamma förståelse, organisationens förmåga att prioritera och genomföra, och kulturen som gör förändring möjlig. Det är förutsättningen för att digital förflyttning faktiskt ska hända.'
                  : 'Maturity is not primarily about technology. It\'s about the leadership team\'s shared understanding, the organization\'s ability to prioritize and execute, and the culture that makes change possible. This is the prerequisite for digital transformation to actually happen.'}
              </p>
              <p className="font-medium text-foreground">
                {locale === 'sv'
                  ? 'En mognadsmätning ger er det gemensamma, verifierbara nuläget som krävs för att fatta rätt beslut och röra er framåt med rätt tempo.'
                  : 'A maturity assessment gives you the shared, verifiable baseline needed to make the right decisions and move forward at the right pace.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* The two assessments intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {locale === 'sv' ? 'Två perspektiv på mognad' : 'Two perspectives on maturity'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {locale === 'sv'
              ? 'Välj den mätning som är mest relevant för er just nu, eller gör båda för en komplett bild. Här kan du provsmaka mätningen individuellt och se vilken typ av insikter du får tillbaka.'
              : 'Choose the assessment most relevant to you right now, or do both for a complete picture. Here you can try the assessment individually and see the type of insights you get back.'}
          </p>
        </motion.div>

        {/* Scope Selector Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
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
                    {scope.questionCount} {locale === 'sv' ? 'påståenden' : 'statements'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    {scope.dimensionCount} {locale === 'sv' ? 'dimensioner' : 'dimensions'}
                  </span>
                </div>
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
              ? 'Provsmaka mätningen'
              : 'Try the assessment'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="text-sm text-muted-foreground mt-3">
            {locale === 'sv'
              ? `${currentScope.questionCount} påståenden \u00b7 ${currentScope.dimensionCount} dimensioner \u00b7 ca ${currentScope.questionCount <= 25 ? '10\u201315' : '15\u201320'} minuter \u00b7 helt kostnadsfritt`
              : `${currentScope.questionCount} statements \u00b7 ${currentScope.dimensionCount} dimensions \u00b7 approx. ${currentScope.questionCount <= 25 ? '10\u201315' : '15\u201320'} minutes \u00b7 completely free`}
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
              {locale === 'sv' ? 'Det här får du tillbaka' : 'This is what you get back'}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {locale === 'sv'
                ? 'Direkt efter mätningen får du en personlig rapport med er mognadsnivå, styrkor och konkreta rekommendationer'
                : 'Immediately after the assessment you receive a personal report with your maturity level, strengths and concrete recommendations'}
            </p>
          </div>

          {/* Report Preview Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Left side - Gauge and Score */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-teal-400" />
                    <span className="text-sm font-medium text-slate-300">
                      {locale === 'sv'
                        ? 'Er mognadsnivå'
                        : 'Your maturity level'}
                    </span>
                  </div>

                  {/* Simulated Gauge */}
                  <div className="relative h-32 flex items-center justify-center">
                    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#334155"
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
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#0d9488" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                      <span className="text-4xl font-bold text-white">3.8</span>
                      <span className="text-xs text-slate-400">{locale === 'sv' ? 'av 5' : 'of 5'}</span>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-full">
                      {locale === 'sv' ? 'Nivå 4: Skalande' : 'Level 4: Scaling'}
                    </span>
                  </div>
                </div>

                {/* Dimension bars - dynamic per selected scope */}
                <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur">
                  <div className="text-sm font-medium text-slate-300 mb-4">
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
                            <span className="text-slate-400">{dim[locale]}</span>
                            <span className="text-white font-medium">{dim.score}</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
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
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur h-fit">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-medium text-slate-300">
                    {locale === 'sv' ? 'AI-genererade insikter' : 'AI-generated insights'}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedScope}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-sm text-slate-300"
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

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-500 italic">
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
                {locale === 'sv' ? 'Gör din egen mätning' : 'Do your own assessment'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* What the assessment measures */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {locale === 'sv' ? 'Det handlar om mer än teknik' : 'It\'s about more than technology'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === 'sv'
                ? 'Mognadsmätaren undersöker de faktorer som avgör om er organisation faktiskt kan genomföra förändring'
                : 'The Maturity Meter examines the factors that determine whether your organization can actually execute change'}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                sv: { title: 'Gemensam riktning', description: 'Har ledningen en delad bild av vart ni ska och varför?' },
                en: { title: 'Shared direction', description: 'Does leadership have a shared picture of where you\'re going and why?' },
              },
              {
                icon: Shield,
                sv: { title: 'Styrning & ansvar', description: 'Finns strukturer för att prioritera, besluta och följa upp?' },
                en: { title: 'Governance & accountability', description: 'Are there structures to prioritize, decide and follow up?' },
              },
              {
                icon: Users,
                sv: { title: 'Kultur & kompetens', description: 'Finns förmågan och viljan att experimentera och lära?' },
                en: { title: 'Culture & competence', description: 'Is there the ability and willingness to experiment and learn?' },
              },
              {
                icon: TrendingUp,
                sv: { title: 'Genomförandeförmåga', description: 'Kan ni gå från strategi till handling i praktiken?' },
                en: { title: 'Execution capability', description: 'Can you go from strategy to action in practice?' },
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
                  className="bg-card backdrop-blur rounded-xl p-6 shadow-lg border border-border text-center"
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
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-card backdrop-blur rounded-2xl p-8 shadow-lg border border-border text-center mb-16"
        >
          <h2 className="text-2xl font-bold text-card-foreground mb-3">
            {locale === 'sv' ? 'Så här fungerar det' : 'How it works'}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
            {locale === 'sv'
              ? 'Provsmaka mätningen individuellt. Ingen inloggning krävs.'
              : 'Try the assessment individually. No login required.'}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                sv: { title: 'Välj perspektiv', description: 'AI-mognad eller digital mognad. Båda fokuserar på ledningsgruppens och organisationens förmåga.' },
                en: { title: 'Choose perspective', description: 'AI maturity or digital maturity. Both focus on the leadership team\'s and organization\'s capability.' },
              },
              {
                step: 2,
                sv: { title: 'Svara på påståenden', description: 'Ta ställning till påståenden om er organisations förmåga. Det tar 10\u201320 minuter.' },
                en: { title: 'Respond to statements', description: 'Take a position on statements about your organization\'s capability. It takes 10\u201320 minutes.' },
              },
              {
                step: 3,
                sv: { title: 'Få din rapport', description: 'Se er mognadsnivå per dimension, styrkor, utvecklingsområden och AI-genererade rekommendationer.' },
                en: { title: 'Get your report', description: 'See your maturity level per dimension, strengths, development areas and AI-generated recommendations.' },
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

        {/* From individual to organization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-10 border border-slate-700"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Users className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                {locale === 'sv'
                  ? 'Från individuell provsmakning till organisationsmätning'
                  : 'From individual tasting to organizational assessment'}
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {locale === 'sv'
                  ? 'Det du gör här är en individuell provsmakning. Den verkliga kraften uppstår när hela ledningsgruppen genomför mätningen och ni får ett aggregerat resultat som visar den gemensamma bilden.'
                  : 'What you do here is an individual tasting. The real power comes when the entire leadership team completes the assessment and you get an aggregated result showing the collective picture.'}
              </p>
              <ul className="space-y-2 text-slate-300 text-sm mb-6">
                {(locale === 'sv'
                  ? [
                    'Aggregerade resultat från hela ledningsgruppen',
                    'Jämförelse av hur ledningen ser på mognad kontra organisationen',
                    'Professionell facilitering och genomgång av resultaten',
                    'Konkret handlingsplan med prioriterade nästa steg',
                  ]
                  : [
                    'Aggregated results from the entire leadership team',
                    'Comparison of how leadership views maturity versus the organization',
                    'Professional facilitation and review of results',
                    'Concrete action plan with prioritized next steps',
                  ]
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-right">
              <a
                href="mailto:kontakt@criteroconsulting.se?subject=Mognadsmätning – intresseanmälan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                {locale === 'sv' ? 'Kontakta oss för organisationsmätning' : 'Contact us for organizational assessment'}
              </a>
              <p className="mt-3 text-sm text-slate-400">
                kontakt@criteroconsulting.se
              </p>
            </div>
          </div>
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
              &copy; Critero Consulting AB
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
