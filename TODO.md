## Stretch Goals / Nice-to-Haves

- [ ] **Keyboard shortcuts** for common actions in the task pane
- [ ] **Context menu integration** — right-click selected text → "Improve with AI Compose"
- [ ] **Custom prompts** — let users save their own prompt templates
- [ ] **Usage analytics** — local-only stats (emails drafted, summaries generated)
- [ ] **Offline mode** — queue actions and process when back online
- [x] **Multi-model support** — allow switching between Gemini models (Pro, Flash)
- [ ] **Scheduled summaries** — auto-summarize unread emails at a set time
- [ ] **Attachment awareness** — summarize attached PDFs or documents
- [ ] **Calendar integration** — draft meeting agendas from calendar events
- [ ] **Voice input** — dictate instructions using Web Speech API

### 13.1 Reply & Draft Improvements

- [x] Show estimated generation time based on email length
- [x] Allow editing the generated text inline (contenteditable preview)
- [x] Add "Copy to Clipboard" button alongside Reply/Reply All
- [x] Word count & reading time on generated content

### 13.2 Smart Features (Competitor-Inspired)

- [x] **Quick Reply Suggestions** — show 3 smart one-click reply options (AI-generated)
- [x] **Email Templates** — save & reuse common reply patterns
- [x] **Email Scoring** — rate the clarity/professionalism of your draft before sending
- [ ] **Thread Timeline** — visual timeline of a conversation showing key decisions
- [ ] **Smart CC Suggestions** — suggest who should be CC'd based on email content

### 13.3 Settings & Preferences

- [ ] Add "Test Connection" button for API key validation
- [ ] Add temperature/creativity slider in advanced settings
- [ ] Add max response length setting
- [ ] Add language preference for generated content
- [ ] Store settings in `Office.context.roamingSettings` for cross-device sync
- [ ] Export/import settings (backup & restore)
- [ ] Show current model capabilities (context window, speed) in model selector

---

## Phase 14 — Performance & Reliability

### 14.1 Speed Optimisations

- [ ] Implement response streaming (`generateContentStream`) for real-time text output
- [ ] Cache last-used email context to avoid re-reading on tab switch
- [ ] Debounce rapid button clicks (prevent double submissions)
- [ ] Lazy-load feature modules (only load Translate when tab is opened)
- [ ] Pre-warm the API connection on add-in start

### 14.2 Error Handling & Recovery

- [ ] Show specific, actionable error messages (not generic "Failed to generate")
- [ ] Add "Retry" button directly in error messages
- [ ] Save draft-in-progress to localStorage (recover after crash/reload)
- [ ] Handle token limit exceeded gracefully (auto-truncate and inform user)
- [ ] Add offline detection banner ("You're offline — features unavailable")

### 14.3 Logging & Debugging

- [ ] Add optional debug console in settings (toggle verbose logging)
- [ ] Log API response times for performance monitoring
- [ ] Add telemetry opt-in for anonymous usage stats

---

## Phase 15 — Accessibility (a11y)

- [ ] Add `aria-label` to all icon-only buttons
- [ ] Ensure all form controls have associated labels
- [ ] Add keyboard navigation for tab bar (arrow keys)
- [ ] Test with screen reader (Narrator, NVDA)
- [ ] Ensure colour contrast meets WCAG 2.1 AA (4.5:1 for text)
- [ ] Add `role="alert"` to error and success messages
- [ ] Support `prefers-reduced-motion` — disable animations
- [ ] Add skip-to-content link for keyboard users

---

## Phase 16 — Production Readiness

### 16.1 Manifest & Icons

- [x] Add unique icons for each ribbon control (Open Panel, AI Tools, menu items)
- [x] Rename ribbon labels to avoid "AI Compose" × 3 confusion
- [x] Fix `.hidden` CSS class (Tailwind v4 wasn't generating it)
- [x] Add Gemini 3.1 Pro to model selector
- [ ] Create production manifest with actual domain URLs
- [ ] Validate manifest with office-addin-manifest tool
- [ ] Add high-resolution icons (128×128, 256×256) for store listing

### 16.2 Build & Deploy

- [ ] Add source maps stripping for production build
- [ ] Minify HTML output
- [ ] Add Content Security Policy (CSP) meta tag
- [ ] Configure webpack for tree-shaking unused features
- [ ] Add build version injection (show version in Settings footer)
- [ ] Set up staging deploy environment for testing before production

### 16.3 Security

- [ ] Encrypt stored API key in localStorage (AES with device fingerprint)
- [ ] Add CSP headers to prevent XSS
- [ ] Sanitize all AI-generated HTML before rendering (DOMPurify)
- [ ] Rate-limit client-side API calls (prevent abuse)
- [ ] First-run privacy consent dialog
- [ ] Create PRIVACY.md documenting data handling
