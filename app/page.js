import ChatPreview from "@/components/ChatPreview";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import UseCases from "@/components/UseCases";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ChatPreview />
        <Features />
        <UseCases />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}