import { supabase } from '../lib/supabase';

export function LandlordForm() {
  return (
    <section id="landlords" className="section soft two">
      <div>
        <p className="eyebrow">Landlords</p>
        <h2>Partner with Together Support</h2>
        <p>We build professional, long-term landlord relationships with clear communication, regular checks and responsible property oversight.</p>
        <ul className="tickList">
          <li>Regular property checks</li>
          <li>Dedicated communication</li>
          <li>Long-term partnership approach</li>
          <li>Supportive housing management model</li>
        </ul>
      </div>
      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);

          const { error } = await supabase.from('landlord_enquiries').insert([
            {
              name: data.get('name'),
              company: data.get('company'),
              email: data.get('email'),
              telephone: data.get('telephone'),
              property_address: data.get('property_address'),
              message: data.get('message')
            }
          ]);

          if (error) {
            alert(error.message);
          } else {
            alert('Landlord enquiry submitted successfully!');
            form.reset();
          }
        }}
      >
        <input name="name" required placeholder="Your name" />
        <input name="company" placeholder="Company" />
        <input name="email" required type="email" placeholder="Email" />
        <input name="telephone" placeholder="Telephone" />
        <input name="property_address" placeholder="Property address" />
        <textarea name="message" placeholder="Tell us about the property"></textarea>
        <button className="btn">Send Landlord Enquiry</button>
      </form>
    </section>
  );
}
