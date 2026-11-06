import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BarChart3, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store';
import toast from 'react-hot-toast';

interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      const mockUser = {
        id: 'u-new', email: data.email,
        first_name: data.first_name, last_name: data.last_name,
        full_name: `${data.first_name} ${data.last_name}`,
        profile: { role: 'analyst' }
      };
      setAuth(mockUser as any, 'demo-access-token', 'demo-refresh-token');
      toast.success('Account created! Welcome to InsightStack 🎉');
      navigate('/app');
    } catch {
      toast.error('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
            <BarChart3 size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">InsightStack</span>
        </div>

        <div className="card p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-slate-400 text-sm mb-8">Start your 14-day free trial</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">First Name</label>
                <input {...register('first_name', { required: 'Required' })} placeholder="Alex" className="input w-full" />
                {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Last Name</label>
                <input {...register('last_name', { required: 'Required' })} placeholder="Kim" className="input w-full" />
                {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Work Email</label>
              <input {...register('email', { required: 'Email required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                type="email" placeholder="you@company.com" className="input w-full" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input {...register('password', { required: 'Required', minLength: { value: 8, message: 'Min 8 characters' } })}
                  type={showPassword ? 'text' : 'password'} placeholder="Min 8 characters" className="input w-full pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
              <input {...register('confirmPassword', { required: 'Required', validate: v => v === password || 'Passwords do not match' })}
                type="password" placeholder="••••••••" className="input w-full" />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-base mt-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account...</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-4">
            By signing up you agree to our <span className="text-brand-400">Terms</span> and <span className="text-brand-400">Privacy Policy</span>
          </p>
          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
