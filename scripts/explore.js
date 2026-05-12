// =====================================================================
// Career Intelligence — AI-driven retrieval & rendering layer
// =====================================================================
(() => {
  const records = window.EXPERIENCE_RECORDS || [];

  // ------------------------------------------------------------------
  // Build facets from data
  // ------------------------------------------------------------------
  const facets = {
    skill_area: new Map(),
    company: new Map(),
    industry: new Map(),
    tags: new Map(),
    type: new Map(),
  };
  for (const r of records) {
    if (r.skill_area) facets.skill_area.set(r.skill_area, (facets.skill_area.get(r.skill_area) || 0) + 1);
    if (r.company) facets.company.set(r.company, (facets.company.get(r.company) || 0) + 1);
    if (r.industry) facets.industry.set(r.industry, (facets.industry.get(r.industry) || 0) + 1);
    if (r.type) facets.type.set(r.type, (facets.type.get(r.type) || 0) + 1);
    (r.tags || []).forEach(t => facets.tags.set(t, (facets.tags.get(t) || 0) + 1));
  }

  // ------------------------------------------------------------------
  // Lexical pre-rank (fallback / pre-filter before AI)
  // ------------------------------------------------------------------
  const tokenize = (s) => (s || "").toLowerCase().replace(/[^a-z0-9\s\-]/g, " ").split(/\s+/).filter(Boolean);
  const stop = new Set(["the","a","an","is","of","to","for","and","or","in","on","with","what","does","has","have","had","steve","steven","jones","experience","work","worked","about","do","you","your","my","at","by","as","be","i","this","that","any","tell","me","more"]);

  function preRank(query) {
    const qTokens = tokenize(query).filter(t => !stop.has(t));
    if (!qTokens.length) return records.map(r => ({ r, score: 0 }));
    return records.map(r => {
      const hay = [
        r.summary, r.description, r.role, r.company, r.industry, r.skill_area,
        ...(r.related_skills || []),
        ...(r.tools || []),
        ...(r.tags || []),
        ...(r.companies || []),
      ].join(" ").toLowerCase();
      let score = 0;
      for (const t of qTokens) {
        const re = new RegExp("\\b" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
        const matches = (hay.match(re) || []).length;
        score += matches;
        if ((r.tags || []).some(tag => tag.includes(t))) score += 2;
        if ((r.skill_area || "").toLowerCase().includes(t)) score += 1.5;
        if ((r.company || "").toLowerCase().includes(t)) score += 1.5;
      }
      return { r, score };
    }).sort((a, b) => b.score - a.score);
  }

  // ------------------------------------------------------------------
  // AI retrieval — uses window.claude.complete for re-ranking + summary
  // ------------------------------------------------------------------
  async function aiExplore(query) {
    const prelim = preRank(query).slice(0, 18); // shortlist to keep prompt size reasonable
    const compact = prelim.map(({ r }) => ({
      id: r.id, type: r.type, company: r.company, role: r.role, timeframe: r.timeframe,
      skill_area: r.skill_area, industry: r.industry, summary: r.summary,
      tags: r.tags, tools: r.tools, related_skills: r.related_skills, companies: r.companies,
    }));

    const prompt = `You are the career intelligence brain for Steven Jones's interactive portfolio. You have deep context about Steve — use it to give rich, specific, human answers. A visitor asked:

"${query}"

STEVE'S CONTEXT (use to inform tone, philosophy, and depth):
ABOUT STEVE JONES:\nSteve is a growth, product, and digital marketing leader with 15+ years experience. Started as a full-stack developer, evolved into executive growth leadership. Currently Head of Digital Growth & Product Marketing at Rise Internet. Also building Fuzely — an AI-powered analytics and CRO platform — as a solo developer. Based in Bluffdale, Utah. Open to new opportunities.\n\nPERSONALITY & VOICE: Warm, direct, confident, analytically minded but not robotic. Avoids buzzwords and corporate fluff. Prefers practical insights and measurable outcomes.\n\nCORE BELIEFS: Attribution must connect to real revenue — not vanity metrics. Growth should be measurable and operationally sustainable. AI should augment operators, not replace strategic thinking. Build systems that compound, not campaigns that spike. Experimentation culture matters more than any single test result.\n\nPERSONAL: Married, father of three. Boston Marathon x2, Chicago Marathon x1. Ruptured patellar tendon Nov 2025, recovering. Utah Utes football fan. Loves mystery thrillers and True Crime podcasts with his wife. Grew up SLC, moved to Manti UT, played football at Snow College, pivoted from pre-law to design and coding.\n\nWORK STYLE: Remote-capable, hybrid-preferred. Misses in-office energy. Thrives at intersection of strategy and execution. Dislikes siloed teams, vanity metrics, bureaucratic processes.\n\nOPEN OPPORTUNITY: Pursuing Director of Client Marketing at Waystar. Strong fit given lifecycle marketing at scale, retention strategy, connecting customer data to growth outcomes.

Below are the most relevant experience records. Choose the 3–6 best matches. Synthesize a 2–3 sentence narrative that sounds like it truly understands Steve — not generic recruiter copy. Reference specific companies, projects, or beliefs where relevant. Suggest 3 smart follow-up questions. Identify 3–5 dominant themes.

CANDIDATES (JSON):
${JSON.stringify(compact)}

Respond with ONLY a valid JSON object in this exact shape, no prose, no markdown fences:
{
  "summary": "string",
  "record_ids": ["id1","id2","id3"],
  "follow_ups": ["question 1","question 2","question 3"],
  "themes": ["theme1","theme2","theme3"]
}`;

    let parsed = null;
    try {
      const raw = await window.claude.complete(prompt);
      const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
      const m = cleaned.match(/\{[\s\S]*\}/);
      if (m) parsed = JSON.parse(m[0]);
    } catch (e) {
      console.warn("AI parse failed; falling back to lexical", e);
    }

    if (!parsed || !Array.isArray(parsed.record_ids) || !parsed.record_ids.length) {
      // Fallback: top lexical results
      const top = prelim.slice(0, 5).map(({ r }) => r.id);
      parsed = {
        summary: `Steve has direct experience that touches on this — see the matched experiences below for the most relevant work.`,
        record_ids: top,
        follow_ups: defaultFollowUps(),
        themes: [],
      };
    }

    const byId = Object.fromEntries(records.map(r => [r.id, r]));
    const resolved = parsed.record_ids.map(id => byId[id]).filter(Boolean);
    return { ...parsed, records: resolved };
  }

  function defaultFollowUps() {
    return [
      "What's his most recent leadership role?",
      "Show me his AI-related work",
      "How does he approach attribution?",
    ];
  }

  // ------------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------------
  const ui = {
    overlay: null,
    suggestions: null,
    input: null,
    form: null,
    results: null,
    threadEl: null,
    facetEl: null,
    introEl: null,
    thread: [],
  };

  const seedPrompts = [
    "Does Steve have experience with attribution?",
    "What AI work has he done?",
    "Show me his fintech experience",
    "How does he lead cross-functional teams?",
    "Tell me about his experimentation programs",
    "What's his product marketing background?",
    "Has he led a rebrand?",
    "What does he believe about modern analytics?",
  ];

  function renderFacets() {
    const sections = [
      ["Skill area", "skill_area"],
      ["Company", "company"],
      ["Industry", "industry"],
      ["Type", "type"],
    ];
    return sections.map(([label, key]) => {
      const entries = [...facets[key].entries()].sort((a,b) => b[1] - a[1]).slice(0, 8);
      if (!entries.length) return "";
      return `
        <div class="ex-facet">
          <h5>${label}</h5>
          <ul>
            ${entries.map(([name, count]) => `
              <li><button class="ex-facet-chip" data-q="${escapeAttr("Show me Steve's " + name + " work")}">${name} <span>${count}</span></button></li>
            `).join("")}
          </ul>
        </div>
      `;
    }).join("");
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  function renderCard(r, themes = []) {
    const themeSet = new Set(themes.map(t => t.toLowerCase()));
    const highlight = (chip) => themeSet.has((chip || "").toLowerCase()) ? "ex-chip-hot" : "";

    return `
      <article class="ex-card" data-id="${r.id}">
        <header class="ex-card-head">
          <div class="ex-card-meta">
            <span class="ex-type">${escapeHtml(r.type || "record")}</span>
            ${r.timeframe ? `<span class="ex-sep">·</span><span class="ex-time">${escapeHtml(r.timeframe)}</span>` : ""}
            ${r.industry ? `<span class="ex-sep">·</span><span>${escapeHtml(r.industry)}</span>` : ""}
          </div>
          <button class="ex-card-toggle" aria-label="Expand">＋</button>
        </header>
        <div class="ex-card-body">
          ${r.role ? `<h4 class="ex-role">${escapeHtml(r.role)}</h4>` : (r.skill_area ? `<h4 class="ex-role">${escapeHtml(r.skill_area)}</h4>` : "")}
          ${r.company ? `<div class="ex-company">${escapeHtml(r.company)}</div>` : ""}
          <p class="ex-summary">${escapeHtml(r.summary)}</p>
          ${r.impact ? `<div class="ex-impact"><span>Impact</span>${escapeHtml(r.impact)}</div>` : ""}
          <div class="ex-detail">
            <p>${escapeHtml(r.description)}</p>
            ${r.related_skills && r.related_skills.length ? `
              <div class="ex-tags-group">
                <span class="ex-tags-label">Skills</span>
                <div class="ex-tags">
                  ${r.related_skills.map(s => `<button class="ex-chip ${highlight(s)}" data-q="${escapeAttr("Tell me about Steve's " + s + " experience")}">${escapeHtml(s)}</button>`).join("")}
                </div>
              </div>` : ""}
            ${r.tools && r.tools.length ? `
              <div class="ex-tags-group">
                <span class="ex-tags-label">Tools</span>
                <div class="ex-tags">
                  ${r.tools.map(t => `<span class="ex-chip ex-chip-tool">${escapeHtml(t)}</span>`).join("")}
                </div>
              </div>` : ""}
            ${r.tags && r.tags.length ? `
              <div class="ex-tags-group">
                <span class="ex-tags-label">Tags</span>
                <div class="ex-tags">
                  ${r.tags.map(t => `<button class="ex-chip ex-chip-tag ${highlight(t)}" data-q="${escapeAttr("What's his work in " + t + "?")}">${escapeHtml(t)}</button>`).join("")}
                </div>
              </div>` : ""}
          </div>
        </div>
      </article>
    `;
  }

  function renderThread() {
    if (!ui.thread.length) {
      ui.threadEl.innerHTML = `<div class="ex-thread-empty">No conversation yet — ask something on the right.</div>`;
      return;
    }
    ui.threadEl.innerHTML = ui.thread.map((t, i) => `
      <button class="ex-thread-item ${i === ui.thread.length - 1 ? "active" : ""}" data-i="${i}">
        <span class="ex-thread-q">${escapeHtml(t.query)}</span>
        <span class="ex-thread-n">${t.records.length} results</span>
      </button>
    `).reverse().join("");
  }

  function renderResults(payload) {
    const { query, summary, records: recs, follow_ups, themes } = payload;
    const intro = ui.introEl;
    if (intro) intro.style.display = "none";

    ui.results.innerHTML = `
      <div class="ex-answer">
        <p class="eyebrow">AI summary · in response to</p>
        <h3 class="ex-question">${escapeHtml(query)}</h3>
        <p class="ex-summary-text">${escapeHtml(summary)}</p>
        ${themes && themes.length ? `
          <div class="ex-themes">
            ${themes.map(t => `<span class="ex-theme">${escapeHtml(t)}</span>`).join("")}
          </div>` : ""}
        <div class="ex-meta-row">
          <span>${recs.length} relevant experiences</span>
          <button class="ex-build-resume" data-q="Build me a recruiter resume view based on what we've discussed">Build recruiter view ↗</button>
        </div>
      </div>
      <div class="ex-cards">
        ${recs.map(r => renderCard(r, themes)).join("")}
      </div>
      ${follow_ups && follow_ups.length ? `
        <div class="ex-followups">
          <p class="eyebrow">Suggested follow-ups</p>
          <div class="ex-followup-list">
            ${follow_ups.map(q => `<button class="ex-followup" data-q="${escapeAttr(q)}">${escapeHtml(q)} <span>→</span></button>`).join("")}
          </div>
        </div>` : ""}
    `;

    // Wire interactions
    ui.results.querySelectorAll(".ex-card-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".ex-card");
        card.classList.toggle("ex-open");
        btn.textContent = card.classList.contains("ex-open") ? "－" : "＋";
      });
    });
    ui.results.querySelectorAll(".ex-card-head").forEach(h => {
      h.addEventListener("click", (e) => {
        if (e.target.closest(".ex-card-toggle")) return;
        const card = h.closest(".ex-card");
        card.classList.toggle("ex-open");
        const t = card.querySelector(".ex-card-toggle");
        if (t) t.textContent = card.classList.contains("ex-open") ? "－" : "＋";
      });
    });
    ui.results.querySelectorAll("[data-q]").forEach(el => {
      el.addEventListener("click", () => ask(el.dataset.q));
    });

    // Scroll to top of results
    ui.results.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ------------------------------------------------------------------
  // Main ask flow
  // ------------------------------------------------------------------
  let busy = false;
  async function ask(query) {
    if (busy || !query) return;
    query = query.trim();
    if (!query) return;
    busy = true;
    ui.input.value = "";

    // loading state
    ui.introEl.style.display = "none";
    ui.results.innerHTML = `
      <div class="ex-loading">
        <div class="ex-loading-bar"><span></span></div>
        <p class="ex-loading-text">Searching experience records · ranking relevance · synthesizing summary…</p>
        <p class="ex-loading-sub">"${escapeHtml(query)}"</p>
      </div>
    `;

    try {
      const result = await aiExplore(query);
      const payload = { query, ...result };
      ui.thread.push(payload);
      renderThread();
      renderResults(payload);
    } catch (e) {
      console.error(e);
      ui.results.innerHTML = `<div class="ex-error">Something went wrong reaching the AI. Try again or pick a suggested prompt.</div>`;
    } finally {
      busy = false;
    }
  }

  // ------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------
  function build() {
    const html = `
      <div class="ex-scrim" data-close></div>
      <div class="ex-panel" role="document">
        <header class="ex-bar">
          <div class="ex-bar-l">
            <span class="ex-dot"></span>
            <span class="ex-title">Career Intelligence</span>
            <span class="ex-subtitle">Steven Jones · AI-powered exploration</span>
          </div>
          <div class="ex-bar-r">
            <span class="ex-stat">${records.length} records indexed</span>
            <button class="ex-close" data-close aria-label="Close">
              <span></span><span></span>
            </button>
          </div>
        </header>

        <div class="ex-layout">
          <aside class="ex-rail">
            <div class="ex-rail-block">
              <h5>Conversation</h5>
              <div class="ex-thread"></div>
            </div>
            <div class="ex-rail-block ex-facets">
              <h5>Browse by facet</h5>
              ${renderFacets()}
            </div>
          </aside>

          <main class="ex-main">
            <div class="ex-intro">
              <p class="eyebrow">AI-powered career intelligence</p>
              <h2 class="ex-h2">Ask anything about <em>Steve's</em> work.</h2>
              <p class="ex-lede">
                A conversational layer over Steve's full professional history — roles, projects, skills, philosophies. The AI retrieves, ranks, and synthesizes experiences in real time.
              </p>
              <div class="ex-seeds">
                ${seedPrompts.map(p => `<button class="ex-seed" data-q="${escapeAttr(p)}">${escapeHtml(p)}</button>`).join("")}
              </div>
              <div class="ex-how">
                <div><span class="ex-num">01</span><div><strong>Retrieve.</strong> Searches structured experience records.</div></div>
                <div><span class="ex-num">02</span><div><strong>Rank.</strong> AI ranks relevance and selects the most useful matches.</div></div>
                <div><span class="ex-num">03</span><div><strong>Synthesize.</strong> Generates a recruiter-friendly narrative summary.</div></div>
                <div><span class="ex-num">04</span><div><strong>Explore.</strong> Drill into related skills, tools, and follow-up questions.</div></div>
              </div>
            </div>

            <div class="ex-results"></div>
          </main>
        </div>

        <form class="ex-form">
          <span class="ex-form-prefix">›</span>
          <input class="ex-input" type="text" placeholder="Ask about a skill, company, project, or industry…" autocomplete="off" />
          <button class="ex-submit" type="submit">Ask <span>↵</span></button>
        </form>
      </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.className = "ex-overlay";
    wrapper.id = "ex-overlay";
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.setAttribute("role", "dialog");
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    ui.overlay = wrapper;
    ui.input = wrapper.querySelector(".ex-input");
    ui.form = wrapper.querySelector(".ex-form");
    ui.results = wrapper.querySelector(".ex-results");
    ui.threadEl = wrapper.querySelector(".ex-thread");
    ui.facetEl = wrapper.querySelector(".ex-facets");
    ui.introEl = wrapper.querySelector(".ex-intro");

    ui.form.addEventListener("submit", (e) => { e.preventDefault(); ask(ui.input.value); });
    wrapper.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", close));
    wrapper.querySelectorAll(".ex-seed, .ex-facet-chip").forEach(b => b.addEventListener("click", () => ask(b.dataset.q)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && wrapper.getAttribute("aria-hidden") === "false") close();
    });
    ui.threadEl.addEventListener("click", (e) => {
      const t = e.target.closest(".ex-thread-item");
      if (!t) return;
      const i = parseInt(t.dataset.i, 10);
      if (!isNaN(i) && ui.thread[i]) renderResults(ui.thread[i]);
    });

    renderThread();
  }

  function open() {
    if (!ui.overlay) build();
    ui.overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => ui.input?.focus(), 200);
    // Hide the floating chatbot button while Career Intelligence is open
    const chatBtn = document.getElementById("ask-steven-btn");
    if (chatBtn) chatBtn.style.display = "none";
  }
  function close() {
    ui.overlay?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Restore the floating chatbot button
    const chatBtn = document.getElementById("ask-steven-btn");
    if (chatBtn) chatBtn.style.display = "";
  }

  // Wire any element with [data-open-explore]
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-open-explore]").forEach(el => {
      el.addEventListener("click", (e) => { e.preventDefault(); open(); });
    });
  });

  window.CareerIntelligence = { open, close, ask };
})();
