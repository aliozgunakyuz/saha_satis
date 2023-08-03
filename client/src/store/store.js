import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    auth : {
        mail: '',
        active: false
    },
    setMail:(mail) => set((state)=>({auth:{ ...state.auth, mail:mail }}))
}))
