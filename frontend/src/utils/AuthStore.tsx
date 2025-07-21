// src/utils/AuthStore.ts
import { create } from 'zustand';

// 1️⃣ Define a generic User shape
export interface UserData {
    _id:   string;
    name:  string;
    lastname: string;
    email: string;
    role:  'admin' | 'client';
    token: string;
}

// 2️⃣ Store state and actions
interface AuthState {
    user: UserData | null;
    login: (user: UserData) => void;
    logout: () => void;
}

// 3️⃣ Load from localStorage
const storedJson = localStorage.getItem('user');
const storedUser: UserData | null = storedJson ? JSON.parse(storedJson) : null;

export const useAuthStore = create<AuthState>((set) => ({
    user: storedUser,

    login: (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData });
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    }
}));
