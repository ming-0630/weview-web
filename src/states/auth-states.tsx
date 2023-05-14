import { create } from 'zustand'

export interface authTokens {
    accessToken: string,
    refreshToken: string
}

function setTokensToLocalStorage(props: authTokens) {
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
    login: (tokens: authTokens) => void,
    logout: () => void
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
    refreshToken: typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
    isLoggedIn: () => !!get().accessToken,
    login: (tokens: authTokens) => {
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
        }));
    }
}))

