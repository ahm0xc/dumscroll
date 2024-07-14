import React from "react";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ArrowRight } from "lucide-react";

import { Section, Container } from "~/components/base";
import { Button } from "~/components/ui/button";

// Asset imports
import Placeholder from "~/../public/hero.jpg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Hero() {
  return (
    <Section>
      <Container>
        <div>
          <Button asChild className="mb-6 w-fit" size={"sm"} variant={"outline"}>
            <a
              className="not-prose"
              href="https://github.com/ahm0xc/dumscroll"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubLogoIcon className="w-4 mr-2" /> Open source on github{" "}
              <ArrowRight className="w-4 ml-2" />
            </a>
          </Button>
          <h1>
            <Balancer>Reclaim Your Time: Block Reels, Analyze Usage, Boost Productivity</Balancer>
          </h1>
          <h4 className="text-muted-foreground ">
            <Balancer>
              Tired of endless scrolling through Reels and Shorts, wasting precious time? Our Chrome
              extension is the solution you've been searching for. Not only does it block these
              distracting features, but it also provides you with detailed analytics on your daily
              social media usage, empowering you to take control of your time and boost your
              productivity.
            </Balancer>
          </h4>
          <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1280}
              height={720}
              alt="hero image"
              placeholder="blur"
              title="Image from  unsplash"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
