'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

// Моковые данные
const POOLS = [
  { id: 1, name: 'ETH/USDC', tvl: 12500000, apy: 24.5, risk: 'medium', volume24h: 3200000 },
  { id: 2, name: 'OPG/ETH', tvl: 4200000, apy: 42.3, risk: 'high', volume24h: 890000 },
  { id: 3, name: 'USDC/USDT', tvl: 28000000, apy: 8.2, risk: 'low', volume24h: 5100000 },
]

const MODELS = [
  { id: 1, name: 'Sentiment Analyzer v2', deployments: 12, inferences: 1847, lastActive: '2h ago', status: 'active' },
  { id: 2, name: 'Image Classifier Pro', deployments: 8, inferences: 3421, lastActive: '5h ago', status: 'active' },
  { id: 3, name: 'Trading Signal Bot', deployments: 5, inferences: 892, lastActive: '1d ago', status: 'inactive' },
]

const APY_DATA = [
  { date: '01/01', ETH_USDC: 22.1, OPG_ETH: 38.5, USDC_USDT: 7.8 },
  { date: '01/02', ETH_USDC: 23.4, OPG_ETH: 40.2, USDC_USDT: 8.1 },
  { date: '01/03', ETH_USDC: 24.5, OPG_ETH: 42.3, USDC_USDT: 8.2 },
  { date: '01/04', ETH_USDC: 23.8, OPG_ETH: 41.1, USDC_USDT: 7.9 },
  { date: '01/05', ETH_USDC: 25.2, OPG_ETH: 44.6, USDC_USDT: 8.4 },
  { date: '01/06', ETH_USDC: 24.9, OPG_ETH: 43.8, USDC_USDT: 8.3 },
  { date: '01/07', ETH_USDC: 24.5, OPG_ETH: 42.3, USDC_USDT: 8.2 },
]

const ACTIVITY_DATA = [
  { day: 'Mon', inferences: 245, proofs: 189 },
  { day: 'Tue', inferences: 312, proofs: 267 },
  { day: 'Wed', inferences: 289, proofs: 234 },
  { day: 'Thu', inferences: 401, proofs: 356 },
  { day: 'Fri', inferences: 378, proofs: 312 },
  { day: 'Sat', inferences: 198, proofs: 167 },
  { day: 'Sun', inferences: 267, proofs: 223 },
]

const MEMSYNC = {
  stats: { totalItems: 1678, encryptedItems: 1678, storageUsed: '2.4 GB', lastBackup: '2024-01-15' },
  sources: [
    { id: 1, name: 'Twitter/X', status: 'synced', lastSync: '5m ago', items: 1247 },
    { id: 2, name: 'Google Drive', status: 'synced', lastSync: '1h ago', items: 89 },
    { id: 3, name: 'Notion', status: 'pending', lastSync: '-', items: 0 },
  ]
}

// Утилита экспорта
function exportCSV(data, filename, cols) {
  if (!data?.length) return
  const header = cols.map(c => c.label).join(',')
  const rows = data.map(item => cols.map(col => {
    const v = item[col.key]
    return typeof v === 'string' && (v.includes(',') || v.includes('"')) ? `"${v.replace(/"/g, '""')}"` : v
  }).join(','))
  const csv = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
}

const POOL_COLS = [
  { key: 'name', label: 'Pool' }, { key: 'tvl', label: 'TVL' },
  { key: 'apy', label: 'APY' }, { key: 'risk', label: 'Risk' }, { key: 'volume24h', label: '24h Vol' },
]
const MODEL_COLS = [
  { key: 'name', label: 'Model' }, { key: 'deployments', label: 'Deploys' },
  { key: 'inferences', label: 'Inferences' }, { key: 'lastActive', label: 'Active' }, { key: 'status', label: 'Status' },
]

