import {create}from 'zustand';

export const useAuthStore = create((set)=>({
    auth : {
        mail: ''
    },
    setMail:(email) => set((state)=>({auth:{ ...state.auth, mail:email }}))
}))
