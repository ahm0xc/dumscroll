import { Raleway_Dots as HeadingDotFont, Raleway as HeadingFont } from "next/font/google";

import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Footer, Header } from "../home/page";
import PricingTableFooter from "./pricing-table-footer";

const headingFont = HeadingFont({
  subsets: ["latin"],
  weight: ["400"],
});

const headingDotFont = HeadingDotFont({
  subsets: ["latin"],
  weight: ["400"],
});

const FEATURES = [
  {
    content: "Block Reels & Shorts",
  },
  {
    content: "Hide Thumbnails",
  },
  {
    content: "Daily Activity Tracking",
  },
  {
    content: "Scheduled Blocking",
  },
  {
    content: "300+ Porn Sites Blocked",
  },
  {
    content: "Bulk Site Blocking",
  },
  {
    content: "Reminders & Alerts",
  },
  {
    content: "Time Limits",
  },
  {
    content: "Privacy-Focused",
  },
  {
    content: "... And more!",
  },
];

const PricingPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="py-48">
        <section className="mx-auto max-w-5xl">
          <div>
            <h1 className={cn("text-7xl font-bold", headingFont.className)}>
              We<span className={headingDotFont.className}>'ve</span> got a plan <br /> that's{" "}
              <span className={headingDotFont.className}>perfect</span> for you
            </h1>
            <p
              className={cn(
                "mt-6 flex items-center gap-3 text-foreground/70 [&_span]:h-1 [&_span]:w-1 [&_span]:rounded-full [&_span]:bg-foreground/70",
                headingFont.className,
              )}
            >
              cheap <span /> affordable <span /> worthy
            </p>
          </div>
        </section>
        <section className="mt-20">
          <div className="mx-auto max-w-5xl rounded-2xl border bg-secondary p-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-semibold">Try our pricing</p>
                <p>Our most popular plan for everyone</p>
              </div>
              <div>
                <div className="flex items-end gap-2">
                  <p className="flex items-start gap-1">
                    <span className="text-2xl font-semibold text-foreground/70">$</span>
                    <span className="text-6xl font-bold">3</span>
                  </p>
                  <p className="font-semibold text-foreground/70"> / month</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-lg font-medium">Features</p>
              <p className="text-foreground/80">What you will get in this plan...</p>
              <div className="mt-10 grid grid-cols-2 gap-6">
                {FEATURES.map(({ content }) => (
                  <div key={`feat-${content}`} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-content-center rounded-[7px] bg-foreground/10">
                      <CheckIcon size={12} />{" "}
                    </span>
                    <p>{content}</p>
                  </div>
                ))}
              </div>
            </div>
            <PricingTableFooter />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
