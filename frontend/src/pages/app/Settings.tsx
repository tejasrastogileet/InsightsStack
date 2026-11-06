import { useState } from 'react';
import { User, Shield, Bell, Moon, Sun, Monitor, Smartphone, Lock, Check } from 'lucide-react';
import { useAuthStore } from '@/store';

export default function Settings() {
  const { user } = useAuthStore();
  const [theme, setTheme] = useState<'dark'|'light'|'system'>('dark');

  return (
    <div className="p-6 space-y-6 max-w-[1000px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User size={22} className="text-brand-400" /> Account Settings
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage your profile, security, and preferences</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-card border border-brand-500/30 text-white font-medium text-sm">
            <User size={16} className="text-brand-400" /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-card text-slate-400 hover:text-white font-medium text-sm transition-colors">
            <Shield size={16} className="text-slate-500" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-card text-slate-400 hover:text-white font-medium text-sm transition-colors">
            <Bell size={16} className="text-slate-500" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-card text-slate-400 hover:text-white font-medium text-sm transition-colors">
            <Monitor size={16} className="text-slate-500" /> Preferences
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="card p-6">
            <h2 className="text-white font-semibold mb-5">Profile Information</h2>
            
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center text-3xl font-bold text-white shadow-glow">
                {user?.first_name?.[0] ?? 'U'}
              </div>
              <div>
                <button className="btn-secondary btn-sm mb-2">Upload Photo</button>
                <p className="text-xs text-slate-500">JPG or PNG, max 2MB</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">First Name</label>
                <input type="text" defaultValue={user?.first_name} className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Last Name</label>
                <input type="text" defaultValue={user?.last_name} className="input w-full" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                <input type="email" defaultValue={user?.email} className="input w-full" disabled />
                <p className="text-xs text-slate-500 mt-1.5">Contact an administrator to change your email address.</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-dark-border">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>

          {/* Security Section Preview */}
          <div className="card p-6">
            <h2 className="text-white font-semibold mb-5">Security</h2>
            <div className="flex items-center justify-between p-4 rounded-xl border border-dark-border bg-dark-bg/50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Lock size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Two-Factor Authentication (2FA)</p>
                  <p className="text-slate-400 text-xs mt-0.5">Add an extra layer of security to your account.</p>
                </div>
              </div>
              <button className="btn-secondary btn-sm">Enable</button>
            </div>
          </div>

          {/* Preferences Section Preview */}
          <div className="card p-6">
            <h2 className="text-white font-semibold mb-5">Appearance</h2>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  theme === 'dark' ? 'border-brand-500 bg-brand-500/10' : 'border-dark-border bg-dark-card hover:border-slate-600'
                }`}>
                <Moon size={20} className={theme === 'dark' ? 'text-brand-400' : 'text-slate-400'} />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-brand-400' : 'text-slate-400'}`}>Dark</span>
              </button>
              <button onClick={() => setTheme('light')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  theme === 'light' ? 'border-brand-500 bg-brand-500/10' : 'border-dark-border bg-dark-card hover:border-slate-600'
                }`}>
                <Sun size={20} className={theme === 'light' ? 'text-brand-400' : 'text-slate-400'} />
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-brand-400' : 'text-slate-400'}`}>Light</span>
              </button>
              <button onClick={() => setTheme('system')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  theme === 'system' ? 'border-brand-500 bg-brand-500/10' : 'border-dark-border bg-dark-card hover:border-slate-600'
                }`}>
                <Monitor size={20} className={theme === 'system' ? 'text-brand-400' : 'text-slate-400'} />
                <span className={`text-sm font-medium ${theme === 'system' ? 'text-brand-400' : 'text-slate-400'}`}>System</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
