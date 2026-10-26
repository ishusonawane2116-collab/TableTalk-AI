import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Clock3,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

const starterPrompts = [
  "Suggest a place for a family dinner",
  "Help me choose what to eat",
  "Find vegetarian food ideas",
  "What should I ask a restaurant before visiting?",
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm TableTalk AI 👋 I can help you explore food ideas, plan a meal, and think through restaurant choices. What are you in the mood for?",
    },
  ]);

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function sendMessage(text = input) {
    const content = text.trim();

    if (!content || busy) return;

    const next = [...messages, { role: "user", content }];

    setMessages(next);
    setInput("");
    setError("");
    setBusy(true);

    try {
      const response = await fetch("http://localhost:3002/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't generate a reply.",
        },
      ]);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the AI server. Please check that the backend is running."
      );
    } finally {
      setBusy(false);
    }
  }

  function resetChat() {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! What would you like help with today?",
      },
    ]);
    setError("");
    setInput("");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="TableTalk AI home">
          <span className="brand-mark">
            <UtensilsCrossed size={22} />
          </span>
          <span>
            TableTalk <b>AI</b>
            <small>YOUR SMART DINING COMPANION</small>
          </span>
        </a>

        <div className="topbar-status">
          <span className="status-dot" /> AI ASSISTANT
        </div>
      </header>

      <main className="main-layout">
        <section className="intro-panel">
          <div className="eyebrow">
            <Sparkles size={15} /> A BETTER WAY TO DINE
          </div>

          <h1>
            Good food starts
            <br />
            with a <span>good conversation.</span>
          </h1>

          <p className="intro-copy">
            Your friendly AI companion for food inspiration, restaurant
            questions, and planning your next meal.
          </p>

          <div className="feature-list">
            <div className="feature">
              <span>
                <UtensilsCrossed size={18} />
              </span>
              <div>
                <b>Food inspiration</b>
                <small>Discover dishes for every craving.</small>
              </div>
            </div>

            <div className="feature">
              <span>
                <MapPin size={18} />
              </span>
              <div>
                <b>Dining guidance</b>
                <small>Know what to ask before you visit.</small>
              </div>
            </div>

            <div className="feature">
              <span>
                <ShieldCheck size={18} />
              </span>
              <div>
                <b>Clear and honest</b>
                <small>No made-up bookings or live availability.</small>
              </div>
            </div>
          </div>

          <div className="note-card">
            <Clock3 size={17} />
            <span>
              <b>Your next meal, made easier.</b>
              <br />
              Tell TableTalk what you're looking for.
            </span>
          </div>
        </section>

        <section className="chat-card" aria-label="TableTalk AI chat">
          <div className="chat-header">
            <div className="assistant-avatar">
              <Bot size={22} />
            </div>

            <div className="chat-heading">
              <b>TableTalk Assistant</b>
              <small>
                <span className="status-dot" /> Ready to help
              </small>
            </div>

            <button
              className="icon-button"
              onClick={resetChat}
              title="Clear chat"
              aria-label="Clear chat"
              type="button"
            >
              <RotateCcw size={17} />
            </button>
          </div>

          <div className="chat-body">
            <div className="date-label">YOUR DINING CONVERSATION</div>

            {messages.map((message, index) => (
              <div
                className={`message-row ${
                  message.role === "user" ? "user-row" : ""
                }`}
                key={`${index}-${message.role}`}
              >
                {message.role === "assistant" && (
                  <div className="mini-avatar">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`bubble ${
                    message.role === "user"
                      ? "user-bubble"
                      : "assistant-bubble"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {busy && (
              <div className="message-row">
                <div className="mini-avatar">
                  <Bot size={16} />
                </div>
                <div className="bubble assistant-bubble typing">
                  TableTalk is thinking <span>•••</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="suggestions">
              <span className="suggestion-title">TRY ASKING</span>
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                  <span>↗</span>
                </button>
              ))}
            </div>
          )}

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything about food..."
              aria-label="Your message"
              maxLength={2000}
              disabled={busy}
            />

            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>

          <div className="privacy-note">
            <ShieldCheck size={13} />
            Your API key stays on the backend, not in this chat window.
          </div>
        </section>
      </main>

      <footer>
        TABLETALK AI <span>•</span> MADE FOR BETTER DINING CONVERSATIONS
      </footer>
    </div>
  );
}