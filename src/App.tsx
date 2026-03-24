import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./index.css";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import FloatingIcons from "./components/FloatingIcons";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

type Page = "home" | "about" | "skills" | "contact";

const PAGES: Page[] = ["home", "about", "skills", "contact"];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activePage, setActivePage] = useState<Page>("home");
  const [prevPage, setPrevPage] = useState<Page | null>(null);
  const pageRefs = useRef<Record<Page, HTMLDivElement | null>>({
    home: null,
    about: null,
    skills: null,
    contact: null,
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  // Page transition logic
  useEffect(() => {
    if (!loaded) return;

    const incoming = pageRefs.current[activePage];
    const outgoing = prevPage ? pageRefs.current[prevPage] : null;

    if (!incoming) return;

    const direction = prevPage
      ? PAGES.indexOf(activePage) > PAGES.indexOf(prevPage)
        ? 1
        : -1
      : 0;

    // Prepare incoming
    gsap.set(incoming, { x: direction * 80, opacity: 0 });

    const tl = gsap.timeline();

    // Animate out
    if (outgoing) {
      tl.to(outgoing, {
        x: -direction * 60,
        opacity: 0,
        duration: 0.32,
        ease: "power2.in",
      });
      outgoing.classList.remove("active");
    }

    // Activate & animate in
    incoming.classList.add("active");
    tl.to(
      incoming,
      { x: 0, opacity: 1, duration: 0.42, ease: "power3.out" },
      outgoing ? "-=0.1" : 0,
    );

    // Scroll to top
    incoming.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage, loaded, prevPage]);

  const handleSetPage = useCallback(
    (page: string) => {
      if (page === activePage) return;
      setPrevPage(activePage);
      setActivePage(page as Page);
    },
    [activePage],
  );

  // Initial reveal after load
  const handleLoaded = useCallback(() => {
    setLoaded(true);
    const homeEl = pageRefs.current["home"];
    if (homeEl) {
      homeEl.classList.add("active");
      gsap.fromTo(homeEl, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
  }, []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaded} />}

      <FloatingIcons />

      <div className="app-shell">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          activePage={activePage}
          setActivePage={handleSetPage}
        />

        <div className="pages-container">
          {PAGES.map((page) => (
            <div
              key={page}
              className={`page`}
              ref={(el) => {
                pageRefs.current[page] = el;
              }}
              id={`page-${page}`}
            >
              {page === "home" && <Home />}
              {page === "about" && <About />}
              {page === "skills" && <Skills />}
              {page === "contact" && <Contact />}
            </div>
          ))}
        </div>
      </div>

      <Chatbot />
    </>
  );
}
