// ============================================
// CHATBOT SCRIPT — Claude API (Anthropic)
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

// ── Call the Anthropic Claude API and display the response ──
const generateResponse = (incomingChatLi, timerEl, startTime) => {
    const typingEl = incomingChatLi.querySelector(".typing-indicator");

    // Start a live ticking timer so the user knows it's working
    const timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        timerEl.textContent = `thinking... ${elapsed}s`;
    }, 100);

    // POST request to Anthropic API
    // Running inside Claude.ai: auth is handled automatically — no API key or extra headers needed.
    // Running standalone (Live Server): add "x-api-key": "YOUR_KEY" and "anthropic-version": "2023-06-01" here.
    fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "claude-haiku-4-5-20251001", // Fastest Claude model for low latency
            max_tokens: 1000,
            messages: [{ role: "user", content: userMessage }]
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
            p.textContent = `API Error: ${data.error.type} — ${data.error.message}`;
            timerEl.remove();
        } else if (data.content && data.content[0] && data.content[0].text) {
            // Success — display Claude's response
            p.textContent = data.content[0].text;
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
