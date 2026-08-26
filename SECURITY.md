# Security Policy

## Supported Versions

| Version | Supported         |
| ------- | ----------------- |
| 1.x.x   | ✅ Active support |
| < 1.0   | ❌ Not supported  |

## Reporting a Vulnerability

If you discover a security vulnerability in **Rizonesoft AI Email Writer**, please report it responsibly.

### How to Report

1. **Do NOT** open a public GitHub Issue for security vulnerabilities
2. Email **support@rizonesoft.com** with:
   - A description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fix (optional)

### What to Expect

- **Acknowledgment** within 48 hours
- We will investigate and aim to provide an initial assessment within 5 business days
- If confirmed, we will work on a fix and coordinate a release
- You will be credited in the release notes (unless you prefer anonymity)

### Scope

The following are in scope:

- The AI Compose Outlook add-in source code
- API key handling and storage
- Data sent to external services (Google Gemini API)
- The add-in manifest and permissions

### Out of Scope

- Vulnerabilities in third-party dependencies (report to the upstream project)
- Issues in Microsoft Office or Outlook itself
- Issues in the Google Gemini API

## Best Practices for Users

- **Never share your Gemini API key** publicly
- Use a dedicated API key for AI Compose (not your main project key)
- Review the [Privacy Policy](PRIVACY.md) to understand what data is processed

---

© Rizonetech (Pty) Ltd. • [rizonesoft.com](https://rizonesoft.com)
