import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Referrals } from './Referrals';
import { ContactMessages } from './ContactMessages';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { QuickActions } from '../components/dashboard/QuickActions';
import { AttentionPanel } from '../components/dashboard/AttentionPanel';

type Counts = {
  referrals: number;
  landlordEnquiries: number;
  contactMessages: number;
  properties: number;
};

export function Dashboard() {
  const [counts, setCounts] = useState<Counts>({
    referrals: 0,
    landlordEnquiries: 0,
    contactMessages: 0,
    properties: 0
  });

  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('overview');

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

  const cards = [
    {
      title: 'Referrals',
      value: counts.referrals,
      description: 'New support referrals received from the website.',
      action: 'View referrals',
      page: 'referrals'
    },
    {
      title: 'Landlord Enquiries',
      value: counts.landlordEnquiries,
      description: 'Property owners or landlords interested in working with you.',
      action: 'View enquiries',
      page: 'landlords'
    },
    {
      title: 'Contact Messages',
      value: counts.contactMessages,
      description: 'General messages submitted through the contact form.',
      action: 'View messages',
      page: 'contacts'
    },
    {
      title: 'Properties',
      value: counts.properties,
      description: 'Supported accommodation properties listed in the system.',
      action: 'Manage properties',
      page: 'properties'
    }
  ];

  const attentionItems = [
    {
      label: 'New referrals',
      value: counts.referrals,
      tone: 'red' as const,
      page: 'referrals'
    },
    {
      label: 'Contact messages',
      value: counts.contactMessages,
      tone: 'amber' as const,
      page: 'contacts'
    },
    {
      label: 'Landlord enquiries',
      value: counts.landlordEnquiries,
      tone: 'blue' as const,
      page: 'landlords'
    },
    {
      label: 'Properties in system',
      value: counts.properties,
      tone: 'green' as const,
      page: 'properties'
    }
  ];

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <div className="adminBrand">
          <img src="/together-support-logo.png" alt="Together Support logo" />
          <div>
            <strong>Together Support</strong>
            <span>Admin Portal</span>
          </div>
        </div>

        <nav className="adminNav">
          <button className={activePage === 'overview' ? 'active' : ''} onClick={() => setActivePage('overview')}>
            📊 Overview
          </button>

          <button className={activePage === 'referrals' ? 'active' : ''} onClick={() => setActivePage('referrals')}>
            👥 Referrals
          </button>

          <button className={activePage === 'landlords' ? 'active' : ''} onClick={() => setActivePage('landlords')}>
            🏠 Landlord Enquiries
          </button>

          <button className={activePage === 'contacts' ? 'active' : ''} onClick={() => setActivePage('contacts')}>
            ✉️ Contact Messages
          </button>

          <button className={activePage === 'properties' ? 'active' : ''} onClick={() => setActivePage('properties')}>
            🏘️ Properties
          </button>

          <button className={activePage === 'residents' ? 'active' : ''} onClick={() => setActivePage('residents')}>
            🧍 Residents
          </button>

          <button className={activePage === 'content' ? 'active' : ''} onClick={() => setActivePage('content')}>
            📝 Website Content
          </button>

          <button className={activePage === 'reports' ? 'active' : ''} onClick={() => setActivePage('reports')}>
            📈 Reports
          </button>

          <button className={activePage === 'settings' ? 'active' : ''} onClick={() => setActivePage('settings')}>
            ⚙️ Settings
          </button>
        </nav>

        <button
          className="adminSignOut"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = '/admin';
          }}
        >
          🚪 Sign Out
        </button>
      </aside>

      <section className="adminMain">
        {activePage === 'overview' && (
          <>
            <DashboardHeader />

            {loading ? (
              <p>Loading dashboard...</p>
            ) : (
              <>
                <KPIGrid cards={cards} onSelectPage={setActivePage} />
                <QuickActions onSelectPage={setActivePage} />
                <AttentionPanel items={attentionItems} onSelectPage={setActivePage} />

                <section className="dashboardPanel">
                  <div>
                    <p className="eyebrow">Build Status</p>
                    <h2>Admin system is connected</h2>
                    <p>
                      The dashboard is now reading live counts from Supabase. Next we will add proper lists so you can open each referral,
                      landlord enquiry and contact message.
                    </p>
                  </div>
                </section>

                <section className="dashboardPanel">
                  <div>
                    <p className="eyebrow">Next Priority</p>
                    <h2>Referral Management</h2>
                    <p>
                      We should build the referrals table next. This will allow you to view referrals, check contact details, see support needs,
                      and mark each referral as new, contacted, accepted or closed.
                    </p>
                  </div>
                </section>
              </>
            )}
          </>
        )}

        {activePage === 'referrals' && <Referrals />}
        {activePage === 'contacts' && <ContactMessages />}

        {activePage !== 'overview' && activePage !== 'referrals' && activePage !== 'contacts' && (
          <main className="dashboardContent">
            <div className="pageHeader">
              <h1>Coming soon</h1>
              <p>This section will be built after the referrals module.</p>
            </div>
          </main>
        )}
      </section>
    </main>
  );
}