import { useState } from 'react';
import { Bot, Send, Sparkles, TrendingUp, AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { mockAIInsights } from '@/utils/mockData';

const severityStyle: Record<string, { bg: string; border: string; icon: React.FC<any>; iconColor: string }> = {
  positive: { bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', icon: TrendingUp, iconColor: 'text-emerald-400' },
  warning:  { bg: 'bg-amber-500/8',   border: 'border-amber-500/20',   icon: AlertTriangle, iconColor: 'text-amber-400' },
  info:     { bg: 'bg-brand-500/8',   border: 'border-brand-500/20',   icon: Info,         iconColor: 'text-brand-400' },
};

interface Message { role: 'user' | 'ai'; text: string; }

export default function AIInsights() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm InsightStack AI. Ask me anything about your business data — trends, forecasts, anomalies, or recommendations." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages(m => [...m, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setMessages(m => [...m, {
      role: 'ai',
      text: `Based on your current data, here's my analysis of "${q}":\n\n• Revenue is trending upward at 12.5% MoM\n• Your top-performing channel is Organic (42% of traffic)\n• I recommend focusing on email marketing for quick wins — it has the highest conversion rate at 5%\n\nWould you like me to dive deeper into any of these areas?`
    }]);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles size={22} className="text-brand-400" /> AI Insights
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Powered by Google Gemini — ask anything about your data</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Chat */}
        <div className="lg:col-span-3 card flex flex-col" style={{ height: '70vh' }}>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-dark-border flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">InsightStack AI</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-brand-500 text-white rounded-br-sm'
                    : 'bg-dark-card border border-dark-border text-slate-300 rounded-bl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dark-card border border-dark-border rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-dark-border flex-shrink-0">
            <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-xl px-4 py-2">
              <input
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Ask about revenue trends, forecasts, anomalies..."
                className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none"
              />
              <button onClick={send} disabled={loading || !input.trim()}
                className="p-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors disabled:opacity-40">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Auto insights */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb size={16} className="text-amber-400" />
            <h2 className="text-white font-semibold text-sm">Auto-Generated Insights</h2>
          </div>
          {mockAIInsights.map(insight => {
            const s = severityStyle[insight.severity] ?? severityStyle.info;
            const Icon = s.icon;
            return (
              <div key={insight.id} className={`rounded-xl p-4 border ${s.bg} ${s.border}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon size={16} className={s.iconColor} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{insight.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{insight.body}</p>
                    <p className="text-[11px] text-slate-600 mt-2">{insight.createdAt}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
