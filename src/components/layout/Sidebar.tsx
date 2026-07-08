import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tickets', label: 'Ticket', icon: Ticket },
  { to: '/tickets/new', label: 'Nuovo Ticket', icon: PlusCircle },
  { to: '/team', label: 'Team', icon: Users },
  { to: '/settings', label: 'Impostazioni', icon: Settings },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen z-20 flex flex-col overflow-hidden',
        'bg-[#2B579A] text-white',
        'transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo + toggle */}
      <div className="px-3 py-4 border-b border-white/10 flex items-center gap-2 min-h-[60px]">
        <div className="w-8 h-8 rounded-md bg-[#0078D4] flex items-center justify-center shrink-0">
          <Ticket className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm whitespace-nowrap tracking-tight flex-1 overflow-hidden">
            KeyFor Ticket
          </span>
        )}
        <button
          onClick={onToggle}
          className={cn(
            'w-7 h-7 rounded-md flex items-center justify-center shrink-0',
            'text-white/60 hover:text-white hover:bg-white/10 transition-colors',
            collapsed && 'ml-auto'
          )}
          title={collapsed ? 'Espandi menu' : 'Chiudi menu'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-colors',
                collapsed ? 'justify-center' : '',
                isActive
                  ? 'bg-[#0078D4] text-white'
                  : 'text-white/70 hover:bg-white/15 hover:text-white'
              )
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <div className="w-8 h-8 rounded-full bg-[#0078D4] flex items-center justify-center text-xs font-bold text-white shrink-0">
            MR
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">Marco Rossi</p>
              <p className="text-xs text-white/50 truncate">Agente</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
