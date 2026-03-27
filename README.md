# 🤖 Getting Started with the Anthropic Claude API — A Beginner's Guide

> **Toolkit Document** | Vanilla HTML · CSS · JavaScript + Claude API  
> Built as part of a GenAI Developer Toolkit assignment

---

## 1. Title & Objective

### What technology did you choose?
**Anthropic Claude API** — a large language model (LLM) API that allows developers to send text prompts and receive intelligent AI-generated responses.

### Why did you choose it?
- It is free to use inside Claude.ai Artifacts (no billing setup needed for learning)
- It has a simple REST API — just one `fetch()` call, no SDKs required
- It is one of the most capable and widely adopted AI APIs in the industry
- It is beginner-friendly: plain JSON in, plain JSON out

### What is the end goal?
Build a fully working AI-powered chatbot using only **HTML, CSS, and JavaScript** — no frameworks, no backend, no paid API key. The chatbot allows a user to type messages and receive real AI responses from Claude.

---

## 2. Quick Summary of the Technology

### What is it?
The **Anthropic Claude API** is a cloud-based REST API that gives you access to Claude — Anthropic's family of AI language models. You send it a message, it sends back an intelligent reply.

### Where is it used?
- Customer support bots
- Code assistants (like GitHub Copilot-style tools)
- Document summarizers
- Educational tutors
- Anything that needs natural language understanding or generation

### One real-world example
**Notion AI** uses large language models similar to Claude to help users write, summarize, and brainstorm inside documents — all powered by an API call in the background.

---

## 3. System Requirements

