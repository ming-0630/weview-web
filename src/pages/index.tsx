import { Rubik } from 'next/font/google'
import NavBar from '@/components/NavBar'
import HomePage from '@/components/Homepage'

const rubik = Rubik({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${rubik.className} text-black`}
    >
      <NavBar>
        <HomePage></HomePage>
      </NavBar>
    </main>
  )
}
