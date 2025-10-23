import { supabaseClient } from '~/utils/supabase';
import type { StateCreator } from 'zustand';
const { create } = require('zustand');

interface AuthState {
  isAuth: boolean;
  startAuthTrack: () => Promise<void>;
}

const authStoreCreator: StateCreator<AuthState> = (set) => ({
  isAuth: false,
  startAuthTrack: async () => {
    const session = !!(await supabaseClient.auth.getUser()).data.user;
    set({ isAuth: session });
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      set({ isAuth: !!session });
    });
  },
});

export const useIsAuth = create(authStoreCreator);

useIsAuth.getState().startAuthTrack();

interface ModalState {
  ModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const modalStoreCreator: StateCreator<ModalState> = (set) => ({
  ModalVisible: false,
  setModalVisible: (value) => set({ ModalVisible: value }),
});

export const useModalVisible = create(modalStoreCreator);
