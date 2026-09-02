import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fcfcfc] border border-slate-100 text-slate-900 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <h2 className="text-base font-black uppercase tracking-tight text-slate-950 font-['Inter']">
              {isLoggedIn ? 'Account Overview' : isLogin ? 'Sign In to Plain Layers' : 'Create Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoggedIn ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black uppercase tracking-tight text-slate-950">Welcome back!</h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">{email || 'engineer@plainlayers.in'}</p>
                <div className="inline-block mt-3 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
                  Verified B2B Tier: Silver Partner (5% Auto-discount)
                </div>
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  onClose();
                }}
                className="w-full py-3 bg-slate-100 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 placeholder:text-slate-400 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-xl shadow-slate-200 cursor-pointer transition-all mt-2"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-950 cursor-pointer transition-colors"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
