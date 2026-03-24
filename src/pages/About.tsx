import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaMapMarkerAlt, FaEnvelope, FaPhone, FaGraduationCap, FaCode, FaLaptopCode, FaBrain,
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const infoItems = [
  { icon: <FaGraduationCap />, label: 'Status', value: '2nd Year Student' },
  { icon: <FaBrain />, label: 'Field', value: 'Artificial Intelligence' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Nashik, Maharashtra' },
  { icon: <FaEnvelope />, label: 'Email', value: 'kunaldushing7011@gmail.com' },
  { icon: <FaPhone />, label: 'Phone', value: '+91 96578 90370' },
  { icon: <FaLaptopCode />, label: 'Focus', value: 'AI & Web Development' },
];

const stats = [
  { num: '2+', label: 'Years of Coding' },
  { num: '6+', label: 'Technologies' },
  { num: '10+', label: 'Projects Built' },
  { num: '100%', label: 'Dedication' },
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.section-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: '.section-header', scroller: pageRef.current, start: 'top 85%' },
        }
      );

      // Info cards
      gsap.fromTo(
        '.info-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1,
          scrollTrigger: { trigger: '.info-cards', scroller: pageRef.current, start: 'top 85%' },
        }
      );

      // Stat cards
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1,
          scrollTrigger: { trigger: '.about-stats', scroller: pageRef.current, start: 'top 85%' },
        }
      );

      // Text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: textRef.current, scroller: pageRef.current, start: 'top 85%' },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="section-page" ref={pageRef}>
      <div className="section-header">
        <div className="section-tag">About Me</div>
        <h2 className="section-title">Who I Am</h2>
        <div className="section-line" />
      </div>

      <div className="about-grid">
        <div ref={textRef}>
          <div className="about-text">
            <h3>Kunal Dushing</h3>
            <p>
              I am a passionate 2nd-year student currently pursuing Artificial Intelligence. I am deeply
              fascinated by how AI can transform the world, and I spend my time building projects, learning
              new technologies, and exploring creative solutions to complex problems.
            </p>
            <p>
              Based in Nashik, Maharashtra, I am continuously growing my skill set in web development,
              machine learning, and software engineering. I believe in the power of technology to make
              meaningful impact.
            </p>
            <p>
              My journey is driven by curiosity and a desire to create things that matter. Whether it is
              a sleek web application or an AI-powered tool, I bring dedication and creativity to every
              project I undertake.
            </p>
          </div>

          <div className="info-cards">
            {infoItems.map((item, i) => (
              <div className="info-card" key={i}>
                <div className="info-icon">{item.icon}</div>
                <div>
                  <div className="info-label">{item.label}</div>
                  <div className="info-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
