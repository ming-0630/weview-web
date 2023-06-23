import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-phone-number-input/style.css'
import "primereact/resources/primereact.min.css";
import "../styles/prime-theme.css";
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getUser } from '@/services/user/services';
import { useAuthStore } from '@/states/authStates';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setCurrentUser, isLoggedIn } = useAuthStore()

  // Fetch the initial auth state on each page transition
  useEffect(() => {
    if (isLoggedIn()) {
      const fetchInitialAuthState = async () => {
        // Call your getInitialAuthState function here
        const response = await getUser();

        if (response && response.data) {
          setCurrentUser(response.data);
        }
      };

      fetchInitialAuthState();
    }
  }, [router.asPath]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
        colors: {
          "main": [
            "#ECF8F5",
            "#CBECE4",
            "#A9E0D2",
            "#88D3C0",
            "#66C7AF",
            "#44BB9D",
            "#37957D",
            "#29705E",
            "#1B4B3F",
            "#0E251F"
          ]
        },
        primaryColor: 'main',
        fontFamily: 'Rubik, sans-serif',
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  )
}
