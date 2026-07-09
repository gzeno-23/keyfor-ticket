import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
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
type SpostaDataTab = 'details' | 'comments' | 'attachments'

interface FileAttachment {
  id: string
  file: File
  fileUrl: string
}

interface ImageAttachment {
  id: string
  file: File
  previewUrl: string
}

interface NoteItem {
  id: string
  text: string
  createdAt: string
}

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
  const normalizedQuery = query.trim()

  const filtered = normalizedQuery
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
          i.codice.toLowerCase().includes(normalizedQuery.toLowerCase())
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

        {/* Search */}
        <div className="flex items-center gap-2 border-b border-[#EDEBE9] px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-[#A19F9D]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per nome..."
            className="flex-1 bg-transparent text-sm text-[#323130] outline-none placeholder:text-[#A19F9D]"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')}>
              <X className="h-3.5 w-3.5 text-[#A19F9D]" />
            </button>
          )}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-6">
              <p className="text-center text-sm text-[#A19F9D]">Nessun risultato trovato</p>
              {normalizedQuery && (
                <button
                  type="button"
                  onClick={() => onSelect({ codice: '', label: normalizedQuery })}
                  className="mt-3 w-full border border-[#EDEBE9] px-3 py-2 text-left text-sm text-[#009B9B] hover:bg-[#F3F2F1]"
                >
                  Inserisci "{normalizedQuery}"
                </button>
              )}
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.codice}
                type="button"
                onClick={() => onSelect(item)}
                className="w-full border-b border-[#EDEBE9]/50 px-4 py-2.5 text-left text-sm text-[#323130] hover:bg-[#F3F2F1]"
              >
                {item.label}
              </button>
            ))
          )}
        </div>
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
    <div className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center">
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
    <div className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center">
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
  const { pathname } = useLocation()
  const [form, setForm] = useState({ cliente: '', articolo: '', vecchiaData: '', nuovaData: '' })
  const [openDialog, setOpenDialog] = useState<DialogType>(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<SpostaDataTab>('details')
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([])
  const [attachedImages, setAttachedImages] = useState<ImageAttachment[]>([])
  const [comments, setComments] = useState<NoteItem[]>([])
  const [commentText, setCommentText] = useState('')

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

  const handleFileAttach = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (files.length === 0) return
    const nextFiles = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      file,
      fileUrl: URL.createObjectURL(file),
    }))
    setAttachedFiles((current) => [...current, ...nextFiles])
    event.target.value = ''
  }

  const handleImageAttach = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (files.length === 0) return
    const nextImages = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }))
    setAttachedImages((current) => [...current, ...nextImages])
    event.target.value = ''
  }

  const handleRemoveFile = (id: string) => {
    setAttachedFiles((current) => {
      const fileToRemove = current.find((item) => item.id === id)
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.fileUrl)
      return current.filter((item) => item.id !== id)
    })
  }

  const handleRemoveImage = (id: string) => {
    setAttachedImages((current) => {
      const imageToRemove = current.find((item) => item.id === id)
      if (imageToRemove) URL.revokeObjectURL(imageToRemove.previewUrl)
      return current.filter((item) => item.id !== id)
    })
  }

  const handleAddComment = () => {
    const text = commentText.trim()
    if (!text) return
    setComments((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text,
        createdAt: new Date().toLocaleString('it-IT'),
      },
    ])
    setCommentText('')
  }

  const handleDeleteComment = (id: string) => {
    setComments((current) => current.filter((comment) => comment.id !== id))
  }

  const requestConfig: Record<string, { label: string; info: string }> = {
    'sposta-data': {
      label: 'Sposta Data',
      info: 'Questa richiesta serve a modificare la data di consegna o la data di scadenza associata a cliente e articolo.',
    },
    'non-conformita': {
      label: 'Non Conformità',
      info: 'Questa richiesta serve a segnalare una non conformità relativa a prodotto, documento o consegna.',
    },
    sollecito: {
      label: 'Sollecito',
      info: 'Questa richiesta serve a inviare un sollecito per attività o documenti in attesa.',
    },
    'giacenza-articolo': {
      label: 'Giacenza Articolo',
      info: 'Questa richiesta serve a verificare disponibilità e giacenza di un articolo.',
    },
  }

  const requestKey = pathname.split('/').pop() ?? 'sposta-data'
  const currentRequest = requestConfig[requestKey] ?? requestConfig['sposta-data']

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="flex items-center gap-3 pb-4">
        <BackButton to="/request-type" className="mt-0 h-8 w-8 [&>svg]:h-3 [&>svg]:w-3" />
        <div>
          <h1 className="text-3xl font-light text-[#323130]">Nuova richiesta</h1>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-sm text-[#605E5C]">{currentRequest.label}</p>
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

      <div className="mt-4 flex items-center gap-6 border-b border-[#EDEBE9] text-sm">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`border-b-2 px-1 py-3 ${
            activeTab === 'details' ? 'border-[#009B9B] text-[#009B9B]' : 'border-transparent text-[#605E5C]'
          }`}
        >
          Dettagli
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('comments')}
          className={`border-b-2 px-1 py-3 ${
            activeTab === 'comments' ? 'border-[#009B9B] text-[#009B9B]' : 'border-transparent text-[#605E5C]'
          }`}
        >
          Commenti ({comments.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('attachments')}
          className={`border-b-2 px-1 py-3 ${
            activeTab === 'attachments' ? 'border-[#009B9B] text-[#009B9B]' : 'border-transparent text-[#605E5C]'
          }`}
        >
          Allegati ({attachedFiles.length + attachedImages.length})
        </button>
      </div>

      {activeTab === 'details' && (
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
      )}

      {activeTab === 'attachments' && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[#EDEBE9] bg-white p-4">
            <p className="text-sm font-semibold text-[#323130]">File</p>
            <label className="mt-3 inline-flex cursor-pointer items-center rounded-md border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] hover:bg-[#F3F2F1]">
              Inserisci file
              <input type="file" multiple className="hidden" onChange={handleFileAttach} />
            </label>
            <div className="mt-3 space-y-1 text-xs text-[#605E5C]">
              {attachedFiles.length === 0 ? (
                <p>Nessun file allegato.</p>
              ) : (
                attachedFiles.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate text-[#323130] hover:text-[#009B9B] hover:underline"
                    >
                      {item.file.name}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(item.id)}
                      className="shrink-0 text-[11px] font-medium text-[#A4262C] hover:underline"
                    >
                      Elimina
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[#EDEBE9] bg-white p-4">
            <p className="text-sm font-semibold text-[#323130]">Immagini</p>
            <label className="mt-3 inline-flex cursor-pointer items-center rounded-md border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] hover:bg-[#F3F2F1]">
              Inserisci immagine
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageAttach} />
            </label>
            <div className="mt-3 space-y-1 text-xs text-[#605E5C]">
              {attachedImages.length === 0 ? (
                <p>Nessuna immagine allegata.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {attachedImages.map((image) => (
                    <div key={image.id} className="rounded-md border border-[#EDEBE9] p-2">
                      <img src={image.previewUrl} alt={image.file.name} className="h-20 w-full rounded object-cover" />
                      <p className="mt-1 truncate text-[11px] text-[#323130]">{image.file.name}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image.id)}
                        className="mt-1 text-[11px] font-medium text-[#A4262C] hover:underline"
                      >
                        Elimina
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="mt-6 rounded-xl border border-[#EDEBE9] bg-white p-4">
          <p className="text-sm font-semibold text-[#323130]">Commenti</p>
          <textarea
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Scrivi un commento..."
            className="mt-3 w-full border border-[#EDEBE9] px-3 py-2 text-sm text-[#323130] outline-none focus:border-[#009B9B]"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="bg-[#009B9B] px-4 py-2 text-sm font-medium text-white hover:bg-[#007575] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Aggiungi commento
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {comments.length === 0 ? (
              <p className="text-sm text-[#605E5C]">Nessun commento presente.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="rounded-md border border-[#EDEBE9] px-3 py-2">
                  <p className="text-sm text-[#323130]">{comment.text}</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#A19F9D]">
                    <span>{comment.createdAt}</span>
                    <button type="button" onClick={() => handleDeleteComment(comment.id)} className="text-[#A4262C] hover:underline">
                      Elimina
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

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
            <h3 className="text-base font-semibold text-[#323130]">{currentRequest.label}</h3>
            <p className="mt-2 text-sm leading-6 text-[#605E5C]">
              {currentRequest.info}
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
