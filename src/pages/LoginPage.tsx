import { useNavigate } from 'react-router-dom'
import { MoveRight } from 'lucide-react'
import { resetNotificationsForDemo } from '@/lib/notifications'

export function LoginPage() {
  const navigate = useNavigate()
  const handleSignIn = () => {
    resetNotificationsForDemo()
    navigate('/hub', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-5">
        {/* Logo */}
        <div className="w-36 h-36 flex items-center justify-center">
          <img src={`${import.meta.env.BASE_URL}login-symbol.png`} alt="Key Ticket logo" className="w-full h-full object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extralight tracking-widest text-[#323130] uppercase">
          Key Ticket
        </h1>

        {/* Sign In button */}
        <button
          onClick={handleSignIn}
          className="mt-4 inline-flex items-center justify-center gap-2.5 bg-[#009B9B] px-10 py-3 text-sm font-medium leading-none tracking-wide text-white shadow transition-colors hover:bg-[#007575]"
        >
          Sign In
          <MoveRight className="h-4 w-4 shrink-0" />
        </button>
      </div>
    </div>
  )
}
