import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginPage } from '@/pages/LoginPage'
import { HubPage } from '@/pages/HubPage'
import { RequestTypePage } from '@/pages/RequestTypePage'
import { SpostaDataPage } from '@/pages/SpostaDataPage'
import { TicketListPage } from '@/pages/TicketListPage'
import { TicketDetailPage } from '@/pages/TicketDetailPage'
import { EditTicketPage } from '@/pages/EditTicketPage'
import { NewTicketPage } from '@/pages/NewTicketPage'
import { TicketReviewPage } from '@/pages/TicketReviewPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { NotificationDetailPage } from '@/pages/NotificationDetailPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Pagine senza TopNav */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hub" element={<HubPage />} />
        <Route path="/request-type" element={<RequestTypePage />} />

        {/* Pagine con TopNav */}
        <Route element={<AppLayout />}>
          <Route path="/richieste/sposta-data" element={<SpostaDataPage />} />
          <Route path="/richieste/non-conformita" element={<SpostaDataPage />} />
          <Route path="/richieste/sollecito" element={<SpostaDataPage />} />
          <Route path="/richieste/giacenza-articolo" element={<SpostaDataPage />} />
          <Route path="/richieste/reso-merce" element={<SpostaDataPage />} />
          <Route path="/richieste/variazione-prezzo" element={<SpostaDataPage />} />
          <Route path="/richieste/blocco-ordine" element={<SpostaDataPage />} />
          <Route path="/richieste/sblocco-ordine" element={<SpostaDataPage />} />
          <Route path="/richieste/verifica-pagamento" element={<SpostaDataPage />} />
          <Route path="/richieste/aggiornamento-anagrafica" element={<SpostaDataPage />} />
          <Route path="/richieste/richiesta-fattura" element={<SpostaDataPage />} />
          <Route path="/richieste/reclamo-trasporto" element={<SpostaDataPage />} />
          <Route path="/richieste/priorita-consegna" element={<SpostaDataPage />} />
          <Route path="/richieste/richiesta-documenti" element={<SpostaDataPage />} />
          <Route path="/richieste/cambio-vettore" element={<SpostaDataPage />} />
          <Route path="/dashboard" element={<Navigate to="/tickets?status=open" replace />} />
          <Route path="/tickets" element={<TicketListPage />} />
          <Route path="/tickets/new" element={<NewTicketPage />} />
          <Route path="/tickets/new/review" element={<TicketReviewPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="/tickets/:id/edit" element={<EditTicketPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/notifications/:id" element={<NotificationDetailPage />} />
          <Route path="/settings" element={<div className="p-8 text-[#605E5C]">Impostazioni (coming soon)</div>} />
        </Route>

        {/* Redirect radice → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
