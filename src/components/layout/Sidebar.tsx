import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Users,
  Settings,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tickets', label: 'Ticket', icon: Ticket },
  { to: '/tickets/new', label: 'Nuovo Ticket', icon: PlusCircle },
  { to: '/team', label: 'Team', icon: Users },
  { to: '/settings', label: 'Impostazioni', icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-neutral-900 text-neutral-100 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-neutral-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Ticket className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base tracking-tight">KeyFor Ticket</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group',
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3 h-3 opacity-60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
            MR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-neutral-100 truncate">Marco Rossi</p>
            <p className="text-xs text-neutral-400 truncate">Agente</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
