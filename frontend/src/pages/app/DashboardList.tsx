import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutDashboard, Globe, Lock, BarChart2, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { mockDashboards } from '@/utils/mockData';

const gradients = [
  'from-brand-500/20 to-violet-500/20',
  'from-violet-500/20 to-pink-500/20',
  'from-emerald-500/20 to-cyan-500/20',
  'from-amber-500/20 to-orange-500/20',
  'from-brand-500/20 to-emerald-500/20',
  'from-slate-500/20 to-brand-500/20',
];

export default function DashboardList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = mockDashboards.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard size={22} className="text-brand-400" /> Dashboards
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">{mockDashboards.length} dashboards in your workspace</p>
        </div>
        <button onClick={() => navigate('/app/dashboard-builder')} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> New Dashboard
        </button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search dashboards..." className="input w-full max-w-sm" />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((d, idx) => (
          <div key={d.id}
            className="card group cursor-pointer hover:border-brand-500/40 hover:-translate-y-0.5 transition-all duration-200"
            onClick={() => navigate('/app/dashboard-builder')}>
            {/* Thumbnail */}
            <div className={`h-36 rounded-t-xl bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center border-b border-dark-border`}>
              <BarChart2 size={40} className="text-white/20" />
            </div>
            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{d.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{d.description}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-dark-muted text-slate-500 hover:text-white transition-colors"
                    onClick={e => { e.stopPropagation(); }}>
                    <Edit2 size={13} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-colors"
                    onClick={e => { e.stopPropagation(); }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-border">
                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <BarChart2 size={11} /> {d.widgets} widgets
                  </span>
                  <span className="flex items-center gap-1">
                    {d.isPublic ? <Globe size={11} className="text-emerald-400" /> : <Lock size={11} />}
                    {d.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-600">{d.lastEdited}</span>
              </div>
            </div>
          </div>
        ))}

        {/* New dashboard card */}
        <div onClick={() => navigate('/app/dashboard-builder')}
          className="card border-dashed border-dark-border hover:border-brand-500/50 cursor-pointer h-64 flex flex-col items-center justify-center gap-3 text-slate-600 hover:text-brand-400 transition-all duration-200">
          <div className="w-12 h-12 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
            <Plus size={22} />
          </div>
          <p className="text-sm font-medium">Create New Dashboard</p>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-600">
          <ExternalLink size={40} className="mx-auto mb-3 opacity-20" />
          <p>No dashboards match "{search}"</p>
        </div>
      )}
    </div>
  );
}
