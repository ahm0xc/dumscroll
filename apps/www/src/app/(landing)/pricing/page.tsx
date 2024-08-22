import {
  Raleway as HeadingFont,
  Raleway_Dots as HeadingDotFont,
  Indie_Flower as HandWritingFont,
} from "next/font/google";

import { Footer, Header } from "../home/page";
import { cn } from "~/lib/utils";
import { CheckIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

const headingFont = HeadingFont({
  subsets: ["latin"],
  weight: ["400"],
});

const headingDotFont = HeadingDotFont({
  subsets: ["latin"],
  weight: ["400"],
});

const handWritingFont = HandWritingFont({
  subsets: ["latin"],
  weight: ["400"],
});

const FEATURES = [
  {
    content: "Access to basic features",
  },
  {
    content: "Basic reporting + analytics",
  },
  {
    content: "Chat support",
  },
  {
    content: "Advance custom felids",
  },
  {
    content: "Priority chat support",
  },
  {
    content: "200+ integration support",
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
              We<span className={headingDotFont.className}>'ve</span> got a plan{" "}
              <br /> that's{" "}
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
                <p className="text-3xl font-semibold">Basic</p>
                <p>Our most popular plan for everyone</p>
              </div>
              <div>
                <div className="flex items-end gap-2">
                  <p className="flex items-start gap-1">
                    <span className="text-2xl font-semibold text-foreground/70">
                      $
                    </span>
                    <span className="text-5xl font-bold">3</span>
                  </p>
                  <p className="font-semibold text-foreground/70"> / month</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-lg font-medium">Features</p>
              <p className="text-foreground/80">
                What you will get in this plan...
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6">
                {FEATURES.map(({ content }) => (
                  <div
                    key={`feat-${content}`}
                    className="flex items-center gap-2"
                  >
                    <span className="grid h-5 w-5 place-content-center rounded-[7px] bg-foreground/10">
                      <CheckIcon size={12} />{" "}
                    </span>
                    <p>{content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <BuyButton />{" "}
              <div className="flex items-center gap-4 ml-4">
                <svg
                  className="h-5 rotate-180"
                  viewBox="0 0 238 103"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M114.84 78.9594C101.454 90.8459 86.1233 95.5117 69.571 97.1225C62.4613 97.789 55.4071 97.1781 48.6862 95.2895C32.967 90.9571 19.6363 82.3476 8.74954 70.2944C2.25081 63.0736 -1.0263 54.6308 1.97311 44.6883C2.41747 43.2997 2.86184 41.8555 3.58392 40.6335C5.41689 37.4675 8.9717 36.6343 12.1377 38.8005C13.5819 39.8003 14.6373 41.4112 15.9703 42.7998C15.9703 46.6324 11.2491 48.5209 12.5821 52.8534C13.8041 56.9081 15.6926 60.4075 18.6365 63.2958C29.4122 73.9048 41.6875 82.181 56.8512 84.5139C72.0149 86.8467 86.2344 83.0697 99.454 75.5156C100.065 75.1824 100.454 74.4603 100.898 73.8493C101.065 73.5716 101.12 73.2383 101.343 72.5162C98.8986 70.5166 96.3436 68.4059 93.844 66.2396C87.6786 60.8518 82.2907 54.7419 78.7358 47.2434C72.0705 33.1906 75.181 20.3042 87.5119 10.7505C93.1775 6.36244 99.454 3.30753 106.397 1.64119C115.618 -0.636139 124.171 1.36346 131.614 6.97347C139.668 13.0278 143.001 21.304 141.113 31.4131C139.446 40.2447 136.002 48.4098 131.392 56.075C129.282 59.5743 127.226 63.018 124.727 67.1283C134.836 72.3495 145.667 72.183 156.054 73.2939C168.607 74.6825 187.215 70.5166 199.49 64.4067C197.102 61.3517 193.213 60.7963 190.603 58.63C188.103 56.5193 185.604 54.2975 183.604 51.7425C182.104 49.7984 182.938 47.4655 184.66 45.7436C186.326 44.0217 188.381 43.2442 190.658 44.4661C193.269 45.8548 195.657 47.6322 198.379 48.8542C208.155 53.3533 218.042 57.4636 228.929 58.5189C230.04 58.63 231.15 58.7411 232.206 59.0188C234.928 59.7409 236.872 61.4073 237.427 64.1845C237.983 67.0173 236.538 69.239 234.15 70.7387C229.484 73.7382 224.596 76.4043 220.042 79.5704C213.043 84.4583 206.433 89.8461 201.878 97.2891C201.323 98.2334 200.601 99.1221 199.823 99.8997C197.268 102.677 194.435 103.399 191.992 101.899C189.492 100.4 188.27 97.4558 189.27 94.1231C189.992 91.6791 191.325 89.4018 192.547 87.1244C193.491 85.2915 194.602 83.5141 196.491 80.2925C181.827 83.6807 168.663 87.5132 154.888 86.2913C141.39 85.1248 128.282 82.9031 114.84 78.9594ZM111.952 63.2958C118.673 54.9641 123.949 47.0212 127.115 37.8008C128.171 34.6903 129.115 31.4131 129.448 28.136C130.226 20.7485 127.338 16.3605 120.506 13.25C115.895 11.1393 111.063 10.8616 106.508 12.6945C102.453 14.3609 98.3431 16.3605 94.8993 18.9711C86.401 25.4143 84.7902 33.0794 89.8448 42.3554C94.6772 51.3537 101.842 58.1301 111.952 63.2958Z"
                    fill="currentColor"
                  />
                </svg>
                <p className={cn("text-lg", handWritingFont.className)}>
                  Make it yours now
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;

function BuyButton() {
  return (
    <button
      type="button"
      className="group relative flex h-14 w-full items-center justify-center rounded-2xl border border-none border-gray-950 bg-gray-600 px-3 text-xl text-white duration-200 *:select-none before:absolute before:inset-0 before:rounded-[calc(var(--btn-border-radius)-1px)] before:border before:border-gray-600 before:bg-gradient-to-b before:from-gray-800 hover:bg-gray-900 active:bg-gray-950 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-950/40 disabled:*:text-gray-300 *:disabled:opacity-20 disabled:before:border-transparent disabled:before:bg-gray-100 disabled:before:from-transparent dark:border-0 dark:bg-white dark:text-gray-950 dark:before:border-0 dark:before:border-t dark:before:border-gray-200 dark:before:from-gray-200 dark:before:shadow-inner dark:before:shadow-white/10 dark:hover:bg-gray-100 dark:active:bg-gray-300 dark:active:before:from-gray-200 dark:disabled:border dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white disabled:dark:*:text-gray-700 dark:disabled:before:bg-gray-900 dark:disabled:before:from-gray-900 dark:disabled:before:shadow-none lg:w-fit lg:px-10 [&>*:not(.sr-only)]:relative"
    >
      <span>Get started</span>
    </button>
  );
}
