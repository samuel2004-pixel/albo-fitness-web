import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabase'; // <--- IMPORT SUPABASE

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Call Supabase Auth with the entered email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      // 2. Handle Login Errors
      if (error) {
        console.error('Login error:', error.message);
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }

      // 3. Success! Save auth state and redirect to dashboard
      localStorage.setItem('albo_admin_auth', 'true');
      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Unexpected error:', err);
      setError('A network error occurred. Please check your connection.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-400/10 via-black to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Main Login Container (Split Screen) */}
      <div className="relative z-10 w-full max-w-5xl bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Branding & Visuals */}
        <div className="md:w-1/2 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="text-yellow-400" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-black tracking-tighter">ALBO</h1>
                <p className="text-[10px] font-bold tracking-[3px] text-black/70 uppercase">Fitness Admin</p>
              </div>
            </div>

            <h2 className="text-4xl font-black text-black mb-4 leading-tight">
              Welcome back to the <br/> command center.
            </h2>
            <p className="text-black/70 text-lg font-medium">
              Manage trainers, testimonials, and gym operations securely.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-2 text-black/60 text-sm font-semibold">
              <Lock size={16} />
              <span>256-bit SSL Encrypted Connection</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h3 className="text-2xl font-black text-white mb-2">Sign In</h3>
            <p className="text-gray-400 text-sm mb-8">Enter your credentials to access the dashboard.</p>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@albofitness.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-black/50 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3.5 rounded-xl uppercase tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Authenticating...
                  </>
                ) : (
                  'Access Dashboard'
                )}
              </button>
            </form>

            <p className="text-center text-gray-600 text-xs mt-8">
              Restricted access. Unauthorized attempts will be logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}