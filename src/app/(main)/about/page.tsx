import AboutHeroSection from "@/components/about-hero";
import BeautifulMoments from "@/components/beautiful-moments";
import PreFooter from "@/components/pre-footer";
import WhyYouWillLoveUs from "@/components/why-you-will-love-us";
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col">
      <AboutHeroSection />
      <WhyYouWillLoveUs />
      <BeautifulMoments />
      <PreFooter />
    </div>
  );
};

export default About;
