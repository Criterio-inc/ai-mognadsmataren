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
  ChevronRight,
  CheckCircle2,
  ArrowDown,
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
    <div className="min-h-screen">
      {/* ============================================ */}
      {/* HERO - Full viewport with background image   */}
      {/* ============================================ */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background image with parallax (fixed) effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80)' }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
        </div>

        {/* Animated floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-teal-500/10 blur-3xl animate-float" />
          <div className="absolute top-[60%] right-[15%] w-48 h-48 rounded-full bg-orange-500/10 blur-3xl animate-float-slow" />
          <div className="absolute bottom-[20%] left-[30%] w-32 h-32 rounded-full bg-teal-400/8 blur-2xl animate-pulse-slow" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/critero-icon.svg"
              alt="Critero"
              width={120}
              height={72}
              className="h-14 w-auto mx-auto mb-8 brightness-0 invert opacity-80"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            {locale === 'sv' ? 'Mognadsmätaren' : 'The Maturity Meter'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-4 font-light leading-relaxed"
          >
            {locale === 'sv'
              ? 'Mät er ledningsgrupps mognad för digital utveckling och AI'
              : 'Measure your leadership team\'s maturity for digital development and AI'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10"
          >
            {locale === 'sv'
              ? 'Få en tydlig bild av styrkor och utvecklingsområden. Resultatet ger konkreta rekommendationer om var ni bör börja.'
              : 'Get a clear picture of strengths and areas for development. The results provide concrete recommendations on where to begin.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById('scope-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white text-lg font-semibold rounded-xl shadow-lg shadow-teal-900/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {locale === 'sv' ? 'Testa själv' : 'Try the assessment'}
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="mailto:kontakt@criteroconsulting.se?subject=Mognadsmätning"
              className="inline-flex items-center gap-2 px-6 py-3 text-slate-300 hover:text-white border border-slate-500/40 hover:border-slate-400/60 rounded-xl transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              {locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* WHY MATURITY MATTERS - Narrative + cards      */}
      {/* ============================================ */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {locale === 'sv'
                ? 'Varför är ledningens mognad så viktig vid digital utveckling?'
                : 'Why is leadership maturity so critical for digital development?'}
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                {locale === 'sv'
                  ? 'Både forskning och egen erfarenhet visar att närmare 70 % av alla digitala utvecklingsinitiativ, inklusive AI, misslyckas. Orsaken är ofta ledningens oförmåga att leda, styra, samordna och följa upp.'
                  : 'Both research and our own experience show that nearly 70% of all digital development initiatives, including AI, fail. The root cause is often leadership\'s inability to lead, govern, coordinate and follow up.'}
              </p>
              <p>
                {locale === 'sv'
                  ? 'Om du vill öka er organisations möjligheter att leda digital utveckling är det bra att känna till förutsättningarna. En mätning av ledningens och organisationens mognad för digital utveckling eller AI-utveckling ger en gemensam bild av utgångsläget, rekommendationer om vad som behöver göras och satsas på inledningsvis, och pekar ut rätt riktning för er organisation, givet era utmaningar och förutsättningar.'
                  : 'If you want to increase your organization\'s ability to lead digital development, it helps to understand the prerequisites. An assessment of leadership and organizational maturity for digital or AI development provides a shared picture of your starting point, recommendations for what to prioritize initially, and points your organization in the right direction given your challenges and conditions.'}
              </p>
              <p className="text-foreground font-medium">
                {locale === 'sv'
                  ? 'Du kan prova vårt verktyg redan idag. Om du vill få verklig förändringskraft, kontakta oss för en dialog om hur vi kan stötta er på er digitala utvecklingsresa.'
                  : 'You can try our tool today. If you want real transformational power, contact us to discuss how we can support you on your digital development journey.'}
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                num: '01.',
                icon: Target,
                sv: { title: 'Gemensam riktning', desc: 'Har ledningen en delad bild av vart ni ska och varför? Utan samsyn pratar ni förbi varandra.' },
                en: { title: 'Shared direction', desc: 'Does leadership have a shared picture of where you\'re going and why? Without alignment, you talk past each other.' },
              },
              {
                num: '02.',
                icon: Shield,
                sv: { title: 'Styrning & ansvar', desc: 'Finns strukturer för att prioritera, besluta och följa upp? Utan dem riskerar initiativ att falla mellan stolarna.' },
                en: { title: 'Governance & accountability', desc: 'Are there structures to prioritize, decide and follow up? Without them, initiatives risk falling through the cracks.' },
              },
              {
                num: '03.',
                icon: Users,
                sv: { title: 'Kultur & kompetens', desc: 'Finns förmågan och viljan att experimentera och lära? Tekniken utvecklas snabbt och organisationen måste hänga med.' },
                en: { title: 'Culture & competence', desc: 'Is there the ability and willingness to experiment and learn? Technology moves fast and the organization must keep up.' },
              },
              {
                num: '04.',
                icon: TrendingUp,
                sv: { title: 'Genomförandeförmåga', desc: 'Kan ni gå från strategi till handling? Förändring kräver ledarskap, inte bara beslut.' },
                en: { title: 'Execution capability', desc: 'Can you go from strategy to action? Change requires leadership, not just decisions.' },
              },
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}
                  className="bg-card rounded-2xl border border-border p-7 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="text-4xl font-bold text-teal-600 dark:text-teal-400 block mb-3 group-hover:text-orange-500 transition-colors duration-300">
                    {card.num}
                  </span>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">
                    {card[locale].title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card[locale].desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TWO ASSESSMENTS - Scope selector             */}
      {/* ============================================ */}
      <section id="scope-section" className="py-24 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {locale === 'sv' ? 'Två perspektiv på mognad' : 'Two perspectives on maturity'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'sv'
                ? 'Välj den mätning som är mest relevant för er just nu, eller gör båda för en komplett bild.'
                : 'Choose the assessment most relevant to you right now, or do both for a complete picture.'}
            </p>
          </motion.div>

          {/* Scope Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {allScopes.map((scope, index) => {
              const Icon = scopeIcons[scope.id] || Brain;
              const isSelected = selectedScope === scope.id;
              const sColors = scopeColors[scope.id];

              return (
                <motion.button
                  key={scope.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onClick={() => setSelectedScope(scope.id as ScopeId)}
                  whileHover={{ y: -6 }}
                  className={`relative p-8 rounded-2xl border-2 text-left transition-all duration-300 ${
                    isSelected
                      ? `${sColors.bg} ${sColors.border} shadow-xl`
                      : 'bg-card border-border hover:border-muted-foreground/30 shadow-sm hover:shadow-lg'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="scope-indicator"
                      className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r ${sColors.gradient}`}
                    />
                  )}

                  <div className={`w-14 h-14 rounded-xl ${isSelected ? sColors.bg : 'bg-muted'} flex items-center justify-center mb-5 transition-colors`}>
                    <Icon className={`w-7 h-7 ${isSelected ? sColors.text : 'text-muted-foreground'}`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-2 ${isSelected ? 'text-foreground' : 'text-card-foreground'}`}>
                    {scope.name[locale]}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {scope.description[locale]}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" />
                      {scope.questionCount} {locale === 'sv' ? 'påståenden' : 'statements'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" />
                      {scope.dimensionCount} {locale === 'sv' ? 'dimensioner' : 'dimensions'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {scope.questionCount <= 25 ? '10\u201315' : '15\u201320'} min
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={handleStartAssessment}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r ${colors.gradient} text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {locale === 'sv'
                ? `Starta ${currentScope.name[locale].toLowerCase()}`
                : `Start ${currentScope.name[locale].toLowerCase()}`}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="text-sm text-muted-foreground mt-3">
              {locale === 'sv'
                ? `${currentScope.questionCount} påståenden \u00b7 ca ${currentScope.questionCount <= 25 ? '10\u201315' : '15\u201320'} minuter \u00b7 helt kostnadsfritt`
                : `${currentScope.questionCount} statements \u00b7 approx. ${currentScope.questionCount <= 25 ? '10\u201315' : '15\u201320'} minutes \u00b7 completely free`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* REPORT PREVIEW - What you get back           */}
      {/* ============================================ */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {locale === 'sv' ? 'Det här får du tillbaka' : 'This is what you get back'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {locale === 'sv'
                ? 'Direkt efter mätningen får du en personlig rapport med mognadsnivå, styrkor och rekommendationer'
                : 'Immediately after the assessment you receive a personal report with maturity level, strengths and recommendations'}
            </p>
          </motion.div>

          {/* Report Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-700/50 overflow-hidden relative"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-teal-500/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Left side - Gauge and Score */}
              <div className="space-y-6">
                <div className="bg-slate-800/60 rounded-2xl p-6 backdrop-blur border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-teal-400" />
                    <span className="text-sm font-medium text-slate-300">
                      {locale === 'sv' ? 'Er mognadsnivå' : 'Your maturity level'}
                    </span>
                  </div>

                  {/* Simulated Gauge */}
                  <div className="relative h-36 flex items-center justify-center">
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
                      <span className="text-5xl font-bold text-white">3.8</span>
                      <span className="text-xs text-slate-400 mt-1">{locale === 'sv' ? 'av 5' : 'of 5'}</span>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <span className="inline-block px-4 py-1.5 bg-teal-500/15 text-teal-400 text-sm font-medium rounded-full border border-teal-500/20">
                      {locale === 'sv' ? 'Nivå 4: Skalande' : 'Level 4: Scaling'}
                    </span>
                  </div>
                </div>

                {/* Dimension bars */}
                <div className="bg-slate-800/60 rounded-2xl p-6 backdrop-blur border border-slate-700/50">
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
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-slate-400">{dim[locale]}</span>
                            <span className="text-white font-semibold">{dim.score}</span>
                          </div>
                          <div className="h-2.5 bg-slate-700/80 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(dim.score / 5) * 100}%` }}
                              viewport={{ once: true }}
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
              <div className="bg-slate-800/60 rounded-2xl p-6 backdrop-blur border border-slate-700/50 h-fit">
                <div className="flex items-center gap-2 mb-5">
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
                    className="space-y-5 text-sm text-slate-300"
                  >
                    {[
                      { icon: CheckCircle2, iconColor: 'text-emerald-400', bgColor: 'bg-emerald-500/15' },
                      { icon: Target, iconColor: 'text-orange-400', bgColor: 'bg-orange-500/15' },
                      { icon: ArrowRight, iconColor: 'text-teal-400', bgColor: 'bg-teal-500/15' },
                    ].map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.15 }}
                          className="flex gap-3"
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                            <ItemIcon className={`w-4 h-4 ${item.iconColor}`} />
                          </div>
                          <p className="leading-relaxed pt-1">{insights[locale][idx]}</p>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <p className="text-xs text-slate-500 italic">
                    {locale === 'sv'
                      ? '* Exempelrapport \u2013 dina faktiska resultat baseras p\u00e5 dina svar'
                      : '* Example report \u2013 your actual results are based on your answers'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA in preview */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <button
                onClick={handleStartAssessment}
                className={`inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${colors.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                {locale === 'sv' ? 'Gör din egen mätning' : 'Do your own assessment'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS - Steps                         */}
      {/* ============================================ */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {locale === 'sv' ? 'Så här fungerar det' : 'How it works'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              {locale === 'sv'
                ? 'Prova mätningen individuellt. Ingen inloggning krävs.'
                : 'Try the assessment individually. No login required.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                sv: { title: 'Välj perspektiv', desc: 'AI-mognad eller digital mognad. Båda fokuserar på ledningsgruppens och organisationens förmåga.' },
                en: { title: 'Choose perspective', desc: 'AI maturity or digital maturity. Both focus on the leadership team\'s and organization\'s capability.' },
              },
              {
                step: 2,
                sv: { title: 'Svara på påståenden', desc: 'Ta ställning till påståenden om er organisations förmåga. Det tar 10\u201320 minuter.' },
                en: { title: 'Respond to statements', desc: 'Take a position on statements about your organization\'s capability. It takes 10\u201320 minutes.' },
              },
              {
                step: 3,
                sv: { title: 'Få din rapport', desc: 'Se er mognadsnivå, styrkor, utvecklingsområden och AI-genererade rekommendationer direkt.' },
                en: { title: 'Get your report', desc: 'See your maturity level, strengths, development areas and AI-generated recommendations instantly.' },
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item[locale].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item[locale].desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FROM INDIVIDUAL TO ORGANIZATION              */}
      {/* ============================================ */}
      <section className="relative py-24 overflow-hidden">
        {/* Background image with parallax effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {locale === 'sv'
                  ? 'Från individuellt test till organisationsmätning'
                  : 'From individual test to organizational assessment'}
              </h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                {locale === 'sv'
                  ? 'Det du gör här är ett individuellt test. Den verkliga kraften uppstår när hela ledningsgruppen genomför mätningen.'
                  : 'What you do here is an individual test. The real power comes when the entire leadership team completes the assessment.'}
              </p>
              <ul className="space-y-3 mb-8">
                {(locale === 'sv'
                  ? [
                    'Aggregerade resultat från hela ledningsgruppen',
                    'Synliggör klyftor i samsyn och uppfattning',
                    'Professionell facilitering och genomgång',
                    'Konkret handlingsplan med prioriterade nästa steg',
                  ]
                  : [
                    'Aggregated results from the entire leadership team',
                    'Reveals gaps in alignment and perception',
                    'Professional facilitation and review',
                    'Concrete action plan with prioritized next steps',
                  ]
                ).map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <Users className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  {locale === 'sv' ? 'Boka en organisationsmätning' : 'Book an organizational assessment'}
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  {locale === 'sv'
                    ? 'Vi hjälper er genom hela processen, från mätning till handlingsplan.'
                    : 'We help you through the entire process, from assessment to action plan.'}
                </p>
                <a
                  href="mailto:kontakt@criteroconsulting.se?subject=Mognadsmätning – intresseanmälan"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Mail className="w-5 h-5" />
                  {locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
                </a>
                <p className="mt-3 text-sm text-slate-500">
                  kontakt@criteroconsulting.se
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER                                       */}
      {/* ============================================ */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/critero-logo.svg"
              alt="Critero Consulting AB"
              width={160}
              height={80}
              className="h-14 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Critero Consulting AB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
