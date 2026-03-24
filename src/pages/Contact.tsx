import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaLinkedinIn, FaPaperPlane, FaUser, FaCommentAlt,
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.section-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: '.section-header', scroller: pageRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.contact-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.12,
          scrollTrigger: { trigger: '.contact-items', scroller: pageRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.contact-form',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.7,
          scrollTrigger: { trigger: '.contact-form', scroller: pageRef.current, start: 'top 85%' },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="section-page" ref={pageRef}>
      <div className="section-header">
        <div className="section-tag">Contact</div>
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-line" />
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Let's Connect</h3>
          <p>
            Have a project in mind, want to collaborate, or just say hello? Feel free to reach out.
            I am always open to new opportunities and conversations.
          </p>

          <div className="contact-items">
            <a href="mailto:kunaldushing7011@gmail.com" className="contact-item">
              <div className="contact-item-icon"><FaEnvelope /></div>
              <div>
                <div className="contact-item-label">Email Address</div>
                <div className="contact-item-value">kunaldushing7011@gmail.com</div>
              </div>
            </a>

            <a href="tel:+919657890370" className="contact-item">
              <div className="contact-item-icon"><FaPhone /></div>
              <div>
                <div className="contact-item-label">Phone Number</div>
                <div className="contact-item-value">+91 96578 90370</div>
              </div>
            </a>

            <div className="contact-item" style={{ cursor: 'default' }}>
              <div className="contact-item-icon"><FaMapMarkerAlt /></div>
              <div>
                <div className="contact-item-label">Location</div>
                <div className="contact-item-value">Nashik, Maharashtra, India</div>
              </div>
            </div>
          </div>

          <div className="social-links-grid" style={{ marginTop: 24 }}>
            <a
              href="https://www.instagram.com/kunal_dushing_07/"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
            >
              <FaInstagram />
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/kunal-dushing-8b7549375/"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
            >
              <FaLinkedinIn />
              LinkedIn
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <FaUser style={{ marginRight: 6 }} />
                Your Name
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="John Doe"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope style={{ marginRight: 6 }} />
                Email
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="john@example.com"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              className="form-input"
              type="text"
              placeholder="Project collaboration, etc."
              required
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FaCommentAlt style={{ marginRight: 6 }} />
              Message
            </label>
            <textarea
              className="form-textarea"
              placeholder="Tell me about your project or just say hello..."
              required
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            />
          </div>

          <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>
            {sending ? 'Sending...' : sent ? 'Message Sent!' : (
              <>
                <FaPaperPlane />
                Send Message
              </>
            )}
          </button>

          {sent && (
            <div style={{
              marginTop: 12, padding: '12px 16px', borderRadius: 10,
              background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
              color: '#4ade80', fontSize: '0.88rem', textAlign: 'center',
            }}>
              Message sent successfully! I will get back to you soon.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
