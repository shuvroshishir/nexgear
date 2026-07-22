import HeroSection from "@/components/pages/home/HeroSection";
import { CategoriesSection } from "@/components/pages/home/CategoriesSection";
import { FeaturedProductsSection } from "@/components/pages/home/ProductsSection";
import { ServiceSection } from "@/components/pages/home/ServiceSection";
import { StatisticsSection } from "@/components/pages/home/StatisticsSection";
import { SubscribeSection } from "@/components/pages/home/SubscribeSection";
import { TestimonialSection } from "@/components/pages/home/TestimonialSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServiceSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <StatisticsSection />
      <TestimonialSection />
      <SubscribeSection />
    </div>
  );
}
