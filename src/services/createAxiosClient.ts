import axios, { CreateAxiosDefaults } from 'axios';

declare module "axios" {
    export interface AxiosRequestConfig {
        authorization?: boolean;
    }
}

export interface axiosClientProps {
    options: CreateAxiosDefaults<any>,
    getCurrentAccessToken: () => string | null,
    getCurrentRefreshToken: () => string | null,
    refreshTokenUrl: string,
    logout: () => void,
    setRefreshedTokens: (tokens: string) => void,
}

export function createAxiosClient(props: axiosClientProps) {
    const client = axios.create(props.options);

    client.interceptors.request.use(
        (config) => {
            if (config.authorization !== false) {
                const token = props.getCurrentAccessToken();
                if (token) {
                    config.headers.Authorization = "Bearer " + token;
                }
            }
            return config;

        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return client;

}