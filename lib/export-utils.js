// Конвертация данных в CSV
export function exportToCSV(data, filename, columns) {
  if (!data || data.length === 0) return
  
  const header = columns.map(col => col.label).join(',')
  
  const rows = data.map(item => 
    columns.map(col => {
      const value = item[col.key]
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  )
  
  const csv = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const POOL_COLUMNS = [
  { key: 'name', label: 'Pool' },
  { key: 'tvl', label: 'TVL (USD)' },
  { key: 'apy', label: 'APY (%)' },
  { key: 'risk', label: 'Risk' },
  { key: 'volume24h', label: '24h Volume (USD)' },
]

export const MODEL_COLUMNS = [
  { key: 'name', label: 'Model Name' },
  { key: 'deployments', label: 'Deployments' },
  { key: 'inferences', label: 'Total Inferences' },
  { key: 'lastActive', label: 'Last Active' },
  { key: 'status', label: 'Status' },
]
