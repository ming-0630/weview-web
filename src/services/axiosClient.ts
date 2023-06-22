import { AuthTokens, useAuthStore } from "@/states/authStates"
import { createAxiosClient } from "./createAxiosClient"
import { toast } from "react-toastify"

const REFRESH_TOKEN_URL = 'http://localhost:8080/api/auth/refreshtoken'
const BASE_URL = 'http://localhost:8080/api'

function getCurrentAccessToken() {
    return useAuthStore.getState().accessToken
}

function getCurrentRefreshToken() {
    return useAuthStore.getState().refreshToken
}


function setRefreshedTokens(tokens: AuthTokens) {
    console.log('set tokens...')
    const login = useAuthStore.getState().setTokens
    const setUser = useAuthStore.getState().setCurrentUser
    const user = useAuthStore.getState().loggedInUser
    login(tokens)
    setUser(user!)
}

async function logout() {
    toast('Logging out...')
    const logout = useAuthStore.getState().logout
    logout()
}

export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens
})