import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Check } from 'lucide-react'
import { BackButton } from '@/components/ui/back-button'

// ── Mock BC data ──────────────────────────────────────────────────────────────
const BC_CLIENTI = [
  { codice: 'C001', nome: 'Alfa Distribuzione S.r.l.' },
  { codice: 'C002', nome: 'Beta Forniture S.p.A.' },
  { codice: 'C003', nome: 'Gamma Logistica S.r.l.' },
  { codice: 'C004', nome: 'Delta Commerce S.r.l.' },
  { codice: 'C005', nome: 'Epsilon Trading S.p.A.' },
  { codice: 'C006', nome: 'Zeta Solutions S.r.l.' },
  { codice: 'C007', nome: 'Eta Group S.p.A.' },
]

const BC_ARTICOLI = [
  { codice: 'ART-1001', descrizione: 'Valvola idraulica DN50' },
  { codice: 'ART-1002', descrizione: 'Pompa centrifuga 3kW' },
  { codice: 'ART-1003', descrizione: 'Filtro aria F7 600x600' },
  { codice: 'ART-2001', descrizione: 'Raccordo T 1/2"' },
  { codice: 'ART-2002', descrizione: 'Raccordo curvo 90° 3/4"' },
  { codice: 'ART-3001', descrizione: 'Sensore pressione 0-10 bar' },
  { codice: 'ART-3002', descrizione: 'Termostato digitale 230V' },
  { codice: 'ART-4001', descrizione: 'Guarnizione OR 50x3' },
]

// ── Types ─────────────────────────────────────────────────────────────────────
interface LookupItem { codice: string; label: string }
type DialogType = 'cliente' | 'articolo' | null

