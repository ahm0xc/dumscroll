import { create } from "zustand";

type BlockedWebsiteModalData = {
  url: string;
};

type BlockedWebsiteModalStore = {
  isOpen: boolean;
  data: BlockedWebsiteModalData | null;
  open: (data: BlockedWebsiteModalData) => void;
  close: () => void;
};

export const useBlockedWebsiteModalStore = create<BlockedWebsiteModalStore>(set => ({
  isOpen: false,
  data: null,
  open: (data: BlockedWebsiteModalData) => set({ isOpen: true, data }),
  close: () => set({ isOpen: false, data: null }),
}));
