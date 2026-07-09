import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Status } from '@/data/mock-tickets'
import { BackButton } from '@/components/ui/back-button'

export function NewTicketPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'open' as Status,
    tags: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/tickets/new/review', { state: { ticket: form } })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 border-b border-[#EDEBE9] pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <BackButton to="/tickets" />
          <div>
            <h1 className="text-3xl font-light text-[#323130]">Nuovo Ticket</h1>
            <p className="mt-1 text-sm text-[#605E5C]">Nuovo documento</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/tickets')}
            className="border border-[#EDEBE9] px-4 py-2 text-sm text-[#605E5C] hover:bg-[#F3F2F1]"
          >
            Annulla
          </button>
          <button
            type="submit"
            form="new-ticket-form"
            className="bg-[#009B9B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#007575]"
          >
            Salva
          </button>
        </div>
      </div>

      <div className="mt-4 border-b border-[#EDEBE9] text-sm">
        <button type="button" className="border-b-2 border-[#009B9B] px-1 py-3 text-[#009B9B]">
          Generale
        </button>
      </div>

      <form id="new-ticket-form" onSubmit={handleSubmit} className="mt-6 space-y-8">
        <section>
          <h2 className="mb-4 text-base font-semibold text-[#323130]">Generale</h2>
          <div className="grid gap-x-8 gap-y-1 md:grid-cols-2">
            <EditField
              label="Titolo"
              required
              input={
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Descrivi brevemente il problema"
                  className="w-full bg-transparent text-sm text-[#323130] outline-none placeholder:text-[#A19F9D]"
                />
              }
            />
            <EditField
              label="Stato iniziale"
              input={
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                  className="w-full bg-transparent text-sm text-[#323130] outline-none"
                >
                  <option value="open">Aperto</option>
                  <option value="in_progress">In lavorazione</option>
                </select>
              }
            />
            <EditField
              label="Tag"
              input={
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="bug, ui, urgente"
                  className="w-full bg-transparent text-sm text-[#323130] outline-none placeholder:text-[#A19F9D]"
                />
              }
            />
            <EditField label="Segnalato da" input={<span className="text-sm text-[#323130]">Marco Rossi</span>} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-base font-semibold text-[#323130]">Descrizione</h2>
          <div className="border-b border-dotted border-[#EDEBE9] py-1.5">
            <textarea
              rows={6}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Inserisci dettagli, impatto e passi per riprodurre il problema"
              className="w-full resize-none bg-transparent text-sm text-[#323130] outline-none placeholder:text-[#A19F9D]"
            />
          </div>
        </section>
      </form>
    </div>
  )
}

function EditField({
  label,
  input,
  required = false,
}: {
  label: string
  input: ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-dotted border-[#EDEBE9] py-2 sm:flex-row sm:items-center">
      <span className="w-32 shrink-0 text-sm font-semibold text-[#201F1E] md:w-48">
        {label}
        {required ? ' *' : ''}
      </span>
      <div className="min-w-0 flex-1">{input}</div>
    </div>
  )
}
