import { useState } from 'react';
import { Plus, LayoutGrid, BarChart2, TrendingUp, PieChart as PieIcon, Table2, Gauge, Trash2, Move } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockRevenueTrend, mockTrafficSources } from '@/utils/mockData';

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const widgetTypes = [
  { id: 'kpi',   label: 'KPI Card',    icon: Gauge },
  { id: 'line',  label: 'Line Chart',  icon: TrendingUp },
  { id: 'bar',   label: 'Bar Chart',   icon: BarChart2 },
  { id: 'pie',   label: 'Pie Chart',   icon: PieIcon },
  { id: 'table', label: 'Data Table',  icon: Table2 },
];

interface Widget { id: string; type: string; title: string; }

const defaultWidgets: Widget[] = [
  { id: 'w1', type: 'kpi',  title: 'Total Revenue' },
  { id: 'w2', type: 'line', title: 'Revenue Trend' },
  { id: 'w3', type: 'bar',  title: 'Monthly Expenses' },
  { id: 'w4', type: 'pie',  title: 'Traffic Sources' },
];

function WidgetContent({ type }: { type: string }) {
  if (type === 'kpi') return (
    <div className="flex flex-col items-center justify-center h-full gap-1">
      <p className="text-4xl font-extrabold text-white">$2.4M</p>
      <p className="text-xs text-emerald-400 font-medium">↑ 12.5% vs last month</p>
    </div>
  );
  if (type === 'line') return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={mockRevenueTrend.slice(-6)} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
        <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
        <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
        <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#wg)" />
      </AreaChart>
    </ResponsiveContainer>
  );
  if (type === 'bar') return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={mockRevenueTrend.slice(-6)} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
        <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
        <Bar dataKey="expenses" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
  if (type === 'pie') return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={mockTrafficSources} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
          {mockTrafficSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
  return (
    <div className="h-full flex items-center justify-center text-slate-600 text-sm">
      <Table2 size={32} className="opacity-30" />
    </div>
  );
}

export default function DashboardBuilder() {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [name, setName] = useState('My Dashboard');

  const addWidget = (type: string) => {
    const wt = widgetTypes.find(w => w.id === type);
    setWidgets(prev => [...prev, { id: `w${Date.now()}`, type, title: wt?.label ?? 'Widget' }]);
  };

  const removeWidget = (id: string) => setWidgets(prev => prev.filter(w => w.id !== id));

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LayoutGrid size={22} className="text-brand-400 flex-shrink-0" />
          <input value={name} onChange={e => setName(e.target.value)}
            className="bg-transparent text-2xl font-bold text-white border-b border-transparent hover:border-dark-border focus:border-brand-500 outline-none transition-colors px-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary btn-sm">Preview</button>
          <button className="btn-primary btn-sm">Save Dashboard</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Widget palette */}
        <div className="lg:col-span-1">
          <div className="card p-4 sticky top-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Add Widget</p>
            <div className="space-y-1.5">
              {widgetTypes.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => addWidget(id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-dark-card transition-all group">
                  <Icon size={15} className="text-slate-500 group-hover:text-brand-400 transition-colors" />
                  {label}
                  <Plus size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid canvas */}
        <div className="lg:col-span-4">
          {widgets.length === 0 ? (
            <div className="card h-64 flex flex-col items-center justify-center text-slate-600 border-dashed">
              <LayoutGrid size={40} className="opacity-20 mb-3" />
              <p className="text-sm">Add widgets from the palette to get started</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {widgets.map(w => (
                <div key={w.id} className="card group relative" style={{ height: 220 }}>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border flex-shrink-0">
                    <p className="text-sm font-medium text-white truncate">{w.title}</p>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-dark-muted text-slate-500 hover:text-slate-300 cursor-grab">
                        <Move size={13} />
                      </button>
                      <button onClick={() => removeWidget(w.id)} className="p-1 rounded hover:bg-red-500/15 text-slate-500 hover:text-red-400">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-3" style={{ height: 160 }}>
                    <WidgetContent type={w.type} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
