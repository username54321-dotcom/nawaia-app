import { supabaseClient } from '~/utils/supabase';
import type { StateCreator } from 'zustand';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { create } = require('zustand');

interface AuthState {
  isAuth: boolean;
  startAuthTrack: () => Promise<void>;
  userUUID: () => void;
}

const authStoreCreator: StateCreator<AuthState> = (set) => ({
  isAuth: false,
  startAuthTrack: async () => {
    // const session = !!(await supabaseClient.auth.getUser()).data.user;
    // set({ isAuth: session });
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      set({ isAuth: !!session });
      console.log('auth test');
    });
  },
  userUUID: async () => (await supabaseClient.auth.getUser()).data.user?.id,
});

export const useIsAuth = create(authStoreCreator);

interface ModalState {
  ModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const modalStoreCreator: StateCreator<ModalState> = (set) => ({
  ModalVisible: false,
  setModalVisible: (value) => set({ ModalVisible: value }),
});

export const useModalVisible = create(modalStoreCreator);

export const useDrawer = create((set: any) => ({
  drawerVisible: false,
  setDrawerVisible: (value: boolean) =>
    set({
      drawerVisible: value,
    }),
}));
