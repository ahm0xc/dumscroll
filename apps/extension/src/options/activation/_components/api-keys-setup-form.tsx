import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { APP_URL, settings } from "~/config";
import { validateLicenseKey } from "~/helpers/validate-license";
import useGlobalStorage from "~/hooks/use-globalstorage";

export default function ApiKeysSetupForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValidating, setIsValidating] = useState(false);

  const { value: licenseKey, set: setLicenseKey } = useGlobalStorage<string>("", {
    key: settings.activation.license.key,
  });

  async function handleActivate() {
    const key = inputRef.current?.value.trim();

    if (!key) return;

    setIsValidating(true);
    const isKeyValid = await validateLicenseKey(key);
    setIsValidating(false);

    if (isKeyValid) {
      setLicenseKey(key);
      window.location.reload();
    } else {
      toast.error("Invalid license key", {
        action: (
          <Button size="sm" className="text-[11px] h-8" variant="secondary" asChild>
            <a href={`${APP_URL}/dashboard/get-started`}>Get key</a>
          </Button>
        ),
      });
    }
  }

  function handleRemove() {
    setLicenseKey("");
    window.location.reload();
  }

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
            <Input
              ref={inputRef}
              defaultValue={licenseKey}
              readOnly={Boolean(licenseKey)}
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
          </div>
          <div>
            {licenseKey ? (
              <Button className="w-full" variant="destructive" onClick={handleRemove}>
                Remove
              </Button>
            ) : (
              <Button className="w-full items-center gap-1.5" onClick={handleActivate}>
                {isValidating && <Loader2Icon size={15} className="animate-spin" />} Activate
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
