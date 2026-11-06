import { useState } from 'react';
import { FileText, Download, Share2, Calendar, FileType, CheckCircle2, AlertCircle, Search, Clock } from 'lucide-react';
import { mockReports } from '@/utils/mockData';

const statusColor: Record<string, string> = {
  ready: 'text-emerald-400', pending: 'text-amber-400', error: 'text-red-400'
};

const statusBg: Record<string, string> = {
  ready: 'bg-emerald-500/10', pending: 'bg-amber-500/10', error: 'bg-red-500/10'
};

const statusIcon: Record<string, React.FC<any>> = {
  ready: CheckCircle2, pending: Clock, error: AlertCircle
};

export default function Reports() {
  const [reports] = useState(mockReports);
  const [search, setSearch] = useState('');
  
  const filtered = reports.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText size={22} className="text-brand-400" /> Reports
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">Generate, schedule, and share automated reports</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <FileText size={16} /> New Report
        </button>
      </div>

      <div className="card p-4 flex items-center gap-3 w-full max-w-sm">
        <Search size={15} className="text-slate-500" />
        <input 
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search reports..."
          className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none flex-1"
        />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border text-left">
                <th className="px-5 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide">Report Details</th>
                <th className="px-5 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide">Schedule</th>
                <th className="px-5 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide">Format</th>
                <th className="px-5 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-5 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide">Last Generated</th>
                <th className="px-5 py-4 text-xs font-medium text-slate-500 uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {filtered.map(r => {
                const StatusIcon = statusIcon[r.status] ?? Clock;
                return (
                  <tr key={r.id} className="hover:bg-dark-card/50 transition-colors group">
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{r.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{r.description}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar size={13} /> <span>{r.schedule}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="badge badge-muted">
                        <FileType size={11} className="mr-1" /> {r.format}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium capitalize ${statusBg[r.status]} ${statusColor[r.status]}`}>
                        <StatusIcon size={12} /> {r.status}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs">
                      {r.lastGenerated}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-dark-muted text-slate-500 hover:text-brand-400 transition-colors" title="Download">
                          <Download size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-dark-muted text-slate-500 hover:text-white transition-colors" title="Share">
                          <Share2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-600">No reports found matching "{search}"</div>
          )}
        </div>
      </div>
    </div>
  );
}
