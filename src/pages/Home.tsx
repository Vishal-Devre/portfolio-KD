import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaDownload, FaArrowRight, FaMapMarkerAlt, FaGraduationCap,
} from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        contentRef.current!.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }
      )
        .fromTo(imageRef.current, { opacity: 0, scale: 0.88, x: 60 }, { opacity: 1, scale: 1, x: 0, duration: 0.8 }, 0.2)
        .fromTo(badgeRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.8);

      // Subtle float on image
      gsap.to(imageRef.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-page">
      <div className="home-bg-orb orb1" />
      <div className="home-bg-orb orb2" />

      <div className="home-content" ref={contentRef}>
        <div className="home-greeting">Hello, World</div>

        <h1 className="home-name">Kunal Dushing</h1>

        <p className="home-title">
          <MdComputer style={{ marginRight: 6, verticalAlign: 'middle' }} />
          AI Enthusiast &amp; <span>2nd Year Student</span>
        </p>

        <p className="home-desc">
          Passionate about Artificial Intelligence, building creative solutions and exploring the intersection of
          technology and innovation. Currently pursuing my journey in tech from Nashik, Maharashtra.
        </p>

        <div className="home-btns">
          <button
            className="btn-primary"
            onClick={() => document.getElementById('contact-link')?.click()}
          >
            <FaEnvelope />
            Get in Touch
          </button>
          <button
            className="btn-outline"
            onClick={() => document.getElementById('about-link')?.click()}
          >
            Explore More
            <FaArrowRight />
          </button>
        </div>

        <div className="home-social-strip">
          <a
            href="https://www.instagram.com/kunal_dushing_07/"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/kunal-dushing-8b7549375/"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a href="mailto:kunaldushing7011@gmail.com" className="social-icon-link" aria-label="Email">
            <FaEnvelope />
          </a>
          <a href="tel:+919657890370" className="social-icon-link" aria-label="Phone">
            <FaPhone />
          </a>
          <a
            href="#"
            className="social-icon-link"
            aria-label="Download Resume"
            onClick={(e) => e.preventDefault()}
          >
            <FaDownload />
          </a>
        </div>
      </div>

      <div className="home-image-wrap">
        <div className="home-image-frame" ref={imageRef}>
          <div className="home-image-ring" />
          <div className="home-image-ring2" />
          <img src="/kunal.jpg" alt="Kunal Dushing" className="home-photo" />
          <div className="home-badge" ref={badgeRef}>
            <div className="badge-icon">
              <FaGraduationCap />
            </div>
            <div className="badge-text">
              <strong>AI Student</strong>
              2nd Year
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          paddingTop: 20,
          flexWrap: 'wrap',
        }}
      >
        {[
          { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Nashik, MH' },
          { icon: <FaGraduationCap />, label: 'Education', value: '2nd Year' },
          { icon: <MdComputer />, label: 'Field', value: 'AI & Tech' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '1rem' }}>{item.icon}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.label}</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
