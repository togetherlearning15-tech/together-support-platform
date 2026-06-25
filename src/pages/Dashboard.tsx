import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Counts = {
  referrals: number;
  landlordEnquiries: number;
  contactMessages: number;
  properties: number;
};

export function Dashboard() {
  const [counts, setCounts] = useState<Counts>({ referrals: 0, landlordEnquiries: 0, contactMessages: 0, properties: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCounts() {
      const [referrals, landlords, contacts, properties] = await Promise.all([
        supabase.from('referrals').select('*', { count: 'exact', head: true }),
        supabase.from('landlord_enquiries').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('properties').select('*', { count: 'exact', head: true })
      ]);

      setCounts({
        referrals: referrals.count ?? 0,
        landlordEnquiries: landlords.count ?? 0,
        contactMessages: contacts.count ?? 0,
        properties: properties.count ?? 0
      });
      setLoading(false);
    }

    loadCounts();
  }, []);

  return (
    <main className="adminPage dashboardPage">
      <header className="dashboardHeader">
        <div>
          <p className="eyebrow">Together Support Admin</p>
          <h1>Dashboard</h1>
          <p>Live overview from your Supabase database.</p>
        </div>
        <button
          className="btn outline"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.hash = 'admin';
            window.location.reload();
          }}
        >
          Sign Out
        </button>
      </header>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <section className="dashboardGrid">
          <article><strong>{counts.referrals}</strong><span>Referrals</span></article>
          <article><strong>{counts.landlordEnquiries}</strong><span>Landlord Enquiries</span></article>
          <article><strong>{counts.contactMessages}</strong><span>Contact Messages</span></article>
          <article><strong>{counts.properties}</strong><span>Properties</span></article>
        </section>
      )}

      <section className="dashboardPanel">
        <h2>Next Build Stage</h2>
        <p>This dashboard is now connected. The next step is adding referral lists, status updates, property management and document uploads.</p>
      </section>
    </main>
  );
}
