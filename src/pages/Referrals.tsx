import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ReferralDetails } from './ReferralDetails';

type Referral = {
  id: string;
  created_at: string;
  referrer_name?: string;
  organisation?: string;
  email?: string;
  telephone?: string;
  support_needs?: string;
  status?: string;
  assigned_to?: string;
};

export function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  async function loadReferrals() {
    setLoading(true);

    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setReferrals(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadReferrals();
  }, []);

  if (selectedReferral) {
    return (
      <ReferralDetails
        referral={selectedReferral}
        onBack={() => setSelectedReferral(null)}
      />
    );
  }

  return (
    <main className="dashboardContent">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Referral Management</p>
          <h1>Referrals</h1>
          <p>Manage all support referrals received from the website.</p>
        </div>
      </div>

      <section className="dashboardPanel">
        <div className="tableToolbar">
          <input placeholder="Search referrals..." />
          <select>
            <option>All statuses</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Accepted</option>
            <option>Closed</option>
          </select>
        </div>

        {loading ? (
          <p>Loading referrals...</p>
        ) : (
          <table className="adminTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Referrer</th>
                <th>Organisation</th>
                <th>Support Needs</th>
                <th>Status</th>
                <th>Assigned</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {referrals.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>
                    No referrals yet.
                  </td>
                </tr>
              ) : (
                referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td>
                      {referral.created_at
                        ? new Date(referral.created_at).toLocaleDateString('en-GB')
                        : '-'}
                    </td>
                    <td>{referral.referrer_name || 'Unnamed referral'}</td>
                    <td>{referral.organisation || '-'}</td>
                    <td>{referral.support_needs || '-'}</td>
                    <td>
                      <span className="statusPill">{referral.status || 'New'}</span>
                    </td>
                    <td>{referral.assigned_to || '-'}</td>
                    <td>
                      <button
                        className="miniButton"
                        type="button"
                        onClick={() => setSelectedReferral(referral)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}