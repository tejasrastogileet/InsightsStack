import { useState } from 'react';
import { X, Bell, Check, CheckCheck, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useUIStore } from '@/store';
import { mockNotifications } from '@/utils/mockData';
import { clsx } from 'clsx';

const typeStyles: Record<string, { icon: React.FC<any>, color: string, bg: string }> = {
  success:  { icon: CheckCircle,    color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  warning:  { icon: AlertTriangle,  color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  error:    { icon: XCircle,        color: 'text-red-400',     bg: 'bg-red-500/10'     },
  info:     { icon: Info,           color: 'text-brand-400',   bg: 'bg-brand-500/10'   },
};

export default function NotificationPanel() {
  const { notificationPanelOpen, setNotificationPanelOpen } = useUIStore();
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter(n => !n.isRead).length;

  const markAll = () => setNotifications(n => n.map(item => ({ ...item, isRead: true })));
  const markOne = (id: string) => setNotifications(n => n.map(item => item.id === id ? { ...item, isRead: true } : item));

  if (!notificationPanelOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setNotificationPanelOpen(false)} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm flex flex-col bg-dark-surface border-l border-dark-border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-brand-400" />
            <span className="font-semibold text-white">Notifications</span>
            {unread > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold">
                {unread}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button onClick={markAll} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
            <button onClick={() => setNotificationPanelOpen(false)}
              className="p-1.5 rounded-lg hover:bg-dark-card text-slate-500 hover:text-white transition-all">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-dark-border">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-600">
              <Bell size={32} className="mb-3 opacity-30" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            notifications.map((n) => {
              const style = typeStyles[n.type] ?? typeStyles.info;
              const Icon = style.icon;
              return (
                <div key={n.id}
                  className={clsx('px-5 py-4 flex items-start gap-3 transition-colors cursor-pointer',
                    n.isRead ? 'bg-transparent' : 'bg-brand-500/5 hover:bg-brand-500/8',
                    'hover:bg-dark-card/50'
                  )}
                  onClick={() => markOne(n.id)}>
                  <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', style.bg)}>
                    <Icon size={15} className={style.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={clsx('text-sm font-medium leading-snug', n.isRead ? 'text-slate-300' : 'text-white')}>
                        {n.title}
                      </p>
                      {!n.isRead && <div className="w-2 h-2 rounded-full bg-brand-400 flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                    <p className="text-[11px] text-slate-600 mt-1">{n.createdAt}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-dark-border flex-shrink-0">
          <button className="flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition-colors">
            <Check size={14} /> View all notifications
          </button>
        </div>
      </div>
    </>
  );
}
