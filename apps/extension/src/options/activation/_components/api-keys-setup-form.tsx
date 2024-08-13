import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function ApiKeysSetupForm() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      className="p-5 rounded-2xl border bg-neutral-100"
    >
      <div>
        <h3 className="text-lg font-medium">Setup Api Keys</h3>
        <p className="text-[15px] text-neutral-800">
          Input your activation key to activate the extension. Don't have any? check{" "}
          <a
            href="https://dumscroll.com/dashboard/keys"
            className="underline underline-offset-2 cursor-alias"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard
          </a>
          .
        </p>
      </div>
      <div className="mt-5">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="text-xs">Api keys</p>
            <Input placeholder="XXXX-XXXX-XXXX-XXXX" />
          </div>
          <div>
            <Button className="w-full">Validate</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
