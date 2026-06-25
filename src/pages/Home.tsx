import { useEffect, useMemo, useState } from 'react';
import { CheckCircle, FileText, Search, Star } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PropertyCard } from '../components/PropertyCard';
import { ReferralForm } from '../components/ReferralForm';
import { LandlordForm } from '../components/LandlordForm';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { heroSlides, impact, process, properties, services, trustPartners, whoWeSupport } from '../data/siteData';

export function HomePage() {
  const [q, setQ] = useState('');
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const results = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return properties;
    return properties.filter((p) =>
      [p.title, p.area, p.city, p.postcode, p.type, p.supportLevel].join(' ').toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <>
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main id="top">
        <Hero slide={slide} setSlide={setSlide} />

        <section className="stats impactStats" aria-label="Our impact">
          {impact.map(([big, small]) => (
            <div key={big}>
              <strong>{big}</strong>
              <span>{small}</span>
            </div>
          ))}
        </section>

        <section className="workingWith" aria-label="Working with">
          <p className="eyebrow">Working With</p>
          <div className="partnerLogos">
            {trustPartners.map((name) => (
              <div className="partnerLogo" key={name}>{name}</div>
            ))}
          </div>
        </section>

        <section id="about" className="section two">
          <div>
            <p className="eyebrow">About Together Support</p>
            <h2>Safe homes. Stronger futures. Better lives.</h2>
          </div>
          <div className="copyBlock">
            <p>
              Together Support works with local authorities, professionals, landlords and community partners to provide safe accommodation and practical support. Our focus is stability, safeguarding, independence and positive outcomes.
            </p>
            <div className="miniGrid">
              <span><CheckCircle /> Person-centred support</span>
              <span><CheckCircle /> Clear referral pathways</span>
              <span><CheckCircle /> Professional property oversight</span>
              <span><CheckCircle /> Safeguarding culture</span>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <p className="eyebrow">What we do</p>
          <h2>Our services</h2>
          <div className="grid cards">
            {services.map(([Icon, title, text]) => (
              <article className="card" key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section soft" id="who-we-support">
          <p className="eyebrow">Who we support</p>
          <h2>Support for people with different housing needs</h2>
          <div className="grid supportGrid">
            {whoWeSupport.map(([Icon, title, text]) => (
              <article className="supportCard" key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section processSection">
          <div className="sectionHead">
            <p className="eyebrow">How it works</p>
            <h2>A clear pathway from referral to independence</h2>
            <p>Simple for referrers, reassuring for landlords and structured for residents.</p>
          </div>
          <div className="processGrid">
            {process.map(([step, title, text]) => (
              <article className="processCard" key={step}>
                <strong>{step}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="properties" className="section soft">
          <p className="eyebrow">Available accommodation</p>
          <h2>Property finder</h2>
          <div className="searchBox">
            <Search />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Easton, Bristol, BS5 or postcode" />
          </div>
          <div className="grid properties">
            {results.length ? (
              results.map((p) => <PropertyCard key={p.id} property={p} />)
            ) : (
              <div className="noResult">
                <h3>Can't find suitable accommodation?</h3>
                <p>
                  We may have new accommodation becoming available soon. Contact our team or submit a referral and we will review suitable options.
                </p>
                <div className="actions compact">
                  <a className="btn small" href="#contact">Contact Us</a>
                  <a className="btn small ghost" href="#referrals">Make a Referral</a>
                </div>
              </div>
            )}
          </div>
        </section>

        <ReferralForm />
        <LandlordForm />

        <section className="section resourceSection">
          <div>
            <p className="eyebrow">Resources</p>
            <h2>Useful information for professionals</h2>
          </div>
          <div className="resourceGrid">
            {[
              ['Referral criteria', 'Understand who we support and how referrals are reviewed.'],
              ['Safeguarding approach', 'How we manage risk, concerns and multi-agency working.'],
              ['Landlord information', 'How property partnerships work with Together Support.']
            ].map(([title, text]) => (
              <article className="resource" key={title}>
                <FileText />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Feedback examples</p>
          <h2>Testimonials</h2>
          <div className="grid testimonials">
            {[
              ['Together Support gave me stability, guidance and the confidence to move forward.', 'Future Resident Feedback'],
              ['The team communicates clearly and understands professional referral pathways.', 'Future Professional Referrer'],
              ['A responsible and organised approach to supported accommodation and landlord partnership.', 'Future Landlord Partner']
            ].map(([t, c]) => (
              <blockquote key={c}>
                <div><Star /><Star /><Star /><Star /><Star /></div>
                <p>“{t}”</p>
                <cite>{c}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
