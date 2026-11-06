import { useState } from 'react';
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { mockNotifications } from '@/utils/mockData';
import { clsx } from 'clsx';

const typeStyle: Record<string, { icon: React.FC<any>; color: string; bg: string }> = {
  success: { icon: CheckCircle,   color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  warning: { icon: AlertTriangle, color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  error:   { icon: XCircle,       color: 'text-red-400',     bg: 'bg-red-500/10'     },
  info:    { icon: Info,          color: 'text-brand-400',   bg: 'bg-brand-500/10'   },
};

export default function Notifications() {
  const [items, setItems] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAll = () => setItems(n => n.map(x => ({ ...x, isRead: true })));
  const markOne = (id: string) => setItems(n => n.map(x => x.id === id ? { ...x, isRead: true } : x));

  const unread = items.filter(n => !n.isRead).length;
  const visible = filter === 'unread' ? items.filter(n => !n.isRead) : items;

  return (
    <div className="p-6 space-y-5 max-w-[800px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell size={22} className="text-brand-400" /> Notifications
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {unread > 0 ? `${unread} unread` : 'All caught up'}
          </p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="btn-ghost btn-sm flex items-center gap-1.5">
            <CheckCheck size={14} /> Mark all read
          </button>
        )}
      </div>

      <div className="flex gap-1 bg-dark-card border border-dark-border rounded-xl p-1 w-fit">
        {(['all', 'unread'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={clsx('px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all',
              filter === f ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white')}>
            {f} {f === 'unread' && unread > 0 && <span className="ml-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">{unread}</span>}
          </button>
        ))}
      </div>

      <div className="card divide-y divide-dark-border">
        {visible.length === 0 ? (
          <div className="py-16 flex flex-col items-center text-slate-600">
            <Bell size={40} className="opacity-20 mb-3" />
            <p className="text-sm">No {filter === 'unread' ? 'unread ' : ''}notifications</p>
          </div>
        ) : (
          visible.map(n => {
            const s = typeStyle[n.type] ?? typeStyle.info;
            const Icon = s.icon;
            return (
              <div key={n.id} onClick={() => markOne(n.id)}
                className={clsx('flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors',
                  !n.isRead ? 'bg-brand-500/5 hover:bg-brand-500/8' : 'hover:bg-dark-card/50')}>
                <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', s.bg)}>
                  <Icon size={16} className={s.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={clsx('text-sm font-medium', n.isRead ? 'text-slate-300' : 'text-white')}>
                      {n.title}
                    </p>
                    {!n.isRead && <div className="w-2 h-2 rounded-full bg-brand-400 flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                  <p className="text-[11px] text-slate-600 mt-1.5">{n.createdAt}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
