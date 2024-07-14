import { Main } from "~/components/base";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Feature from "./_components/features";
import FAQ from "./_components/faq";
import Footer from "./_components/footer";
import CTA from "./_components/cta";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Main>
        <Hero />
        <Feature />
        <CTA />
        <FAQ />
        <Footer />
      </Main>
    </div>
  );
};

export default HomePage;
