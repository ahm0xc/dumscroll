import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type React from "react";

import WaitListForm from "./_components/waitlist-form";

const WaitListPage: React.FC = () => {
  return (
    <div className="px-4">
      {/* <Header /> */}
      <div className="absolute inset-0 -z-10 h-full w-full opacity-80 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#06b6d4_100%)]" />
      <main>
        <div className="flex h-screen flex-col items-center justify-center space-y-5">
          <Link
            href="https://www.twitter.com"
            target="_blank"
            className="w-fit rounded-full border bg-secondary/80 px-2.5 py-0.5 text-sm"
          >
            Introducing Dumscroll as you daily foe{" "}
            <ArrowRight className="ml-1 inline-block h-4 w-4" />
          </Link>
          <section>
            <h1 className="text-center text-balance text-4xl md:text-6xl font-semibold bg-gradient-to-b from-[#000000] to-[#12AEF1] bg-clip-text text-transparent">
              {/* <span className="bg-gradient-to-br from-[#000000] to-[#12AEF1] bg-clip-text text-transparent"> */}
              Use your time wisely {/* </span> */}
              <br className="hidden md:block" />
              {/* <span className="bg-gradient-to-br from-blue-700 to-blue-500 bg-clip-text text-transparent"> */}
              Remove online distractions
              {/* </span> */}
            </h1>
            <p className="mt-5 text-balance text-center text-sm md:text-lg text-foreground/80">
              Levelup your productivity, Eliminate all distractions with <br /> just one click and
              stay focused on what matters
            </p>
          </section>
          <section className="w-full max-w-lg">
            <WaitListForm />
          </section>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default WaitListPage;
