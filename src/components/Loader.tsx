import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate logo
      tl.fromTo(logoRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        // Animate dots
        .fromTo(
          dotsRef.current!.children,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
          '-=0.2'
        )
        // Animate progress bar
        .to(fillRef.current, { width: '100%', duration: 2, ease: 'power1.inOut' }, 0.4)
        // Dot pulse
        .to(
          dotsRef.current!.children,
          { opacity: [0.3, 1], repeat: 3, yoyo: true, duration: 0.3, stagger: 0.1 },
          0.4
        )
        // Fade out overlay
        .to(overlayRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 2.6)
        .call(onComplete, [], 3.1);
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader-overlay" ref={overlayRef}>
      <div className="loader-logo" ref={logoRef}>KD</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" ref={fillRef} />
      </div>
      <div className="loader-dots" ref={dotsRef}>
        <div className="loader-dot" />
        <div className="loader-dot" />
        <div className="loader-dot" />
      </div>
    </div>
  );
}
