import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import Calculator from '@/components/Calculator';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AnimationsProvider from '@/components/AnimationsProvider';

export default function Home() {
  return (
    <>
      <AnimationsProvider />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Features />
        <Projects />
        <Calculator />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}