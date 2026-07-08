export function TeamPage() {
  const members = [
    { name: 'Marco Rossi', role: 'Agente Senior', avatar: 'MR', open: 2, resolved: 12 },
    { name: 'Laura Conti', role: 'Agente', avatar: 'LC', open: 1, resolved: 8 },
    { name: 'Andrea Ferri', role: 'Sviluppatore', avatar: 'AF', open: 1, resolved: 5 },
    { name: 'Sara Mancini', role: 'Support Manager', avatar: 'SM', open: 0, resolved: 20 },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Team</h1>
        <p className="text-sm text-neutral-500 mt-1">Panoramica dei membri del team di supporto</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {members.map((m) => (
          <div key={m.name} className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
              {m.avatar}
            </div>
            <div className="flex-1">
              <p className="font-medium text-neutral-800">{m.name}</p>
              <p className="text-xs text-neutral-400">{m.role}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-neutral-400">
                <span className="font-semibold text-neutral-700">{m.open}</span> aperti
              </p>
              <p className="text-xs text-neutral-400">
                <span className="font-semibold text-green-600">{m.resolved}</span> risolti
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
