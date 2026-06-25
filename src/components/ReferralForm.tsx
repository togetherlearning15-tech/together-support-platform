import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ReferralForm() {
  return (
    <section id="referrals" className="section two">
      <div>
        <p className="eyebrow">Referrals</p>
        <h2>Make a referral</h2>
        <p>For councils, professionals, self-referrals and partner organisations.</p>
        <ul className="tickList">
          <li>Referral reviewed by the Together Support team</li>
          <li>Accommodation suitability considered</li>
          <li>Risk and support needs reviewed safely</li>
        </ul>
      </div>

      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);

          const { error } = await supabase.from('referrals').insert([
            {
              referrer_name: data.get('referrer_name'),
              organisation: data.get('organisation'),
              email: data.get('email'),
              telephone: data.get('telephone'),
              support_needs: data.get('support_needs')
            }
          ]);

          if (error) {
            alert(error.message);
          } else {
            alert('Referral submitted successfully!');
            form.reset();
          }
        }}
      >
        <input name="referrer_name" required placeholder="Referrer name" />
        <input name="organisation" placeholder="Organisation" />
        <input name="email" required type="email" placeholder="Email" />
        <input name="telephone" placeholder="Telephone" />
        <textarea name="support_needs" required placeholder="Brief support needs / risks / preferred area"></textarea>
        <button className="btn">Submit Referral <ArrowRight size={18} /></button>
      </form>
    </section>
  );
}
