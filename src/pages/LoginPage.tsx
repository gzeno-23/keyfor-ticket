import { useNavigate } from 'react-router-dom'
import { Ticket, ArrowRight } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-5">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-[#009B9B] flex items-center justify-center shadow-lg">
          <Ticket className="w-11 h-11 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extralight tracking-widest text-[#323130] uppercase">
          Key Ticket
        </h1>

        {/* Sign In button */}
        <button
          onClick={() => navigate('/hub', { replace: true })}
          className="mt-4 flex items-center gap-3 bg-[#009B9B] hover:bg-[#007575] transition-colors text-white px-10 py-3 text-sm font-medium tracking-wide shadow"
        >
          Sign In
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
