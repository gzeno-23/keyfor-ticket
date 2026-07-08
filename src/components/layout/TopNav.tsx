import { Bell, HelpCircle, Search, Settings, Ticket } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/tickets', label: 'Ticket', end: true },
  { to: '/tickets/new', label: 'Nuovo Ticket' },
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
      <div className="min-h-14 border-b border-[#EDEBE9] bg-white px-6">
        <div className="mx-auto flex min-h-14 max-w-[1600px] flex-wrap items-center gap-x-5 gap-y-2 py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#009B9B]">
              <Ticket className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-semibold text-[#323130]">KeyFor Ticket</span>
            <span className="text-[#C8C6C4]">|</span>
          </div>

          <nav className="flex flex-1 flex-wrap items-center gap-1">
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

          <div className="flex items-center gap-1.5">
            {quickActions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                title={label}
                className="flex h-8 w-8 items-center justify-center rounded-sm text-[#605E5C] transition-colors hover:bg-[#F3F2F1] hover:text-[#323130]"
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
    </header>
  )
}
