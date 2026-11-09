import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SpotlightMatrix from "./components/SpotlightMatrix";
import About from "./components/About";
import Skills from "./components/Skills";
import Research from "./components/Research";
import ContactTerminal from "./components/ContactTerminal";
import AppleBackground from "./components/AppleBackground";

export default function App() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen text-white">
      <AppleBackground />
      <div className="relative z-10">
        <Nav />
        <main className="space-y-0">
          <Hero />
          <SpotlightMatrix />
          <About />
          <Skills />
          <Research />
          <ContactTerminal />
        </main>
      </div>
    </div>
  );
}
