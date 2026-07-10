import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '@/components/ui/back-button'
import { markNotificationAsRead, useNotifications } from '@/lib/notifications'

export function NotificationDetailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { notifications } = useNotifications()
  const fromPath = (location.state as { from?: string } | undefined)?.from ?? '/hub'
  const listPath = `/notifications?from=${encodeURIComponent(fromPath)}`

  const notification = useMemo(
    () => notifications.find((item) => item.id === id) ?? null,
    [notifications, id]
  )

  useEffect(() => {
    if (!notification) return
    markNotificationAsRead(notification.id)
    navigate(`/tickets/${notification.ticketId}`, { replace: true })
  }, [notification, navigate])

  if (!notification) {
    return (
      <div className="w-full px-4 py-6 sm:px-6">
        <div className="border-b border-[#EDEBE9] pb-4">
          <div className="flex items-center gap-3">
            <BackButton to={listPath} />
            <div>
              <h1 className="text-3xl font-light text-[#323130]">Notifica non trovata</h1>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-[#EDEBE9] bg-white p-4">
          <button
            type="button"
            onClick={() => navigate(listPath, { state: { from: fromPath } })}
            className="text-sm text-[#009B9B] hover:underline"
          >
            Torna alla lista notifiche
          </button>
        </div>
      </div>
    )
  }

  return null
}

