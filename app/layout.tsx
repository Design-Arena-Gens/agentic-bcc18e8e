import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RallyMatch ? Find Tennis Partners Near You',
  description: 'Smart matching for tennis partners by skill, availability, and distance.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="border-b border-white/10">
          <div className="container-safe flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="inline-block h-3 w-3 rounded-full bg-tennis-yellow" />
              <span>RallyMatch</span>
            </a>
            <nav className="flex items-center gap-3 text-sm">
              <a href="/matches" className="hover:underline">Find Partners</a>
              <a href="/profile" className="btn-primary">Your Profile</a>
            </nav>
          </div>
        </header>
        <main className="container-safe py-10">{children}</main>
        <footer className="mt-20 border-t border-white/10">
          <div className="container-safe py-6 text-xs text-white/60">
            ? {new Date().getFullYear()} RallyMatch. Built for tennis players.
          </div>
        </footer>
      </body>
    </html>
  )
}
