import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Button } from "~/components/ui/button";

// Local component imports
import { Container, Section } from "~/components/base";
import Logo from "~/components/logo";

export default function Footer() {
  return (
    <footer>
      <Section>
        <Container className="grid gap-6">
          <div className="not-prose flex flex-col gap-6">
            <Link href="/" className="w-fit flex gap-2 items-center">
              <Logo />
              <p className="text-lg font-semibold">Dumscroll</p>
            </Link>
            <p>
              <Balancer>
                Liberate yourself from the endless scrolling of Reels and Shorts. Our Chrome
                extension blocks these distractions, analyzes your daily social media usage, and
                empowers you with customizable blocklists to optimize your time and elevate your
                productivity.
              </Balancer>
            </p>
          </div>
        </Container>
        <Container className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" asChild>
              <a href="https://github.com/ahm0xc/dumscroll" target="_blank" rel="noreferrer">
                <GithubIcon size={16} />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" asChild>
              <a href="https://x.com/ahm0xc" target="_blank" rel="noreferrer">
                <TwitterIcon size={16} />
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            © Dumscroll. All rights reserved. {new Date().getFullYear()}-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
