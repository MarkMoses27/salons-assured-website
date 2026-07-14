import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import ServicesPreview from "@/components/ServicesPreview";
import CaseStudies from "@/components/CaseStudies";
import RecruitmentSection from "@/components/RecruitmentSection";
import InsightsEvents from "@/components/InsightsEvents";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhoWeHelp />
      <ServicesPreview />
      <CaseStudies />
      <RecruitmentSection />
      <InsightsEvents />
      <WhyChooseUs />
    </main>
  );
}