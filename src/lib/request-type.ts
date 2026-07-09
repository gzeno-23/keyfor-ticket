const REQUEST_TYPE_COLOR_MAP: Record<string, string> = {
  'sposta data': '#009B9B',
  'sposta-data': '#009B9B',
  'non conformita': '#D83B01',
  'non conformità': '#D83B01',
  'non-conformita': '#D83B01',
  'non-conformità': '#D83B01',
  sollecito: '#FFB900',
  'giacenza articolo': '#0078D4',
  'giacenza-articolo': '#0078D4',
  'reso merce': '#5C2D91',
  'reso-merce': '#5C2D91',
  'variazione prezzo': '#8764B8',
  'variazione-prezzo': '#8764B8',
  'blocco ordine': '#D83B01',
  'blocco-ordine': '#D83B01',
  'sblocco ordine': '#498205',
  'sblocco-ordine': '#498205',
  'verifica pagamento': '#0078D4',
  'verifica-pagamento': '#0078D4',
  'aggiornamento anagrafica': '#00B7C3',
  'aggiornamento-anagrafica': '#00B7C3',
  'richiesta fattura': '#986F0B',
  'richiesta-fattura': '#986F0B',
  'reclamo trasporto': '#A4262C',
  'reclamo-trasporto': '#A4262C',
  'priorita consegna': '#038387',
  'priorità consegna': '#038387',
  'priorita-consegna': '#038387',
  'priorità-consegna': '#038387',
  'richiesta documenti': '#8764B8',
  'richiesta-documenti': '#8764B8',
  'cambio vettore': '#107C10',
  'cambio-vettore': '#107C10',
}

export function getRequestTypeColor(requestType: string | undefined, fallback = '#009B9B') {
  if (!requestType) return fallback
  const key = requestType.trim().toLowerCase()
  return REQUEST_TYPE_COLOR_MAP[key] ?? fallback
}
