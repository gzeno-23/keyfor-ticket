import { Bell } from 'lucide-react'
import { BackButton } from '@/components/ui/back-button'

const notifications = [
  { id: 'N-001', text: 'Nuova richiesta ricevuta: Sposta Data', time: 'Oggi, 09:15' },
  { id: 'N-002', text: 'Richiesta KFT-002 aggiornata', time: 'Ieri, 17:42' },
  { id: 'N-003', text: 'Richiesta KFT-005 chiusa', time: 'Ieri, 11:08' },
]

export function NotificationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <div className="border-b border-[#EDEBE9] pb-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <BackButton />
          <div>
            <h1 className="text-[28px] font-light text-[#323130]">Notifiche</h1>
            <p className="mt-1 text-sm text-[#605E5C]">{notifications.length} notifiche</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#EDEBE9] bg-white">
        {notifications.map((item) => (
          <div key={item.id} className="flex items-start gap-3 border-b border-[#EDEBE9] px-4 py-4 last:border-b-0">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5F4F4]">
              <Bell className="h-4 w-4 text-[#009B9B]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-[#323130]">{item.text}</p>
              <p className="mt-1 text-xs text-[#605E5C]">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
