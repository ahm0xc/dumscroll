import Balancer from "react-wrap-balancer";
import { LineChartIcon, PencilRulerIcon, ShieldIcon, VenetianMaskIcon } from "lucide-react";

import { Section, Container } from "~/components/base";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const featureText: FeatureText[] = [
  {
    icon: <ShieldIcon className="h-6 w-6" />,
    title: "Block Reels and Shorts",
    description:
      "Automatically block scrolling through Reels and Shorts on Instagram and YouTube, eliminating distractions and helping you stay focused",
  },
  {
    icon: <LineChartIcon className="h-6 w-6" />,
    title: "Daily Social Media Usage Analytics",
    description:
      "Gain valuable insights into your daily social media usage patterns, empowering you to make informed decisions about how you spend your time online",
  },
  {
    icon: <PencilRulerIcon className="h-6 w-6" />,
    title: "Customizable Blocking",
    description:
      "Tailor the extension to your specific needs by creating a personalized list of blocks or limit access to, based on your productivity goals",
  },
  {
    icon: <VenetianMaskIcon className="h-6 w-6" />,
    title: "Incognito Mode Support",
    description:
      "The extension's functionality extends to incognito mode, ensuring your productivity remains on track even when browsing privately",
  },
];

const Feature = () => {
  return (
    <Section>
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>Transformative Features for Focused Productivity</Balancer>
          </h3>
          <h4 className="font-light opacity-70">
            <Balancer>Unlock a Distraction-Free Experience and Gain Valuable Insights </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-2">
            {featureText.map(({ icon, title, description }) => (
              <div
                className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                key={`feature-${title}`}
              >
                <div className="grid gap-4">
                  {icon}
                  <h4 className="text-xl text-foreground">{title}</h4>
                  <p className="text-base opacity-75">{description}</p>
                </div>
                {/* {cta && (
                  <div className="flex h-fit items-center text-sm font-semibold">
                    <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
