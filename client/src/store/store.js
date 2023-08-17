import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

export const useAuthStore = create(persist((set, get) => ({
    auth: {
        mail: '',
        active: false
    },
    setMail: (mail) => set((state) => ({ auth: { ...state.auth, mail: mail } })),

}),
    {
        name: "saha-satis",
        persist: createJSONStorage(() => localStorage),
    }
))