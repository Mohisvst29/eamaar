import React, { useState } from 'react';
import { Lock, User, Key, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';

export default function AdminLoginPage({ onLoginSuccess, onNavigateHome }) {
  const { login } = useAdminStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const success = login(username.trim(), password.trim());
    if (success) {
      onLoginSuccess();
    } else {
      setErrorMsg('اسم المستخدم أو كلمة السر غير صحيحة. حاول مرة أخرى.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface flex flex-col justify-between pt-24 pb-12 px-margin">
      
      <div className="max-w-md w-full mx-auto flex flex-col gap-space-lg">
        
        {/* Brand & Emblem Header */}
        <div className="flex flex-col items-center text-center gap-space-sm">
          <div className="h-20 flex items-center justify-center mb-2">
            <img src="/logo.png" alt="لمسة إعمار" className="h-20 w-auto object-contain drop-shadow-xl" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-mono text-secondary uppercase tracking-widest">
              نظام الإدارة المعمارية المقفل
            </span>
            <h1 className="font-heading font-bold text-2xl text-primary mt-1">
              تسجيل دخول لوحة التحكم
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              الوصول مقتصر فقط لمدير النظام والمهندس الميداني المسؤول.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest border border-stone-border p-space-lg shadow-xl flex flex-col gap-space-md">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-space-md">
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono text-primary font-semibold flex items-center gap-1.5" htmlFor="username">
                <User className="w-3.5 h-3.5 text-secondary" />
                <span>اسم المستخدم *</span>
              </label>
              <input
                id="username"
                type="text"
                required
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface-container-low px-space-md py-3 text-sm text-on-surface border border-stone-border focus:outline-none focus:border-secondary transition-colors font-mono"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono text-primary font-semibold flex items-center gap-1.5" htmlFor="password">
                <Key className="w-3.5 h-3.5 text-secondary" />
                <span>كلمة السر *</span>
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="أدخل كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low px-space-md py-3 text-sm text-on-surface border border-stone-border focus:outline-none focus:border-secondary transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-on-primary font-bold text-xs hover:bg-secondary transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <Lock className="w-4 h-4 text-secondary" />
              <span>تسجيل الدخول إلى لوحة التحكم</span>
            </button>

          </form>

          <div className="pt-space-sm border-t border-stone-border flex items-center justify-end text-[11px] text-on-surface-variant font-mono">
            <button
              onClick={onNavigateHome}
              className="text-secondary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>العودة للموقع</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

      <div className="text-center text-xs text-on-surface-variant font-mono">
        لمسة إعمار للترميم والديكور © {new Date().getFullYear()} • نظام إدارة المحتوى والطلبات
      </div>

    </div>
  );
}
