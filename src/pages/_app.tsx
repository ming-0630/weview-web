import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import type { AppProps } from 'next/app'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Component {...pageProps} />
    </LocalizationProvider>

  )
}
