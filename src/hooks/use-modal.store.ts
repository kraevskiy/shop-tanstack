import { create } from "zustand";

type ModalTypes = "login";

type ModalData = {
  type: ModalTypes | null;
  isOpen: boolean;
};

type ModalAction = {
  onOpen: (type: ModalTypes) => void;
  onClose: () => void;
};

export const useModal = create<ModalData & ModalAction>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}));
