import { supabaseClient } from '~/utils/supabase';
const { create } = require('zustand');

export const useAuthStore = create((set) => ({
  isAuth: false,
  startAuthTrack: async () => {
    const session = !!(await supabaseClient.auth.getUser()).data.user;
    set((state) => ({ ...state, isAuth: session }));
    supabaseClient.auth.onAuthStateChange((e, session) => {
      set((state) => ({ ...state, isAuth: !!session }));
    });
  },
}));

useAuthStore.getState().startAuthTrack();
