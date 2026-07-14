import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { resetNotificationsForDemo } from '@/lib/notifications'
import { getPostLoginMessage } from '@/lib/post-login-message'

export function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const htmlStyle = document.documentElement.style
    const bodyStyle = document.body.style
    const previous = {
      htmlOverflow: htmlStyle.overflow,
      htmlOverscrollBehavior: htmlStyle.overscrollBehavior,
      bodyOverflow: bodyStyle.overflow,
      bodyOverscrollBehavior: bodyStyle.overscrollBehavior,
    }

    htmlStyle.overflow = 'hidden'
    htmlStyle.overscrollBehavior = 'none'
    bodyStyle.overflow = 'hidden'
    bodyStyle.overscrollBehavior = 'none'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    return () => {
      htmlStyle.overflow = previous.htmlOverflow
      htmlStyle.overscrollBehavior = previous.htmlOverscrollBehavior
      bodyStyle.overflow = previous.bodyOverflow
      bodyStyle.overscrollBehavior = previous.bodyOverscrollBehavior
    }
  }, [])

  const handleSignIn = () => {
    resetNotificationsForDemo()
    const loginMessage = getPostLoginMessage()
    navigate('/hub', { replace: true, state: loginMessage ? { loginMessage } : undefined })
  }

  return (
    <div className="fixed inset-0 grid place-items-center bg-[#F8F9FA] px-4">
      <div className="w-full max-w-[420px] px-2">
          <div className="flex flex-col items-center text-center">
            <div className="h-32 w-32">
              <img
                src={`${import.meta.env.BASE_URL}login-symbol.png`}
                alt="Key Ticket logo"
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-widest uppercase" aria-label="Key Ticket">
              <span className="text-[#201F1E]">Key </span>
              <span className="text-[#009B9B]">T</span>
              <span className="text-[#D83B01]">i</span>
              <span className="text-[#FFB900]">c</span>
              <span className="text-[#0078D4]">k</span>
              <span className="text-[#5C2D91]">e</span>
              <span className="text-[#498205]">t</span>
            </h1>
            <button
              onClick={handleSignIn}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-[#009B9B] px-6 py-2.5 text-sm font-medium leading-none tracking-wide text-white shadow transition-colors hover:bg-[#007575]"
            >
              Sign In
              <ChevronRight className="h-4 w-4 shrink-0" />
            </button>
          </div>
      </div>
    </div>
  )
}
