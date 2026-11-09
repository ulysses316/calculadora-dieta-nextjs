import { Figtree, Lexend } from 'next/font/google'
import '@/styles/globals.css'

const body = Figtree({ subsets: ['latin'], variable: '--font-body' })
const display = Lexend({ subsets: ['latin'], variable: '--font-display' })

export default function App({ Component, pageProps }) {
  return (
    <div className={`${body.variable} ${display.variable} app`}>
      <Component {...pageProps} />
    </div>
  )
}
