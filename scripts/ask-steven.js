/* ============================================================
   Go ahead, ask — AI Chat Widget
   Powered by Claude (Anthropic API)
   ============================================================ */

(function () {
  "use strict";

  // ============================================================
  // VOICE FEATURE FLAG
  // Set VOICE_ENABLED to true once ElevenLabs credentials are
  // configured below. Set to false to completely disable voice.
  // ============================================================
  const VOICE_ENABLED = true;

  // ── ElevenLabs config (fill in when ready) ─────────────────
  // Credentials stored securely in Vercel environment variables
  // ── End voice config ───────────────────────────────────────

  // ── System prompt — Steve's voice and context ──────────────
  const SYSTEM_PROMPT = `You are Steve Jones — a growth, product, and digital marketing leader with 15+ years of experience. You are speaking directly as Steve on his personal portfolio website. Visitors are typically recruiters, hiring managers, potential collaborators, or fellow practitioners.

WHO YOU ARE:
- Started as a full-stack developer, evolved into executive growth leadership
- Deep expertise in attribution, analytics, CRO, experimentation, product strategy, and AI-powered optimization
- Currently Head of Digital Growth & Product Marketing at Rise Internet
- Founder/solo developer of Fuzely — an AI-powered analytics and CRO platform built on Next.js, Supabase, and Claude AI
- Based in Bluffdale, Utah. Open to new leadership opportunities.
- Married, father of three. Boston Marathon x2, Chicago Marathon x1.
- Grew up in Salt Lake City, moved to Manti (small town, central Utah) as a kid — loved it. Played football at Snow College. Started pre-law, worked at a law firm, prepped for the LSAT, then realized law was not for him. Pivoted to design and coding.
- Work style: remote/hybrid but genuinely misses in-office culture — believes face-to-face time builds better teams.
- Passionate runner — Boston Marathon x2, Chicago Marathon x1. Ruptured his patellar tendon in November 2025 and has been recovering since. Hopes to get back to running and do another marathon someday.
- Movie buff — loves mystery thrillers with his wife. True Crime podcast fan. Season ticket holder for Utah Utes football.

YOUR COMMUNICATION STYLE:
- Warm, direct, and conversational — like a smart colleague, not a corporate bio
- Confident but not arrogant — you back things up with real examples
- No buzzword soup. No fluff. No fake executive speak.
- Blend technical depth with business thinking naturally
- Use first person: "I built...", "I led...", "My approach is..."
- Keep answers focused and energetic — not exhaustive walls of text
- Occasionally show some personality and humor where it fits

KEY CAREER HIGHLIGHTS:
- Rise Internet: Built attribution infrastructure (GA → Invoca → Snowflake → CSG) connecting digital to offline call center revenue. 70% YoY sales growth, 30% CAC reduction.
- Rise Internet: Led MyRise self-service customer portal (React, Contentful, VWO, Twilio) — shifted users from call-center dependency to digital self-resolution
- Rise Internet: Led full company rebrand from Rise Broadband → Rise Internet across all touchpoints
- Credit.com (4.5 years): Led growth for Credit.com, Lexington Law, CreditRepair.com. Built product offer engine, lifecycle marketing at scale (millions of users), CMS modernization, experimentation programs
- Credit.com: Built martech infrastructure including Adobe Target, VWO, Optimizely, attribution frameworks, and executive dashboards
- Vivint Smart Home: Led web optimization and digital acquisition expansion beyond door-to-door
- Lendio: Sr. Director of Marketing in fintech/small biz lending
- Started career as a full-stack developer (ZAGG, One on One Marketing)

FUZELY (Current personal project):
An AI-powered CRO and analytics platform I'm building solo. Features: attribution modeling, customer journey tracking, funnel analysis, AI-generated optimization recommendations. Stack: Next.js 14, TypeScript, Supabase, Claude AI, Vercel. Vision: turn analytics from passive dashboards into active AI-powered growth operations.

PHILOSOPHIES:
- Attribution must connect to real revenue — not vanity metrics. Identity stitching is critical.
- Growth should be measurable, scalable, and customer-focused — not just a number on a slide
- AI should augment operators and accelerate decisions — not produce generic automation
- Siloed teams, fake attribution, and bloated processes are the enemy
- Build systems that compound over time

OFF-LIMITS (deflect warmly and honestly):
- Specific salary or compensation expectations
- Confidential employer or client details beyond what's public
- Legal, financial, or medical advice
- Anything outside your expertise — be honest and redirect

If someone seems interested in working together, naturally encourage them to reach out at jonsie1312@gmail.com or connect on LinkedIn (linkedin.com/in/steven-jones-068b0728).

WAYSTAR CONTEXT: Steve is actively pursuing a Director of Client Marketing role at Waystar. Key talking points if asked:
- Deep experience connecting customer insights and operational data to retention and expansion strategies
- Built lifecycle marketing at scale (millions of users) at Credit.com across onboarding, nurture, retention, re-engagement
- Led customer experience and self-service initiatives at Rise Internet that reduced support dependency and improved satisfaction
- Strong cross-sell, expansion marketing, and GTM strategy background
- Combines executive-level strategic thinking with hands-on technical execution — rare for a marketing leader
- Education: B.S. Sociology (U of Utah), M.F.A. Media Design & Technology (Full Sail University)
- Genuinely excited about Waystar — healthcare payments + technology is a compelling space for someone who connects data to customer value

Keep responses to 2-3 sentences max. Lead with the punchline. If they want more, they'll ask. You're Steve — smart, direct, and genuinely interested in the conversation.`;

  // ── Suggested questions ────────────────────────────────────
  const SUGGESTIONS = [
    "Tell me about your attribution work at Rise Internet",
    "What is Fuzely and why are you building it?",
    "How do you think about AI in growth and marketing?",
    "What kind of role are you looking for next?",
  ];

  // ── State ──────────────────────────────────────────────────
  let messages = [];
  let isOpen = false;
  let isLoading = false;
  let suggestionsHidden = false;

  // ── Voice state ────────────────────────────────────────────
  let voiceActive = false;
  let recognition = null;
  let currentAudio = null;

  // ── Build UI ───────────────────────────────────────────────
  function init() {
    injectButton();
    injectPanel();
    bindEvents();
    initVoice();
  }

  function injectButton() {
    const btn = document.createElement("button");
    btn.id = "ask-steven-btn";
    btn.setAttribute("aria-label", "Go ahead, ask anything");
    btn.innerHTML = `
      <svg class="ask-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
        <path d="M7 8.5C7 7.12 8.12 6 9.5 6S12 7.12 12 8.5c0 1.1-.67 2.04-1.62 2.44C10.15 11.11 10 11.42 10 11.75V12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="10" cy="14.5" r="0.75" fill="currentColor"/>
      </svg>
      Go ahead, ask
    `;
    document.body.appendChild(btn);
  }

  function injectPanel() {
    const panel = document.createElement("div");
    panel.id = "ask-steven-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Chat with Steve Jones");
    panel.innerHTML = `
      <div class="ask-header">
        <div class="ask-header-left">
          <div class="ask-avatar">S</div>
          <div class="ask-header-text">
            <span class="ask-header-name">Steve Jones</span>
            <span class="ask-header-status">Ask me anything</span>
          </div>
        </div>
        <button class="ask-close" aria-label="Close chat">✕</button>
      </div>
      <div class="ask-messages" id="ask-steven-messages"></div>
      <div class="ask-suggestions" id="ask-steven-suggestions">
        <div class="ask-suggestion-label">Suggested</div>
        ${SUGGESTIONS.map(q => `<button class="ask-suggestion">${q}</button>`).join("")}
      </div>
      <div class="ask-input-row">
        <button class="ask-close-mobile" aria-label="Close chat">✕</button>
        <textarea id="ask-steven-input" placeholder="Ask me about my work, experience, or Fuzely…" rows="1" maxlength="500"></textarea>
        <button id="ask-steven-send" aria-label="Send message">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="#f4f0e8"/>
          </svg>
        </button>
        ${VOICE_ENABLED ? `
        <button id="ask-steven-mic" aria-label="Toggle voice input" title="Voice input">
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="2" width="6" height="10" rx="3" stroke="currentColor" stroke-width="1.5"/>
            <path d="M4 10a6 6 0 0 0 12 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="10" y1="16" x2="10" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>` : ''}
      </div>
    `;
    document.body.appendChild(panel);

    // Add initial greeting
    addMessage("steve", "Hey! I'm Steve — ask me anything about my work, background, current projects, or how I think about growth, attribution, and AI. Happy to chat.");
  }

  function bindEvents() {
    document.getElementById("ask-steven-btn").addEventListener("click", togglePanel);
    document.querySelector(".ask-close").addEventListener("click", closePanel);
    document.getElementById("ask-steven-send").addEventListener("click", handleSend);

    const input = document.getElementById("ask-steven-input");
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 100) + "px";
    });

    document.querySelectorAll(".ask-suggestion").forEach(btn => {
      btn.addEventListener("click", () => {
        document.getElementById("ask-steven-input").value = btn.textContent;
        hideSuggestions();
        handleSend();
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      const panel = document.getElementById("ask-steven-panel");
      const btn = document.getElementById("ask-steven-btn");
      if (isOpen && !panel.contains(e.target) && !btn.contains(e.target)) {
        closePanel();
      }
    });
  }

  // ── Panel open/close ───────────────────────────────────────
  function togglePanel() {
    isOpen ? closePanel() : openPanel();
  }
  function openPanel() {
    isOpen = true;
    document.getElementById("ask-steven-panel").classList.add("open");
    document.getElementById("ask-steven-btn").classList.add("panel-open");
    setTimeout(() => document.getElementById("ask-steven-input").focus(), 220);
  }
  function closePanel() {
    isOpen = false;
    document.getElementById("ask-steven-panel").classList.remove("open");
    document.getElementById("ask-steven-btn").classList.remove("panel-open");
  }
  function hideSuggestions() {
    if (!suggestionsHidden) {
      suggestionsHidden = true;
      const el = document.getElementById("ask-steven-suggestions");
      if (el) el.style.display = "none";
    }
  }

  // ── Message rendering ──────────────────────────────────────
  function addMessage(role, text) {
    const container = document.getElementById("ask-steven-messages");
    const msg = document.createElement("div");
    msg.className = `ask-msg ${role}`;
    msg.innerHTML = `<div class="ask-bubble">${escapeHtml(text).replace(/\n/g, "<br>")}</div>`;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    return msg;
  }

  function addTypingIndicator() {
    const container = document.getElementById("ask-steven-messages");
    const msg = document.createElement("div");
    msg.className = "ask-msg steve ask-typing";
    msg.id = "ask-typing-indicator";
    msg.innerHTML = `<div class="ask-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById("ask-typing-indicator");
    if (el) el.remove();
  }

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ── Send & API call ────────────────────────────────────────
  async function handleSend() {
    if (isLoading) return;
    const input = document.getElementById("ask-steven-input");
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    input.style.height = "auto";
    hideSuggestions();

    // ── Career intent routing ──────────────────────────────────────
    // If the query looks like a career/work/skills question, hand it
    // off to Career Intelligence. Falls back to chatbot if unavailable.
    if (isCareerQuery(text) && window.CareerIntelligence) {
      try {
        closePanel();
        window.CareerIntelligence.open();
        window.CareerIntelligence.ask(text);
        return;
      } catch (e) {
        console.warn('CareerIntelligence routing failed, falling back to chatbot', e);
      }
    }

    addMessage("user", text);
    messages.push({ role: "user", content: text });

    isLoading = true;
    addTypingIndicator();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: messages,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I didn't catch that — try again?";

      removeTypingIndicator();
      addMessage("steve", reply);
      messages.push({ role: "assistant", content: reply });
      if (voiceActive) speakResponse(reply);
      if (VOICE_ENABLED) speakResponse(reply);

    } catch (err) {
      removeTypingIndicator();
      addMessage("steve", "Hmm, something went wrong on my end. Try refreshing and asking again — or just shoot me an email at jonsie1312@gmail.com.");
      console.error("Go ahead, ask error:", err);
    } finally {
      isLoading = false;
    }
  }


  // ── window.claude bridge for Career Intelligence ──────────────────
  // explore.js calls window.claude.complete(prompt) — this bridges it
  // to our existing /api/chat proxy without touching any other code.
  window.claude = window.claude || {
    complete: async function(prompt) {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      return data.content?.[0]?.text || '';
    }
  };

  // ── Career intent detection ────────────────────────────────────────
  // Conservative keyword list — only fires on clear career signals.
  // Personal/hobby/philosophy/motivation questions pass through untouched.
  function isCareerQuery(text) {
    const t = text.toLowerCase();

    // Explicit career/resume signals
    const careerSignals = [
      'experience', 'background', 'resume', 'cv', 'career', 'work at',
      'worked at', 'worked on', 'role at', 'job at', 'position at',
      'attribution', 'experimentation', 'a/b test', 'martech', 'analytics',
      'cro', 'conversion', 'funnel', 'lifecycle', 'personalization',
      'product marketing', 'growth marketing', 'digital marketing',
      'go-to-market', 'gtm', 'rebrand', 'brand strategy',
      'lead team', 'led team', 'manage team', 'cross-functional',
      'credit.com', 'rise internet', 'rise broadband', 'vivint', 'lendio',
      'zagg', 'one on one', 'lexington law', 'creditrepair',
      'fuzely', 'adobe target', 'optimizely', 'vwo', 'invoca', 'snowflake',
      'headless', 'cms', 'aem', 'contentful',
      'fintech', 'telecom', 'ecommerce', 'saas',
      'skill', 'skills', 'platform', 'tools', 'stack', 'technology',
      'qualification', 'hire', 'hiring', 'recruiter', 'candidate',
      'identity stitching', 'multi-touch', 'call center', 'call tracking',
      'ai product', 'built', 'launched', 'shipped', 'implemented', 'led',
    ];

    return careerSignals.some(sig => t.includes(sig));
  }


  // ── Voice: Web Speech API input ───────────────────────────
  function toggleVoice() {
    if (!VOICE_ENABLED) return;
    voiceActive ? stopVoice() : startVoice();
  }

  function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addMessage("steve", "Voice input isn't supported in this browser. Try Chrome or Edge!");
      return;
    }

    voiceActive = true;
    updateMicUI(true);

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    const input = document.getElementById("ask-steven-input");

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join("");
      input.value = transcript;
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 100) + "px";
    };

    recognition.onend = () => {
      voiceActive = false;
      updateMicUI(false);
      const text = input.value.trim();
      if (text) handleSend();
    };

    recognition.onerror = (e) => {
      voiceActive = false;
      updateMicUI(false);
      if (e.error !== "no-speech") {
        addMessage("steve", "Couldn\'t catch that — try again or just type!");
      }
    };

    recognition.start();
  }

  function stopVoice() {
    voiceActive = false;
    updateMicUI(false);
    recognition?.stop();
  }

  function updateMicUI(active) {
    const micBtn = document.getElementById("ask-steven-mic");
    if (!micBtn) return;
    micBtn.classList.toggle("mic-active", active);
    micBtn.setAttribute("aria-label", active ? "Listening… click to stop" : "Toggle voice input");
  }

  // ── Voice: ElevenLabs TTS output ──────────────────────────
  async function speakResponse(text) {
    if (!VOICE_ENABLED) return;
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      currentAudio = new Audio(url);
      currentAudio.play();
      currentAudio.onended = () => {
        URL.revokeObjectURL(url);
        currentAudio = null;
      };
    } catch (err) {
      console.warn("TTS error:", err);
    }
  }


  // ── Voice feature ─────────────────────────────────────────
  // Gated by VOICE_ENABLED flag at top of file.
  // Uses Web Speech API for input, ElevenLabs for output.
  // ──────────────────────────────────────────────────────────
  function initVoice() {
    if (!VOICE_ENABLED) return;

    const micBtn = document.getElementById("ask-steven-mic");
    if (!micBtn) return;

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      micBtn.style.display = "none"; // hide if unsupported
      return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      micBtn.classList.add("listening");
      micBtn.setAttribute("aria-label", "Listening...");
      document.getElementById("ask-steven-input").placeholder = "Listening…";
    };

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join("");
      document.getElementById("ask-steven-input").value = transcript;
    };

    recognition.onend = () => {
      micBtn.classList.remove("listening");
      micBtn.setAttribute("aria-label", "Toggle voice input");
      document.getElementById("ask-steven-input").placeholder = "Ask me about my work, experience, or Fuzely…";
      // Auto-send if we got something
      const text = document.getElementById("ask-steven-input").value.trim();
      if (text) handleSend();
    };

    recognition.onerror = (e) => {
      console.warn("Speech recognition error:", e.error);
      micBtn.classList.remove("listening");
      stopVoice();
    };

    micBtn.addEventListener("click", () => {
      if (voiceActive) {
        stopVoice();
      } else {
        startVoice();
      }
    });
  }

  function startVoice() {
    if (!VOICE_ENABLED || !recognition) return;
    voiceActive = true;
    const micBtn = document.getElementById("ask-steven-mic");
    if (micBtn) micBtn.classList.add("voice-on");
    // Stop any playing audio
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    try { recognition.start(); } catch(e) { console.warn("Recognition start error:", e); }
  }

  function stopVoice() {
    voiceActive = false;
    const micBtn = document.getElementById("ask-steven-mic");
    if (micBtn) micBtn.classList.remove("voice-on", "listening");
    try { recognition?.stop(); } catch(e) {}
  }

  async function speakResponse(text) {
    if (!VOICE_ENABLED) return;
    // Stop any currently playing audio
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      currentAudio = new Audio(url);
      currentAudio.onended = () => {
        URL.revokeObjectURL(url);
        currentAudio = null;
        // Restart listening after response plays if voice mode still on
        if (voiceActive) setTimeout(() => { try { recognition?.start(); } catch(e) {} }, 400);
      };
      await currentAudio.play();
    } catch(e) {
      console.warn("TTS playback error:", e);
    }
  }

  // ── Boot ───────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
