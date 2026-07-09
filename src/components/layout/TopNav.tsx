import { Bell, Ticket, LayoutDashboard, List, PlusCircle, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tickets', label: 'Ticket', icon: List, end: true },
  { to: '/tickets/new', label: 'Nuovo', icon: PlusCircle },
]

export function TopNav() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 bg-[#1F1F1F] shadow-sm">
      <div className="mx-auto flex h-12 max-w-[1600px] items-center gap-3 px-4 md:gap-4 md:px-6">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#009B9B]">
            <Ticket className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">Key Ticket</span>
        </div>

        <div className="hidden h-5 w-px shrink-0 bg-white/20 md:block" />

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
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
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
          <button
            type="button"
            title="Notifiche"
            onClick={() => navigate('/notifications')}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Log Out"
            onClick={() => navigate('/login')}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009B9B] text-xs font-semibold text-white cursor-pointer hover:bg-[#007575] transition-colors" title="Marco Rossi">
            MR
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-0.5 md:hidden">
          <button
            type="button"
            title="Notifiche"
            onClick={() => navigate('/notifications')}
            className="flex h-9 w-9 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Log Out"
            onClick={() => navigate('/login')}
            className="flex h-9 w-9 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#009B9B] text-xs font-semibold text-white shadow-sm">
            MR
          </div>
        </div>
      </div>
    </header>
  )
}
