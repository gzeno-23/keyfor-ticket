import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { TicketListPage } from '@/pages/TicketListPage'
import { TicketDetailPage } from '@/pages/TicketDetailPage'
import { NewTicketPage } from '@/pages/NewTicketPage'
import { TeamPage } from '@/pages/TeamPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketListPage />} />
          <Route path="/tickets/new" element={<NewTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/settings" element={<div className="p-8 text-neutral-400">Impostazioni (coming soon)</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
