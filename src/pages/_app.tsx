import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import "primereact/resources/primereact.min.css";
import "../styles/prime-theme.css";
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
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
