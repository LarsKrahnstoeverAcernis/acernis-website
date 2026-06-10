"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en";

const translations = {
  en: {
    nav: {
      platform: "Platform",
      useCases: "Use Cases",
      customers: "Customers",
      trust: "Trust",
      about: "About",
      contact: "Contact",
      bookDemo: "Request Access",
      testApp: "Read the Case Study",
      caseStudy: "Case Study",
    },
    home: {
      hero: {
        plannerTag: "Built for mobile network planners and executers",
        title: "The AI-powered mobile network infrastructure platform",
        body: "Turn network planning into field-ready deployment instructions, instantly and reliably.",
        cta1: "Request Access",
        cta2: "Read the Case Study",
        demoNote: "30 min with our founder, on real sites, not slides.",
      },
      problem: {
        eyebrow: "The Problem",
        title: "Telecom networks are fragmented, manual and data-blind.",
        body: "Every new network generation is a €200B+ project planned with spreadsheets, PDFs and phone calls. Acernis builds the data infrastructure that makes automation possible.",
        metrics: [
          { value: "500k+", label: "Active sites under management globally" },
          { value: "€200B+", label: "Annual global capex for mobile network rollouts" },
          { value: "13% CAGR", label: "Network investment growth rate" },
          { value: "10 months", label: "Average time for a single site rollout" },
        ],
      },
      platformIntro: {
        eyebrow: "The Acernis Platform",
        title: "One web app for your whole network.",
        body: "Acernis hosts your BIM-based digital twins, covering the key use cases for network planning and deployment. Use it directly in the browser, or connect it to your existing tools via API.",
        closing: "Your data stays yours. Your BIM models stay accurate. Your rollouts move faster.",
        futureTitle: "Where we're headed",
        futureBody: "Acernis will become the operating layer for your entire rollout process, with AI agents that know your workflows, execute the work and keep humans in the loop.",
      },
      solution: {
        eyebrow: "The Acernis approach",
        title: "Data foundation first, use cases and AI-driven workflows on top.",
        card1Badge: "Live",
        card1Title: "BIM-Based Foundation",
        card1Body: "Structured, standardized site data, version controlled and maintained over time",
        arrow1Label: "enables",
        card2Badge: "Live",
        card2Title: "Automation Use Cases",
        card2Body: "Live use cases covering planning, compliance & design across the rollout workflow",
        arrow2Label: "scales to",
        card3Badge: "Coming soon",
        card3Title: "AI-Driven Workflows",
        card3Body: "AI Agents execute workflows at scale, while your teams supervise and steer outcomes.",
      },
      howItWorks: {
        eyebrow: "How it works",
        title: "From messy data to autonomous rollouts, in four steps.",
        steps: [
          { number: "01", title: "We scan your sites", body: "High-precision 3D scan of your network infrastructure. Real-world accuracy, no manual input." },
          { number: "02", title: "We build your digital twin", body: "Every site becomes a structured BIM model: verified, version-controlled and AI-ready." },
          { number: "03", title: "Agents start working", body: "Our agents run checks, plans and reports directly on your data. No setup required." },
          { number: "04", title: "You stay in control", body: "You approve. Agents execute. Every action is logged, auditable and reversible." },
        ],
      },
      platformSection: {
        eyebrow: "Platform",
        title: "One web app for your whole network.",
        body: "Acernis is the single place where your whole network team works: operators, planners, designers and contractors, all on the same data.",
        nativeAppsLabel: "Native apps for:",
        nativeApps: ["Structural Pre-Assessment", "EMF Pre-Assessment", "Line of Sight", "Concept Design", "Site Survey"],
        otherFeatures: ["BIM viewer", "Version history", "Export API", "Multi-user access", "Role-based permissions", "Offline mode"],
        cta: "Explore the platform",
      },
      useCasesSection: {
        eyebrow: "Use Cases",
        title: "Key use cases for efficient network rollout",
        cta: "See all 10 use cases",
        items: [
          {
            number: "UC-04",
            title: "Static Pre-Assessment",
            short: "Structural feasibility before you commit to a site.",
            savings: "Save up to 80% of assessment time",
            points: [
              "Auto-generates from BIM in seconds",
              "Flags structural constraints early",
              "Prevents redesigns downstream",
            ],
          },
          {
            number: "UC-05",
            title: "EMF Pre-Assessment",
            short: "Compliance confidence before you apply for a permit.",
            savings: "Avoid sunk costs on 2% of non-viable sites",
            points: [
              "Runs directly on your digital twin",
              "Flags non-viable configurations early",
              "No additional surveys needed",
            ],
          },
        ],
      },
      customers: {
        eyebrow: "Customers",
        title: "Built with Europe's leading network operators.",
        quote: "The Acernis solution and data integrates seamlessly into my daily workflows and tools. I have confidence in the analysis results and regulatory penalties for non-compliance are strongly reduced.",
        quoteAuthor: "Patrick Großilbeck",
        quoteRole: "Senior Expert Mobile Networks, Vodafone",
        metric: "€12M+",
        metricLabel: "total cost savings identified across the Vodafone DE network",
        whitepaper: "Read the full case study",
        operators: ["Vodafone", "VMO2", "Trekking Telecom", "MID"],
      },
      trust: {
        eyebrow: "Trust & Security",
        title: "Telco-grade data, kept in the EU.",
        body: "Your network data is some of the most sensitive infrastructure data in the world. Acernis is built to meet the security and compliance requirements of Europe's largest operators.",
        pillars: [
          { title: "Hosted in the EU", body: "All data is stored and processed on EU-based servers, compliant with GDPR and local telecom regulations." },
          { title: "Role-based access control", body: "Granular permissions ensure only the right people see the right data, down to the site level." },
          { title: "Full audit trail", body: "Every change, export and access event is logged and auditable. You always know who did what and when." },
        ],
      },
      videoSection: {
        eyebrow: "Product Walkthrough",
        title: "See Acernis in action.",
        subtitle: "Watch how Acernis turns site data into deployment-ready rollout plans.",
        placeholder: "Click to play",
        comingSoon: "Video coming soon",
      },
      kpis: {
        items: [
          { value: "10-15%", label: "cost reduction in network rollouts within the first year" },
          { value: "2", label: "weeks to showcase your preferred use case" },
          { value: "10+", label: "API integrations to your existing tools and systems" },
        ],
      },
      cta: {
        title: "Ready to run your next planning cycle on Acernis?",
        subtitle: "Book a 30-minute call with our founder.",
        cta1: "Request Access",
        cta2: "Read the Case Study",
      },
      faq: {
        eyebrow: "FAQ",
        title: "Frequently Asked Questions",
        items: [
          { q: "What does Acernis actually do?", a: "Acernis is the AI-powered telecom infrastructure platform for network rollouts. It creates accurate BIM-based digital twins of network sites and uses AI agents to orchestrate end-to-end rollout workflows, from planning and permitting to contractor coordination and deployment instructions." },
          { q: "How fast can Acernis generate deployment instructions?", a: "Acernis can turn a rollout decision into field-ready, site-level deployment instructions in seconds. Once a site is onboarded to the platform, the baseline 3D BIM model is created with a one-time setup. All subsequent planning and automation runs against that live data." },
          { q: "What is the onboarding process for a new site?", a: "Each site is onboarded via BIM capture using digital images, 2D documentation or 3D scan data. Acernis automates the creation of the 3D BIM model from this input. A typical PoC can be up and running in under one month." },
          { q: "Who is Acernis built for?", a: "Acernis is primarily built for MNOs (Mobile Network Operators) and their ecosystems, including TowerCos, contractors and general contractors. It is designed to be used across the entire supply chain, not just by a single team." },
          { q: "What use cases does the platform cover?", a: "Acernis covers coverage planning, technical site surveys, line-of-sight validation, detailed site design, static pre-assessment, EMF pre-assessment and permitting, concept design and material take-offs, all driven from the BIM model rather than manual field work." },
          { q: "What BIM input data does Acernis accept?", a: "Acernis ingests digital images, 2D documentation, and 3D scan data to build its site models. Ground-based tower surveys and rooftop surveys are both supported, streamlining data collection on-site and saving up to 20% of survey effort." },
          { q: "What external systems does Acernis integrate with?", a: "Acernis integrates with a wide range of tools via API: geospatial sources (OpenStreetMap, Geospatial Viewer, DSM data), regulatory platforms (BNetzA, Cadastral Maps), field operations tools (Kizeo Forms, Revit), and third-party MNO applications. New integrations can be added on request." },
          { q: "Does Acernis work with Revit?", a: "Yes. Revit is a supported integration in Acernis' field operations and engineering toolchain, enabling component data exchange with CAD/BIM and structural engineering tools." },
          { q: "Which regulatory and compliance systems are supported?", a: "Acernis currently integrates with BNetzA (the German Federal Network Agency) and Cadastral Maps for regulatory and compliance workflows. EMF pre-assessment and permit submissions are directly supported from the BIM model." },
          { q: "Can Acernis connect to our existing MNO systems?", a: "Yes. Acernis exposes its data via a structured API layer and connects to MNO applications, third-party applications and field tools. The platform is designed to act as a single source of truth that feeds into your existing tool landscape rather than replacing it." },
          { q: "How is site data kept up to date?", a: "Acernis provides structured concepts for version management and data updates, always tailored together with the MNO to fit its specific processes and workflows. This collaborative setup ensures maximum buy-in from all stakeholders along the supply chain. Once in place, Acernis becomes the shared mechanism through which every party (MNO, TowerCo, contractor) keeps data current and works from the same accurate baseline." },
          { q: "Is my data secure?", a: "Acernis is designed for enterprise MNO environments, where data security is a baseline requirement. Network operators retain full data ownership. Acernis does not use customer data to train models." },
          { q: "How much can Acernis reduce costs?", a: "Acernis conservatively delivers a 10–15% reduction in rollout costs, with some deployments achieving up to 25% savings. These gains compound across large site portfolios and are driven by reduced manual work, fewer site visits, and fewer redesign cycles." },
          { q: "How quickly can we run a proof of concept?", a: "A full PoC across up to 10 network sites can typically be executed in under one month. This is designed to let your team validate the business case with real data before committing to a broader rollout." },
          { q: "Do users need a CAD license to use Acernis?", a: "No. Acernis is a web-based platform that requires no CAD software license. Every user, regardless of their technical background, can access site models, deployment instructions and rollout data directly in the browser." },
        ],
      },
      investors: {
        eyebrow: "Trusted by industry leaders",
        title: "Former Executives from Europe's top MNOs",
      },
      investorQuotes: [
        "Acernis gives network teams the data precision that site rollout has always needed. I've seen firsthand what poor information flows cost operators at scale.",
        "After years of telecoms M&A advisory, accurate site-level data remains a chronic industry gap. Acernis closes it in a way nothing else on the market does.",
        "Integrating BIM into network deployment isn't just smart engineering. It's the foundation for the automation wave already reshaping the industry.",
        "Every major operator struggles with rollout bottlenecks. What sets Acernis apart is that it attacks the root cause rather than papering over the symptoms.",
        "Having built presales and product organizations at Ericsson, the technical depth behind Acernis stands out, and the use cases are ready to deploy today.",
      ],
    },
    platform: {
      hero: {
        eyebrow: "Platform",
        title: "The AI-powered mobile network infrastructure platform",
        subtitle: "Built for mobile network planners and executers",
      },
      what: {
        eyebrow: "What is Acernis",
        title: "BIM technology meets telco intelligence",
        body: "Acernis was developed together with network operators and general contractors. It fits into existing supply chains, tools and workflows rather than replacing them, ensuring high adoption across all stakeholders and smooth integration into day-to-day operations.",
        points: [
          "Highly integrable and API-ready: Seamlessly connects with existing planning, EMF and coverage tools",
          "Live automation use cases: Standardized BIM data powers planning, compliance and design workflows today",
          "Built for agentic AI: The structured data foundation AI agents need to autonomously execute rollouts end-to-end",
        ],
      },
      features: {
        eyebrow: "Why Acernis",
        title: "Why teams build on Acernis",
        items: [
          { title: "Single source of truth", desc: "One central data foundation for all stakeholders" },
          { title: "No CAD license needed", desc: "Accessible to every team: MNOs, TowerCos, contractors" },
          { title: "Seamless API integration", desc: "Connects with existing tools out of the box" },
          { title: "Always up to date", desc: "Version-controlled and continuously maintained" },
          { title: "Full data ownership", desc: "Network operators retain complete control over their data" },
          { title: "BIM quality guarantee", desc: "Validated models ensuring 100% reliability for critical use cases" },
        ],
      },
    },
    useCases: {
      hero: {
        eyebrow: "Automation Use Cases",
        title: "Key use cases for efficient network rollout",
        subtitle: "10 BIM-based automation use cases spanning the full rollout workflow, from planning to compliance to design.",
      },
      cases: [
        { status: "Live", number: "01", title: "Coverage Planning", short: "More accurate coverage with fewer antennas", body: "Replace error-prone 2D documentation with scan-based 3D site models. Acernis feeds coverage simulations with accurate, real-world inventory data, enabling smarter antenna placement and fewer required sites.", points: ["More accurate coverage predictions", "Optimized site placement", "Faster roll-out through better upfront decisions"] },
        { status: "Live", number: "02", title: "Radio & Transport Concept", short: "3D concept design with early collision detection", body: "Faulty 2D documentation triggers costly rework late in the process. Acernis provides instant access to accurate, up-to-date 3D site models so concepts are validated before they enter the workflow.", points: ["Accurate concepts based on real inventory data", "Eliminate ~5% of site planning cycles with non-solvable concepts", "Save avoidable sunk costs"] },
        { status: "Live", number: "03", title: "Line of Sight", short: "Digital LoS analysis replaces physical field testing", body: "Physical LoS tests are mandatory for every new link: time-consuming, costly and often unnecessary. With up-to-date 3D environment data from Acernis, digital LoS analysis replaces fieldwork in several cases.", points: ["Digital LoS validation directly from the BIM model", "Reduce physical LoS tests by up to 20% per year", "Fewer site visits, faster planning cycles"] },
        { status: "Live", number: "04", title: "Static Pre-Assessment", short: "Early validation of structural feasibility", body: "Structural viability is only considered late in the process. Acernis enables data-driven static pre-assessments directly from the BIM model.", points: ["Early detection of structural constraints before they cause redesigns", "Fewer iterations and faster transition to concept design", "More predictable costs and a streamlined roll-out"] },
        { status: "Live", number: "05", title: "EMF Pre-Assessment", short: "Early EMF compliance checks to prevent delays", body: "On many sites, achieving an EMF-compliant configuration requires multiple iterations, and in 2% of cases no viable configuration exists at all. Acernis flags non-viable sites before sunk costs accumulate.", points: ["Avoid unnecessary site surveys and simulations", "Fewer and faster decision cycles"] },
        { status: "Live", number: "06", title: "Technical Site Survey", short: "Digital surveys reduce or eliminate on-site visits", body: "Every site survey ties up field teams and delays planning. With scan-based 3D BIM models, Acernis reduces the need for physical on-site surveys.", points: ["Ground based tower sites: eliminate surveys entirely", "Rooftop tower upgrades: save 20% of survey effort", "Free up field team capacity"] },
        { status: "Live", number: "07", title: "Concept Design", short: "3D BIM design replaces manual drawings", body: "2D site design is error-prone, slow to iterate and hard to collaborate on. Acernis replaces manual 2D workflows with 3D BIM models, catching conflicts early and automating key design steps.", points: ["Full site redesigns completed 50% faster", "Better collaboration across all planning stakeholders"] },
        { status: "Live", number: "08", title: "Detailed Site Design", short: "Automated bill of materials and steel part drawings", body: "Late-stage design errors drive excess material orders, on-site rework, and unnecessary crane time. Acernis combines accurate 3D BIM models with automated loading checks.", points: ["Reduce steel over-ordering and rework by up to 30%", "Cut cherry picker and crane rental costs by up to 15%", "Non-standard metallic designs: 80% automated drawing generation", "Time saved through automated Bill of Materials"] },
        { status: "Live", number: "09", title: "EMF Assessment & Permit", short: "Faster, automated EMF approval using scan data", body: "Building EMF analysis models manually consumes 30–40% of total simulation time. Acernis auto-generates the EMF analysis model directly from the 3D BIM model.", points: ["Save up to 35% of simulation effort", "Faster permit submissions through accurate, BIM-derived input data", "Reduced risk of errors in the EMF model build"] },
        { status: "Live", number: "10", title: "Static Assessment", short: "Direct structural analysis from BIM, no separate models", body: "Creating and updating Finite Element Models manually is the biggest time sink in structural analysis. Acernis auto-generates the base FEM directly from the BIM model.", points: ["Save up to 70% of total assessment effort", "Higher model quality through standardization"] },
      ],
    },
    about: {
      hero: {
        eyebrow: "About Acernis",
        title: "Building the foundation for autonomous telecom networks",
        paragraphs: [
          "Charles Ricke founded Acernis in 2018 together with friends he met during his studies in the Netherlands. We started as a drone consultancy for large infrastructure industries, getting hands-on experience at the sharp end of how physical networks are actually built.",
          "Over the following years, we expanded across the full telecom supply chain. Working with over 50 organisations including planners, general contractors, TowerCos and MNOs. This gave us an unusually deep understanding of every role, every workflow and every friction point in the network rollout process.",
          "That experience became the foundation for our software platform. We built it from the ground up to support the entire ecosystem, because network rollouts only work when all stakeholders align and work from the same accurate basis.",
          "Today, Acernis focuses on MNOs as the central steering entity of network planning and deployment. Eight years in, we bring everything we've learned from across the supply chain into a single platform, so that every stakeholder can do their part, faster and with less friction.",
        ],
      },
      mission: {
        eyebrow: "Our Belief",
        title: "Ultimately, AI agents will run rollouts autonomously – with humans in the loop",
        body: "We believe the telco industry is at an inflection point. BIM technology – proven in construction and architecture – is now ready to transform how mobile networks are planned, deployed and maintained. Acernis is the platform that makes this transformation possible, starting with live automation use cases today and scaling to fully autonomous AI-driven workflows tomorrow.",
      },
      team: {
        eyebrow: "Team",
        title: "Meet the team",
        members: [
          { name: "Charles Ricke", role: "Founder & CEO" },
          { name: "Charles-Ed. Laguérie", role: "CFO" },
          { name: "Lars Krahnstöver", role: "CRO" },
          { name: "Amaury Bannier", role: "CPO" },
          { name: "Filip Wrzosek", role: "COO" },
          { name: "Ricardo Machado", role: "Head of Account Management" },
          { name: "Aurélien Meunieur", role: "Head of AI" },
        ],
      },
    },
    caseStudy: {
      eyebrow: "Whitepaper",
      title: "AI-Driven Autonomous Networks",
      aboutEyebrow: "About this study",
      aboutP1: "Acernis works with leading management consultancies to advance the future of autonomous telecom infrastructure. BearingPoint, a global management and technology consulting firm, has published this whitepaper on the emerging paradigm of AI-driven autonomous networks, examining how artificial intelligence and digital infrastructure platforms are fundamentally reshaping network planning, deployment and operations.",
      aboutP2: "This study is closely aligned with Acernis's mission: building the BIM foundation that makes agentic AI in telco rollout not just possible, but production-ready. The insights from BearingPoint's research reinforce why structured, machine-readable site data (the core of what Acernis delivers) is the prerequisite for every autonomous network use case explored in this paper.",
    },
    contact: {
      hero: {
        eyebrow: "Contact",
        title: "Interested in a call?",
        subtitle: "Feel free to reach out to us directly, or book a demo to see Acernis in action.",
      },
      form: {
        title: "Send us a message",
        name: "Full name",
        company: "Company",
        email: "Email address",
        message: "Message",
        send: "Send Message",
        namePlaceholder: "Your name",
        companyPlaceholder: "Your company",
        emailPlaceholder: "you@company.com",
        messagePlaceholder: "How can we help?",
      },
      direct: { title: "Or reach out directly" },
      links: { website: "More Information", app: "Sign up to Test the App" },
      tryPlatformEyebrow: "Try the platform",
      tryPlatformTitle: "Try the Platform",
      tryPlatformBody: "Get direct access to the Acernis platform. Explore BIM-based site models, automated use cases and rollout workflows, no CAD license required.",
      officeLbl: "Office",
      sentTitle: "Message sent!",
      sentBody: "We'll get back to you shortly.",
    },
    footer: {
      tagline: "The AI-powered telecom infrastructure platform",
      platform: "Platform",
      useCases: "Use Cases",
      about: "About",
      contact: "Contact",
      testApp: "Read the Case Study",
      rights: "All rights reserved.",
    },
  },
};

export type Translations = typeof translations.en;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
