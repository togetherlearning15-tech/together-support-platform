import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, HeartHandshake, ShieldCheck, MapPin, Phone, Mail, Building2, Users, Search, CheckCircle, ArrowRight, Star, Menu, X } from 'lucide-react';
import './styles.css';

const properties = [
  { id: 1, title: '34 Milsom Street', area: 'Easton', city: 'Bristol', postcode: 'BS5 0SS', status: 'Available', type: 'Supported accommodation', rooms: 'Rooms available', suitable: 'Adults with housing-related support needs' }
];

function App() {
  const [q, setQ] = useState('');
  const [menu, setMenu] = useState(false);
  const results = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return properties;
    return properties.filter(p => [p.title, p.area, p.city, p.postcode, p.type].join(' ').toLowerCase().includes(s));
  }, [q]);

  const nav = ['About', 'Services', 'Properties', 'Referrals', 'Landlords', 'Contact'];

  return <>
    <header className="header">
      <a className="brand" href="#top"><img src="/together-support-logo.png"/><span>Together Support</span></a>
      <nav className="desktop">{nav.map(n => <a key={n} href={'#'+n.toLowerCase()}>{n}</a>)}<a className="btn small" href="#referrals">Make a Referral</a></nav>
      <button className="menuBtn" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
      {menu && <div className="mobile">{nav.map(n => <a onClick={()=>setMenu(false)} key={n} href={'#'+n.toLowerCase()}>{n}</a>)}</div>}
    </header>

    <main id="top">
      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">Supported accommodation • Housing-related support</p>
          <h1>Helping people build safer, more independent futures.</h1>
          <p className="lead">Together Support provides high-quality supported accommodation and person-centred housing-related support for adults with complex needs across England.</p>
          <div className="actions"><a className="btn" href="#referrals">Make a Referral</a><a className="btn ghost" href="#properties">Available Properties</a><a className="btn outline" href="#landlords">Become a Landlord</a></div>
        </div>
        <div className="heroCard"><img src="/together-support-logo.png"/><div className="trust"><ShieldCheck/> Safeguarding-first approach</div></div>
      </section>

      <section className="stats">
        {['Safe Accommodation','Professional Referrals','Landlord Partnerships','Move-On Support'].map((x,i)=><div><strong>{i===0?'24/7':i===1?'Fast':i===2?'Long-term':'Outcome'}</strong><span>{x}</span></div>)}
      </section>

      <section id="about" className="section two">
        <div><p className="eyebrow">About Together Support</p><h2>Safe homes. Stronger futures. Better lives.</h2></div>
        <p>Together Support works with local authorities, professionals, landlords and community partners to provide safe accommodation and practical support. Our focus is stability, safeguarding, independence and positive outcomes.</p>
      </section>

      <section id="services" className="section">
        <p className="eyebrow">What we do</p><h2>Our services</h2>
        <div className="grid cards">
          {[
            [Home,'Supported Accommodation','Safe, managed accommodation for adults with housing support needs.'],
            [HeartHandshake,'Housing-Related Support','Support with tenancy sustainment, routines, appointments and independence.'],
            [ShieldCheck,'Safeguarding & Risk','Risk-aware support planning and multi-agency working.'],
            [Building2,'Property Management','Professional landlord communication, inspections and property oversight.'],
            [Users,'Who We Support','Homeless adults, care leavers, mental health, ex-offenders, recovery and domestic abuse.'],
            [CheckCircle,'Move-On Planning','Helping people develop skills and progress towards independence.']
          ].map(([Icon,title,text]: any)=><article className="card"><Icon/><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section id="properties" className="section soft">
        <p className="eyebrow">Available accommodation</p><h2>Property finder</h2>
        <div className="searchBox"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Easton, Bristol, BS5 or postcode"/></div>
        <div className="grid properties">
          {results.length ? results.map(p => <article className="property" key={p.id}><span className="badge">{p.status}</span><h3>{p.title}</h3><p><MapPin size={16}/> {p.area}, {p.city}, {p.postcode}</p><p>{p.type}</p><p>{p.rooms}</p><p>{p.suitable}</p><a className="btn small" href="#referrals">Make a Referral</a></article>) : <div className="noResult"><h3>Can't find suitable accommodation?</h3><p>We may have new accommodation becoming available soon. Contact our team or submit a referral and we will review suitable options.</p><a className="btn small" href="#contact">Contact Us</a><a className="btn small ghost" href="#referrals">Make a Referral</a></div>}
        </div>
      </section>

      <section id="referrals" className="section two">
        <div><p className="eyebrow">Referrals</p><h2>Make a referral</h2><p>For councils, professionals, self-referrals and partner organisations.</p></div>
        <form className="form" onSubmit={e=>{e.preventDefault(); alert('Referral submitted. Supabase connection will store this once configured.')}}><input placeholder="Referrer name"/><input placeholder="Organisation"/><input placeholder="Email"/><input placeholder="Telephone"/><textarea placeholder="Brief support needs / risks / preferred area"></textarea><button className="btn">Submit Referral <ArrowRight size={18}/></button></form>
      </section>

      <section id="landlords" className="section soft two">
        <div><p className="eyebrow">Landlords</p><h2>Partner with Together Support</h2><p>We build professional, long-term landlord relationships with clear communication, inspections and responsible property oversight.</p><ul><li>Regular property checks</li><li>Dedicated communication</li><li>Long-term partnership approach</li><li>Supportive housing management model</li></ul></div>
        <form className="form" onSubmit={e=>{e.preventDefault(); alert('Landlord enquiry submitted.')}}><input placeholder="Your name"/><input placeholder="Company"/><input placeholder="Email"/><input placeholder="Telephone"/><input placeholder="Property address"/><textarea placeholder="Tell us about the property"></textarea><button className="btn">Send Landlord Enquiry</button></form>
      </section>

      <section className="section">
        <p className="eyebrow">Feedback examples</p><h2>Testimonials</h2>
        <div className="grid testimonials">{['Together Support gave me stability, guidance and the confidence to move forward.','The team communicates clearly and understands professional referral pathways.','A responsible and organised approach to supported accommodation and landlord partnership.'].map((t,i)=><blockquote><div><Star/><Star/><Star/><Star/><Star/></div><p>“{t}”</p><cite>{['Future Resident Feedback','Future Professional Referrer','Future Landlord Partner'][i]}</cite></blockquote>)}</div>
      </section>

      <section id="contact" className="section contact">
        <div><p className="eyebrow">Contact</p><h2>Speak to our team</h2><p><Phone/> 0330 221 0527</p><p><Mail/> admin@togsupport.co.uk</p><p><MapPin/> 27–31 Church Road, Bristol, BS5 9JJ</p><p>Company No: 12247622</p></div>
        <form className="form"><input placeholder="Name"/><input placeholder="Email"/><textarea placeholder="Message"></textarea><button className="btn">Send Message</button></form>
      </section>
    </main>
    <footer><strong>Together Support Ltd</strong><span>Safe homes • Stronger futures • Better lives</span><span>www.togsupport.co.uk</span></footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<App />);
