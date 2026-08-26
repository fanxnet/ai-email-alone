# Contributing to Rizonesoft AI Email Writer

Thanks for your interest in contributing to **AI Compose**! This guide will help you get started.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v20+ (LTS recommended)
- [Git](https://git-scm.com)
- A code editor — [VS Code](https://code.visualstudio.com) recommended
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)
- A Microsoft 365 account (free [Developer Program](https://developer.microsoft.com/en-us/microsoft-365/dev-program) account works)

### Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/<your-username>/ai-email-writer.git
   cd ai-email-writer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Code Style

- **TypeScript** — all source code is written in TypeScript
- **Prettier** — code formatting is enforced via `.prettierrc`
- **ESLint** — linting rules are defined in `.eslintrc.json`
- **EditorConfig** — editor settings in `.editorconfig` (2-space indent, UTF-8, LF)

Run the formatter and linter before committing:

```bash
npm run lint
npm run format
```

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add email summarization feature
fix: handle empty email body gracefully
docs: update setup instructions
chore: bump dependencies
```

## Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes with clear, focused commits
3. Ensure all linting and tests pass
4. Push your branch and open a Pull Request against `main`
5. Fill out the PR template and describe your changes
6. Wait for review — we aim to respond within 48 hours

## Reporting Bugs

Please use [GitHub Issues](https://github.com/rizonesoft/ai-email-writer/issues) and include:

- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, Outlook version)

## Questions?

Open a [Discussion](https://github.com/rizonesoft/ai-email-writer/discussions) — we're happy to help!

---

© Rizonetech (Pty) Ltd. • [rizonesoft.com](https://rizonesoft.com)
