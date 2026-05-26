import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import ServicesPreview from "@/components/ServicesPreview";
import RecruitmentSection from "@/components/RecruitmentSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhoWeHelp />
      <ServicesPreview />
      <RecruitmentSection />
      <WhyChooseUs />
    </main>
  );
}