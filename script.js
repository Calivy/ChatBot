// ============================================
// CHATBOT SCRIPT — Groq API (Free, no credit card)
// ============================================

// DOM element references
const chatInput      = document.querySelector(".chat-input textarea");
const sendChatBtn    = document.querySelector("#send-btn");
const chatbox        = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn       = document.querySelector("#close-btn");

// Stores the current user message
let userMessage;

// Prevents sending multiple messages while waiting for a response
let isWaiting = false;

// ── Toggle chatbot open / close ──
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeBtn.addEventListener("click",       () => document.body.classList.remove("show-chatbot"));

// ── Create a chat bubble <li> element ──
// className: "outgoing" (user) | "incoming" (bot)
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    return chatLi;
};

// ── Create the animated typing indicator bubble ──
const createThinkingLi = () => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", "incoming");
    chatLi.innerHTML = `
        <span class="material-symbols-outlined">smart_toy</span>
        <div class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>`;
    return chatLi;
};

// ── Call the Groq API and display the response ──
const generateResponse = (incomingChatLi, timerEl, startTime) => {
    const typingEl = incomingChatLi.querySelector(".typing-indicator");

    // Start a live ticking timer so the user knows it's working
    const timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        timerEl.textContent = `thinking... ${elapsed}s`;
    }, 100);

    // POST request to Groq API (100% FREE)
    // Get your FREE API key at: https://console.groq.com
    // Sign up with Google/GitHub → API Keys → Create API Key
    const API_KEY = "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"; // 🔑 Replace with key from console.groq.com
    const API_URL = "https://api.groq.com/openai/v1/chat/completions";

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile", // Free, fast Llama 3.3 70B model (replaces deprecated llama3-8b-8192)
            messages: [{ role: "user", content: userMessage }],
            max_tokens: 1000
        })
    })
    .then(res => res.json())
    .then(data => {
        clearInterval(timerInterval);
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

        // Remove typing indicator and create a real response bubble
        typingEl.remove();
        const p = document.createElement("p");

        if (data.error) {
            // Show actual API error message in red (helpful for debugging)
            p.classList.add("error");
            p.textContent = `API Error: ${data.error.code} — ${data.error.message}`;
            timerEl.remove();
        } else if (data.choices && data.choices[0].message.content) {
            // Success — Groq uses same response format as OpenAI
            // Response lives at: data.choices[0].message.content
            p.textContent = data.choices[0].message.content;
            timerEl.textContent = `responded in ${elapsed}s`;
        } else {
            // Unexpected response shape — show raw for debugging
            p.classList.add("error");
            p.textContent = `Unexpected response: ${JSON.stringify(data)}`;
            timerEl.remove();
        }

        incomingChatLi.appendChild(p);
        chatbox.scrollTop = chatbox.scrollHeight;
    })
    .catch(err => {
        // Network-level failure (CORS, no internet, etc.)
        clearInterval(timerInterval);
        typingEl.remove();
        const p = document.createElement("p");
        p.classList.add("error");
        p.textContent = `Network error: ${err.message}`;
        incomingChatLi.appendChild(p);
        timerEl.remove();
        chatbox.scrollTop = chatbox.scrollHeight;
    })
    .finally(() => {
        // Re-enable input after response (or error)
        isWaiting = false;
        chatInput.disabled = false;
        chatInput.focus();
    });
};

// ── Handle sending a message ──
const handleChat = () => {
    if (isWaiting) return; // Block if already waiting for a response
    userMessage = chatInput.value.trim();
    if (!userMessage) return; // Block if input is empty

    // Append user's message bubble
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;

    // Lock input while waiting
    isWaiting = true;
    chatInput.disabled = true;
    const startTime = Date.now();

    // Short delay before showing thinking indicator (feels more natural)
    setTimeout(() => {
        const incomingChatLi = createThinkingLi();
        chatbox.appendChild(incomingChatLi);

        // Add live timer below the thinking bubble
        const timerEl = document.createElement("div");
        timerEl.className = "live-timer";
        timerEl.textContent = "connecting...";
        chatbox.appendChild(timerEl);
        chatbox.scrollTop = chatbox.scrollHeight;

        generateResponse(incomingChatLi, timerEl, startTime);
    }, 200); // 200ms — snappy but not jarring
};

// ── Event listeners ──
sendChatBtn.addEventListener("click", handleChat);

// Allow Enter key to send (Shift+Enter for new line)
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});
