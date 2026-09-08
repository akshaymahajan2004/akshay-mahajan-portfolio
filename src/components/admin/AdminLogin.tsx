'use client';

import React, { useState } from 'react';
import { KeyRound, ShieldAlert } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: (token: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.authenticated) {
        onSuccess(data.token);
      } else {
        setError(data.message || 'Incorrect admin passcode.');
      }
    } catch (err) {
      setError('Authentication request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-ivory border border-fine-border p-8 rounded-2xl shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-surface border border-fine-border flex items-center justify-center mx-auto text-charcoal">
            <KeyRound className="w-6 h-6 text-terracotta" />
          </div>
          <h2 className="font-serif text-3xl text-charcoal">Admin Access</h2>
          <p className="font-sans text-xs text-muted-text">
            Enter passcode to manage portfolio projects and skills.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-xs font-medium uppercase tracking-wider text-charcoal mb-1">
              Passcode
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter passcode (e.g. akshay2026)"
              required
              className="w-full px-4 py-3 bg-paper border border-fine-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-terracotta"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-charcoal text-paper font-sans text-xs uppercase tracking-widest rounded-lg hover:bg-terracotta transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Unlock CMS Dashboard'}
          </button>
        </form>

        <p className="font-mono text-[11px] text-center text-muted-text/80 pt-2 border-t border-fine-border">
          Enter Passcode to unlock dashboard
        </p>
      </div>
    </div>
  );
};
