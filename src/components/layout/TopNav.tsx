import { Bell, HelpCircle, Search, Settings, Ticket } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/tickets', label: 'Ticket' },
  { to: '/tickets/new', label: 'Nuovo Ticket' },
  { to: '/team', label: 'Team' },
  { to: '/settings', label: 'Impostazioni' },
]

const quickActions = [
  { label: 'Cerca', icon: Search },
  { label: 'Notifiche', icon: Bell },
  { label: 'Impostazioni', icon: Settings },
  { label: 'Guida', icon: HelpCircle },
]

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 shadow-[0_1px_0_0_#EDEBE9]">
      <div className="h-12 bg-[#1F1F1F] px-6 text-white">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-white/10">
              <Ticket className="h-4 w-4" />
            </div>
            <span className="truncate text-sm font-medium">Dynamics 365 Business Central</span>
          </div>

          <div className="flex items-center gap-1.5">
            {quickActions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                title={label}
                className="flex h-8 w-8 items-center justify-center rounded-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#009B9B] text-xs font-semibold text-white">
              MR
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-14 border-b border-[#EDEBE9] bg-white px-6">
        <div className="mx-auto flex min-h-14 max-w-[1600px] flex-wrap items-center gap-x-5 gap-y-2 py-2">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-[#323130]">KeyFor Ticket</span>
            <span className="text-[#C8C6C4]">|</span>
          </div>

          <nav className="flex flex-wrap items-center gap-1">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'border-b-2 px-3 py-3 text-sm transition-colors',
                    isActive
                      ? 'border-[#009B9B] bg-[#E6F5F5] font-medium text-[#009B9B]'
                      : 'border-transparent text-[#605E5C] hover:text-[#323130]'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
