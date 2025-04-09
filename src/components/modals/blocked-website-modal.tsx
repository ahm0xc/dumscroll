import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

import { useBlockedWebsiteModalStore } from "./blocked-website-modal.store";

export default function BlockedWebsiteModal() {
  const { data, isOpen, close } = useBlockedWebsiteModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Website Blocked</DialogTitle>
          <DialogDescription>
            This website is blocked because it is not allowed to be accessed.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>
            {data?.url}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
