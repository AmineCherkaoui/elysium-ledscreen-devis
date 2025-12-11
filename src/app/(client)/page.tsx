import AboutSection from "@/components/HomePage/about-section";
import ClientsSection from "@/components/HomePage/clients-section";
import ContactUsSection from "@/components/HomePage/contact-us-section";
import HeroSection from "@/components/HomePage/hero-section";
import ProductCategorySection from "@/components/HomePage/product-catogories-section";
import ProductSection from "@/components/HomePage/products-section";
import ServiceSection from "@/components/HomePage/services-section";
import TestimonialsSection from "@/components/HomePage/testimonials-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="container mx-auto px-2">
        <ProductSection />
        <ServiceSection />
        <ProductCategorySection />
        <AboutSection />
        <TestimonialsSection />
        <ContactUsSection />
        <ClientsSection />
      </div>
    </main>
  );
}
