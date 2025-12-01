import { useState, type FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, supabase } from '../../context/AuthContext'; 

const AdminLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const { session } = useAuth();
  const navigate = useNavigate();

  // If already logged in, go straight to Dashboard
  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Грешен имейл или парола."); 
      setLoading(false);
    } else {
      // Success! The useEffect above will handle the redirect.
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
            АДМИН <span className="text-neon-blue">ВХОД</span>
          </h1>
          <p className="text-slate-400 text-sm">Зона само за оторизиран персонал.</p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 bg-red-500/20 border border-red-500 text-red-200 text-sm p-3 rounded text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">ИМЕЙЛ АДРЕС</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all placeholder-slate-600"
              placeholder="admin@ledlightning.com"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">ПАРОЛА</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all placeholder-slate-600"
              placeholder="••••••••••••"
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neon-blue text-black font-bold py-4 rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "ВХОД В СИСТЕМАТА"
            )}
          </button>

        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
            ← Обратно към сайта
          </a>
        </div>

      </div>
    </div>
  );
};
export default AdminLogin;