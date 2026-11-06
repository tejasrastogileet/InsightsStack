import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockRevenueTrend, mockCustomerGrowth, mockTrafficSources, mockRegionalData, mockMonthlySummary } from '@/utils/mockData';
import { TrendingUp, Users, Globe, BarChart2 } from 'lucide-react';

const tabs = ['Revenue', 'Customers', 'Traffic', 'Regional'] as const;
type Tab = typeof tabs[number];

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3 text-xs shadow-xl space-y-1">
      <p className="text-slate-400 font-medium mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{typeof p.value === 'number' && p.value > 999 ? `$${(p.value/1000).toFixed(0)}K` : p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const [tab, setTab] = useState<Tab>('Revenue');

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart2 size={22} className="text-brand-400" /> Analytics Explorer
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Deep dive into your business metrics</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: '24.1K', icon: Users, color: 'text-brand-400', bg: 'bg-brand-500/10', change: '+18%' },
          { label: 'Avg Bounce Rate', value: '28%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', change: '-12%' },
          { label: 'New Customers', value: '840', icon: Users, color: 'text-violet-400', bg: 'bg-violet-500/10', change: '+24%' },
          { label: 'Global Regions', value: '6', icon: Globe, color: 'text-amber-400', bg: 'bg-amber-500/10', change: '+1' },
        ].map(s => (
          <div key={s.label} className="card p-5">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={16} className={s.color} />
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className={`text-xs font-medium ${s.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 bg-dark-card border border-dark-border rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? 'bg-brand-500 text-white shadow-glow-sm' : 'text-slate-400 hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="card p-6">
        {tab === 'Revenue' && (
          <>
            <h2 className="text-white font-semibold mb-5">Revenue & Profit Trend (12 months)</h2>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={mockRevenueTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
                <Tooltip content={<Tip />} />
                <Legend formatter={v => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#g1)" name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#g2)" name="Profit" />
                <Area type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={2} fill="none" strokeDasharray="4 2" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}

        {tab === 'Customers' && (
          <>
            <h2 className="text-white font-semibold mb-5">Customer Growth (New vs Churned)</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={mockCustomerGrowth} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Legend formatter={v => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
                <Bar dataKey="new" name="New Customers" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="churned" name="Churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="net" name="Net Growth" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {tab === 'Traffic' && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-white font-semibold mb-5">Traffic Sources</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={mockTrafficSources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={55} paddingAngle={4}>
                    {mockTrafficSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v}%`, 'Share']} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {mockTrafficSources.map((s, i) => (
                <div key={s.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                  <p className="text-sm text-slate-300 flex-1">{s.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-dark-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: COLORS[i % COLORS.length] }} />
                    </div>
                    <span className="text-sm font-medium text-white w-8 text-right">{s.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Regional' && (
          <>
            <h2 className="text-white font-semibold mb-5">Revenue by Region</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={mockRegionalData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
                <YAxis type="category" dataKey="region" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {/* Sessions table */}
      {tab === 'Revenue' && (
        <div className="card p-6">
          <h2 className="text-white font-semibold mb-4">Monthly Session Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  {['Month', 'Sessions', 'Page Views', 'Bounce Rate'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {mockMonthlySummary.map(row => (
                  <tr key={row.month} className="hover:bg-dark-card/50 transition-colors">
                    <td className="px-3 py-3 text-slate-300 font-medium">{row.month}</td>
                    <td className="px-3 py-3 text-slate-300">{row.sessions.toLocaleString()}</td>
                    <td className="px-3 py-3 text-slate-300">{row.pageviews.toLocaleString()}</td>
                    <td className="px-3 py-3">
                      <span className={`badge ${row.bounceRate < 35 ? 'badge-success' : row.bounceRate < 40 ? 'badge-warning' : 'badge-error'}`}>
                        {row.bounceRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
