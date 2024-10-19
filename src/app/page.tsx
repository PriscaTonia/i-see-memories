import BeautifulMoments from "@/components/beautiful-moments";
import CreatePhotoBookSteps from "@/components/create-photobook-steps";
import Hero from "@/components/hero-section";
import PreserveSection from "@/components/preserve-section";
import RatedText from "@/components/rated-txt";
import Reviews from "@/components/reviews";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <RatedText />
      <PreserveSection />
      <CreatePhotoBookSteps />
      <BeautifulMoments />
      <Reviews />
    </div>
  );
}
