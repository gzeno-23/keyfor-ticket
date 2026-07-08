import { Bell, HelpCircle, Search, Settings, Ticket, LayoutDashboard, List, PlusCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tickets', label: 'Ticket', icon: List, end: true },
  { to: '/tickets/new', label: 'Nuovo', icon: PlusCircle },
]

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#EDEBE9] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-4 md:gap-4 md:px-6">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#009B9B]">
            <Ticket className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-[#323130]">KeyFor Ticket</span>
        </div>

        <div className="hidden h-5 w-px shrink-0 bg-[#EDEBE9] md:block" />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#009B9B] text-white shadow-sm'
                    : 'text-[#605E5C] hover:bg-[#F3F2F1] hover:text-[#323130]'
                )
              }
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="hidden items-center gap-0.5 md:flex">
          {[
            { label: 'Cerca', icon: Search },
            { label: 'Notifiche', icon: Bell },
            { label: 'Impostazioni', icon: Settings },
            { label: 'Guida', icon: HelpCircle },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              title={label}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#605E5C] hover:bg-[#F3F2F1] hover:text-[#323130] transition-colors"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}

          <div className="ml-2 w-px h-5 bg-[#EDEBE9]" />

          <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#009B9B] text-xs font-semibold text-white cursor-pointer hover:bg-[#007575] transition-colors" title="Marco Rossi">
            MR
          </div>
        </div>

        <div className="flex flex-1 justify-end md:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#009B9B] text-xs font-semibold text-white shadow-sm">
            MR
          </div>
        </div>
      </div>
    </header>
  )
}
