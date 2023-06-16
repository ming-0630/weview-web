import User from '@/interfaces/userInterface';
import { toast } from 'react-toastify';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export interface AuthTokens {
    accessToken: string,
    refreshToken: string
}

function setTokensToLocalStorage(props: AuthTokens) {
    localStorage.setItem("accessToken", props.accessToken);
    localStorage.setItem("refreshToken", props.refreshToken);
}

function removeTokensFromLocalStorage() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export interface AuthState {
    accessToken: string | null,
    refreshToken: string | null,
    isLoggedIn: () => boolean,
    login: (tokens: AuthTokens, user: User) => void,
    logout: () => void,
    loggedInUser?: User,
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
            refreshToken: typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
            isLoggedIn: () => !!get().accessToken,
            login: (tokens: AuthTokens, user: User) => {
                setTokensToLocalStorage(tokens);
                set((state) => ({
                    ...state,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    loggedInUser: user
                }));
            },
            logout: () => {
                removeTokensFromLocalStorage();
                set((state) => ({
                    ...state,
                    accessToken: null,
                    refreshToken: null,
                    loggedInUser: undefined
                }));
                toast.success("Logout successful!")
            },
            loggedInUser: undefined
        }), {
        name: 'user-storage', // unique name
    }
    )
)

