import { Server, Users, CreditCard, Activity, Check, TrendingUp } from 'lucide-react';
import { mockPlans, mockTeamMembers } from '@/utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const usageData = [
  { day: 'Mon', queries: 1240, exports: 34 },
  { day: 'Tue', queries: 1890, exports: 51 },
  { day: 'Wed', queries: 1650, exports: 44 },
  { day: 'Thu', queries: 2100, exports: 67 },
  { day: 'Fri', queries: 1980, exports: 58 },
  { day: 'Sat', queries: 780, exports: 22 },
  { day: 'Sun', queries: 620, exports: 18 },
];

const stats = [
  { label: 'Total Users', value: '18,340', icon: Users, color: 'text-brand-400', bg: 'bg-brand-500/10' },
  { label: 'Active Plan', value: 'Pro', icon: CreditCard, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { label: 'API Calls Today', value: '24.1K', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Server Uptime', value: '99.98%', icon: Server, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

export default function AdminPanel() {
  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-slate-400 text-sm mt-0.5">System-wide settings, billing, and platform usage.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Subscription Plans */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="text-white font-semibold mb-5">Subscription Plans</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {mockPlans.map((plan) => (
              <div key={plan.id} className={`rounded-xl p-5 border transition-all ${
                plan.active
                  ? 'border-brand-500/50 bg-brand-500/8 shadow-glow'
                  : 'border-dark-border bg-dark-card'
              }`}>
                {plan.active && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-semibold mb-3">
                    <TrendingUp size={10} /> Current Plan
                  </span>
                )}
                <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                <p className="text-2xl font-extrabold text-white mt-1">
                  ${plan.price}<span className="text-sm text-slate-500 font-normal">/mo</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> {plan.users === 999 ? 'Unlimited' : plan.users} Users</li>
                  <li className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> {plan.dashboards === 999 ? 'Unlimited' : plan.dashboards} Dashboards</li>
                  <li className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> {plan.datasets === 999 ? 'Unlimited' : plan.datasets} Datasets</li>
                </ul>
                {!plan.active && (
                  <button className="btn-secondary w-full mt-4 text-xs justify-center">Upgrade</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Team Members</h2>
            <span className="badge-muted">{mockTeamMembers.length} total</span>
          </div>
          <div className="space-y-3">
            {mockTeamMembers.slice(0, 4).map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{m.name}</p>
                  <p className="text-xs text-slate-500 truncate">{m.email}</p>
                </div>
                <span className={`badge text-[10px] ${
                  m.role === 'admin' ? 'badge-primary' :
                  m.role === 'manager' ? 'badge-violet' : 'badge-muted'
                }`}>{m.role}</span>
              </div>
            ))}
          </div>
          <button className="btn-secondary w-full mt-4 text-xs justify-center">Manage Team</button>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="card p-6">
        <h2 className="text-white font-semibold mb-5">Weekly Platform Usage</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={usageData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, color: '#fff', fontSize: 12 }} />
            <Bar dataKey="queries" name="AI Queries" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="exports" name="Exports" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
