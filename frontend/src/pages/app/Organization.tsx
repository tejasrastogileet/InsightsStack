import { useState } from 'react';
import { Building2, UserPlus, Mail, Crown, Shield, Eye, Trash2 } from 'lucide-react';
import { mockTeamMembers } from '@/utils/mockData';

const roleStyle: Record<string, string> = {
  admin: 'badge-primary', manager: 'badge-violet', analyst: 'badge-success', viewer: 'badge-muted',
};
const roleIcon: Record<string, React.FC<any>> = {
  admin: Crown, manager: Shield, analyst: Building2, viewer: Eye,
};

export default function Organization() {
  const [members, setMembers] = useState(mockTeamMembers);
  const [invite, setInvite] = useState('');
  const [tab, setTab] = useState<'members' | 'settings'>('members');

  const removeMember = (id: string) => setMembers(m => m.filter(x => x.id !== id));

  return (
    <div className="p-6 space-y-5 max-w-[1000px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building2 size={22} className="text-brand-400" /> Organization
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage your team and organization settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-card border border-dark-border rounded-xl p-1 w-fit">
        {(['members', 'settings'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
              tab === t ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'members' && (
        <div className="space-y-4">
          {/* Invite bar */}
          <div className="card p-4 flex items-center gap-3">
            <Mail size={16} className="text-slate-500 flex-shrink-0" />
            <input value={invite} onChange={e => setInvite(e.target.value)}
              placeholder="Invite by email address..."
              className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none" />
            <select className="bg-dark-muted border border-dark-border text-slate-400 text-xs rounded-lg px-2 py-1.5 outline-none">
              <option>Analyst</option><option>Manager</option><option>Viewer</option>
            </select>
            <button className="btn-primary btn-sm flex items-center gap-1.5">
              <UserPlus size={14} /> Invite
            </button>
          </div>

          {/* Members list */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-dark-border flex items-center justify-between">
              <h2 className="font-semibold text-white">Team Members</h2>
              <span className="badge-muted">{members.length} members</span>
            </div>
            <div className="divide-y divide-dark-border">
              {members.map(m => {
                const RoleIcon = roleIcon[m.role] ?? Eye;
                return (
                  <div key={m.id} className="flex items-center gap-4 px-5 py-4 hover:bg-dark-card/50 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold flex-shrink-0">
                      {m.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.email}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="hidden md:flex items-center gap-1.5">
                        <RoleIcon size={12} className="text-slate-500" />
                        <span className={`badge text-[10px] ${roleStyle[m.role]}`}>{m.role}</span>
                      </div>
                      <span className={`badge text-[10px] ${m.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {m.status}
                      </span>
                      <span className="text-xs text-slate-600 hidden lg:block">Joined {m.joinedAt}</span>
                      <button onClick={() => removeMember(m.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/15 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === 'settings' && (
        <div className="card p-6 space-y-6">
          <h2 className="text-white font-semibold">Organization Settings</h2>
          <div className="space-y-4">
            {[
              { label: 'Organization Name', value: 'Acme Corp', type: 'text' },
              { label: 'Website', value: 'https://acme.com', type: 'url' },
              { label: 'Industry', value: 'Technology', type: 'text' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">{f.label}</label>
                <input type={f.type} defaultValue={f.value} className="input w-full" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
              <textarea defaultValue="Leading analytics company" rows={3} className="input w-full resize-none" />
            </div>
          </div>
          <button className="btn-primary">Save Changes</button>
        </div>
      )}
    </div>
  );
}
