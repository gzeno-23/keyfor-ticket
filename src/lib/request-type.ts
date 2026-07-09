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
}

export function getRequestTypeColor(requestType: string | undefined, fallback = '#009B9B') {
  if (!requestType) return fallback
  const key = requestType.trim().toLowerCase()
  return REQUEST_TYPE_COLOR_MAP[key] ?? fallback
}

