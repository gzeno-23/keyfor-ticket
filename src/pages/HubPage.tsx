import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, Settings } from 'lucide-react'
import { UserProfileMenu } from '@/components/layout/UserProfileMenu'
import { resetNotificationsForDemo, useNotifications } from '@/lib/notifications'

const HUB_CHOICES = [
  {
    id: 'new',
    iconSrc: `${import.meta.env.BASE_URL}hub-create.svg`,
    label: 'Crea nuova richiesta',
    to: '/request-type',
  },
  {
    id: 'manage',
    iconSrc: `${import.meta.env.BASE_URL}hub-view.svg`,
    label: 'Visualizza richieste aperte',
    to: '/tickets?status=open',
  },
  {
    id: 'history',
    iconSrc: `${import.meta.env.BASE_URL}hub-archive.svg`,
    label: 'Storico richieste',
    to: '/tickets?status=closed',
  },
] as const

type HubChoiceId = (typeof HUB_CHOICES)[number]['id']
type HubStyle = 'classic' | 'business'

const HUB_STYLE_STORAGE_KEY = 'keyfor-hub-style-v2'
const DEFAULT_HUB_STYLE: HubStyle = 'classic'

const HUB_COLORS: Record<HubStyle, Record<HubChoiceId, string>> = {
  classic: {
    new: '#00828E',
    manage: '#FFB900',
    history: '#D8453C',
  },
  business: {
    new: '#009B9B',
    manage: '#0078D4',
    history: '#5C2D91',
  },
}

function readHubStyleFromStorage(): HubStyle {
  if (typeof window === 'undefined') return DEFAULT_HUB_STYLE
  const rawValue = window.localStorage.getItem(HUB_STYLE_STORAGE_KEY)
  return rawValue === 'classic' || rawValue === 'business' ? rawValue : DEFAULT_HUB_STYLE
}

function persistHubStyle(value: HubStyle) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(HUB_STYLE_STORAGE_KEY, value)
}

export function HubPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { unreadCount } = useNotifications()
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false)
  const [hubStyle, setHubStyle] = useState<HubStyle>(() => readHubStyleFromStorage())
  const currentPath = `${location.pathname}${location.search}`

  const handleLogout = () => {
    resetNotificationsForDemo()
    navigate('/login')
  }

  const styledChoices = useMemo(
    () =>
      HUB_CHOICES.map((choice) => ({
        ...choice,
        color: HUB_COLORS[hubStyle][choice.id],
      })),
    [hubStyle]
  )

  const handleStyleChange = (style: HubStyle) => {
    setHubStyle(style)
    persistHubStyle(style)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <header className="bg-[#1F1F1F] pl-3 pr-6 py-0 h-14 flex items-center gap-1">
        <div className="w-14 h-14 flex items-center justify-center shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}login-symbol.png`}
            alt=""
            className="h-12 w-12 object-contain brightness-0 invert"
          />
        </div>
        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="font-semibold text-white text-sm tracking-wide hover:text-white/90 transition-colors"
        >
          Key Ticket
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/notifications', { state: { from: currentPath } })}
            className="relative flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#D83B01]" />}
          </button>
          <button
            type="button"
            onClick={() => setIsCustomizationOpen(true)}
            className="relative flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Impostazioni Hub"
            title="Impostazioni Hub"
          >
            <Settings className="h-4 w-4" />
          </button>
          <UserProfileMenu accentColor="#00828E" onLogout={handleLogout} />
        </div>
      </header>

      {hubStyle === 'classic' ? (
        <div className="flex-1 flex flex-col w-full">
          {styledChoices.map(({ id, iconSrc, label, color, to }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(to)}
              className="flex-1 w-full transition-all duration-200 hover:brightness-95"
              style={{ backgroundColor: color }}
            >
              <div className="h-full w-full flex flex-col items-center justify-center gap-4 py-6">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                  <img src={iconSrc} alt="" className="h-10 w-10" />
                </div>
                <p className="text-base sm:text-lg font-bold text-white">{label}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 w-full px-4 py-4 sm:px-6 sm:py-6">
          <div className="mx-auto grid h-full min-h-[calc(100dvh-4.5rem)] w-full max-w-6xl grid-rows-[repeat(3,minmax(0,1fr))] gap-4 md:min-h-0 md:grid-cols-3 md:grid-rows-1">
          {styledChoices.map(({ id, iconSrc, label, color, to }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(to)}
              className="h-full min-h-0 rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{
                background: `linear-gradient(160deg, ${color}3D 0%, ${color}1F 100%)`,
                borderColor: `${color}80`,
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                  <img src={iconSrc} alt="" className="h-7 w-7" />
                </div>
                <p className="text-lg font-semibold text-[#201F1E]">{label}</p>
                <p className="text-sm text-[#323130]">Apri sezione</p>
              </div>
            </button>
          ))}
          </div>
        </div>
      )}

      {isCustomizationOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4"
          onClick={() => setIsCustomizationOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-[#EDEBE9] bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-[#201F1E]">Impostazioni Hub</h2>
            <p className="mt-1 text-sm text-[#605E5C]">Scegli lo stile grafico della pagina Hub.</p>

            <div className="mt-4 space-y-2">
              {(
                [
                  { key: 'business', label: 'Business Central (Nuovo)' },
                  { key: 'classic', label: 'Classico a fasce' },
                ] as { key: HubStyle; label: string }[]
              ).map((item) => (
                <label key={item.key} className="flex items-center justify-between gap-3 rounded-md border border-[#EDEBE9] px-3 py-2">
                  <span className="text-sm text-[#323130]">{item.label}</span>
                  <input
                    type="radio"
                    name="hub-style"
                    checked={hubStyle === item.key}
                    onChange={() => handleStyleChange(item.key)}
                    className="h-4 w-4 accent-[#009B9B]"
                  />
                </label>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCustomizationOpen(false)}
                className="rounded-md bg-[#009B9B] px-4 py-2 text-sm font-medium text-white hover:bg-[#007575]"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