| Requirement | Details |
|-------------|---------|
| **OS** | Windows, macOS, or Linux |
| **Browser** | Any modern browser (Chrome, Firefox, Edge, Safari) |
| **Code Editor** | VS Code (recommended) |
| **Internet** | Required (API calls go to Anthropic's servers) |
| **Node.js** | Not required — this project is pure HTML/CSS/JS |
| **npm / pip** | Not required |
| **API Key** | Not required when running inside Claude.ai |

> ✅ No installation required. Open the HTML file in a browser and it works.

---

## 4. Installation & Setup Instructions

### Option A — Run inside Claude.ai (Recommended for beginners)

This is the easiest method. No setup needed.

1. Go to [claude.ai](https://claude.ai) and sign in
2. Open a new chat
3. Upload or paste the `index.html` file content
4. Claude will render it as a live Artifact in the right panel
5. Type a message — the chatbot will respond instantly

> **Why this works:** Claude.ai automatically handles API authentication. You don't need an API key.

---

### Option B — Run as a standalone HTML file

> ⚠️ This will NOT work by simply opening the file in your browser due to browser CORS restrictions (see Common Issues section). You need a local server.

**Step 1 — Install VS Code Live Server extension**
```
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "Live Server" by Ritwick Dey
4. Click Install
```

**Step 2 — Add your Anthropic API key**

Sign up at [console.anthropic.com](https://console.anthropic.com) to get an API key. Then open `script.js` and add it to the fetch headers:

```javascript
headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY_HERE",        // Add this
    "anthropic-version": "2023-06-01"          // Add this
}
```

**Step 3 — Start Live Server**
```
Right-click index.html in VS Code → "Open with Live Server"
```

**Step 4 — Open in browser**
```
http://127.0.0.1:5500/index.html
```

---

### Project File Structure

```
chatbot-project/
├── index.html      ← Page structure & layout
├── style.css       ← All styling & responsive design
├── script.js       ← API logic, chat rendering, event handlers
└── README.md       ← This file
```

---

## 5. Minimal Working Example

### What this example does
When a user types "Hello" and clicks Send, the JavaScript:
1. Captures the message
2. Shows animated thinking dots
3. Sends a `POST` request to the Claude API
4. Displays Claude's reply in the chat

### Core API call (from `script.js`)

```javascript
// Send user message to Claude API and display the response
fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
        // Note: API key handled automatically inside Claude.ai
    },
    body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",  // Fastest Claude model
        max_tokens: 1000,
        messages: [
            { role: "user", content: "Hello!" }  // User's message
        ]
    })
})
.then(res => res.json())
.then(data => {
    // Claude returns: data.content[0].text
    console.log(data.content[0].text); // "Hello! How can I help you today?"
})
.catch(err => console.error("Error:", err));
```

### Expected output

```
User:  Hello!
Bot:   Hello! How can I help you today? I'm here to assist with 
       questions, tasks, writing, analysis, or anything else 
       you'd like to explore.
```

### Key difference from OpenAI

| | OpenAI | Anthropic Claude |
|---|---|---|
| **Endpoint** | `api.openai.com/v1/chat/completions` | `api.anthropic.com/v1/messages` |
| **Response field** | `data.choices[0].message.content` | `data.content[0].text` |
| **Auth header** | `Authorization: Bearer KEY` | `x-api-key: KEY` |
| **Model param** | `"gpt-3.5-turbo"` | `"claude-haiku-4-5-20251001"` |

---

## 6. AI Prompt Journal

This project was built entirely with the help of Claude AI. Below is a record of the prompts used, what they produced, and how useful they were.

---

### Prompt 1 — Initial integration
> *"I have a chatbot that uses OpenAI API but I don't have a paid key. Can you replace OpenAI with the Claude API so it works for free?"*

**AI Response Summary:**  
Claude explained that the Anthropic API works natively inside Claude.ai Artifacts without needing an API key. It replaced the `fetch()` URL, updated the response parsing from `data.choices[0].message.content` to `data.content[0].text`, and removed the Authorization header.

**Evaluation:** ⭐⭐⭐⭐⭐ — Extremely helpful. Identified the root issue (wrong API + wrong response format) immediately and gave a working fix.

---

### Prompt 2 — Debugging the error
> *"It shows 'Oops! Something went wrong. Please try again.' — what's wrong?"*

**AI Response Summary:**  
Claude explained this was the catch block firing, which meant the API call was failing silently. It added debug logging to show the *actual* error in the chat instead of a generic message, exposing the real problem.

**Evaluation:** ⭐⭐⭐⭐⭐ — Game-changing. Without this, the error was invisible. Showing the real error message (`API Error: ...`) made fixing the issue straightforward.

---

### Prompt 3 — Speed improvement
> *"It's taking too long to load a response. Can you make it faster without streaming?"*

**AI Response Summary:**  
Claude switched the model to `claude-haiku-4-5-20251001` (Anthropic's fastest model), reduced the thinking delay from 600ms to 200ms, added a live ticking timer (`thinking... 1.4s`), and showed response time after each reply (`responded in 2.1s`). It also noted that actual API speed depends on network and server, not just the code.

**Evaluation:** ⭐⭐⭐⭐ — Very helpful. The live timer made the biggest difference — it changed the *perception* of speed even when the API took time.

---

### Prompt 4 — Separating files & documentation
> *"Can you separate the code into its respective files (HTML, CSS, JS) and write a full README that meets the assignment requirements?"*

**AI Response Summary:**  
Claude split the single-file chatbot into `index.html`, `style.css`, and `script.js` with full inline comments, then generated this README document covering all required sections.

**Evaluation:** ⭐⭐⭐⭐⭐ — Saved hours of work. The AI understood the assignment format and structured the documentation accordingly.

---

### Learning Reflections

Working with Claude AI as a development partner changed how I approached debugging. Instead of guessing what was wrong, I described what I saw and the AI pinpointed the exact issue. The most important lesson: **always show the real error, not a generic one** — that single change (Prompt 2) was what unlocked the entire project.

Using AI also helped me understand *why* things work, not just what to type. For example, learning that OpenAI and Claude have different response formats (`choices[0].message.content` vs `content[0].text`) is something I'll remember because I debugged it, not just copied it.

---

## 7. Common Issues & Fixes

### ❌ Issue 1 — "Oops! Something went wrong"
**Cause:** The `catch` block fires when the API call fails entirely (network error or CORS block).  
**Fix:** Check the browser console (F12 → Console tab) for the real error. Common causes:
- Running the file directly in a browser (`file://`) instead of a local server
- Wrong or missing API key in standalone mode

```
Solution: Use Claude.ai Artifacts, OR run via VS Code Live Server with a valid API key.
```

---

### ❌ Issue 2 — Thinking dots spin forever, no response
**Cause:** The API call is failing silently — often a CORS issue or streaming misconfiguration.  
**Fix:** Switch from streaming (`stream: true`) to regular fetch. Streaming requires special server support and fails silently in many environments.

```javascript
// ❌ Causes silent failure in many environments
body: JSON.stringify({ stream: true, ... })

// ✅ Use regular (non-streaming) fetch
body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 1000, messages: [...] })
```

---

### ❌ Issue 3 — Response is `undefined` or blank
**Cause:** Parsing the response using the OpenAI format on a Claude API response.

```javascript
// ❌ OpenAI format — wrong for Claude
data.choices[0].message.content

// ✅ Claude format — correct
data.content[0].text
```

---

### ❌ Issue 4 — "API Error: authentication_error — x-api-key header is required"
**Cause:** The API received the request but rejected it because no API key was provided. This happens when the `anthropic-dangerous-direct-browser-access` header is included — it bypasses CORS but still demands an API key. Inside Claude.ai, authentication is handled invisibly, so adding that header actually breaks things.

**Fix:** Remove `"anthropic-dangerous-direct-browser-access": "true"` from your headers. Inside Claude.ai Artifacts, use only `"Content-Type"`:

```javascript
// ✅ Correct — inside Claude.ai (no API key needed)
headers: {
    "Content-Type": "application/json"
}

// ❌ Wrong — triggers authentication_error inside Claude.ai
headers: {
    "Content-Type": "application/json",
    "anthropic-dangerous-direct-browser-access": "true"
}

// ✅ Correct — standalone outside Claude.ai (own API key required)
headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY_HERE",
    "anthropic-version": "2023-06-01"
}
```

> **Rule of thumb:** Inside Claude.ai → only `Content-Type`. Outside Claude.ai → add `x-api-key` + `anthropic-version`.

---

### ❌ Issue 5 — "Network error: Failed to fetch"
**Cause:** The browser blocks direct API calls to `api.anthropic.com` unless you explicitly include Anthropic's browser-access header. This is a CORS (Cross-Origin Resource Sharing) security rule enforced by all modern browsers. Without the header, the request is silently rejected before it even reaches Anthropic's servers.

**Fix:** Add `"anthropic-dangerous-direct-browser-access": "true"` to your fetch headers:

```javascript
fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true"  // ✅ This line fixes it
    },
    body: JSON.stringify({ ... })
})
```

> This header tells Anthropic's API that the request is intentionally coming from a browser. Without it, the browser preflight check fails and you get `Failed to fetch`.

**Reference:** [Anthropic Docs](https://docs.anthropic.com)

---

### ❌ Issue 6 — CORS error when opening HTML file directly (file:// protocol)
**Cause:** Browsers block API calls made from `file://` URLs for security reasons.  
**Fix:** 
- Use Claude.ai Artifacts (no setup needed), OR
- Use VS Code Live Server extension to serve from `http://localhost`, OR
- Deploy to a hosting service like GitHub Pages or Netlify

```
Error message: "Access to fetch at 'https://api.anthropic.com' from origin 'null' has been blocked by CORS policy"
```

---

### ❌ Issue 7 — Send button not appearing
**Cause:** The CSS uses `textarea:valid ~ span` to show the send button only when the textarea has content. If the `required` attribute is missing from the textarea, `valid` never triggers.

```html
<!-- ✅ Make sure required is present -->
<textarea placeholder="Enter a message..." required></textarea>
```

---

### ❌ Issue 8 — Response is very slow
**Cause:** Using a larger model (Sonnet, Opus) or a slow internet connection.  
**Fix:** Use `claude-haiku-4-5-20251001` — it's Anthropic's fastest and cheapest model, ideal for chatbots.

```javascript
model: "claude-haiku-4-5-20251001"  // ✅ Fastest
// vs
model: "claude-sonnet-4-6"          // Slower but smarter
```

---

## 8. References

### Official Documentation
- [Anthropic API Docs](https://docs.anthropic.com) — Full API reference
- [Claude Models Overview](https://docs.anthropic.com/en/docs/about-claude/models) — All available models and their speeds
- [Messages API Reference](https://docs.anthropic.com/en/api/messages) — Endpoint details, parameters, response format
- [Anthropic Quickstart Guide](https://docs.anthropic.com/en/docs/quickstart) — Official getting started guide

### Tutorials & Learning
- [MDN — Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — How `fetch()` works in JavaScript
- [MDN — CSS Position Fixed](https://developer.mozilla.org/en-US/docs/Web/CSS/position) — Used for the chatbot overlay
- [MDN — CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries) — Responsive design reference
- [Google Material Symbols](https://fonts.google.com/icons) — Icon library used for the chat UI

### Helpful for Debugging
- [StackOverflow — CORS errors with fetch](https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present) — CORS fix reference
- [Claude.ai](https://claude.ai) — Used as the AI assistant throughout this project

---

## How to Run

### Quickest way (no setup)
1. Go to [claude.ai](https://claude.ai)
2. Start a new chat
3. Paste the contents of `index.html` and ask Claude to render it as an Artifact
4. The chatbot works instantly in the Artifact panel

### Local development
1. Open the project folder in **VS Code**
2. Install the **Live Server** extension
3. Add your API key to `script.js` (see Setup section)
4. Right-click `index.html` → **Open with Live Server**
5. Chat at `http://127.0.0.1:5500`

---

*README generated as part of the GenAI Developer Toolkit assignment.*
