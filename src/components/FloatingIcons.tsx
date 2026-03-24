import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  FaReact, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaJs,
} from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';

const ICONS = [
  { Icon: FaReact, color: '#61dafb', size: 22 },
  { Icon: FaPython, color: '#3776ab', size: 20 },
  { Icon: FaHtml5, color: '#e34f26', size: 20 },
  { Icon: FaCss3Alt, color: '#1572b6', size: 20 },
  { Icon: FaNodeJs, color: '#339933', size: 22 },
  { Icon: FaJs, color: '#f7df1e', size: 18 },
  { Icon: SiCplusplus, color: '#00599c', size: 18 },
  { Icon: FaReact, color: '#a78bfa', size: 16 },
  { Icon: FaPython, color: '#6366f1', size: 16 },
  { Icon: FaHtml5, color: '#f472b6', size: 16 },
];

interface IconDef {
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
  color: string;
  size: number;
}

function createIconElement(def: IconDef, index: number) {
  return { ...def, id: index };
}

const floaters = ICONS.map((ic, idx) => createIconElement(ic, idx));

export default function FloatingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll('.float-icon');

    items.forEach((el, _i) => {
      const x = 5 + Math.random() * 85;
      const y = 5 + Math.random() * 85;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 4;

      gsap.set(el, { x: `${x}vw`, y: `${y}vh`, opacity: 0 });

      gsap.to(el, {
        opacity: 0.08 + Math.random() * 0.1,
        duration: 0.8,
        delay,
      });

      gsap.to(el, {
        y: `+=${20 + Math.random() * 60}`,
        x: `+=${-30 + Math.random() * 60}`,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });

      gsap.to(el, {
        rotation: 360 * (Math.random() > 0.5 ? 1 : -1),
        duration: duration * 1.5,
        repeat: -1,
        ease: 'none',
        delay,
      });
    });
  }, []);

  return (
    <div className="floating-icons" ref={containerRef}>
      {floaters.map(({ Icon, color, size, id }) => (
        <div className="float-icon" key={id}>
          <Icon style={{ color, fontSize: size }} />
        </div>
      ))}
    </div>
  );
}
