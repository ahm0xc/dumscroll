"use client";

import { Loader2Icon } from "lucide-react";
import { type FC, type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { api } from "~/trpc/react";

const WaitListForm: FC = () => {
  const [email, setEmail] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const waitlistMutation = api.waitlist.create.useMutation({
    onSuccess() {
      toast.success("You joined the waitlist");

      setEmail("");
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    waitlistMutation.mutate({
      email: email.trim(),
    });
  }

  return (
    <div>
      <form
        className="relative flex w-full rounded-full border bg-secondary dark:bg-secondary/70 p-1"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="mr-[140px] h-12 w-full rounded-l-full bg-transparent pl-5 text-[15px] outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="absolute right-2 flex h-11 max-h-11 items-center justify-center rounded-full border bg-gradient-to-br from-blue-600 to-blue-500 px-4 font-semibold text-white disabled:opacity-80"
          type="submit"
          disabled={waitlistMutation.isPending}
        >
          {waitlistMutation.isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Join Waitlist
        </button>
      </form>
      <p className="text-xs text-foreground/60 mt-2 text-center">
        Instant access, no credit card required.
      </p>
    </div>
  );
};

export default WaitListForm;
