// =====================================================================
// Structured experience knowledge base
// Each record is a small, self-describing unit. The retrieval layer
// treats every record uniformly — roles, projects, philosophies, and
// skill stories all live in this same shape.
// =====================================================================

window.EXPERIENCE_RECORDS = [
  // ----------- ROLES -----------
  {
    id: "role-rise-2024",
    type: "role",
    company: "Rise Internet",
    role: "Head of Digital Growth & Product Marketing",
    timeframe: "2024 — Present",
    industry: "Telecom / ISP",
    skill_area: "Growth Leadership",
    summary: "Leading digital growth, attribution, CX, and experimentation across acquisition and lifecycle channels.",
    description: "Oversees the full digital growth engine — paid acquisition, site, attribution, experimentation, and customer experience — while modernizing the post-purchase journey through a self-service portal, attribution infrastructure connecting digital to call-center revenue, and a brand transformation from Rise Broadband to Rise Internet.",
    related_skills: ["Growth Strategy", "Product Marketing", "Cross-Functional Leadership", "Brand Strategy"],
    tools: ["GA4", "Invoca", "Snowflake", "AEM", "VWO"],
    tags: ["growth", "leadership", "attribution", "cx", "telecom", "rebrand", "executive"],
    impact: "70% YoY sales growth · 30% lower CAC",
    companies: ["Rise Internet"]
  },
  {
    id: "role-credit-2019",
    type: "role",
    company: "Credit.com",
    role: "Head of Digital Experience & Growth",
    timeframe: "2019 — 2024",
    industry: "Consumer Fintech",
    skill_area: "Growth & CX",
    summary: "Led growth, personalization, lifecycle marketing, and experimentation across consumer financial brands.",
    description: "Owned digital experience and growth across Credit.com and Lexington Law. Scaled personalization systems, lifecycle marketing programs, customer journey optimization, and CRO across millions of monthly visitors. Modernized the enterprise CMS and built executive growth reporting that became the operating language of the business.",
    related_skills: ["Personalization", "Lifecycle Marketing", "CRO", "CMS Modernization", "Executive Reporting"],
    tools: ["Adobe Target", "Adobe Analytics", "AEM", "Optimizely", "VWO"],
    tags: ["growth", "fintech", "personalization", "lifecycle", "cro", "experimentation", "leadership"],
    impact: "Scaled growth across multiple fintech brands",
    companies: ["Credit.com", "Lexington Law", "CreditRepair.com"]
  },
  {
    id: "role-credit-2016",
    type: "role",
    company: "Credit.com",
    role: "Director of Marketing Operations & Technology",
    timeframe: "2016 — 2019",
    industry: "Consumer Fintech",
    skill_area: "Martech",
    summary: "Built experimentation, attribution, analytics, and martech infrastructure that became the foundation for growth.",
    description: "Built and scaled experimentation, attribution, analytics, and martech infrastructure powering customer acquisition. Migrated from a legacy PHP platform to a headless CMS architecture (AEM), unified marketing and logged-in experiences, and compressed release cycles from months to days.",
    related_skills: ["Martech Architecture", "Headless CMS", "Attribution", "Experimentation Ops", "Tag Management"],
    tools: ["Adobe Target", "Adobe Analytics", "Adobe Launch", "AEM", "Optimizely", "VWO", "Invoca"],
    tags: ["martech", "headless", "attribution", "experimentation", "operations", "fintech"],
    impact: "Months → Days release cadence",
    companies: ["Credit.com"]
  },
  {
    id: "role-lendio-2015",
    type: "role",
    company: "Lendio",
    role: "Sr. Director of Marketing",
    timeframe: "2015 — 2016",
    industry: "Fintech / SMB Lending",
    skill_area: "Acquisition",
    summary: "Drove digital acquisition, lead generation, and funnel optimization in a fast-growing fintech.",
    description: "Led digital acquisition, lead-gen, and funnel optimization for an SMB lending marketplace. Focused on top-of-funnel paid efficiency, landing-page testing, and conversion improvements through the lender match flow.",
    related_skills: ["Digital Acquisition", "Lead Generation", "Funnel Optimization", "Paid Media"],
    tools: ["Google Ads", "Facebook Ads", "Optimizely", "GA"],
    tags: ["acquisition", "fintech", "lead-gen", "smb", "paid"]
  },
  {
    id: "role-vivint-2013",
    type: "role",
    company: "Vivint Smart Home",
    role: "Head of Web Optimization",
    timeframe: "2013 — 2015",
    industry: "Smart Home / IoT",
    skill_area: "Optimization",
    summary: "Built digital acquisition and CRO as the company scaled beyond door-to-door.",
    description: "Helped Vivint expand from a door-to-door sales model into a true digital acquisition channel. Built the CRO program — landing-page testing, customer journey optimization, and analytics — that supported the company's digital transformation.",
    related_skills: ["CRO", "Landing Page Optimization", "Customer Journey", "Analytics"],
    tools: ["Optimizely", "VWO", "Google Analytics"],
    tags: ["cro", "optimization", "digital-transformation", "smart-home"]
  },
  {
    id: "role-oneonone-2010",
    type: "role",
    company: "One on One Marketing (Digital Media Solutions)",
    role: "Full-Stack Developer",
    timeframe: "2010 — 2013",
    industry: "Performance Marketing",
    skill_area: "Engineering",
    summary: "Built websites, landing pages, and lead-gen experiences while developing growth-engineering expertise.",
    description: "Hands-on full-stack development across campaign experiences, marketing funnels, and analytics implementation. This is where the foundation for 'growth engineering' came from — sitting at the intersection of code, UX, analytics, and conversion.",
    related_skills: ["Front-End Development", "Landing Pages", "Analytics Implementation", "UX Optimization"],
    tools: ["HTML", "CSS", "JavaScript", "PHP", "Analytics"],
    tags: ["engineering", "growth-engineering", "landing-pages", "full-stack"]
  },
  {
    id: "role-zagg-2008",
    type: "role",
    company: "ZAGG",
    role: "Web Developer & Digital Experience",
    timeframe: "2008 — 2010",
    industry: "Consumer Electronics / Ecommerce",
    skill_area: "Engineering",
    summary: "Built ecommerce and marketing web experiences for a rapidly growing consumer tech brand.",
    description: "Front-end development and digital experience work for a fast-growing consumer technology brand. The foundation for ecommerce optimization, UX thinking, and digital customer experience that informs every role since.",
    related_skills: ["Front-End Development", "Ecommerce", "UX", "Digital Customer Experience"],
    tools: ["HTML", "CSS", "JavaScript"],
    tags: ["ecommerce", "engineering", "ux", "consumer-tech"],
    companies: ["ZAGG"]
  },

  // ----------- PROJECTS -----------
  {
    id: "proj-attribution",
    type: "project",
    company: "Rise Internet",
    role: "Head of Digital Growth & Product Marketing",
    timeframe: "2024 — Present",
    industry: "Telecom",
    skill_area: "Attribution & Analytics",
    summary: "Bridged digital channels to offline revenue with end-to-end identity stitching across web, call-center, and CRM.",
    description: "Re-architected attribution from aggregated channel-blind reporting to persistent, identity-stitched visibility from first click to closed account. Connected GA UTMs → Invoca call IDs → Snowflake identity stitching → CSG customer events → revenue attribution at the campaign and keyword level.",
    related_skills: ["Attribution Modeling", "Identity Stitching", "Revenue Attribution", "Call Tracking", "Executive Reporting"],
    tools: ["Google Analytics", "Invoca", "Snowflake", "CSG"],
    tags: ["attribution", "analytics", "call-center", "revenue", "data-infrastructure", "telecom"],
    impact: "70% sales growth YoY · 30% lower CAC"
  },
  {
    id: "proj-myrise-portal",
    type: "project",
    company: "Rise Internet",
    role: "Head of Digital Growth & Product Marketing",
    timeframe: "2024 — Present",
    industry: "Telecom",
    skill_area: "Product & CX",
    summary: "Customer self-service portal that shifted CX from call-center dependency to real-time self-resolution.",
    description: "Owned product strategy and delivery of MyRise — a real-time customer portal with outage visibility, network diagnostics, and self-service workflows. Reduced inbound support call volume, increased self-service resolution rates, and elevated the post-purchase experience.",
    related_skills: ["Product Strategy", "Customer Experience", "Self-Service", "Cross-Functional Leadership"],
    tools: ["React", "GA4", "Contentful", "VWO", "Twilio"],
    tags: ["product", "cx", "self-service", "portal", "telecom"],
    impact: "Reduced support load, increased self-resolution"
  },
  {
    id: "proj-rebrand",
    type: "project",
    company: "Rise Internet",
    role: "Head of Digital Growth & Product Marketing",
    timeframe: "2024 — Present",
    industry: "Telecom",
    skill_area: "Brand & GTM",
    summary: "Led the Rise Broadband → Rise Internet rebrand across every customer touchpoint.",
    description: "Cross-functional execution of a full brand transformation partnering with Monigle and internal teams. Rolled out new identity across website, campaigns, field assets, fleet, and field ops. Aligned brand perception to product evolution (fiber growth, modern UX).",
    related_skills: ["Brand Strategy", "Go-to-Market", "Cross-Functional Leadership", "Marketing Operations"],
    tools: ["Brandfolder", "Figma", "Notion", "Slack"],
    tags: ["brand", "gtm", "leadership", "rebrand", "telecom"]
  },
  {
    id: "proj-routethis",
    type: "project",
    company: "Rise Internet",
    role: "Head of Digital Growth & Product Marketing",
    timeframe: "2024 — Present",
    industry: "Telecom",
    skill_area: "Partnerships & Field Ops",
    summary: "Onboarded RouteThis Certify to equip field techs with AI-driven WiFi heat mapping.",
    description: "End-to-end ownership of the RouteThis Certify vendor partnership. Deployed AI-driven heat mapping, dead-zone detection, and mesh recommendations to field crews. Built guided in-home workflow for routing, validation, and customer handoff documentation.",
    related_skills: ["Vendor Partnerships", "Field Operations", "Customer Experience", "AI Deployment"],
    tools: ["RouteThis Certify", "Field Ops Systems"],
    tags: ["partnerships", "field-ops", "ai", "cx", "telecom"]
  },
  {
    id: "proj-martech-credit",
    type: "project",
    company: "Credit.com",
    role: "Director of Marketing Operations & Technology",
    timeframe: "2016 — 2019",
    industry: "Consumer Fintech",
    skill_area: "Martech & Digital Transformation",
    summary: "Migrated Credit.com from legacy PHP to a headless AEM architecture — release cycles from months to days.",
    description: "Led the Credit.com Martech rebuild. Replaced a legacy PHP platform with a headless CMS architecture (AEM), unified marketing and logged-in experiences into a single frontend, and modernized publishing and deployment workflows. Built always-on instrumentation across Analytics, Target, Launch, and Invoca.",
    related_skills: ["Headless Architecture", "CMS Modernization", "Digital Transformation", "Martech Strategy"],
    tools: ["AEM", "Adobe Analytics", "Adobe Target", "Adobe Launch", "Invoca"],
    tags: ["martech", "headless", "transformation", "fintech", "cms"],
    impact: "Months → Days release cycle"
  },
  {
    id: "proj-personalization",
    type: "project",
    company: "Credit.com",
    role: "Head of Digital Experience & Growth",
    timeframe: "2019 — 2024",
    industry: "Consumer Fintech",
    skill_area: "Personalization & Lifecycle",
    summary: "Built personalization and lifecycle systems across multiple consumer fintech brands.",
    description: "Stood up personalization engines and lifecycle marketing programs across Credit.com and Lexington Law. Segmented customer journeys, deployed contextual experiences, and tied lifecycle touchpoints to engagement and retention metrics.",
    related_skills: ["Personalization", "Lifecycle Marketing", "Customer Journey", "Segmentation"],
    tools: ["Adobe Target", "Adobe Analytics", "Lifecycle Tools"],
    tags: ["personalization", "lifecycle", "fintech", "cx", "retention"],
    companies: ["Credit.com", "Lexington Law"]
  },
  {
    id: "proj-fuzely",
    type: "project",
    company: "Fuzely (independent)",
    role: "Founder",
    timeframe: "2025 — Present",
    industry: "AI / SaaS",
    skill_area: "AI & Product",
    summary: "Building Fuzely — an AI-powered growth OS turning analytics from passive dashboards into active operations.",
    description: "Independent product work building an AI-powered analytics and growth operating system. Combines attribution, experimentation, customer intelligence, and AI-generated operational insights into a unified surface. Goal: collapse the gap between insight and action.",
    related_skills: ["AI Product", "Analytics", "Attribution", "Experimentation", "Customer Intelligence", "Product Strategy", "Solo Development", "Full-Stack"],
    tools: ["Claude", "Claude Terminal", "Claude Code", "Anthropic SDK", "Next.js 14", "TypeScript", "Supabase", "Tailwind CSS", "Vercel", "Snowflake", "WooCommerce API", "Mailchimp API"],
    tags: ["ai", "product", "founder", "analytics", "attribution", "experimentation", "saas", "solo-dev", "next-js", "supabase", "claude", "full-stack"],
    companies: ["Fuzely"],
    impact: "In private beta · Solo-built full-stack AI SaaS product"
  },

  // ----------- SKILL STORIES -----------
  {
    id: "skill-experimentation",
    type: "skill",
    skill_area: "Experimentation & CRO",
    summary: "15+ years building experimentation programs across telecom, fintech, smart home, and ecommerce.",
    description: "Stood up experimentation programs at multiple scales — from individual landing-page CRO at Vivint and One on One, to enterprise A/B testing at Credit.com with Optimizely, Adobe Target, and VWO, to always-on experimentation at Rise Internet tied to attribution outcomes.",
    related_skills: ["A/B Testing", "Personalization", "Hypothesis Design", "Statistical Significance", "Experiment Ops"],
    tools: ["Optimizely", "Adobe Target", "VWO"],
    tags: ["experimentation", "cro", "testing", "optimization"],
    companies: ["Rise Internet", "Credit.com", "Vivint", "Lendio", "One on One Marketing"]
  },
  {
    id: "skill-attribution",
    type: "skill",
    skill_area: "Attribution & Analytics",
    summary: "Deep expertise across attribution modeling, identity stitching, and bridging digital + offline revenue.",
    description: "Built attribution systems at Credit.com (multi-touch attribution + martech instrumentation) and Rise Internet (identity stitching from web → call center → CRM → revenue). Bridges digital marketing accountability with offline conversion environments.",
    related_skills: ["Attribution Modeling", "Identity Stitching", "Marketing Mix", "Multi-Touch", "Revenue Attribution"],
    tools: ["Google Analytics", "Adobe Analytics", "Invoca", "Snowflake"],
    tags: ["attribution", "analytics", "data", "revenue"],
    companies: ["Rise Internet", "Credit.com"]
  },
  {
    id: "skill-ai",
    type: "skill",
    skill_area: "AI-Powered Optimization",
    summary: "Deploying AI across vendor partnerships, growth workflows, and an independent AI product (Fuzely).",
    description: "AI work spans three layers: (1) operational AI — deploying RouteThis Certify's AI heat-mapping to field crews; (2) AI in growth workflows — using LLMs to accelerate copy, instrumentation, and analytics; (3) building Fuzely, an AI-powered analytics and growth OS.",
    related_skills: ["AI Product", "LLM Workflows", "Operational AI", "AI Deployment"],
    tools: ["Claude", "ChatGPT", "RouteThis Certify"],
    tags: ["ai", "machine-learning", "product", "operational-ai"],
    companies: ["Fuzely", "Rise Internet"]
  },
  {
    id: "skill-product-marketing",
    type: "skill",
    skill_area: "Product Marketing",
    summary: "Product marketing across telecom, fintech, smart-home, and ecommerce — connecting product to message to market.",
    description: "Product marketing work has spanned launching Rise Internet as a rebranded fiber/wireless ISP, positioning consumer financial products at Credit.com and Lexington Law, and supporting Vivint's expansion beyond door-to-door. Specializes in tying product evolution to brand, GTM, and acquisition.",
    related_skills: ["Positioning", "Messaging", "Launch Strategy", "GTM", "Brand Strategy"],
    tools: ["Figma", "Brandfolder"],
    tags: ["product-marketing", "gtm", "positioning", "launch"],
    companies: ["Rise Internet", "Credit.com", "Lexington Law", "Vivint"]
  },
  {
    id: "skill-gtm",
    type: "skill",
    skill_area: "Go-to-Market",
    summary: "Led GTM execution for a full rebrand and several new product launches.",
    description: "Most recent GTM work: the Rise Broadband → Rise Internet rebrand and product launch — coordinating brand identity, digital rollout, field-ops materials, and campaign execution across every customer touchpoint. Earlier GTM experience launching consumer financial products at Credit.com.",
    related_skills: ["Launch Strategy", "Brand Strategy", "Cross-Functional Leadership", "Field Ops"],
    tools: ["Brandfolder", "Figma", "Notion"],
    tags: ["gtm", "launch", "brand", "leadership"],
    companies: ["Rise Internet", "Credit.com"]
  },
  {
    id: "skill-leadership",
    type: "skill",
    skill_area: "Cross-Functional Leadership",
    summary: "Leads across product, engineering, support, marketing, field ops, and vendor partners.",
    description: "Comfortable operating where strategy meets execution — bridging business goals, technology, customer journeys, and measurable outcomes. Has led cross-functional programs across product + engineering + support + marketing (MyRise portal), marketing + field ops + product + vendor (RouteThis Certify), and marketing + product + engineering (Martech rebuild).",
    related_skills: ["Cross-Functional Leadership", "Vendor Management", "Stakeholder Alignment", "Executive Communication"],
    tools: ["Notion", "Slack", "Figma"],
    tags: ["leadership", "cross-functional", "executive", "stakeholder"]
  },
  {
    id: "skill-cx",
    type: "skill",
    skill_area: "Customer Experience",
    summary: "CX work spans self-service portals, post-purchase journeys, and installation quality.",
    description: "Built customer experience programs across the entire post-acquisition journey — from MyRise self-service portal (real-time outage visibility, diagnostics, self-resolution), to RouteThis Certify (installation quality + handoff docs), to lifecycle marketing programs at Credit.com.",
    related_skills: ["Self-Service", "Post-Purchase", "Journey Mapping", "Lifecycle"],
    tools: ["Contentful", "React", "Twilio"],
    tags: ["cx", "self-service", "post-purchase", "lifecycle"],
    companies: ["Rise Internet", "Credit.com"]
  },
  {
    id: "skill-growth-engineering",
    type: "skill",
    skill_area: "Growth Engineering",
    summary: "Career began in full-stack dev — that technical foundation underlies every growth role since.",
    description: "Started in full-stack development (ZAGG, One on One Marketing) before 'growth engineering' was a discipline. That foundation directly shapes how attribution systems, martech architecture, experimentation infrastructure, and AI workflows get built and scaled.",
    related_skills: ["Front-End Development", "Analytics Implementation", "Tag Management", "Martech Engineering"],
    tools: ["HTML/CSS/JS", "Adobe Launch", "GA"],
    tags: ["growth-engineering", "engineering", "martech", "full-stack"],
    companies: ["ZAGG", "One on One Marketing"]
  },
  {
    id: "skill-fintech",
    type: "skill",
    skill_area: "Fintech Industry",
    summary: "Five years of fintech experience across consumer credit, SMB lending, and personal finance brands.",
    description: "Fintech experience across Credit.com, Lexington Law, and Lendio. Led growth, personalization, lifecycle, and CRO across consumer credit and SMB lending verticals. Worked within regulated, high-trust consumer financial environments.",
    related_skills: ["Consumer Fintech", "SMB Lending", "Regulated Marketing", "Lifecycle"],
    tags: ["fintech", "industry", "consumer-finance", "smb-lending"],
    companies: ["Credit.com", "Lexington Law", "Lendio"]
  },
  {
    id: "skill-telecom",
    type: "skill",
    skill_area: "Telecom Industry",
    summary: "ISP/telecom growth leadership at Rise Internet — fiber, wireless, and field-installed services.",
    description: "Leading digital growth and product marketing at Rise Internet — a regional ISP delivering fiber, fixed wireless, and field-installed broadband services. Telecom experience spans paid acquisition, attribution from web to call center, field operations, and rebrand execution.",
    related_skills: ["ISP", "Field Operations", "Call Center", "Attribution"],
    tags: ["telecom", "isp", "industry", "field-ops"],
    companies: ["Rise Internet"]
  },
  {
    id: "skill-digital-transformation",
    type: "skill",
    skill_area: "Digital Transformation",
    summary: "Modernizing legacy stacks: Martech rebuild at Credit.com, attribution rebuild at Rise.",
    description: "Repeatable pattern: arrives at an organization with fragmented, legacy systems and rebuilds them into modern, scalable, instrumented infrastructure. Credit.com (legacy PHP → headless AEM, months-to-days releases) and Rise Internet (channel-blind reporting → identity-stitched attribution).",
    related_skills: ["Legacy Modernization", "Headless Architecture", "Martech Strategy", "Change Management"],
    tags: ["digital-transformation", "modernization", "martech", "leadership"],
    companies: ["Rise Internet", "Credit.com"]
  },
  {
    id: "skill-ecommerce",
    type: "skill",
    skill_area: "Ecommerce Optimization",
    summary: "Ecommerce optimization experience spanning consumer electronics, fintech, and ISP digital storefronts.",
    description: "Ecommerce foundation built at ZAGG — consumer electronics catalog, marketing experiences, and conversion optimization. That foundation carried into every subsequent role, informing how digital storefronts, checkout flows, and product purchase paths get built and optimized.",
    related_skills: ["Checkout Optimization", "Catalog UX", "Conversion", "Site Performance"],
    tags: ["ecommerce", "checkout", "optimization", "consumer"],
    companies: ["ZAGG"]
  },

  // ----------- PHILOSOPHIES -----------
  {
    id: "phil-builder",
    type: "philosophy",
    skill_area: "How I Work",
    summary: "A builder at the intersection of strategy, data, creativity, and technology.",
    description: "My career origin in full-stack dev shaped a core belief: the best growth leaders sit at the intersection of strategy and execution. I speak code, design, analytics, and brand fluently enough to translate between teams — and I care more about shipped systems than tidy decks.",
    related_skills: ["Strategy", "Execution", "Cross-Functional Translation"],
    tags: ["philosophy", "mindset", "builder"]
  },
  {
    id: "phil-systems",
    type: "philosophy",
    skill_area: "Systems Thinking",
    summary: "Build the system, not just the campaign — durable infrastructure beats one-off wins.",
    description: "My operating belief: most growth problems are systems problems. Attribution gaps, slow release cycles, brittle martech, channel-blind reporting — these compound. Investing in the underlying system (attribution infrastructure, headless CMS, experimentation ops) creates leverage every campaign benefits from.",
    related_skills: ["Systems Thinking", "Infrastructure", "Operational Excellence"],
    tags: ["philosophy", "systems", "infrastructure"]
  },
  {
    id: "phil-ai-active",
    type: "philosophy",
    skill_area: "AI Philosophy",
    summary: "Analytics should be an active operating system, not a passive dashboard.",
    description: "The thesis behind Fuzely and the way I believe every modern growth team should operate: dashboards that just describe what happened are obsolete. Modern analytics, paired with LLMs and structured retrieval, can dynamically surface what to do next — turning insight into action.",
    related_skills: ["AI Product", "Operational AI", "Analytics", "Decision Systems"],
    tags: ["philosophy", "ai", "analytics", "fuzely"],
    companies: ["Fuzely"]
  },
  // ----------- AI TOOLS & PLATFORM SKILLS -----------
  {
    id: "skill-claude",
    type: "skill",
    skill_area: "Claude (Anthropic)",
    summary: "Advanced Claude user — prompt engineering, system prompts, AI agents, API integration, and agentic workflows.",
    description: "Uses Claude as a primary AI operating layer across multiple domains: writing system prompts and context files for AI agents (the Ask Steve widget on this portfolio), API integration via the Anthropic SDK, prompt engineering for structured JSON outputs, streaming responses, and multi-turn conversation design. Also uses Claude for research acceleration, content development, analytics interpretation, and strategic thinking.",
    related_skills: ["Prompt Engineering", "System Prompt Design", "AI Agent Development", "Anthropic SDK", "AI Workflow Automation"],
    tools: ["Claude Sonnet", "Claude Opus", "Anthropic API", "claude.ai"],
    tags: ["claude", "anthropic", "ai", "prompt-engineering", "ai-agent", "llm", "workflow"],
    companies: ["Fuzely", "Rise Internet", "Portfolio"]
  },
  {
    id: "skill-claude-code",
    type: "skill",
    skill_area: "Claude Code / Claude Terminal",
    summary: "Uses Claude Code and Claude Terminal for agentic full-stack development — writing, editing, committing, and deploying code end-to-end.",
    description: "Primary development workflow for Fuzely and this portfolio site uses Claude Terminal for agentic coding: writing and editing files, running bash commands, committing to GitHub, and deploying to Vercel — all inside a conversational session. Has used Claude Code to build and ship a full Next.js 14 SaaS application (Fuzely) and a complete personal portfolio site from scratch, including serverless API functions, database migrations, and DNS configuration.",
    related_skills: ["Agentic Development", "Full-Stack Development", "Git & GitHub", "Vercel Deployment", "Serverless Functions", "Next.js"],
    tools: ["Claude Terminal", "Claude Code", "GitHub", "Vercel", "Bash", "Next.js 14", "Supabase"],
    tags: ["claude-code", "claude-terminal", "agentic", "full-stack", "development", "claude", "ai-dev"],
    companies: ["Fuzely", "Portfolio"],
    impact: "Shipped full SaaS product and portfolio site using agentic AI development"
  },
  {
    id: "skill-claude-design",
    type: "skill",
    skill_area: "Claude Design",
    summary: "Uses Claude Design for rapid UI mockups, design iteration, and visual prototyping.",
    description: "Leverages Claude Design to prototype and iterate on UI concepts quickly — including resume modal layouts, dashboard UI concepts for Fuzely, and design system exploration. Uses it to translate design intent into production-ready HTML/CSS components and to rapidly explore visual directions before committing to implementation.",
    related_skills: ["UI Prototyping", "Design Systems", "HTML/CSS", "Rapid Iteration", "Visual Design"],
    tools: ["Claude Design", "HTML", "CSS", "Tailwind CSS"],
    tags: ["claude-design", "ui", "design", "prototyping", "claude", "visual"],
    companies: ["Fuzely", "Portfolio"]
  },
  {
    id: "skill-chatgpt",
    type: "skill",
    skill_area: "ChatGPT (OpenAI)",
    summary: "Uses ChatGPT for research acceleration, content development, strategic brainstorming, and workflow optimization.",
    description: "Actively uses ChatGPT as a complementary AI tool alongside Claude — particularly for research synthesis, content ideation, copy refinement, and brainstorming strategic frameworks. Uses GPT-4 for tasks where a second AI perspective adds value, and has integrated OpenAI's API concepts into thinking around AI product architecture.",
    related_skills: ["AI-Assisted Research", "Content Development", "Workflow Automation", "Strategic Brainstorming"],
    tools: ["ChatGPT", "GPT-4", "OpenAI API"],
    tags: ["chatgpt", "openai", "ai", "workflow", "research", "content"],
    companies: ["Fuzely", "Rise Internet"]
  },
  {
    id: "proj-portfolio",
    type: "project",
    company: "heysteve.io",
    role: "Designer, Developer & AI Architect",
    timeframe: "2025 — Present",
    industry: "AI / Personal Brand",
    skill_area: "Personal Portfolio & Brand",
    summary: "Built a complete personal portfolio site end-to-end using Claude Terminal — including an embedded AI agent, Career Intelligence modal, voice capability, and custom domain.",
    description: "Designed and built heysteve.io entirely through agentic AI development using Claude Terminal. The site features: a fully custom AI chat agent (Ask Steve) powered by Claude via a Vercel serverless proxy, a Career Intelligence modal with AI-driven experience retrieval and ranking, image compositing tools, a résumé modal, and full mobile responsiveness. Deployed to Vercel with a custom GoDaddy domain. Every commit, DNS record, and CSS rule was written through conversational AI sessions.",
    related_skills: ["Agentic Development", "AI Agent Design", "Prompt Engineering", "Serverless Functions", "DNS & Deployment", "UI/UX", "Full-Stack"],
    tools: ["Claude Terminal", "Claude Code", "Claude Design", "Anthropic API", "Vercel", "GitHub", "GoDaddy", "HTML/CSS/JS", "ElevenLabs"],
    tags: ["portfolio", "heysteve", "personal-site", "personal-brand", "personal", "ai-agent", "agentic", "deployment", "claude-terminal", "claude-code"],
    companies: ["heysteve.io", "heysteve", "Personal Portfolio"],
    impact: "Fully functional AI-powered portfolio site shipped via agentic development"
  },

  // ----------- APPROACH & PHILOSOPHY (CAREER) -----------
  {
    id: "approach-attribution",
    type: "philosophy",
    skill_area: "Attribution Philosophy",
    summary: "Attribution must connect to real revenue — not vanity metrics. Identity stitching across fragmented journeys is the only honest answer.",
    description: "My core belief: most attribution is theater. Last-click credit, channel-level aggregates, and isolated platform reporting all lie in different ways. The only attribution worth building connects a real person's first touchpoint to their actual revenue event — through identity stitching, call tracking, and CRM integration. I built this at Rise Internet (GA → Invoca → Snowflake → CSG) and Credit.com. I will always push for explainable attribution over convenient attribution.",
    related_skills: ["Attribution Modeling", "Identity Stitching", "Multi-Touch Attribution", "Revenue Attribution"],
    tags: ["attribution", "philosophy", "revenue", "identity-stitching", "analytics"],
    companies: ["Rise Internet", "Credit.com"]
  },
  {
    id: "approach-experimentation",
    type: "philosophy",
    skill_area: "Experimentation Philosophy",
    summary: "Experimentation culture matters more than any single test result. The infrastructure, cadence, and organizational buy-in compound over time.",
    description: "I believe most experimentation programs fail not because of bad test ideas, but because of bad infrastructure and culture. A single winning A/B test doesn't move the business. An always-on experimentation program with clean tracking, fast deployment, and shared learnings does. I have built these programs at Vivint, Credit.com, and Rise Internet — always focused on compounding velocity over one-off wins.",
    related_skills: ["Experimentation Strategy", "A/B Testing", "CRO", "Test Velocity", "Experimentation Culture"],
    tags: ["experimentation", "philosophy", "cro", "culture", "testing"],
    companies: ["Rise Internet", "Credit.com", "Vivint", "Lendio", "One on One Marketing"]
  },
  {
    id: "approach-ai",
    type: "philosophy",
    skill_area: "AI Philosophy",
    summary: "AI should augment operators and accelerate decisions — not replace strategic thinking or produce generic automation.",
    description: "My AI philosophy has three layers: (1) AI as a workflow accelerator — using Claude and ChatGPT to compress research, drafting, and analysis cycles; (2) AI as an operational layer — deploying AI tools into real workflows like field operations (RouteThis Certify) and analytics (Fuzely); (3) building Fuzely as an AI-powered growth OS. I am skeptical of AI that produces generic output and excited about AI that surfaces specific, actionable, data-grounded insights.",
    related_skills: ["AI Product", "LLM Workflows", "Prompt Engineering", "Operational AI"],
    tags: ["ai", "philosophy", "workflow", "product", "claude", "chatgpt"],
    companies: ["Fuzely", "Rise Internet"]
  },
  {
    id: "approach-leadership",
    type: "philosophy",
    skill_area: "Leadership Philosophy",
    summary: "Leadership means building systems and teams that outlast your involvement — not being the smartest person in the room.",
    description: "I lead collaboratively and cross-functionally. I believe the best growth leaders sit at the intersection of strategy and execution — able to speak fluently with engineering, product, analytics, brand, and operations. I dislike siloed teams, vanity metrics, and processes that exist to protect turf. I am energized by hard problems where the answer requires connecting dots across disciplines. I have led programs spanning marketing + engineering + product + field ops + vendors.",
    related_skills: ["Cross-Functional Leadership", "Team Building", "Stakeholder Management", "Executive Communication"],
    tags: ["leadership", "philosophy", "culture", "cross-functional", "collaboration"]
  },
  {
    id: "approach-growth",
    type: "philosophy",
    skill_area: "Growth Philosophy",
    summary: "Growth should be measurable, scalable, customer-focused, and operationally sustainable — not just a number on a slide.",
    description: "My growth philosophy centers on building compounding systems rather than chasing one-off wins. I believe acquisition efficiency (CAC), retention, and lifetime value are more important than top-line growth. I connect customer experience directly to growth outcomes — if the post-purchase experience is broken, no amount of acquisition spend fixes it. I have applied this thinking across telecom, fintech, smart home, and ecommerce.",
    related_skills: ["Growth Strategy", "CAC Optimization", "Retention", "Lifecycle Marketing", "Customer Experience"],
    tags: ["growth", "philosophy", "retention", "cac", "lifetime-value", "cx"]
  },
  {
    id: "approach-client-marketing",
    type: "philosophy",
    skill_area: "Client Marketing & Retention",
    summary: "Client marketing is about connecting product value to customer behavior — not just sending emails.",
    description: "My approach to client/retention marketing is grounded in behavioral data and product usage signals. I build lifecycle programs that respond to what customers actually do — not just calendar-based drip sequences. At Credit.com I scaled lifecycle marketing across millions of users using engagement signals to drive onboarding, retention, and re-engagement. I see client marketing as a growth lever that most companies underinvest in relative to acquisition.",
    related_skills: ["Lifecycle Marketing", "Retention Strategy", "Customer Engagement", "Behavioral Segmentation", "Cross-Sell"],
    tags: ["client-marketing", "retention", "lifecycle", "philosophy", "engagement", "waystar"],
    companies: ["Credit.com", "Lexington Law"]
  },
  {
    id: "approach-work-style",
    type: "philosophy",
    skill_area: "Work Style & Culture",
    summary: "Remote-capable and hybrid-preferred. Misses in-office energy. Believes face-to-face time builds better teams.",
    description: "I work well remotely and have done so effectively, but genuinely value in-person collaboration for the relationship depth and creative energy it creates. I thrive in environments where strategy and execution coexist — where leaders are expected to both think and do. I dislike bureaucratic processes, endless approval chains, and organizations where politics matter more than outcomes. I am energized by ambitious problems, fast iteration, and teams that care about the work.",
    related_skills: ["Remote Work", "Hybrid Collaboration", "Cross-Functional Leadership"],
    tags: ["philosophy", "culture", "work-style", "remote", "hybrid"]
  },
  {
    id: "approach-digital-transformation",
    type: "philosophy",
    skill_area: "Digital Transformation Philosophy",
    summary: "Most digital transformation fails because it is treated as a technology project rather than an organizational change.",
    description: "I have led two major digital transformations: the Credit.com Martech rebuild (legacy PHP → headless AEM, months-to-days releases) and Rise Internet's attribution infrastructure rebuild (channel-blind → identity-stitched revenue visibility). My pattern: start with the data and workflow problems, not the technology. Build for the team that will maintain it. Instrument everything from day one. Compress the feedback loop between change and measurement.",
    related_skills: ["Digital Transformation", "Change Management", "Martech Strategy", "Systems Thinking"],
    tags: ["digital-transformation", "philosophy", "systems", "martech", "change-management"],
    companies: ["Rise Internet", "Credit.com"]
  },
  {
    id: "approach-product-thinking",
    type: "philosophy",
    skill_area: "Product Thinking",
    summary: "Product thinking means obsessing over the customer problem, not the feature list.",
    description: "I approach product as a growth leader — always asking: does this solve a real customer problem, and can we measure whether it does? I have brought this thinking to the MyRise portal (shifting from reactive call center to proactive self-service), to Fuzely (collapsing the gap between analytics insight and action), and to every experimentation program I have built. I am most effective when product, marketing, and engineering share a common view of what success looks like.",
    related_skills: ["Product Strategy", "Customer Problem Framing", "Product Marketing", "Cross-Functional Alignment"],
    tags: ["product", "philosophy", "cx", "customer-problem", "growth"],
    companies: ["Fuzely", "Rise Internet"]
  },
  {
    id: "approach-data",
    type: "philosophy",
    skill_area: "Data & Analytics Philosophy",
    summary: "Data without action is just storage. The job is to get from insight to decision as fast as possible.",
    description: "I believe most analytics teams are optimized for reporting, not decision-making. I push for executive dashboards that answer specific business questions, attribution systems that connect to real revenue events, and AI layers (like Fuzely) that surface recommendations rather than just charts. I have built reporting frameworks at Credit.com and Rise Internet that became the operating language of the business — used by executive teams to make actual resource allocation decisions.",
    related_skills: ["Analytics Strategy", "Executive Reporting", "KPI Frameworks", "Decision Intelligence"],
    tags: ["data", "analytics", "philosophy", "reporting", "decision-making", "executive"],
    companies: ["Rise Internet", "Credit.com", "Fuzely"]
  },

];
