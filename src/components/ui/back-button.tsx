import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  to?: string | number
  className?: string
}

export function BackButton({ to = -1, className }: BackButtonProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (typeof to === 'number') {
      navigate(to)
      return
    }
    navigate(to)
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={cn(
        'mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#EDEBE9] bg-white text-[#323130] hover:bg-[#F3F2F1]',
        className
      )}
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  )
}
