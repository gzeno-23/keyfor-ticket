import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket, ArrowRight } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user.trim() || !password.trim()) {
      setError('Inserisci username e password.')
      return
    }
    // Mock login — qualsiasi credenziale funziona
    navigate('/hub', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-4">
      {/* Logo / brand */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-xl bg-[#009B9B] flex items-center justify-center shadow-lg mb-4">
          <Ticket className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-2xl font-light text-[#323130] tracking-tight">KeyFor Ticket</h1>
        <p className="text-sm text-[#605E5C] mt-1">Sistema di gestione ticket</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white border border-[#EDEBE9] shadow-sm">
        <div className="px-8 py-7">
          <h2 className="text-base font-semibold text-[#323130] mb-5">Accedi al tuo account</h2>

          {error && (
            <div className="mb-4 bg-[#FDF3F4] border border-[#F3D6D8] px-3 py-2 text-sm text-[#A4262C]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#605E5C] mb-1">Nome utente</label>
              <input
                type="text"
                autoFocus
                value={user}
                onChange={(e) => { setUser(e.target.value); setError('') }}
                placeholder="es. marco.rossi"
                className="w-full border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B] focus:ring-1 focus:ring-[#009B9B]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#605E5C] mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                className="w-full border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B] focus:ring-1 focus:ring-[#009B9B]"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#009B9B] py-2.5 text-sm font-medium text-white hover:bg-[#007575] transition-colors mt-2"
            >
              Accedi
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="border-t border-[#EDEBE9] px-8 py-4 bg-[#FAF9F8]">
          <p className="text-xs text-[#A19F9D] text-center">
            Accesso demo: qualsiasi credenziale
          </p>
        </div>
      </div>
    </div>
  )
}
