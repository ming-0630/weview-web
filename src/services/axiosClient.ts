import { AuthTokens, useAuthStore } from "@/states/auth-states"
import { createAxiosClient } from "./createAxiosClient"

const REFRESH_TOKEN_URL = 'http://localhost:8080/api/v1/auth/refreshToken'
const BASE_URL = 'http://localhost:8080/api'

function getCurrentAccessToken() {
    return useAuthStore((state) => state.accessToken)
}

function getCurrentRefreshToken() {
    return useAuthStore((state) => state.refreshToken)
}


function setRefreshedTokens(tokens: AuthTokens) {
    console.log('set tokens...')
    useAuthStore((state) => state.login)
}

async function logout() {
    console.log('logout...')
    useAuthStore((state) => state.logout)
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