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
    // Mock: in a real app this would call an API
    alert('Ticket creato! (mock — nessun dato salvato)')
    navigate('/tickets')
  }

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Nuovo Ticket</h1>
        <p className="text-sm text-neutral-500 mt-1">Compila i campi per aprire una nuova segnalazione</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-neutral-700">
            Titolo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Descrivi brevemente il problema..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-neutral-700">Descrizione</label>
          <textarea
            rows={5}
            placeholder="Fornisci i dettagli del problema, i passi per riprodurlo, il comportamento atteso..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Priority + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">Priorità</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="low">Bassa</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="critical">Critica</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">Stato iniziale</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="open">Aperto</option>
              <option value="in_progress">In Lavorazione</option>
            </select>
          </div>
        </div>

        {/* Assignee */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-neutral-700">Assegna a</label>
          <select
            value={form.assignee}
            onChange={(e) => setForm({ ...form, assignee: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">— Non assegnato —</option>
            <option value="Marco Rossi">Marco Rossi</option>
            <option value="Laura Conti">Laura Conti</option>
            <option value="Andrea Ferri">Andrea Ferri</option>
          </select>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-neutral-700">Tag</label>
          <input
            type="text"
            placeholder="es. bug, ui, urgente (separati da virgola)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/tickets')}
            className="px-4 py-2 text-sm font-medium text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Annulla
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Crea Ticket
          </button>
        </div>
      </form>
    </div>
  )
}
