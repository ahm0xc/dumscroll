import { CloudIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { APP_URL, settings } from "~/config";
import useGlobalStorage from "~/hooks/use-globalstorage";
import { useAppearanceStore } from "./app";

export default function ActivationBanner() {
  const [setUi] = useAppearanceStore((state) => [state.setUI]);
  const { value: licenseKey } = useGlobalStorage("", {
    key: settings.activation.license.key,
  });

  if (licenseKey) return null;

  return (
    <div className="bg-[#FDF6EF] px-5 py-3 rounded-2xl border border-[#e4ddd7] my-4 mx-6">
      <div className="flex items-center justify-between gap-8">
        <div className="flex gap-2">
          <div>
            <CloudIcon size={16} color="#C85428" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-[#651D0B]">Activation alert</p>
            <p className="text-sm text-[#5E1202]">
              Seems like you haven't activated your extension yet. Don't know how to activate the
              extension?{" "}
              <a
                href={`${APP_URL}/guide`}
                className="text-[#651D0B] underline"
                target="_blank"
                rel="noreferrer"
              >
                Follow guide
              </a>
            </p>
          </div>
        </div>
        <div>
          <Button variant="link" onClick={() => setUi("activation")}>
            Activation page
          </Button>
        </div>
      </div>
    </div>
  );
}
