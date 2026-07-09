import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-5">
        {/* Logo */}
        <div className="w-36 h-36 flex items-center justify-center">
          <img src="/login-symbol.png" alt="Key Ticket logo" className="w-full h-full object-contain" />
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
