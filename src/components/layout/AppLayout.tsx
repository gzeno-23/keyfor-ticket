import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { TopNav } from './TopNav'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <TopNav />
      <main className="min-h-[calc(100vh-6.5rem)] pb-16 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
