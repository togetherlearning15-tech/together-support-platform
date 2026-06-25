import { useState } from 'react';
import { supabase } from '../lib/supabase';

type AdminLoginProps = {
  onLogin: () => void;
};

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <main className="adminPage">
      <section className="adminLoginCard">
        <img src="/together-support-logo.png" alt="Together Support logo" />
        <p className="eyebrow">Admin Portal</p>
        <h1>Sign in to Together Support</h1>
        <p>Manage referrals, landlord enquiries, contact messages and properties.</p>
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);

            const { error } = await supabase.auth.signInWithPassword({
              email,
              password
            });

            setLoading(false);

            if (error) {
              alert(error.message);
            } else {
              onLogin();
              window.location.hash = 'dashboard';
            }
          }}
        >
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Admin email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password" />
          <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <a href="#top">Back to website</a>
      </section>
    </main>
  );
}
