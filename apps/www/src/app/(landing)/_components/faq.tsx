"use client";

// Third-party library imports
import { ArrowUpRight } from "lucide-react";

// UI component imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

// Custom components
import { Section, Container } from "~/components/base";

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
  {
    question: "How does the extension block Reels and Shorts?",
    answer:
      "The extension uses advanced algorithms to detect and automatically block the scrolling functionality within Reels and Shorts on Instagram and YouTube, effectively removing these distractions from your browsing experience.",
  },
  {
    question: "Can I customize the extension's settings?",
    answer:
      "Absolutely! The extension offers a range of customization options, allowing you to tailor the blocklist to your specific needs, and adjust other preferences to optimize your productivity.",
  },
  {
    question: "Does the extension work on all devices and browsers?",
    answer:
      "The extension is currently available for Google Chrome and is compatible with a wide range of devices, including desktops, and laptops. We are continuously working to expand its availability to other popular browsers.",
  },
  {
    question: "How to use the extension in incognito?",
    answer:
      "Click on browser menu and goto Extension > Manage extensions. Find `Dumscroll` extension and go to details. From the options you see turn on the 'Allow in Incognito' option.",
  },
];

const FAQ = () => {
  return (
    <Section>
      <Container>
        <h3 className="!mt-0">Frequently Asked Questions</h3>
        <h4 className="text-muted-foreground">
          Can&apos;t find the answer you&apos;re looking for? Reach out to our customer support
          team.
        </h4>
        <div className="not-prose mt-4 flex flex-col gap-4 md:mt-8">
          {content.map((item) => (
            <Accordion key={`faq-${item.question}`} type="single" collapsible>
              <AccordionItem
                value={item.question}
                className="rounded-md border bg-muted/20 px-4 transition-all hover:bg-muted/50"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:w-3/4">
                  {item.answer}
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-2 flex w-full items-center opacity-60 transition-all hover:opacity-100"
                    >
                      Learn more <ArrowUpRight className="ml-1" size="16" />
                    </a>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
