import { Main } from "~/components/base";
import CTA from "./_components/cta";
import FAQ from "./_components/faq";
import Feature from "./_components/features";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";

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
