# 🤖 Getting Started with the Groq API — A Beginner's Guide

> **Toolkit Document** | Vanilla HTML · CSS · JavaScript + Groq API  
> Built as part of a GenAI Developer Toolkit assignment

---

## 1. Title & Objective

### What technology did you choose?
**Groq API** — a high-speed inference API that allows developers to send text prompts and receive intelligent AI-generated responses using open-source models like Llama 3.3 70B.

### Why did you choose it?
- It is free to use (no credit card required for the free tier)
- It has a simple REST API compatible with the OpenAI format — just one `fetch()` call, no SDKs required
- It is one of the fastest LLM inference APIs available (powered by Groq's custom LPU hardware)
- It is beginner-friendly: plain JSON in, plain JSON out
- Works in all countries — no regional restrictions

### What is the end goal?
Build a fully working AI-powered chatbot using only **HTML, CSS, and JavaScript** — no frameworks, no backend. The chatbot allows a user to type messages and receive real AI responses powered by Llama 3.3 70B running on Groq.

---

## 2. Quick Summary of the Technology

### What is it?
The **Groq API** is a cloud-based REST API that gives you access to powerful open-source models (Llama, Qwen, etc.) with extremely low latency. You send it a message, it sends back an intelligent reply — fast.

### Where is it used?
- Customer support bots
- Code assistants
- Document summarizers
- Educational tutors
- Anything that needs natural language understanding or generation

### One real-world example
**Vercel's v0** uses fast LLM inference APIs to generate UI code in real time — the speed matters because users expect instant results. Groq's hardware acceleration makes that kind of experience possible.

---

## 3. System Requirements

| Requirement | Details |
|-------------|---------|
| **OS** | Windows, macOS, or Linux |
| **Browser** | Any modern browser (Chrome, Firefox, Edge, Safari) |
| **Code Editor** | VS Code (recommended) |
| **Internet** | Required (API calls go to Groq's servers) |
| **Node.js** | Not required — this project is pure HTML/CSS/JS |
| **npm / pip** | Not required |
| **API Key** | Required — free at [console.groq.com](https://console.groq.com) |

> ✅ No installation required. Open the HTML file via Live Server and it works.

---

## 4. Installation & Setup Instructions

### Step 1 — Get your free Groq API key

1. Go to [console.groq.com](https://console.groq.com) and sign up (Google or GitHub login)
2. Navigate to **API Keys** in the left sidebar
3. Click **Create API Key**
4. Copy the key — you'll only see it once

> The free tier is generous and requires no credit card.

---

### Step 2 — Add your API key to the project

Open `script.js` and replace the placeholder:

```javascript
const API_KEY = "YOUR_GROQ_API_KEY_HERE"; // 🔑 Replace this
```

with your actual key:

```javascript
const API_KEY = "gsk_xxxxxxxxxxxxxxxxxxxxxxxx"; // Your real Groq key
```

---

### Step 3 — Run with VS Code Live Server

> ⚠️ Opening the HTML file directly (`file://`) will fail due to CORS. Always use a local server.

1. Open the project folder in **VS Code**
2. Install the **Live Server** extension (by Ritwick Dey) if you haven't already
3. Right-click `index.html` → **Open with Live Server**
4. Chat at `http://127.0.0.1:5500`

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
2. Shows animated thinking dots + a live timer
3. Sends a `POST` request to the Groq API
4. Displays the model's reply in the chat

### Core API call (from `script.js`)

```javascript
const API_KEY = "YOUR_GROQ_API_KEY_HERE";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

fetch(API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Current recommended model
        messages: [{ role: "user", content: "Hello!" }],
        max_tokens: 1000
    })
})
.then(res => res.json())
.then(data => {
    // Groq uses the OpenAI response format
    console.log(data.choices[0].message.content); // "Hello! How can I help?"
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

### Available Groq Models (as of March 2026)

| Category | Model ID | Best For |
|---|---|---|
| **Text to Text** ✅ | `llama-3.3-70b-versatile` | General chat — **used in this project** |
| **Text to Text** | `llama-4-scout-17b-16e-instruct` | Longer context, also supports vision |
| **Reasoning** | `qwen-qwq-32b` | Step-by-step reasoning tasks |
| **Reasoning** | `deepseek-r1-distill-llama-70b` | Complex logic |
| **Speech to Text** | `whisper-large-v3` | Audio transcription |
| **Safety** | `llama-guard-4-12b` | Content moderation |

> ⚠️ `llama3-8b-8192` has been **decommissioned** and returns a `model_decommissioned` error. Use `llama-3.3-70b-versatile` instead.  
> Reference: [console.groq.com/docs/deprecations](https://console.groq.com/docs/deprecations)

---

## 6. AI Prompt Journal

This project was built with the help of Claude AI. Below is a record of the prompts used, what they produced, and how useful they were.

---

### Prompt 1 — Initial integration
> *"I have a chatbot that uses OpenAI API but I don't have a paid key. Can you replace OpenAI with a free API?"*

**AI Response Summary:**  
Claude suggested the Groq API as a free alternative that uses the same OpenAI-compatible request format. It replaced the `fetch()` URL, updated the Authorization header to use `Bearer`, and noted that the response format (`data.choices[0].message.content`) stays the same as OpenAI.

**Evaluation:** ⭐⭐⭐⭐⭐ — Extremely helpful. The OpenAI-compatible format meant minimal code changes.

---

### Prompt 2 — Debugging the error
> *"It shows 'Oops! Something went wrong. Please try again.' — what's wrong?"*

**AI Response Summary:**  
Claude explained this was the catch block firing, which meant the API call was failing silently. It added debug logging to show the *actual* error in the chat instead of a generic message.

**Evaluation:** ⭐⭐⭐⭐⭐ — Game-changing. Showing the real error message made fixing the issue straightforward.

---

### Prompt 3 — Speed improvement
> *"It's taking too long to load a response. Can you make it faster without streaming?"*

**AI Response Summary:**  
Claude highlighted Groq's fast inference as a key advantage, reduced the thinking delay, added a live ticking timer (`thinking... 1.4s`), and showed response time after each reply.

**Evaluation:** ⭐⭐⭐⭐ — Very helpful. The live timer made the biggest UX difference.

---

### Prompt 4 — Model update after deprecation
> *"I got API Error: model_decommissioned — llama3-8b-8192 is no longer supported. Which model should I use?"*

**AI Response Summary:**  
Claude identified `llama-3.3-70b-versatile` as the best replacement — it's the direct successor for general text-to-text tasks, still free on Groq, and more capable than the old 8B model. It updated the model string in `script.js` and added a comment explaining the deprecation.

**Evaluation:** ⭐⭐⭐⭐⭐ — One-line fix. Knowing which model to pick from the list saved research time.

---

### Prompt 5 — Separating files & documentation
> *"Can you separate the code into its respective files (HTML, CSS, JS) and write a full README?"*

**AI Response Summary:**  
Claude split the single-file chatbot into `index.html`, `style.css`, and `script.js` with full inline comments, then generated this README covering all required sections.

**Evaluation:** ⭐⭐⭐⭐⭐ — Saved hours of work.

---

### Learning Reflections

Working with Claude AI as a development partner changed how I approached debugging. The most important lesson: **always show the real error, not a generic one** — adding that single change was what unlocked the entire project.

The model deprecation issue was a good reminder that AI APIs are living products — model names change, old ones get retired. Knowing where to look (the provider's deprecations page) and what to replace them with is a practical real-world skill.

---

## 7. Common Issues & Fixes

### ❌ Issue 1 — `model_decommissioned` error
**Cause:** The model `llama3-8b-8192` has been retired by Groq.  
**Fix:** Update the model name in `script.js`:

```javascript
// ❌ Old — decommissioned, will throw model_decommissioned error
model: "llama3-8b-8192"

// ✅ New — current recommended replacement
model: "llama-3.3-70b-versatile"
```

> Always check [console.groq.com/docs/deprecations](https://console.groq.com/docs/deprecations) for the latest model changes.

---

### ❌ Issue 2 — "Oops! Something went wrong"
**Cause:** The `catch` block fires when the API call fails entirely (network error or CORS block).  
**Fix:** Check the browser console (F12 → Console tab) for the real error. Common causes:
- Running the file directly (`file://`) instead of via Live Server
- Wrong or missing API key

```
Solution: Run via VS Code Live Server with a valid Groq API key.
```

---

### ❌ Issue 3 — Thinking dots spin forever, no response
**Cause:** The API call is failing silently.  
**Fix:** Switch from streaming to regular fetch.

```javascript
// ❌ Causes silent failure in many browser environments
body: JSON.stringify({ stream: true, ... })

// ✅ Use regular (non-streaming) fetch
body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 1000, messages: [...] })
```

---

### ❌ Issue 4 — "401 Unauthorized" or "invalid_api_key"
**Cause:** The API key is wrong, expired, or still set to the placeholder.  
**Fix:**
1. Go to [console.groq.com](https://console.groq.com) → API Keys
2. Create a new key and copy it
3. Replace `"YOUR_GROQ_API_KEY_HERE"` in `script.js` with your real key

---

### ❌ Issue 5 — "Network error: Failed to fetch"
**Cause:** Browser CORS policy blocking the request, or the file is opened as `file://`.  
**Fix:** Always serve the project via a local server.

```
Error: "Access to fetch at 'https://api.groq.com' from origin 'null' has been blocked by CORS policy"
Solution: Use VS Code Live Server → http://127.0.0.1:5500
```

---

### ❌ Issue 6 — Send button not appearing
**Cause:** The CSS uses `textarea:valid ~ span` to show the send button. If `required` is missing from the textarea, `valid` never triggers.

```html
<!-- ✅ Make sure required is present -->
<textarea placeholder="Enter a message..." required></textarea>
```

---

### ❌ Issue 7 — Response is slow
**Cause:** Network latency. Groq is already very fast by design.  
**Fix:** `llama-3.3-70b-versatile` is the recommended default. For even lighter loads, `llama-4-scout-17b-16e-instruct` is another option.

---

## 8. References

### Official Documentation
- [Groq Console](https://console.groq.com) — Dashboard, API keys, model list
- [Groq API Docs](https://console.groq.com/docs/openai) — OpenAI-compatible API reference
- [Groq Model Deprecations](https://console.groq.com/docs/deprecations) — Check here when a model stops working
- [Groq Supported Models](https://console.groq.com/docs/models) — Full list of current models and their IDs

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

1. Get a free API key at [console.groq.com](https://console.groq.com)
2. Open `script.js` and replace `"YOUR_GROQ_API_KEY_HERE"` with your key
3. Open the project folder in **VS Code**
4. Install the **Live Server** extension if needed
5. Right-click `index.html` → **Open with Live Server**
6. Chat at `http://127.0.0.1:5500`

---

*README updated March 2026 — model updated from deprecated `llama3-8b-8192` to `llama-3.3-70b-versatile`.*
