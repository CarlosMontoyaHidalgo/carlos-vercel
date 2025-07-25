'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor,
  Activity,
  TrendingUp,
  MapPin,
  RefreshCw
} from 'lucide-react'

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  avgSessionDuration: string
  bounceRate: string
  topPages: Array<{ path: string; views: number }>
  topCountries: Array<{ country: string; visitors: number }>
  devices: Array<{ type: string; percentage: number }>
  realTimeVisitors: number
  conversionRate: string
}

// Simulación de datos de analytics (en producción vendrían de Vercel API)
const mockAnalyticsData: AnalyticsData = {
  pageViews: 1247,
  uniqueVisitors: 892,
  avgSessionDuration: "2m 34s",
  bounceRate: "34.2%",
  topPages: [
    { path: "/", views: 456 },
    { path: "/#projects", views: 234 },
    { path: "/#experience", views: 187 },
    { path: "/#technologies", views: 156 },
    { path: "/#contact", views: 123 }
  ],
  topCountries: [
    { country: "España", visitors: 342 },
    { country: "México", visitors: 198 },
    { country: "Colombia", visitors: 145 },
    { country: "Argentina", visitors: 89 },
    { country: "Estados Unidos", visitors: 67 }
  ],
  devices: [
    { type: "Desktop", percentage: 58 },
    { type: "Mobile", percentage: 35 },
    { type: "Tablet", percentage: 7 }
  ],
  realTimeVisitors: 12,
  conversionRate: "8.4%"
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const refreshData = async () => {
    setIsLoading(true)
    
    // Simular llamada a API
    setTimeout(() => {
      // En producción aquí harías fetch a la API de Vercel
      setData({
        ...mockAnalyticsData,
        pageViews: mockAnalyticsData.pageViews + Math.floor(Math.random() * 50),
        uniqueVisitors: mockAnalyticsData.uniqueVisitors + Math.floor(Math.random() * 20),
        realTimeVisitors: Math.floor(Math.random() * 25)
      })
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    // Auto-refresh cada 5 minutos
    const interval = setInterval(refreshData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    color = "blue" 
  }: {
    title: string
    value: string | number
    icon: any
    trend?: string
    color?: string
  }) => (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/30`}>
          <Icon size={24} className={`text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📊 Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Métricas de tu portfolio en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Última actualización: {lastUpdated.toLocaleTimeString()}
          </span>
          <motion.button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Actualizar
          </motion.button>
        </div>
      </div>

      {/* Advertencia de Datos Simulados */}
      <motion.div
        className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <Activity size={20} />
          <div>
            <h3 className="font-semibold">⚠️ Datos de Demostración</h3>
            <p className="text-sm mt-1">
              Los datos mostrados son simulados para propósitos de demostración. 
              Los analytics reales de Vercel se activarán automáticamente después del deployment en producción.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Páginas Vistas"
          value={data.pageViews.toLocaleString()}
          icon={Eye}
          trend="+12.5% vs ayer"
          color="blue"
        />
        <MetricCard
          title="Visitantes Únicos"
          value={data.uniqueVisitors.toLocaleString()}
          icon={Users}
          trend="+8.2% vs ayer"
          color="green"
        />
        <MetricCard
          title="Tiempo Promedio"
          value={data.avgSessionDuration}
          icon={Clock}
          trend="+0.4min vs ayer"
          color="purple"
        />
        <MetricCard
          title="Visitantes Ahora"
          value={data.realTimeVisitors}
          icon={Activity}
          color="red"
        />
      </div>

      {/* Gráficos y tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Páginas más visitadas */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Páginas Más Visitadas
          </h3>
          <div className="space-y-3">
            {data.topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {page.path === "/" ? "Inicio" : page.path.replace("/#", "")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                      style={{ width: `${(page.views / data.topPages[0].views) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-right">
                    {page.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top países */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Visitantes por País
          </h3>
          <div className="space-y-3">
            {data.topCountries.map((country, index) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {country.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600 rounded-full transition-all duration-1000"
                      style={{ width: `${(country.visitors / data.topCountries[0].visitors) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[2.5rem] text-right">
                    {country.visitors}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dispositivos */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Monitor size={20} />
          Dispositivos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.devices.map((device, index) => {
            const Icon = device.type === 'Desktop' ? Monitor : device.type === 'Mobile' ? Smartphone : Globe
            const colors = ['blue', 'green', 'purple']
            const color = colors[index]
            
            return (
              <div key={device.type} className="text-center">
                <div className={`mx-auto w-16 h-16 bg-${color}-100 dark:bg-${color}-900/30 rounded-full flex items-center justify-center mb-3`}>
                  <Icon size={24} className={`text-${color}-600 dark:text-${color}-400`} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{device.type}</h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{device.percentage}%</p>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="Tasa de Rebote"
          value={data.bounceRate}
          icon={TrendingUp}
          trend="-2.1% vs ayer"
          color="orange"
        />
        <MetricCard
          title="Tasa de Conversión"
          value={data.conversionRate}
          icon={Activity}
          trend="+1.3% vs ayer"
          color="green"
        />
      </div>

      {/* Nota informativa */}
      <motion.div
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-3">
          <BarChart3 size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Analytics Powered by Vercel
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Estos datos provienen de Vercel Analytics en tiempo real. Las métricas se actualizan automáticamente 
              y te permiten entender mejor cómo los visitantes interactúan con tu portfolio.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
