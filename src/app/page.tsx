import HeroSection from "@/components/pages/home/HeroSection";
import { ServiceSection } from "@/components/pages/home/ServiceSection";
import { CategoriesSection } from "@/components/pages/home/CategoriesSection";
import { FeaturedProductsSection } from "@/components/pages/home/ProductsSection";
import { LatestArrivalsSection } from "@/components/pages/home/LatestArrivalsSection";
import { StatisticsSection } from "@/components/pages/home/StatisticsSection";
import { TestimonialSection } from "@/components/pages/home/TestimonialSection";
import { FAQSection } from "@/components/pages/home/FAQSection";
import { SubscribeSection } from "@/components/pages/home/SubscribeSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProductsSection />
      <ServiceSection />
      <CategoriesSection />
      <LatestArrivalsSection />
      <StatisticsSection />
      <TestimonialSection />
      <FAQSection />
      <SubscribeSection />
    </div>
  );
}
