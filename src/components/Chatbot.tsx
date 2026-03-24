import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import { MdSmartToy } from 'react-icons/md';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are KD Assistant, a helpful AI chatbot on Kunal Dushing's portfolio website. 
Kunal is a 2nd year student pursuing Artificial Intelligence, based in Nashik, Maharashtra, India.
His skills include HTML (95%), CSS (90%), JavaScript (45%), Python (38%), React (45%), Node.js, and C++.
Contact: kunaldushing7011@gmail.com | +91 96578 90370
Instagram: https://www.instagram.com/kunal_dushing_07/
LinkedIn: https://www.linkedin.com/in/kunal-dushing-8b7549375/
Be friendly, helpful, and concise. Answer questions about Kunal and general tech topics.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! I am KD Assistant. Ask me anything about Kunal or tech in general.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content,
      }));

      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
            { role: 'user', content: trimmed },
          ],
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.href,
            'X-Title': 'KD Portfolio Chatbot',
          },
        }
      );

      const botReply = response.data.choices[0]?.message?.content || 'Sorry, I could not get a response. Try again!';
      setMessages((prev) => [...prev, { role: 'bot', content: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Sorry, something went wrong. Please try again later.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Open chatbot"
      >
        {isOpen ? <FaTimes /> : <MdSmartToy />}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <FaRobot />
            </div>
            <div>
              <div className="chatbot-name">KD Assistant</div>
              <div className="chatbot-status">Online</div>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div className={`chat-msg ${msg.role === 'user' ? 'user' : 'bot'}`} key={i}>
              <div className={`chat-msg-avatar ${msg.role === 'user' ? 'user-av' : ''}`}>
                {msg.role === 'user' ? <FaUser /> : <FaRobot />}
              </div>
              <div className="chat-bubble">{msg.content}</div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg bot">
              <div className="chat-msg-avatar">
                <FaRobot />
              </div>
              <div className="chat-bubble">
                <div className="chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            className="chatbot-input"
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="chatbot-send" onClick={sendMessage} disabled={isTyping || !input.trim()}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
}
