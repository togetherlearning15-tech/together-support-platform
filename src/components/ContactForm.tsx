import { Mail, MapPin, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ContactForm() {
  return (
    <section id="contact" className="section contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Speak to our team</h2>
        <p><Phone /> 0330 221 0527</p>
        <p><Mail /> admin@togsupport.co.uk</p>
        <p><MapPin /> 27–31 Church Road, Bristol, BS5 9JJ</p>
        <p>Company No: 12247622</p>
      </div>
      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);

          const { error } = await supabase.from('contact_messages').insert([
            {
              name: data.get('name'),
              email: data.get('email'),
              message: data.get('message')
            }
          ]);

          if (error) {
            alert(error.message);
          } else {
            alert('Message submitted successfully!');
            form.reset();
          }
        }}
      >
        <input name="name" required placeholder="Name" />
        <input name="email" required type="email" placeholder="Email" />
        <textarea name="message" required placeholder="Message"></textarea>
        <button className="btn">Send Message</button>
      </form>
    </section>
  );
}
