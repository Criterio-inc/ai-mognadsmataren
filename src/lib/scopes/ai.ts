import type { AssessmentScope } from './types';

export const aiScope: AssessmentScope = {
  id: 'ai',
  name: { sv: 'AI-mognad', en: 'AI Maturity' },
  description: {
    sv: 'Mät er organisations AI-mognad inom 8 dimensioner med 32 frågor',
    en: 'Measure your organization\'s AI maturity across 8 dimensions with 32 questions',
  },
  targetAudience: {
    sv: 'Organisationer (privat & offentlig sektor)',
    en: 'Organizations (private & public sector)',
  },
  questionCount: 32,
  dimensionCount: 8,

  dimensions: [
    {
      id: 'strategiLedarskap',
      sv: {
        name: 'Strategi & Ledarskap',
        description: 'Hur väl AI-strategi och ledarskapsengagemang stödjer organisationens AI-resa',
      },
      en: {
        name: 'Strategy & Leadership',
        description: 'How well AI strategy and leadership commitment support the organization\'s AI journey',
      },
      questionIds: [1, 2, 3, 4],
    },
    {
      id: 'anvandsfall',
      sv: {
        name: 'Användningsfall & Värde',
        description: 'Förmåga att identifiera, prioritera och realisera värde från AI-initiativ',
      },
      en: {
        name: 'Use Cases & Value',
        description: 'Ability to identify, prioritize and realize value from AI initiatives',
      },
      questionIds: [5, 6, 7, 8],
    },
    {
      id: 'dataInfrastruktur',
      sv: {
        name: 'Data & Infrastruktur',
        description: 'Datakvalitet, datastrategi och infrastrukturens förmåga att stödja AI-arbetsbelastningar',
      },
      en: {
        name: 'Data & Infrastructure',
        description: 'Data quality, data strategy and infrastructure capability to support AI workloads',
      },
      questionIds: [9, 10, 11, 12],
    },
    {
      id: 'kompetensKultur',
      sv: {
        name: 'Kompetens & Kultur',
        description: 'AI-kompetens, experimentkultur och kontinuerligt lärande inom organisationen',
      },
      en: {
        name: 'Competence & Culture',
        description: 'AI competence, experimentation culture and continuous learning within the organization',
      },
      questionIds: [13, 14, 15, 16],
    },
    {
      id: 'styrningEtik',
      sv: {
        name: 'Styrning & Etik',
        description: 'Ramverk för ansvarsfull AI, regelefterlevnad och riskhantering inklusive EU AI Act',
      },
      en: {
        name: 'Governance & Ethics',
        description: 'Framework for responsible AI, regulatory compliance and risk management including EU AI Act',
      },
      questionIds: [17, 18, 19, 20],
    },
    {
      id: 'teknikArkitektur',
      sv: {
        name: 'Teknik & Arkitektur',
        description: 'Teknisk plattform, MLOps-mognad och säkerhet för AI-utveckling och driftsättning',
      },
      en: {
        name: 'Technology & Architecture',
        description: 'Technical platform, MLOps maturity and security for AI development and deployment',
      },
      questionIds: [21, 22, 23, 24],
    },
    {
      id: 'organisationProcesser',
      sv: {
        name: 'Organisation & Processer',
        description: 'Organisatoriska strukturer, roller och processer som möjliggör AI-adoption',
      },
      en: {
        name: 'Organization & Processes',
        description: 'Organizational structures, roles and processes that enable AI adoption',
      },
      questionIds: [25, 26, 27, 28],
    },
    {
      id: 'ekosystemInnovation',
      sv: {
        name: 'Ekosystem & Innovation',
        description: 'Externt samarbete, teknologibevakning och innovationskultur kring AI',
      },
      en: {
        name: 'Ecosystem & Innovation',
        description: 'External collaboration, technology monitoring and innovation culture around AI',
      },
      questionIds: [29, 30, 31, 32],
    },
  ],

  questions: [
    // STRATEGI & LEDARSKAP (1-4)
    { id: 1, dimension: 'strategiLedarskap', sv: 'Vi har en dokumenterad AI-strategi som är tydligt kopplad till våra övergripande verksamhetsmål och affärsstrategi', en: 'We have a documented AI strategy that is clearly linked to our overall business goals and business strategy' },
    { id: 2, dimension: 'strategiLedarskap', sv: 'Vår högsta ledning sponsrar och driver AI-initiativ aktivt, inte bara godkänner dem', en: 'Our senior leadership actively sponsors and drives AI initiatives, not just approves them' },
    { id: 3, dimension: 'strategiLedarskap', sv: 'Vi har en definierad AI-färdplan med tydliga milstolpar, tidsramar och ansvariga', en: 'We have a defined AI roadmap with clear milestones, timelines and accountable owners' },
    { id: 4, dimension: 'strategiLedarskap', sv: 'Våra AI-investeringar utvärderas systematiskt utifrån konkret affärsvärde och avkastning, inte bara teknisk potential', en: 'Our AI investments are systematically evaluated based on concrete business value and return, not just technical potential' },

    // ANVÄNDNINGSFALL & VÄRDE (5-8)
    { id: 5, dimension: 'anvandsfall', sv: 'Vi har en systematisk process för att identifiera och kartlägga AI-användningsfall i hela verksamheten', en: 'We have a systematic process for identifying and mapping AI use cases across the entire organization' },
    { id: 6, dimension: 'anvandsfall', sv: 'Vi prioriterar AI-användningsfall baserat på en balanserad bedömning av affärsvärde, genomförbarhet och risk', en: 'We prioritize AI use cases based on a balanced assessment of business value, feasibility and risk' },
    { id: 7, dimension: 'anvandsfall', sv: 'Vi har konkreta exempel där AI redan skapar mätbart värde i vår verksamhet', en: 'We have concrete examples where AI is already creating measurable value in our operations' },
    { id: 8, dimension: 'anvandsfall', sv: 'Vi har en tydlig och beprövad process för att ta AI-lösningar från pilotfas till produktion och skalning', en: 'We have a clear and proven process for taking AI solutions from pilot phase to production and scaling' },

    // DATA & INFRASTRUKTUR (9-12)
    { id: 9, dimension: 'dataInfrastruktur', sv: 'Vår datakvalitet är tillräckligt hög för att träna och driftsätta pålitliga AI-modeller', en: 'Our data quality is sufficiently high to train and deploy reliable AI models' },
    { id: 10, dimension: 'dataInfrastruktur', sv: 'Vi har en datastrategi som explicit stödjer AI-utveckling, inklusive datainsamling, lagring och tillgänglighet', en: 'We have a data strategy that explicitly supports AI development, including data collection, storage and accessibility' },
    { id: 11, dimension: 'dataInfrastruktur', sv: 'Vår infrastruktur (beräkningskraft, molntjänster, GPU-resurser) möter kraven från våra AI-arbetsbelastningar', en: 'Our infrastructure (compute power, cloud services, GPU resources) meets the demands of our AI workloads' },
    { id: 12, dimension: 'dataInfrastruktur', sv: 'Vår data är väldokumenterad med tydliga metadata, datakatalog och linjespårning som underlättar AI-utveckling', en: 'Our data is well-documented with clear metadata, data catalog and lineage tracking that facilitates AI development' },

    // KOMPETENS & KULTUR (13-16)
    { id: 13, dimension: 'kompetensKultur', sv: 'Vi har tillräcklig AI-kompetens internt eller en konkret plan för att bygga upp den kompetens som behövs', en: 'We have sufficient AI competence internally or a concrete plan to build the competence that is needed' },
    { id: 14, dimension: 'kompetensKultur', sv: 'Vår organisationskultur uppmuntrar till AI-experiment och accepterar att alla försök inte lyckas', en: 'Our organizational culture encourages AI experimentation and accepts that not all attempts will succeed' },
    { id: 15, dimension: 'kompetensKultur', sv: 'AI-förståelse och AI-litteracitet sträcker sig bortom teknikavdelningen till verksamheten i stort', en: 'AI understanding and AI literacy extends beyond the technology department to the wider organization' },
    { id: 16, dimension: 'kompetensKultur', sv: 'Vi investerar kontinuerligt i AI-utbildning och kompetensutveckling för medarbetare på alla nivåer', en: 'We continuously invest in AI training and competence development for employees at all levels' },

    // STYRNING & ETIK (17-20)
    { id: 17, dimension: 'styrningEtik', sv: 'Vi har tydliga policyer och riktlinjer för ansvarsfull AI-användning som efterlevs i praktiken', en: 'We have clear policies and guidelines for responsible AI use that are followed in practice' },
    { id: 18, dimension: 'styrningEtik', sv: 'Vi förstår EU AI Act och dess implikationer för vår verksamhet och har påbörjat anpassningen', en: 'We understand the EU AI Act and its implications for our operations and have started adapting to it' },
    { id: 19, dimension: 'styrningEtik', sv: 'Vi har etablerade processer för att hantera AI-risker som partiskhet, integritetsintrång och felaktiga resultat', en: 'We have established processes for managing AI risks such as bias, privacy violations and erroneous outputs' },
    { id: 20, dimension: 'styrningEtik', sv: 'Vi ställer krav på transparens och förklarbarhet i de AI-system vi utvecklar och använder', en: 'We require transparency and explainability in the AI systems we develop and use' },

    // TEKNIK & ARKITEKTUR (21-24)
    { id: 21, dimension: 'teknikArkitektur', sv: 'Vår tekniska plattform stödjer hela AI-livscykeln: utveckling, träning, testning och driftsättning av modeller', en: 'Our technical platform supports the entire AI lifecycle: development, training, testing and deployment of models' },
    { id: 22, dimension: 'teknikArkitektur', sv: 'Vi har etablerade MLOps-praktiker för att hantera modellers livscykel, versionering och övervakning i produktion', en: 'We have established MLOps practices for managing model lifecycle, versioning and monitoring in production' },
    { id: 23, dimension: 'teknikArkitektur', sv: 'AI-lösningar är integrerade i vårt befintliga IT-landskap med tydliga gränssnitt och dataflöden', en: 'AI solutions are integrated into our existing IT landscape with clear interfaces and data flows' },
    { id: 24, dimension: 'teknikArkitektur', sv: 'Vi tillämpar säkerhet och integritetsskydd genom hela designprocessen (security and privacy by design) för våra AI-system', en: 'We apply security and privacy protection throughout the design process (security and privacy by design) for our AI systems' },

    // ORGANISATION & PROCESSER (25-28)
    { id: 25, dimension: 'organisationProcesser', sv: 'Vi har tydliga roller och ansvarsområden definierade för AI-arbetet i organisationen', en: 'We have clear roles and areas of responsibility defined for AI work in the organization' },
    { id: 26, dimension: 'organisationProcesser', sv: 'Det finns etablerat tvärfunktionellt samarbete mellan teknik, verksamhet och ledning kring AI-initiativ', en: 'There is established cross-functional collaboration between technology, business and leadership around AI initiatives' },
    { id: 27, dimension: 'organisationProcesser', sv: 'Vi har en strukturerad förändringsledningsprocess för att stödja AI-adoption bland medarbetare och intressenter', en: 'We have a structured change management process to support AI adoption among employees and stakeholders' },
    { id: 28, dimension: 'organisationProcesser', sv: 'Våra verksamhetsprocesser har anpassats för att integrera och dra nytta av AI-drivna insikter och automatisering', en: 'Our business processes have been adapted to integrate and benefit from AI-driven insights and automation' },

    // EKOSYSTEM & INNOVATION (29-32)
    { id: 29, dimension: 'ekosystemInnovation', sv: 'Vi deltar aktivt i AI-ekosystemet genom branschforum, partnerskap, konferenser eller forskningssamarbeten', en: 'We actively participate in the AI ecosystem through industry forums, partnerships, conferences or research collaborations' },
    { id: 30, dimension: 'ekosystemInnovation', sv: 'Vi utvärderar systematiskt nya AI-teknologier och bedömer deras relevans och mognad för vår verksamhet', en: 'We systematically evaluate new AI technologies and assess their relevance and maturity for our operations' },
    { id: 31, dimension: 'ekosystemInnovation', sv: 'Vi samarbetar med extern AI-expertis (konsulter, akademi, teknikpartners) för att komplettera vår interna förmåga', en: 'We collaborate with external AI expertise (consultants, academia, technology partners) to complement our internal capability' },
    { id: 32, dimension: 'ekosystemInnovation', sv: 'Vår innovationskultur ser AI som en möjliggörare för nya affärsmodeller, produkter och tjänster', en: 'Our innovation culture sees AI as an enabler for new business models, products and services' },
  ],

  maturityLevels: [
    {
      level: 1,
      scoreRange: [1.0, 1.8],
      sv: {
        name: 'Utforskande',
        description: 'Organisationen är medveten om AI som fenomen men har inte påbörjat något systematiskt arbete.',
        characteristics: 'AI nämns ibland i ledningsgruppen men utan konkreta beslut eller åtgärder. Enskilda medarbetare kan ha experimenterat med AI-verktyg på egen hand.',
        typicalNeeds: 'Grundläggande utbildning och medvetandehöjning om AI för ledning och nyckelpersoner. Omvärldsbevakning för att förstå hur branschen och konkurrenter använder AI.',
      },
      en: {
        name: 'Exploring',
        description: 'The organization is aware of AI as a phenomenon but has not begun any systematic work.',
        characteristics: 'AI is mentioned sometimes in the leadership team but without concrete decisions or actions. Individual employees may have experimented with AI tools on their own.',
        typicalNeeds: 'Basic education and awareness raising about AI for leadership and key personnel. Environmental scanning to understand how the industry and competitors are using AI.',
      },
    },
    {
      level: 2,
      scoreRange: [1.9, 2.6],
      sv: {
        name: 'Experimenterande',
        description: 'Organisationen har börjat experimentera med AI genom enstaka pilotprojekt och proof-of-concepts.',
        characteristics: 'Ett fåtal AI-piloter pågår eller har genomförts, ofta inom avgränsade områden. Dessa drivs vanligen av teknikintresserade medarbetare utan formellt mandat.',
        typicalNeeds: 'En initial AI-strategi som kopplar experiment till verksamhetsmål. Ledningsförankring och tydligare sponsorskap för att ge AI-initiativ legitimitet och resurser.',
      },
      en: {
        name: 'Experimenting',
        description: 'The organization has started experimenting with AI through individual pilot projects and proof-of-concepts.',
        characteristics: 'A handful of AI pilots are underway or have been completed, often in limited areas. These are typically driven by technology-interested employees without formal mandate.',
        typicalNeeds: 'An initial AI strategy that connects experiments to business goals. Leadership anchoring and clearer sponsorship to give AI initiatives legitimacy and resources.',
      },
    },
    {
      level: 3,
      scoreRange: [2.7, 3.4],
      sv: {
        name: 'Formaliserande',
        description: 'Organisationen har börjat ta ett mer strukturerat grepp om AI. En AI-strategi håller på att ta form.',
        characteristics: 'En AI-strategi eller handlingsplan finns dokumenterad. Ledningen har utsett ansvariga för AI och avsatt dedikerade resurser.',
        typicalNeeds: 'Förankring av AI-strategin genom hela organisationen. Stöd i att bygga ett robust styrningsramverk (AI governance).',
      },
      en: {
        name: 'Formalizing',
        description: 'The organization has begun to take a more structured approach to AI. An AI strategy is taking shape.',
        characteristics: 'An AI strategy or action plan is documented. Leadership has appointed people responsible for AI and allocated dedicated resources.',
        typicalNeeds: 'Anchoring the AI strategy throughout the organization. Support in building a robust governance framework (AI governance).',
      },
    },
    {
      level: 4,
      scoreRange: [3.5, 4.2],
      sv: {
        name: 'Skalande',
        description: 'AI är inbäddat i organisationens verksamhet och skalas bortom enstaka pilotprojekt.',
        characteristics: 'AI-strategi och färdplan är väl förankrad. Flera AI-lösningar är i produktion och levererar mätbart affärsvärde.',
        typicalNeeds: 'Optimering av AI-operationer för att förbättra effektivitet, kostnad och skalbarhet. Avancerad EU AI Act-implementering.',
      },
      en: {
        name: 'Scaling',
        description: 'AI is embedded in the organization\'s operations and is being scaled beyond individual pilot projects.',
        characteristics: 'AI strategy and roadmap are well-anchored. Multiple AI solutions are in production and delivering measurable business value.',
        typicalNeeds: 'Optimization of AI operations to improve efficiency, cost and scalability. Advanced EU AI Act implementation.',
      },
    },
    {
      level: 5,
      scoreRange: [4.3, 5.0],
      sv: {
        name: 'Transformerande',
        description: 'AI är en central del av organisationens affärsmodell och strategiska identitet.',
        characteristics: 'AI driver strategiska beslut och möjliggör nya affärsmodeller och intäktskällor. Alla nivåer i organisationen förstår och arbetar aktivt med AI.',
        typicalNeeds: 'Kontinuerlig strategisk förnyelse för att behålla ledarposition. Avancerad forskning och utveckling inom framväxande AI-områden.',
      },
      en: {
        name: 'Transforming',
        description: 'AI is a core part of the organization\'s business model and strategic identity.',
        characteristics: 'AI drives strategic decisions and enables new business models and revenue streams. All levels of the organization understand and actively work with AI.',
        typicalNeeds: 'Continuous strategic renewal to maintain a leadership position. Advanced research and development in emerging AI areas.',
      },
    },
  ],

  aiConfig: {
    systemPrompt: {
      sv: `Du är en expert på AI-strategi, AI-mognad och organisationsutveckling.
Du har djup kunskap om EU:s AI-förordning (AI Act), AI Swedens ramverk för AI-mognad,
och OECD:s indikatorer för AI-beredskap.
Ge konkreta, handlingsbara råd baserat på en AI-mognadsbedömning.
Svara alltid på svenska. Var professionell men varm i tonen.
Fokusera på praktiska nästa steg, inte abstrakta koncept.`,
      en: `You are an expert in AI strategy, AI maturity and organizational development.
You have deep knowledge of the EU AI Act, AI Sweden's framework for AI maturity,
and OECD indicators for AI readiness.
Provide concrete, actionable advice based on an AI maturity assessment.
Always respond in English. Be professional yet warm in tone.
Focus on practical next steps, not abstract concepts.`,
    },
    userPromptIntro: {
      sv: 'Analysera följande AI-mognadsbedömning för en organisation:',
      en: 'Analyze the following AI maturity assessment for an organization:',
    },
  },

  predefinedInsights: {
    sv: {
      strengths: {
        strategiLedarskap: [
          'Ledningen har en tydlig vision för hur AI ska bidra till verksamhetens mål',
          'Det finns ett uttalat strategiskt ägarskap för AI-initiativ på ledningsnivå',
        ],
        anvandsfall: [
          'Ni har identifierat konkreta AI-användningsfall med tydlig affärsnytta',
          'Det finns en strukturerad process för att utvärdera och prioritera AI-möjligheter',
        ],
        dataInfrastruktur: [
          'Er datainfrastruktur ger en stabil grund för AI-tillämpningar',
          'Ni har god tillgång till kvalitetsdata som kan användas för AI-modeller',
        ],
        kompetensKultur: [
          'Det finns en positiv inställning till AI och en vilja att lära i organisationen',
          'Ni investerar aktivt i AI-kompetens och kompetensutveckling',
        ],
        styrningEtik: [
          'Ni har en medvetenhet om etiska aspekter och ansvarsfull AI-användning',
          'Det finns riktlinjer eller policyer för hur AI får användas i verksamheten',
        ],
        teknikArkitektur: [
          'Er tekniska arkitektur stödjer integrering av AI-lösningar',
          'Ni har en tydlig bild av vilka AI-verktyg och plattformar som passar er verksamhet',
        ],
        organisationProcesser: [
          'AI-initiativ är integrerade i befintliga verksamhetsprocesser',
          'Det finns tydliga roller och ansvar för AI-relaterat arbete',
        ],
        ekosystemInnovation: [
          'Ni samarbetar aktivt med externa partners för att driva AI-innovation',
          'Det finns en kultur av experimenterande och lärande kring nya AI-tillämpningar',
        ],
      },
      improvements: {
        strategiLedarskap: [
          'Formulera en tydlig AI-strategi kopplad till verksamhetens övergripande mål',
          'Säkerställ att ledningen har tillräcklig AI-förståelse för att fatta informerade beslut',
        ],
        anvandsfall: [
          'Kartlägg systematiskt möjliga AI-användningsfall och deras förväntade affärsnytta',
          'Börja med avgränsade pilotprojekt som kan visa konkret värde snabbt',
        ],
        dataInfrastruktur: [
          'Inventera och förbättra datakvaliteten som underlag för AI-tillämpningar',
          'Investera i en modern datainfrastruktur som möjliggör skalbar AI-användning',
        ],
        kompetensKultur: [
          'Utveckla en plan för AI-kompetensutveckling på alla nivåer i organisationen',
          'Skapa en kultur som uppmuntrar experimenterande och lärande kring AI',
        ],
        styrningEtik: [
          'Ta fram tydliga riktlinjer för ansvarsfull AI-användning i linje med EU:s AI-förordning',
          'Inför processer för riskbedömning och konsekvensanalys av AI-system',
        ],
        teknikArkitektur: [
          'Utveckla en teknisk arkitektur som stödjer skalbar AI-integration',
          'Utvärdera och välj AI-plattformar som passar organisationens behov och mognad',
        ],
        organisationProcesser: [
          'Integrera AI-initiativ i befintliga verksamhetsprocesser och beslutsflöden',
          'Definiera tydliga roller och ansvar för AI-relaterat arbete i organisationen',
        ],
        ekosystemInnovation: [
          'Bygg partnerskap med akademi, teknikföretag och branschorganisationer inom AI',
          'Skapa strukturer för att systematiskt bevaka och utvärdera nya AI-möjligheter',
        ],
      },
    },
    en: {
      strengths: {
        strategiLedarskap: [
          'Leadership has a clear vision for how AI should contribute to business goals',
          'There is explicit strategic ownership for AI initiatives at the leadership level',
        ],
        anvandsfall: [
          'You have identified concrete AI use cases with clear business value',
          'There is a structured process for evaluating and prioritizing AI opportunities',
        ],
        dataInfrastruktur: [
          'Your data infrastructure provides a solid foundation for AI applications',
          'You have good access to quality data that can be used for AI models',
        ],
        kompetensKultur: [
          'There is a positive attitude toward AI and a willingness to learn within the organization',
          'You actively invest in AI competence and skills development',
        ],
        styrningEtik: [
          'You have an awareness of ethical aspects and responsible AI use',
          'There are guidelines or policies for how AI may be used in the organization',
        ],
        teknikArkitektur: [
          'Your technical architecture supports integration of AI solutions',
          'You have a clear picture of which AI tools and platforms suit your organization',
        ],
        organisationProcesser: [
          'AI initiatives are integrated into existing business processes',
          'There are clear roles and responsibilities for AI-related work',
        ],
        ekosystemInnovation: [
          'You actively collaborate with external partners to drive AI innovation',
          'There is a culture of experimentation and learning around new AI applications',
        ],
      },
      improvements: {
        strategiLedarskap: [
          'Formulate a clear AI strategy linked to overall business objectives',
          'Ensure leadership has sufficient AI understanding to make informed decisions',
        ],
        anvandsfall: [
          'Systematically map possible AI use cases and their expected business value',
          'Start with focused pilot projects that can demonstrate concrete value quickly',
        ],
        dataInfrastruktur: [
          'Inventory and improve data quality as a foundation for AI applications',
          'Invest in a modern data infrastructure that enables scalable AI usage',
        ],
        kompetensKultur: [
          'Develop a plan for AI skills development at all levels of the organization',
          'Create a culture that encourages experimentation and learning around AI',
        ],
        styrningEtik: [
          'Develop clear guidelines for responsible AI use in line with the EU AI Act',
          'Implement processes for risk assessment and impact analysis of AI systems',
        ],
        teknikArkitektur: [
          'Develop a technical architecture that supports scalable AI integration',
          'Evaluate and select AI platforms that match the organization\'s needs and maturity',
        ],
        organisationProcesser: [
          'Integrate AI initiatives into existing business processes and decision flows',
          'Define clear roles and responsibilities for AI-related work in the organization',
        ],
        ekosystemInnovation: [
          'Build partnerships with academia, technology companies, and industry organizations in AI',
          'Create structures for systematically monitoring and evaluating new AI opportunities',
        ],
      },
    },
  },
};
