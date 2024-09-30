import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Footer, Header } from "../home/page";
import WaitListForm from "./_components/waitlist-form";

const WaitListPage: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="flex h-[95vh] flex-col items-center justify-center space-y-5">
          <Link
            href="https://www.twitter.com"
            target="_blank"
            className="w-fit rounded-full border bg-secondary/80 px-2.5 py-0.5 text-sm"
          >
            Introducing Dumscroll as you daily foe{" "}
            <ArrowRight className="ml-1 inline-block h-4 w-4" />
          </Link>
          <section>
            <h1 className="text-center text-6xl font-semibold">
              Use your time wisely
              <br />
              <span className="bg-gradient-to-br from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Remove online distractions
              </span>
            </h1>
            <p className="mt-5 text-balance text-center text-lg text-foreground/80">
              Levelup your productivity, Eliminate all distractions with <br /> just one click and
              stay focused on what matters
            </p>
          </section>
          <section className="w-full max-w-xl">
            <WaitListForm />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaitListPage;
