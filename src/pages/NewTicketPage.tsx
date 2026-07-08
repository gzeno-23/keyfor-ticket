import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Priority, Status } from '@/data/mock-tickets'

export function NewTicketPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    status: 'open' as Status,
    assignee: '',
    tags: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/tickets/new/review', { state: { ticket: form } })
  }

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#201F1E]">Nuovo Ticket</h1>
        <p className="text-sm text-[#605E5C] mt-1">
          Compila i campi, poi potrai rivedere i dettagli prima di salvare
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-[#EDEBE9] p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#201F1E]">
            Titolo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Descrivi brevemente il problema..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-[#EDEBE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0070F2] focus:border-[#0070F2]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#201F1E]">Descrizione</label>
          <textarea
            rows={5}
            placeholder="Fornisci i dettagli del problema, i passi per riprodurlo, il comportamento atteso..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-[#EDEBE9] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#0070F2] focus:border-[#0070F2]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#201F1E]">Priorità</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
              className="w-full px-3 py-2 text-sm border border-[#EDEBE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0070F2] bg-white text-[#201F1E]"
            >
              <option value="low">Bassa</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="critical">Critica</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#201F1E]">Stato iniziale</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
              className="w-full px-3 py-2 text-sm border border-[#EDEBE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0070F2] bg-white text-[#201F1E]"
            >
              <option value="open">Aperto</option>
              <option value="in_progress">In Lavorazione</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#201F1E]">Assegna a</label>
          <select
            value={form.assignee}
            onChange={(e) => setForm({ ...form, assignee: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-[#EDEBE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0070F2] bg-white text-[#201F1E]"
          >
            <option value="">— Non assegnato —</option>
            <option value="Marco Rossi">Marco Rossi</option>
            <option value="Laura Conti">Laura Conti</option>
            <option value="Andrea Ferri">Andrea Ferri</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#201F1E]">Tag</label>
          <input
            type="text"
            placeholder="es. bug, ui, urgente (separati da virgola)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-[#EDEBE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0070F2] focus:border-[#0070F2]"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-[#EDEBE9]">
          <button
            type="button"
            onClick={() => navigate('/tickets')}
            className="px-4 py-2 text-sm font-medium text-[#605E5C] border border-[#EDEBE9] rounded-md hover:bg-[#F3F2F1] transition-colors"
          >
            Annulla
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-[#0070F2] text-white rounded-md hover:bg-[#0062D9] transition-colors"
          >
            Continua →
          </button>
        </div>
      </form>
    </div>
  )
}
