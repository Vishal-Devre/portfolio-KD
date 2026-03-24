import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaHtml5, FaCss3Alt, FaJs, FaPython, FaReact, FaNodeJs,
} from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  pct: number;
  icon: React.ReactNode;
  iconColor: string;
  category: string;
}

const skills: Skill[] = [
  { name: 'HTML', pct: 95, icon: <FaHtml5 />, iconColor: '#e34f26', category: 'Markup' },
  { name: 'CSS', pct: 90, icon: <FaCss3Alt />, iconColor: '#1572b6', category: 'Styling' },
  { name: 'JavaScript', pct: 45, icon: <FaJs />, iconColor: '#f7df1e', category: 'Language' },
  { name: 'Python', pct: 38, icon: <FaPython />, iconColor: '#3776ab', category: 'Language' },
  { name: 'React', pct: 45, icon: <FaReact />, iconColor: '#61dafb', category: 'Framework' },
  { name: 'Node.js', pct: 35, icon: <FaNodeJs />, iconColor: '#339933', category: 'Runtime' },
  { name: 'C++', pct: 30, icon: <SiCplusplus />, iconColor: '#00599c', category: 'Language' },
];

export default function Skills() {
  const pageRef = useRef<HTMLDivElement>(null);

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
        '.skill-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', scroller: pageRef.current, start: 'top 85%' },
          onComplete: animateBars,
        }
      );
    }, pageRef);

    function animateBars() {
      document.querySelectorAll('.skill-bar-fill').forEach((el) => {
        const pct = (el as HTMLElement).dataset.pct;
        gsap.to(el, { width: `${pct}%`, duration: 1.2, ease: 'power2.out' });
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <div className="section-page" ref={pageRef}>
      <div className="section-header">
        <div className="section-tag">My Skills</div>
        <h2 className="section-title">Technical Expertise</h2>
        <div className="section-line" />
      </div>

      <div className="skills-grid">
        {skills.map((skill, i) => (
          <div className="skill-card" key={i}>
            <div className="skill-header">
              <div className="skill-info">
                <div className="skill-icon" style={{ background: `${skill.iconColor}18` }}>
                  <span style={{ color: skill.iconColor, fontSize: '1.2rem' }}>{skill.icon}</span>
                </div>
                <div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-category">{skill.category}</div>
                </div>
              </div>
              <div className="skill-pct">{skill.pct}%</div>
            </div>

            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                data-pct={skill.pct}
                style={{ width: 0 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Extra tech tags */}
      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <div className="section-tag" style={{ marginBottom: 16 }}>Also Familiar With</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Git', 'VS Code', 'Linux', 'REST APIs', 'Machine Learning', 'Data Analysis', 'Problem Solving'].map((tech) => (
            <span
              key={tech}
              style={{
                padding: '8px 18px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 99,
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
