import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Send } from 'lucide-react'
import { BackButton } from '@/components/ui/back-button'
import { appendNotificationReply, markNotificationAsRead, useNotifications } from '@/lib/notifications'

export function NotificationDetailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { notifications } = useNotifications()
  const [replyText, setReplyText] = useState('')
  const fromPath = (location.state as { from?: string } | undefined)?.from ?? '/hub'
  const listPath = `/notifications?from=${encodeURIComponent(fromPath)}`

  const notification = useMemo(
    () => notifications.find((item) => item.id === id) ?? null,
    [notifications, id]
  )

  useEffect(() => {
    if (id) markNotificationAsRead(id)
  }, [id])

  const handleSendReply = () => {
    if (!notification || !replyText.trim()) return
    appendNotificationReply(notification.id, replyText)
    setReplyText('')
  }

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

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] px-4 py-6 sm:px-6">
      <div className="flex h-full flex-col">
        <div className="border-b border-[#EDEBE9] pb-4">
          <div className="flex items-center gap-3">
            <BackButton to={listPath} />
            <div>
              <h1 className="text-3xl font-light text-[#323130]">{notification.title}</h1>
              <p className="mt-1 text-sm text-[#605E5C]">{notification.preview}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex-1 min-h-0 border border-[#EDEBE9] bg-white p-4">
          <div className="flex h-full flex-col">
            <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-1">
              {notification.messages.map((message) => (
                <div key={message.id} className={`flex ${message.author === 'Tu' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      message.author === 'Tu' ? 'bg-[#009B9B] text-white' : 'bg-[#F3F2F1] text-[#323130]'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`mt-1 text-[10px] ${message.author === 'Tu' ? 'text-white/80' : 'text-[#A19F9D]'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-[#EDEBE9] pt-3">
              <input
                type="text"
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleSendReply()
                  }
                }}
                placeholder="Scrivi un messaggio..."
                className="flex-1 rounded-md border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B]"
              />
              <button
                type="button"
                onClick={handleSendReply}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#009B9B] text-white hover:bg-[#007575]"
                title="Invia"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
