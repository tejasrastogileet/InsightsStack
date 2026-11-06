import { useState } from 'react';
import { Search, Filter, Shield, User } from 'lucide-react';
import { mockAuditLogs } from '@/utils/mockData';

const actionColor: Record<string, string> = {
  DASHBOARD_CREATED: 'badge-primary',
  REPORT_EXPORTED: 'badge-violet',
  DATASET_UPLOADED: 'badge-success',
  MEMBER_INVITED: 'badge-warning',
  WIDGET_UPDATED: 'badge-muted',
  AI_INSIGHT_GENERATED: 'badge-muted',
};

export default function AuditLogs() {
  const [query, setQuery] = useState('');
  const filtered = mockAuditLogs.filter(log =>
    log.user.includes(query) || log.action.includes(query.toUpperCase()) || log.resource.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Shield size={22} className="text-brand-400" /> Audit Logs</h1>
          <p className="text-slate-400 text-sm mt-0.5">Track all user actions across the platform</p>
        </div>
      </div>

      <div className="card p-4 flex items-center gap-3">
        <Search size={15} className="text-slate-500 flex-shrink-0" />
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search by user, action, or resource..."
          className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none flex-1"
        />
        <button className="btn-ghost btn-sm flex items-center gap-1.5">
          <Filter size={13} /> Filter
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border text-left">
                <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">User</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Action</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Resource</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">IP</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-dark-card/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-brand flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        <User size={10} />
                      </div>
                      <span className="text-slate-300">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${actionColor[log.action] ?? 'badge-muted'} text-[10px]`}>
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{log.resource}</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{log.ip}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-600">No logs matching "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
}
