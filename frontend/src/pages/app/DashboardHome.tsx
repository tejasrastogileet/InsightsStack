import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Users, DollarSign, BarChart2, Clock, ArrowUpRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockKPIs, mockRevenueTrend, mockActivityFeed } from '@/utils/mockData';

const iconMap: Record<string, React.FC<any>> = {
  dollar: DollarSign, users: Users, percent: BarChart2, clock: Clock,
};

const colorMap: Record<string, string> = {
  brand: 'bg-brand-500/15 text-brand-400 border-brand-500/20',
  violet: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  amber: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
};

const activityColors: Record<string, string> = {
  create: 'text-brand-400', export: 'text-violet-400',
  invite: 'text-emerald-400', ai: 'text-amber-400', upload: 'text-blue-400',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3 text-xs space-y-1 shadow-xl">
      <p className="text-slate-400 font-medium">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: <span className="font-bold">${(p.value / 1000).toFixed(0)}K</span>
        </p>
      ))}
    </div>
  );
};

export default function DashboardHome() {
  const [range, setRange] = useState<'3m' | '6m' | '1y'>('1y');
  const sliceMap = { '3m': 3, '6m': 6, '1y': 12 };
  const chartData = mockRevenueTrend.slice(-sliceMap[range]);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">Welcome back, Alex · Here's what's happening today</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-dark-card border border-dark-border rounded-xl px-3 py-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-slate-400">Live · Updated 2m ago</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockKPIs.map((kpi) => {
          const Icon = iconMap[kpi.icon] ?? BarChart2;
          const isUp = kpi.trend === 'up';
          const isFlat = kpi.trend === 'flat';
          return (
            <div key={kpi.id} className="card p-5 hover:border-brand-500/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${colorMap[kpi.color]}`}>
                  <Icon size={18} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${
                  isUp ? 'bg-emerald-500/10 text-emerald-400' :
                  isFlat ? 'bg-slate-500/10 text-slate-400' :
                  'bg-red-500/10 text-red-400'}`}>
                  {isUp ? <TrendingUp size={12} /> : isFlat ? <Minus size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(kpi.change)}%
                </div>
              </div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-slate-600 mt-1">vs last month</p>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-semibold">Revenue & Profit</h2>
              <p className="text-slate-500 text-xs mt-0.5">Monthly breakdown</p>
            </div>
            <div className="flex gap-1">
              {(['3m', '6m', '1y'] as const).map(r => (
                <button key={r} onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    range === r ? 'bg-brand-500 text-white' : 'text-slate-500 hover:text-white hover:bg-dark-card'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" name="revenue" />
              <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#profGrad)" name="profit" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-0.5 bg-brand-500 rounded-full" /> Revenue</div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-0.5 bg-emerald-500 rounded-full" /> Profit</div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Recent Activity</h2>
            <Activity size={16} className="text-slate-500" />
          </div>
          <div className="space-y-4">
            {mockActivityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg bg-dark-muted flex items-center justify-center flex-shrink-0 ${activityColors[item.type]}`}>
                  <span className="text-xs font-bold">{item.user[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 leading-snug">
                    <span className="font-medium text-white">{item.user}</span>{' '}
                    {item.action}{' '}
                    <span className="text-brand-400 truncate">{item.target}</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors mt-5 group">
            View all activity <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Bar Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-semibold">Monthly Expenses Breakdown</h2>
            <p className="text-slate-500 text-xs mt-0.5">Revenue vs Expenses over the year</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockRevenueTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="revenue" />
            <Bar dataKey="expenses" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
