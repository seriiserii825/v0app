import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { CollectionSlider } from "@/components/collection-slider"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CollectionSlider />
        <GallerySection />
        <TestimonialsSection />
      </main>
      <FooterSection />
    </>
  )
}
