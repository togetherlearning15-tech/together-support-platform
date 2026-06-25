import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/Home';
import { AdminLogin } from './pages/AdminLogin';
import { Dashboard } from './pages/Dashboard';
import { supabase } from './lib/supabase';
import './styles.css';

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || 'home');
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(Boolean(data.session));
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(Boolean(session));
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (checkingSession) {
    return <main className="adminPage"><p>Loading...</p></main>;
  }

  if (route === 'admin') {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  if (route === 'dashboard') {
    return loggedIn ? <Dashboard /> : <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  return <HomePage />;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
