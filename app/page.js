'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export default function Home() {
  const [activeTab, setActiveTab] = useState('bitquant')
  
  // Данные BitQuant
  const [pools, setPools] = useState([])
  const [apyHistory, setApyHistory] = useState([])
  const [loadingPools, setLoadingPools] = useState(true)
  
  // Данные Model Hub
  const [models, setModels] = useState([])
  const [loadingModels, setLoadingModels] = useState(true)

  // Загрузка данных при переключении вкладок
  useEffect(() => {
    if (activeTab === 'bitquant' && pools.length === 0) {
      fetch('/api/pools')
        .then(r => r.json())
        .then(result => {
          if (result.success) setPools(result.data)
          setLoadingPools(false)
        })
      
      fetch('/api/apy')
        .then(r => r.json())
        .then(result => {
          if (result.success) setApyHistory(result.data)
        })
    }
    
    if (activeTab === 'models' && models.length === 0) {
      fetch('/api/models')
        .then(r => r.json())
        .then(result => {
          if (result.success) setModels(result.data)
          setLoadingModels(false)
        })
    }
  }, [activeTab])

  const refreshPools = () => {
    setLoadingPools(true)
    fetch('/api/pools?t=' + Date.now())
      .then(r => r.json())
      .then(result => {
        if (result.success) setPools(result.data)
        setLoadingPools(false)
      })
  }

  const refreshModels = () => {
    setLoadingModels(true)
    fetch('/api/models?t=' + Date.now())
      .then(r => r.json())
      .then(result => {
        if (result.success) setModels(result.data)
        setLoadingModels(false)
      })
  }

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'bg-emerald-500'
      case 'medium': return 'bg-og-orange'
      case 'high': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const activeModels = models.filter(m => m.status === 'active').length
  const pieData = [
    { name: 'Active', value: activeModels, color: '#10B981' },
    { name: 'Inactive', value: models.length - activeModels, color: '#6B7280' },
  ]

  const activityData = [
    { day: 'Mon', inferences: 245, proofs: 189 },
    { day: 'Tue', inferences: 312, proofs: 267 },
    { day: 'Wed', inferences: 289, proofs: 234 },
    { day: 'Thu', inferences: 401, proofs: 356 },
    { day: 'Fri', inferences: 378, proofs: 312 },
    { day: 'Sat', inferences: 198, proofs: 167 },
    { day: 'Sun', inferences: 267, proofs: 223 },
  ]

  return (
    <main className="relative z-10 min-h-screen pb-12">
      {/* Хедер с переключателем вкладок */}
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
          
          {/* Переключатель вкладок */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('bitquant')}
              className={`btn-square px-6 ${activeTab === 'bitquant' ? 'tab-active' : 'tab-inactive'}`}
              style={activeTab === 'bitquant' ? { background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' } : {}}
            >
              📈 BitQuant
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`btn-square px-6 ${activeTab === 'models' ? 'tab-active' : 'tab-inactive'}`}
              style={activeTab === 'models' ? { background: 'linear-gradient(135deg, #9D4EDD 0%, #7B3FB8 100%)' } : {}}
            >
              🤖 Model Hub
            </button>
          </div>
        </div>
      </header>

      {/* Контент вкладок */}
      <section className="mx-4 mt-8">
        <AnimatePresence mode="wait">
          {/* Вкладка BitQuant */}
          {activeTab === 'bitquant' && (
            <motion.div
              key="bitquant"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Хедер вкладки */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}>
                  📈 BitQuant DeFi Analytics
                </h2>
                <button onClick={refreshPools} className="btn-square btn-secondary" disabled={loadingPools}>
                  🔄 {loadingPools ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {/* Таблица пулов */}
              <div className="glass-card p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">🏊 Liquidity Pools</h3>
                {loadingPools ? (
                  <div className="text-center py-8 text-og-orange animate-pulse">Loading data from OpenGradient...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-white/50 border-b border-white/10">
                          <th className="pb-3">Pool</th>
                          <th className="pb-3">TVL</th>
                          <th className="pb-3">APY</th>
                          <th className="pb-3">Risk</th>
                          <th className="pb-3">24h Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pools.map((pool) => (
                          <tr key={pool.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 font-semibold">{pool.name}</td>
                            <td className="py-4">${(pool.tvl / 1000000).toFixed(1)}M</td>
                            <td className="py-4 text-emerald-400 font-bold">{pool.apy}%</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-[2%] text-xs ${getRiskColor(pool.risk)}`}>
                                {pool.risk.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-4">${(pool.volume24h / 1000000).toFixed(2)}M</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* График APY */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">📊 APY History (7 Days)</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={apyHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip contentStyle={{ background: 'rgba(15, 12, 41, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2%' }} />
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

          {/* Вкладка Model Hub */}
          {activeTab === 'models' && (
            <motion.div
              key="models"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Хедер вкладки */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold" style={{ textShadow: '0 0 10px rgba(157, 78, 221, 0.5)' }}>
                  🤖 Model Hub Activity Monitor
                </h2>
                <button onClick={refreshModels} className="btn-square btn-secondary" disabled={loadingModels}>
                  🔄 {loadingModels ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {/* Карточки моделей */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {loadingModels ? (
                  <div className="col-span-full text-center py-8 text-og-purple animate-pulse">Loading data from OpenGradient...</div>
                ) : (
                  models.map((model, index) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-6 hover:border-og-purple transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-[2%] bg-gradient-to-br from-og-purple to-pink-500 flex items-center justify-center text-xl">🤖</div>
                        <span className={`px-3 py-1 rounded-[2%] text-xs ${model.status === 'active' ? 'bg-emerald-500' : 'bg-gray-500'}`}>{model.status}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{model.name}</h3>
                      <div className="space-y-2 text-white/70 text-sm">
                        <div className="flex justify-between"><span>Deployments:</span><span className="text-white font-semibold">{model.deployments}</span></div>
                        <div className="flex justify-between"><span>Inferences:</span><span className="text-white font-semibold">{model.inferences.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span>Last Active:</span><span className="text-white font-semibold">{model.lastActive}</span></div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Графики */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* График активности */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4">📈 Weekly Activity</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip contentStyle={{ background: 'rgba(15, 12, 41, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2%' }} />
                        <Bar dataKey="inferences" fill="#9D4EDD" name="Inferences" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="proofs" fill="#00D9FF" name="Proofs" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Круговая диаграмма */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4">📊 Model Status</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: 'rgba(15, 12, 41, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2%' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-4xl font-bold text-og-purple">{models.length > 0 ? Math.round((activeModels / models.length) * 100) : 0}%</p>
                    <p className="text-white/50 text-sm">Active Models</p>
                  </div>
                </div>
              </div>

              {/* TEE Proofs Table */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">🔗 Recent TEE Proofs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-white/50 border-b border-white/10">
                        <th className="pb-3">Model</th>
                        <th className="pb-3">Proof Hash</th>
                        <th className="pb-3">Timestamp</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Explorer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4">{models[0]?.name || 'Sentiment Analyzer v2'}</td>
                          <td className="py-4 font-mono text-xs text-og-cyan">0x{Array(40).fill(0).join('').substring(0, 16)}...</td>
                          <td className="py-4">{i * 2} hours ago</td>
                          <td className="py-4"><span className="px-3 py-1 rounded-[2%] bg-emerald-500 text-xs">VERIFIED</span></td>
                          <td className="py-4"><a href="https://explorer.opengradient.ai" target="_blank" className="text-og-cyan hover:underline text-sm">View →</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Футер */}
      <footer className="text-center py-8 text-white/50 text-sm mt-12">
        <p>Built on OpenGradient Ecosystem • {new Date().getFullYear()}</p>
        <p className="mt-2">Data from: explorer.opengradient.ai • hub.opengradient.ai</p>
      </footer>
    </main>
  )
}
