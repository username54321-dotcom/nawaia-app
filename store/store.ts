import type { StateCreator } from "zustand";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { create } = require("zustand");

export interface useIsAuthType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  isApproved: boolean;
  setIsApproved: (value: boolean) => void;
}

const authStoreCreator: StateCreator<useIsAuthType> = (set) => ({
  isAuth: false,
  setIsAuth: (value) => {
    set({ isAuth: value });
  },
  isAdmin: false,
  setIsAdmin: (value: boolean) => {
    set({ isAdmin: value });
  },
  isApproved: false,
  setIsApproved: (value) => set({ isApproved: value }),
});

export const useIsAuth = create(authStoreCreator);

export interface useModalVisibleType {
  ModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  approvedModal: boolean;
  setApprovedModal: (v: boolean) => void;
}

const modalStoreCreator: StateCreator<useModalVisibleType> = (set) => ({
  ModalVisible: false,
  setModalVisible: (value) => set({ ModalVisible: value }),
  approvedModal: false,
  setApprovedModal: (value: boolean) => set({ approvedModal: value }),
});

export const useModalVisible = create(modalStoreCreator);
