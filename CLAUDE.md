# CLAUDE.md — stevenjones.github.io Portfolio

## Project Overview
Personal portfolio site for Steve Jones — growth, product, and digital marketing leader.
Live at: https://stevenjones-github-io.vercel.app
Repo: https://github.com/stevenjones/stevenjones.github.io

## Stack
- **Frontend**: Static HTML, CSS, vanilla JS
- **Hosting**: Vercel (auto-deploys on push to `master`)
- **AI Widget**: Claude (claude-sonnet-4-5) via Vercel serverless proxy
- **API Proxy**: `api/chat.js` (Vercel serverless function)
- **Key stored**: Vercel Environment Variables as `ANTHROPIC_API_KEY`

## File Structure
```
/
├── index.html              # Main portfolio page
├── css/
│   ├── styles.css          # Main stylesheet
│   └── ask-steven.css      # Ask Steven widget styles
├── scripts/
│   ├── script.js           # Main JS
│   └── ask-steven.js       # AI chat widget + system prompt
├── api/
│   └── chat.js             # Vercel serverless proxy (never expose API key)
├── assets/                 # Images and media
├── uploads/                # Additional media
├── steven-context.md       # Steve's brain file — update to change what the agent knows
├── package.json            # Node config for Vercel function detection
├── vercel.json             # Vercel config
└── CLAUDE.md               # This file
```

## Key Workflows

### Making edits
1. Edit files locally or in this session
2. `git add -A && git commit -m "your message" && git push origin master`
3. Vercel auto-deploys in ~30 seconds

### Updating the AI agent's knowledge
- Edit `steven-context.md` for factual updates (new job, new project, etc.)
- Edit the `SYSTEM_PROMPT` constant in `scripts/ask-steven.js` for tone/behavior changes
- Commit and push — no redeploy needed, changes are live on next page load

### Adding a new case study section
Follow the existing pattern in `index.html`:
- Add nav link in `<nav class="nav-links">`
- Update the case study count in the Work section
- Add the section with a unique `id` and `case-N` class
- Update `steven-context.md` with the new project details

### API key rotation
1. Generate new key at console.anthropic.com/settings/keys
2. Vercel → Settings → Environment Variables → delete old → add new
3. Redeploy from Vercel dashboard

## Ask Steven Widget
- Floating button bottom-right on all pages
- Calls `/api/chat` (Vercel proxy) → Anthropic API
- API key NEVER in client-side code
- System prompt is in `scripts/ask-steven.js` → `SYSTEM_PROMPT` constant
- Suggested questions defined in `SUGGESTIONS` array in same file

## Design Tokens
- **Background**: `#f4f0e8` (parchment)
- **Dark**: `#1a1715`
- **Accent**: `#c85a2b` (rust/orange)
- **Fonts**: Newsreader (serif/italic), Geist (sans), JetBrains Mono (mono)

## Git Auth
Use a Personal Access Token (PAT) from github.com/settings/tokens with `repo` scope.
Format: `https://stevenjones:<PAT>@github.com/stevenjones/stevenjones.github.io.git`
Rotate PATs regularly — never paste in chat.
