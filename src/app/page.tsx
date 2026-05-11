import Preloader from "@/components/preloader/Preloader";
import HeroSection from "@/components/hero/HeroSection";
import RoleSection from "@/components/role/RoleSection";
import ManifestoSection from "@/components/manifesto/ManifestoSection";
import EducationSection from "@/components/education/EducationSection";
import JourneySection from "@/components/journey/JourneySection";
import ProjectSection from "@/components/projects/ProjectSection";
import AchievementSection from "@/components/achievements/AchievementSection";
import ConnectSection from "@/components/connect/ConnectSection";
import Footer from "@/components/footer/Footer";
import { workExperience, internships } from "@/data/resume";

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* Starting with an animated girl dancing (Preloader) */}
      <Preloader />

      {/* Hero Section: Followed by Name (Akshaya) appearing */}
      <HeroSection />
      
      {/* Manifesto (Huge color-reveal text) */}
      <ManifestoSection />

      {/* Role one-liner */}
      <RoleSection />

      <div className="space-y-40 mb-24">
        {/* Education (Including 10th marks) */}
        <EducationSection />

        {/* My Journey (Same format as example, continuous to internship) */}
        <div className="space-y-0 relative">
          <JourneySection title="Work Experience" label="01 / CAREER" data={workExperience} id="experience" isFirst={true} />
          <JourneySection title="Internships" label="02 / STAGES" data={internships} id="internships" isFirst={false} />
        </div>
        
        {/* Projects (Stacking cards with images) */}
        <ProjectSection />

        {/* Achievements (Stacking cards with images) */}
        <AchievementSection />

        {/* Let's Connect (Same as example style) */}
        <ConnectSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
