import { useState } from 'react';
import { Upload, Database, Trash2, Eye, RefreshCw, FileText, Table2 } from 'lucide-react';
import { mockDatasets } from '@/utils/mockData';
import { clsx } from 'clsx';

const statusStyle: Record<string, string> = {
  ready: 'badge-success',
  processing: 'badge-warning',
  error: 'badge-error',
};

const typeIcon: Record<string, string> = { csv: '📄', excel: '📊', json: '{}' };

export default function Datasets() {
  const [datasets, setDatasets] = useState(mockDatasets);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const remove = (id: string) => setDatasets(d => d.filter(x => x.id !== id));

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Database size={22} className="text-brand-400" /> Datasets
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">Import and manage your data sources</p>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={clsx(
          'border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer',
          dragging
            ? 'border-brand-500 bg-brand-500/8 scale-[1.01]'
            : 'border-dark-border hover:border-brand-500/40 hover:bg-dark-card/50'
        )}
      >
        <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center">
          <Upload size={24} className="text-brand-400" />
        </div>
        <div className="text-center">
          <p className="text-white font-semibold">Drop files here to import</p>
          <p className="text-slate-500 text-sm mt-1">Supports CSV, Excel (.xlsx), and JSON files</p>
        </div>
        <label className="btn-primary btn-sm cursor-pointer">
          <FileText size={14} /> Browse Files
          <input type="file" className="hidden" accept=".csv,.xlsx,.json" multiple />
        </label>
      </div>

      {/* Datasets list */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-dark-border flex items-center justify-between">
          <h2 className="text-white font-semibold">Imported Datasets</h2>
          <span className="badge-muted">{datasets.length} files</span>
        </div>
        <div className="divide-y divide-dark-border">
          {datasets.map(ds => (
            <div key={ds.id} className="flex items-center gap-4 px-5 py-4 hover:bg-dark-card/50 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-dark-muted flex items-center justify-center text-xl flex-shrink-0">
                {typeIcon[ds.type] ?? '📁'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{ds.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {ds.rows.toLocaleString()} rows · {ds.columns} columns · {ds.size}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`badge text-[10px] ${statusStyle[ds.status]}`}>{ds.status}</span>
                <span className="text-xs text-slate-600 hidden md:block">{ds.uploadedAt}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-dark-muted text-slate-500 hover:text-brand-400 transition-colors">
                    <Eye size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-dark-muted text-slate-500 hover:text-white transition-colors">
                    <Table2 size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-dark-muted text-slate-500 hover:text-white transition-colors">
                    <RefreshCw size={14} />
                  </button>
                  <button onClick={() => remove(ds.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