export default function Home() {
  const [tab, setTab] = useState('bitquant')
  const [updated, setUpdated] = useState(null)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const i = setInterval(() => setUpdated(new Date()), 30000)
    setUpdated(new Date())
    return () => clearInterval(i)
  }, [auto])

  const riskCol = (r) => ({ low: 'bg-emerald-500', medium: 'bg-og-orange', high: 'bg-red-500' }[r] || 'bg-gray-500')
  const activeM = MODELS.filter(m => m.status === 'active').length
  const pie = [
    { name: 'Active', value: activeM, color: '#10B981' },
    { name: 'Inactive', value: MODELS.length - activeM, color: '#6B7280' },
  ]

  return (
    <main className="relative z-10 min-h-screen pb-12">
      {/* Header */}
      <header className="glass-card mx-4 mt-4 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[2%] bg-gradient-to-br from-og-orange to-og-purple flex items-center justify-center neon-glow">
              <span className="text-2xl font-bold">∇</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold neon-glow">OG Intelligence Hub</h1>
              <p className="text-white/50 text-sm">OpenGradient Ecosystem</p>
            </div>
          </div>
          
        </div>
      </header>

      {/* Tabs */}
      <nav className="mx-4 mt-6">
        <div className="glass-card p-2 inline-flex gap-2 flex-wrap">
          {[
            { id: 'bitquant', label: '📈 BitQuant', color: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
            { id: 'models', label: '🤖 Model Hub', color: 'linear-gradient(135deg, #9D4EDD 0%, #7B3FB8 100%)' },
            { id: 'memsync', label: '🧠 MemSync', color: 'linear-gradient(135deg, #00D9FF 0%, #06B6D4 100%)' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`btn-square px-4 md:px-6 ${tab === t.id ? 'tab-active' : 'tab-inactive'}`}
              style={tab === t.id ? { background: t.color } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <section className="mx-4 mt-8">
        <AnimatePresence mode="wait">
          
          {/* BITQUANT */}
          {tab === 'bitquant' && (
            <motion.div key="bq" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <h2 className="text-3xl font-bold" style={{ textShadow: '0 0 10px rgba(16,185,129,0.5)' }}>📈 BitQuant DeFi Analytics</h2>
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm">🕐 {updated?.toLocaleTimeString() || '—'}</span>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <span className="text-white/60 hidden md:inline">Авто</span>
                    <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:bg-emerald-500 transition-colors"></div>
                    <div className="absolute w-4 h-5 bg-white rounded-[2%] transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>

              <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">🏊 Liquidity Pools</h3>
                  <button onClick={() => exportCSV(POOLS, 'pools', POOL_COLS)} className="btn-square btn-secondary text-sm">📥 Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-white/50 border-b border-white/10">
                        <th className="pb-3">Pool</th><th className="pb-3">TVL</th>
                        <th className="pb-3">APY</th><th className="pb-3">Risk</th>
                        <th className="pb-3">24h Vol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {POOLS.map(p => (
                        <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-4 font-semibold">{p.name}</td>
                          <td className="py-4">${(p.tvl/1e6).toFixed(1)}M</td>
                          <td className="py-4 text-emerald-400 font-bold">{p.apy}%</td>
                          <td className="py-4"><span className={`px-3 py-1 rounded-[2%] text-xs ${riskCol(p.risk)}`}>{p.risk.toUpperCase()}</span></td>
                          <td className="py-4">${(p.volume24h/1e6).toFixed(2)}M</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">📊 APY History</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={APY_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip contentStyle={{ background: 'rgba(15,12,41,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2%' }} />
                      <Legend />
                      <Line type="monotone" dataKey="ETH_USDC" stroke="#10B981" strokeWidth={2} name="ETH/USDC" />
                      <Line type="monotone" dataKey="OPG_ETH" stroke="#FF8C00" strokeWidth={2} name="OPG/ETH" />
                      <Line type="monotone" dataKey="USDC_USDT" stroke="#00D9FF" strokeWidth={2} name="USDC/USDT" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* MODEL HUB */}
          {tab === 'models' && (
            <motion.div key="mh" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold" style={{ textShadow: '0 0 10px rgba(157,78,221,0.5)' }}>🤖 Model Hub</h2>
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm">🕐 {updated?.toLocaleTimeString() || '—'}</span>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <span className="text-white/60 hidden md:inline">Авто</span>
                    <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:bg-emerald-500 transition-colors"></div>
                    <div className="absolute w-4 h-5 bg-white rounded-[2%] transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <button onClick={() => exportCSV(MODELS, 'models', MODEL_COLS)} className="btn-square btn-secondary text-sm">📥 Export CSV</button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {MODELS.map((m, i) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} className="glass-card p-6 hover:border-og-purple transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-[2%] bg-gradient-to-br from-og-purple to-pink-500 flex items-center justify-center text-xl">🤖</div>
                      <span className={`px-3 py-1 rounded-[2%] text-xs ${m.status==='active'?'bg-emerald-500':'bg-gray-500'}`}>{m.status}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{m.name}</h3>
                    <div className="space-y-2 text-white/70 text-sm">
                      <div className="flex justify-between"><span>Deploys:</span><span className="text-white font-semibold">{m.deployments}</span></div>
                      <div className="flex justify-between"><span>Inferences:</span><span className="text-white font-semibold">{m.inferences.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span>Active:</span><span className="text-white font-semibold">{m.lastActive}</span></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4">📈 Weekly Activity</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ACTIVITY_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip contentStyle={{ background: 'rgba(15,12,41,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2%' }} />
                        <Bar dataKey="inferences" fill="#9D4EDD" name="Inferences" radius={[4,4,0,0]} />
                        <Bar dataKey="proofs" fill="#00D9FF" name="Proofs" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4">📊 Status</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pie} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                          {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: 'rgba(15,12,41,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2%' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-4xl font-bold text-og-purple">{MODELS.length ? Math.round(activeM/MODELS.length*100) : 0}%</p>
                    <p className="text-white/50 text-sm">Active</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* MEMSYNC */}
          {tab === 'memsync' && (
            <motion.div key="ms" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold" style={{ textShadow: '0 0 10px rgba(0,217,255,0.5)' }}>🧠 MemSync</h2>
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm">🕐 {updated?.toLocaleTimeString() || '—'}</span>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <span className="text-white/60 hidden md:inline">Авто</span>
                    <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:bg-emerald-500 transition-colors"></div>
                    <div className="absolute w-4 h-5 bg-white rounded-[2%] transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>

              {MEMSYNC.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-og-cyan">{MEMSYNC.stats.totalItems.toLocaleString()}</p>
                    <p className="text-white/50 text-sm">Items</p>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-400">{MEMSYNC.stats.encryptedItems.toLocaleString()}</p>
                    <p className="text-white/50 text-sm">Encrypted</p>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-og-purple">{MEMSYNC.stats.storageUsed}</p>
                    <p className="text-white/50 text-sm">Storage</p>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-og-orange">{MEMSYNC.stats.lastBackup}</p>
                    <p className="text-white/50 text-sm">Backup</p>
                  </div>
                </div>
              )}

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">🔗 Sources</h3>
                <div className="space-y-4">
                  {MEMSYNC.sources?.map(src => (
                    <div key={src.id} className="flex items-center justify-between p-4 rounded-[2%] bg-white/5">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${src.status==='synced'?'bg-emerald-500':src.status==='pending'?'bg-og-orange':'bg-red-500'}`}></div>
                        <div>
                          <p className="font-semibold">{src.name}</p>
                          <p className="text-white/50 text-sm">{src.items.toLocaleString()} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white/70 text-sm">{src.lastSync}</p>
                        <span className={`px-2 py-1 rounded-[2%] text-xs ${src.status==='synced'?'bg-emerald-500/20 text-emerald-400':src.status==='pending'?'bg-og-orange/20 text-og-orange':'bg-red-500/20 text-red-400'}`}>{src.status.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

      <footer className="text-center py-8 text-white/50 text-sm mt-12">
        <p>Built on OpenGradient • {new Date().getFullYear()}</p>
      </footer>
    </main>
  )
}