// ── Page Dialog ───────────────────────────────────────────────────────────────
function LookupDialog({
  title,
  items,
  onSelect,
  onClose,
}: {
  title: string
  items: LookupItem[]
  onSelect: (item: LookupItem) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [manualMode, setManualMode] = useState(false)
  const [manualValue, setManualValue] = useState('')

  const filtered = query.trim()
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          i.codice.toLowerCase().includes(query.toLowerCase())
      )
    : items

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative mx-4 flex w-full max-w-lg flex-col bg-white shadow-2xl" style={{ maxHeight: '80vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDEBE9] px-5 py-3">
          <h2 className="text-sm font-semibold text-[#323130]">{title}</h2>
          <button type="button" onClick={onClose} className="text-[#605E5C] hover:text-[#323130]">
            <X className="h-4 w-4" />
          </button>
        </div>

        {!manualMode ? (
          <>
            {/* Search */}
            <div className="flex items-center gap-2 border-b border-[#EDEBE9] px-4 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-[#A19F9D]" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca per nome o codice..."
                className="flex-1 bg-transparent text-sm text-[#323130] outline-none placeholder:text-[#A19F9D]"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')}>
                  <X className="h-3.5 w-3.5 text-[#A19F9D]" />
                </button>
              )}
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-[120px_1fr] gap-3 border-b border-[#EDEBE9] bg-[#FAF9F8] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#605E5C]">
              <span>Codice</span>
              <span>Descrizione</span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-[#A19F9D]">Nessun risultato trovato</p>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.codice}
                    type="button"
                    onClick={() => onSelect(item)}
                    className="grid w-full grid-cols-[120px_1fr] gap-3 border-b border-[#EDEBE9]/50 px-4 py-2.5 text-left text-sm hover:bg-[#F3F2F1]"
                  >
                    <span className="font-mono text-xs text-[#009B9B]">{item.codice}</span>
                    <span className="text-[#323130]">{item.label}</span>
                  </button>
                ))
              )}
              <button
                type="button"
                onClick={() => setManualMode(true)}
                className="flex w-full items-center gap-2 border-t border-[#EDEBE9] px-4 py-3 text-left text-sm font-medium text-[#009B9B] hover:bg-[#F3F2F1]"
              >
                + Altro (inserimento manuale)
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 p-5">
            <p className="text-sm text-[#605E5C]">Inserisci il valore manualmente:</p>
            <input
              autoFocus
              type="text"
              value={manualValue}
              onChange={(e) => setManualValue(e.target.value)}
              placeholder="Inserisci qui..."
              className="border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B]"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setManualMode(false)}
                className="border border-[#EDEBE9] px-4 py-2 text-sm text-[#605E5C] hover:bg-[#F3F2F1]"
              >
                Indietro
              </button>
              <button
                type="button"
                disabled={!manualValue.trim()}
                onClick={() => onSelect({ codice: '', label: manualValue.trim() })}
                className="flex items-center gap-2 bg-[#009B9B] px-4 py-2 text-sm font-medium text-white hover:bg-[#007575] disabled:opacity-40"
              >
                <Check className="h-4 w-4" /> Conferma
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Lookup trigger ────────────────────────────────────────────────────────────
function LookupField({
  label,
  value,
  onOpen,
  onClear,
}: {
  label: string
  value: string
  onOpen: () => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-dotted border-[#EDEBE9] py-2 sm:flex-row sm:items-center">
      <span className="w-40 shrink-0 text-sm text-[#605E5C]">{label}</span>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <button type="button" onClick={onOpen} className="flex-1 text-left text-sm">
          {value
            ? <span className="text-[#323130]">{value}</span>
            : <span className="text-[#A19F9D]">Seleziona {label.toLowerCase()}...</span>
          }
        </button>
        {value ? (
          <button type="button" onClick={onClear} className="text-[#A19F9D] hover:text-[#605E5C]">
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button type="button" onClick={onOpen} className="text-[#605E5C]">
            <Search className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

// ── Date field ────────────────────────────────────────────────────────────────
function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1 border-b border-dotted border-[#EDEBE9] py-2 sm:flex-row sm:items-center">
      <span className="w-40 shrink-0 text-sm text-[#605E5C]">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm text-[#323130] outline-none [color-scheme:light]"
      />
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function SpostaDataPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ cliente: '', articolo: '', vecchiaData: '', nuovaData: '' })
  const [openDialog, setOpenDialog] = useState<DialogType>(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const clientiItems: LookupItem[] = BC_CLIENTI.map((c) => ({ codice: c.codice, label: c.nome }))
  const articoliItems: LookupItem[] = BC_ARTICOLI.map((a) => ({ codice: a.codice, label: `${a.codice} — ${a.descrizione}` }))

  const handleSelect = (field: 'cliente' | 'articolo') => (item: LookupItem) => {
    setForm((f) => ({ ...f, [field]: item.label }))
    setOpenDialog(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="flex items-center gap-3 pb-4">
        <BackButton to="/request-type" className="mt-0" />
        <div>
          <h1 className="text-3xl font-light text-[#323130]">Nuova richiesta</h1>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-sm text-[#605E5C]">Sposta Data</p>
            <button
              type="button"
              onClick={() => setIsInfoOpen(true)}
              className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#009B9B] text-[8px] font-semibold leading-none text-[#009B9B] align-middle hover:bg-[#E6F5F5]"
              aria-label="Informazioni su Sposta Data"
            >
              i
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6 text-sm">
        <button type="button" className="px-1 py-2 text-[#009B9B]">
          Dettagli
        </button>
        <button type="button" className="px-1 py-2 text-[#605E5C]">
          Allegati (0)
        </button>
        <button type="button" className="px-1 py-2 text-[#605E5C]">
          Note (0)
        </button>
      </div>

      <form id="sposta-data-form" onSubmit={handleSubmit} className="mt-6 space-y-1">
        <LookupField
          label="Nome cliente"
          value={form.cliente}
          onOpen={() => setOpenDialog('cliente')}
          onClear={() => setForm((f) => ({ ...f, cliente: '' }))}
        />
        <LookupField
          label="Numero articolo"
          value={form.articolo}
          onOpen={() => setOpenDialog('articolo')}
          onClear={() => setForm((f) => ({ ...f, articolo: '' }))}
        />
        <DateField label="Vecchia data" value={form.vecchiaData} onChange={(v) => setForm((f) => ({ ...f, vecchiaData: v }))} />
        <DateField label="Nuova data" value={form.nuovaData} onChange={(v) => setForm((f) => ({ ...f, nuovaData: v }))} />
      </form>

      <div className="mt-10 flex justify-end gap-3 border-t border-[#EDEBE9] pt-6">
        <button
          type="button"
          onClick={() => navigate('/request-type')}
          className="border border-[#EDEBE9] px-6 py-2 text-sm text-[#605E5C] hover:bg-[#F3F2F1] transition-colors"
        >
          Annulla
        </button>
        <button
          type="submit"
          form="sposta-data-form"
          className="bg-[#009B9B] px-6 py-2 text-sm font-medium text-white hover:bg-[#007575] transition-colors"
        >
          Salva
        </button>
      </div>

      {openDialog === 'cliente' && (
        <LookupDialog
          title="Seleziona cliente"
          items={clientiItems}
          onSelect={handleSelect('cliente')}
          onClose={() => setOpenDialog(null)}
        />
      )}
      {openDialog === 'articolo' && (
        <LookupDialog
          title="Seleziona articolo"
          items={articoliItems}
          onSelect={handleSelect('articolo')}
          onClose={() => setOpenDialog(null)}
        />
      )}

      {isInfoOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-lg border border-[#EDEBE9] bg-white p-5 shadow-2xl">
            <h3 className="text-base font-semibold text-[#323130]">Sposta Data</h3>
            <p className="mt-2 text-sm leading-6 text-[#605E5C]">
              Questa richiesta serve a modificare la data di consegna o la data di scadenza associata a cliente e articolo.
            </p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsInfoOpen(false)}
                className="bg-[#009B9B] px-4 py-2 text-sm font-medium text-white hover:bg-[#007575]"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
