import Header from "@/components/Nav/Header";
import Hero from "@/components/Home/Hero";
import SkillsMarque from "@/components/Home/SkillsMarquee";
import About from "@/components/Home/About";
import Projects from "@/components/Home/Projects";
import ExperienceSection from "@/components/Home/Experience";
// Fix: Import both components correctly
import { TestimonialsMarquee, SplitTextCTA } from "@/components/GlobalComponent/Extras";
import ContactSection from "@/components/Home/Contact";
import Footer from "@/components/Nav/Footer";
import PageTransition from "@/components/GlobalComponent/PageTransition";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-500">
      <PageTransition>
        <Header />

        <main>
          <Hero />
          <SkillsMarque />
          <About />
          <Projects />
          <ExperienceSection />
          <TestimonialsMarquee />
          <SplitTextCTA />
          <ContactSection />
        </main>

        <Footer />
      </PageTransition>
    </div>
  );
}
