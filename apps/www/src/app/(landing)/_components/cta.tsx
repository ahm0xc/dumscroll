import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { ChromeIcon } from "lucide-react";
import { Container, Section } from "~/components/base";
import { Button } from "~/components/ui/button";

const CTA = () => {
  return (
    <Section className="px-4">
      <Container className="flex flex-col items-center gap-6 rounded-lg border bg-accent/50 p-6 text-center md:rounded-xl md:p-12">
        <h2 className="!my-0">Take Back Control of Your Time Today</h2>
        <h4 className="!mb-0 text-muted-foreground">
          <Balancer>
            Reclaim your focus, boost productivity, and unlock your true potential with our Chrome
            extension that blocks Reels, Shorts, and analyzes your daily social media usage.
          </Balancer>
        </h4>
        <div className="not-prose mx-auto flex items-center gap-2">
          <Button className="w-fit" asChild>
            <a href="https://chromewebstore.google.com/" target="_blank" rel="noreferrer">
              <ChromeIcon className="w-5 mr-2" /> Get chrome extension
            </a>
          </Button>
          <Button className="w-fit" variant="link" asChild>
            <Link href="/sign-up">Sign up {"->"}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
