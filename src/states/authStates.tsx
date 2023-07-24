import User from '@/interfaces/userInterface';
import { base64StringToBlob } from 'blob-util';
import { Router, useRouter } from 'next/router';
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
    setTokens: (tokens: AuthTokens) => void,
    logout: () => void,
    loggedInUser?: User,
    setCurrentUser: (user: User) => void,
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
            refreshToken: typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
            isLoggedIn: () => !!get().accessToken,
            setTokens: (tokens: AuthTokens) => {
                setTokensToLocalStorage(tokens);
                set((state) => ({
                    ...state,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                }));
            },
            logout: () => {
                removeTokensFromLocalStorage();
                set((state) => ({
                    ...state,
                    accessToken: null,
                    refreshToken: null,
                    loggedInUser: undefined,
                }));
            },
            setCurrentUser: (user: User) => {
                set((state) => ({
                    ...state,
                    loggedInUser: user,
                }));
            },
            loggedInUser: undefined,
        }), {
        name: 'user-storage', // unique name
    }
    )
)

