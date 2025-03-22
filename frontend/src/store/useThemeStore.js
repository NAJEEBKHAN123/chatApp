import { create } from "zustand";


export const useThemeStore = create((set) =>({
    theme: localStorage.getItem('chat-theme') || "coffe",
    setTheme: (theme) =>{
        localStorage.getItem('chat-theme', theme);
        set({theme})

    },
}))