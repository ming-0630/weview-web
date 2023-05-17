import { AuthTokens } from '@/states/auth-states';
import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

declare module "axios" {
    export interface AxiosRequestConfig {
        authorization?: boolean;
    }
}

let failedQueue: any[] = [];
let isRefreshing = false;

const processQueue = (error: AxiosError | Error | null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
};

export interface axiosClientProps {
    options: CreateAxiosDefaults<any>,
    getCurrentAccessToken: any,
    getCurrentRefreshToken: any,
    refreshTokenUrl: string,
    logout: () => void,
    setRefreshedTokens: (tokens: AuthTokens) => void,
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

    client.interceptors.response.use(
        (response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        (error) => {
            const originalRequest = error.config;
            // In "axios": "^1.1.3" there is an issue with headers, and this is the workaround.
            originalRequest.headers = JSON.parse(
                JSON.stringify(originalRequest.headers || {})
            );
            const refreshToken = props.getCurrentRefreshToken();

            // If error, process all the requests in the queue and logout the user.
            const handleError = (error: AxiosError | Error) => {
                processQueue(error);
                props.logout();
                return Promise.reject(error);
            };

            // Refresh token conditions
            if (
                refreshToken &&
                error.response?.status === 400 &&
                error.response.data.message === "Expired JWT token" &&
                originalRequest?.url !== props.refreshTokenUrl &&
                originalRequest?._retry !== true
            ) {

                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(() => {
                            return client(originalRequest);
                        })
                        .catch((err) => {
                            return Promise.reject(err);
                        });
                }
                isRefreshing = true;
                originalRequest._retry = true;
                return client
                    .post(props.refreshTokenUrl, {
                        refreshToken: refreshToken,
                    })
                    .then((res) => {
                        const tokens = {
                            accessToken: res.data?.accessToken,
                            refreshToken: res.data?.refreshToken,
                        };
                        props.setRefreshedTokens(tokens);
                        processQueue(null);

                        return client(originalRequest);
                    }, handleError)
                    .finally(() => {
                        isRefreshing = false;
                    });
            }

            // Refresh token missing or expired => logout user...
            if (
                error.response?.status === 403 &&
                (error.response?.data?.message === "Refresh token is not in database!" ||
                    error.response?.data?.message === "Refresh token expired.")
            ) {
                return handleError(error);
            }
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        }
    );

    return client;

}