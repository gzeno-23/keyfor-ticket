import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginPage } from '@/pages/LoginPage'
import { HubPage } from '@/pages/HubPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { TicketListPage } from '@/pages/TicketListPage'
import { TicketDetailPage } from '@/pages/TicketDetailPage'
import { NewTicketPage } from '@/pages/NewTicketPage'
import { TicketReviewPage } from '@/pages/TicketReviewPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pagine senza TopNav */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hub" element={<HubPage />} />

        {/* Pagine con TopNav */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketListPage />} />
          <Route path="/tickets/new" element={<NewTicketPage />} />
          <Route path="/tickets/new/review" element={<TicketReviewPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="/settings" element={<div className="p-8 text-[#605E5C]">Impostazioni (coming soon)</div>} />
        </Route>

        {/* Redirect radice → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
