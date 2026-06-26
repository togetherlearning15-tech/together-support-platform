import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type ContactMessage = {
  id: string;
  referrer_name: string;
  organisation: string | null;
  email: string;
  telephone: string | null;
  support_needs: string | null;
  status: string | null;
  created_at: string;
  assigned_to: string | null;
};

export function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading contact messages:', error);
      } else {
        setMessages(data ?? []);
      }

      setLoading(false);
    }

    loadMessages();
  }, []);

  if (loading) {
    return (
      <main className="dashboardContent">
        <div className="pageHeader">
          <h1>Contact Messages</h1>
          <p>Loading messages...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboardContent">
      <div className="pageHeader">
        <h1>Contact Messages</h1>
        <p>View enquiries submitted through the Together Support website.</p>
      </div>

      <div className="tableCard">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Organisation</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Support needs</th>
              <th>Status</th>
              <th>Received</th>
            </tr>
          </thead>

          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={7}>No contact messages found.</td>
              </tr>
            ) : (
              messages.map((message) => (
                <tr key={message.id}>
                  <td>{message.referrer_name}</td>
                  <td>{message.organisation || '-'}</td>
                  <td>
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                  </td>
                  <td>{message.telephone || '-'}</td>
                  <td>{message.support_needs || '-'}</td>
                  <td>
                    <span className="statusPill">{message.status || 'New'}</span>
                  </td>
                  <td>{new Date(message.created_at).toLocaleDateString('en-GB')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}