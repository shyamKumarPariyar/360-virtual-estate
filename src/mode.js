import { create } from 'zustand'

export const useAppStore  = create((set) => ({
    currentMode: 'TOUR',
    selectedColor: '#fff',
    setMode: (mode) => set({currentMode: mode}),
    setColor: (color) => set({selectedColor: color})
}))