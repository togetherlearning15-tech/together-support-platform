import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './lib/supabase';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BedDouble,
  Building2,
  CheckCircle,
  ClipboardCheck,
  FileText,
  HeartHandshake,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  RotateCcw,
  Star,
  Users,
  X
} from 'lucide-react';
import './styles.css';

type Property = {
  id: number;
  title: string;
  area: string;
  city: string;
  postcode: string;
  status: string;
  type: string;
  rooms: string;
  suitable: string;
  supportLevel: string;
  accessibility: string;
};

const properties: Property[] = [
  {
    id: 1,
    title: '34 Milsom Street',
    area: 'Easton',
    city: 'Bristol',
    postcode: 'BS5 0SS',
    status: 'Available',
    type: 'Supported accommodation',
    rooms: 'Rooms available',
    suitable: 'Adults with housing-related support needs',
    supportLevel: 'Medium support',
    accessibility: 'Assessment required'
  }
];

const services = [
  [Home, 'Supported Accommodation', 'Safe, managed accommodation for adults with housing support needs.'],
  [HeartHandshake, 'Housing-Related Support', 'Tenancy sustainment, routines, appointments, wellbeing and independence.'],
  [ShieldCheck, 'Safeguarding & Risk', 'Risk-aware support planning, safeguarding referrals and multi-agency working.'],
  [Building2, 'Property Management', 'Professional landlord communication, inspections and property oversight.'],
  [Users, 'Who We Support', 'Homeless adults, care leavers, mental health, ex-offenders, recovery and domestic abuse.'],
  [CheckCircle, 'Move-On Planning', 'Helping people develop skills and progress towards independent living.'],
  [BedDouble, 'Tenancy Sustainment', 'Practical support to help residents maintain accommodation and routines.'],
  [ClipboardCheck, 'Assessment & Matching', 'Clear referral review to match people with suitable accommodation.'],
  [KeyRound, 'Landlord Partnerships', 'Long-term, responsible partnerships with landlords and property owners.']
] as const;

const process = [
  ['1', 'Referral received', 'Councils, professionals, landlords or self-referrals submit details.'],
  ['2', 'Assessment', 'We review support needs, risks, suitability and accommodation requirements.'],
  ['3', 'Property matching', 'We identify available accommodation or discuss upcoming options.'],
  ['4', 'Move-in planning', 'Support plans, safety checks and practical arrangements are agreed.'],
  ['5', 'Ongoing support', 'Residents receive structured housing-related support and reviews.'],
  ['6', 'Move-on outcomes', 'The goal is stability, independence and better long-term outcomes.']
];

const whoWeSupport = [
  [Home, 'Homeless Adults', 'Safe accommodation and housing-related support for people experiencing homelessness.'],
  [HeartHandshake, 'Mental Health', 'Supportive housing pathways for people with mental health support needs.'],
  [GraduationCap, 'Care Leavers', 'Practical support to build confidence, routines and independence.'],
  [ShieldCheck, 'Domestic Abuse', 'Safe, respectful support with safeguarding and multi-agency working.'],
  [RotateCcw, 'Substance Misuse Recovery', 'Stable accommodation that supports recovery, structure and positive routines.'],
  [Users, 'Ex-Offenders', 'Risk-aware accommodation support focused on stability and move-on outcomes.'],
  [ClipboardCheck, 'Complex Needs', 'Coordinated support for people with multiple or overlapping needs.'],
  [Sparkles, 'Move-on Support', 'Helping people progress towards independent living and long-term stability.']
] as const;

const impact = [
  ['People Supported', 'Growing Every Month'],
  ['Local Authority Referrals', 'Accepted'],
  ['Landlord Partnerships', 'Expanding'],
  ['Safeguarding', 'At the Heart of Everything We Do']
];

const trustPartners = ['Local Authorities', 'Housing Providers', 'NHS & Health Partners', 'Landlords', 'Community Organisations'];

const heroSlides = [
  {
    src: '/hero-house-front.png',
    title: 'Modern supported accommodation',
    text: 'Safe, well-presented homes for people who need housing-related support.'
  },
  {
    src: '/hero-support-kitchen.png',
    title: 'Practical daily support',
    text: 'Person-centred support that helps people build confidence and routines.'
  },
  {
    src: '/hero-support-meeting.png',
    title: 'Support planning and move-on',
    text: 'Warm, professional conversations focused on stability and independence.'
  }
];


function App() {
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

  const nav = ['About', 'Services', 'Process', 'Properties', 'Referrals', 'Landlords', 'Contact'];

  return (
    <>
      <header className="header">
        <a className="brand" href="#top" aria-label="Together Support home">
          <img src="/together-support-logo.png" alt="Together Support logo" />
          <span>Together Support</span>
        </a>
        <nav className="desktop" aria-label="Main navigation">
          {nav.map((n) => (
            <a key={n} href={'#' + n.toLowerCase()}>
              {n}
            </a>
          ))}
          <a className="btn small" href="#referrals">
            Make a Referral
          </a>
        </nav>
        <button className="menuBtn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
          {menu ? <X /> : <Menu />}
        </button>
        {menu && (
          <div className="mobile">
            {nav.map((n) => (
              <a onClick={() => setMenu(false)} key={n} href={'#' + n.toLowerCase()}>
                {n}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroText">
            <p className="eyebrow">Supported accommodation • Housing-related support</p>
            <h1>Providing safe homes. Empowering independent lives.</h1>
            <p className="lead">
              Together Support provides high-quality supported accommodation and housing-related support for adults experiencing homelessness, mental health challenges, care experience, domestic abuse, substance misuse and other complex needs. We work with local authorities, landlords and professional partners to create safe homes and positive futures.
            </p>
            <div className="actions">
              <a className="btn" href="#referrals">
                Make a Referral <ArrowRight size={18} />
              </a>
              <a className="btn ghost" href="#properties">
                Available Properties
              </a>
              <a className="btn outline" href="#landlords">
                Become a Landlord
              </a>
            </div>
            <div className="partnerLine">
              Working with Local Authorities, Housing Providers, Landlords and Community Organisations across England.
            </div>
            <div className="trustBadges" aria-label="Key services">
              <span><CheckCircle /> Safe Accommodation</span>
              <span><CheckCircle /> Housing Support</span>
              <span><CheckCircle /> Professional Referrals</span>
              <span><CheckCircle /> Landlord Partnerships</span>
            </div>
          </div>
          <div className="heroVisual slideshowHero" aria-label="Rotating supported accommodation slideshow">
            {heroSlides.map((item, index) => (
              <figure className={'slideImage ' + (index === slide ? 'active' : '')} key={item.src}>
                <img src={item.src} alt={item.title} />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </figcaption>
              </figure>
            ))}
            <div className="slideStatus"><ShieldCheck /> Safeguarding-first approach</div>
            <div className="slideDots" aria-label="Slideshow controls">
              {heroSlides.map((item, index) => (
                <button
                  key={item.src}
                  className={index === slide ? 'active' : ''}
                  onClick={() => setSlide(index)}
                  aria-label={'Show slide ' + (index + 1)}
                />
              ))}
            </div>
          </div>
        </section>

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
              results.map((p) => (
                <article className="property" key={p.id}>
                  <div className="propertyImage"><img src="/hero-house-front.png" alt="34 Milsom Street supported accommodation" /></div>
                  <div className="propertyBody">
                    <span className="badge">{p.status}</span>
                    <h3>{p.title}</h3>
                    <p><MapPin size={16} /> {p.area}, {p.city}, {p.postcode}</p>
                    <div className="propertyFacts">
                      <span>{p.type}</span>
                      <span>{p.rooms}</span>
                      <span>{p.supportLevel}</span>
                      <span>{p.accessibility}</span>
                    </div>
                    <p>{p.suitable}</p>
                    <div className="actions compact">
                      <a className="btn small" href="#referrals">Make a Referral</a>
                      <a className="btn small outline" href="#contact">Ask a Question</a>
                    </div>
                  </div>
                </article>
              ))
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

      const { error } = await supabase.from("referrals").insert([
        {
          referrer_name: data.get("referrer_name"),
          organisation: data.get("organisation"),
          email: data.get("email"),
          telephone: data.get("telephone"),
          support_needs: data.get("support_needs")
        }
      ]);

      if (error) {
        alert(error.message);
      } else {
        alert("Referral submitted successfully!");
        form.reset();
      }
    }}
  >
    <input name="referrer_name" required placeholder="Referrer name" />
    <input name="organisation" placeholder="Organisation" />
    <input name="email" required type="email" placeholder="Email" />
    <input name="telephone" placeholder="Telephone" />
    <textarea
      name="support_needs"
      required
      placeholder="Brief support needs / risks / preferred area"
    ></textarea>

    <button className="btn">
      Submit Referral <ArrowRight size={18} />
    </button>
  </form>
</section>

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

              const { error } = await supabase.from("landlord_enquiries").insert([
                {
                  name: data.get("name"),
                  company: data.get("company"),
                  email: data.get("email"),
                  telephone: data.get("telephone"),
                  property_address: data.get("property_address"),
                  message: data.get("message")
                }
              ]);

              if (error) {
                alert(error.message);
              } else {
                alert("Landlord enquiry submitted successfully!");
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

              const { error } = await supabase.from("contact_messages").insert([
                {
                  name: data.get("name"),
                  email: data.get("email"),
                  message: data.get("message")
                }
              ]);

              if (error) {
                alert(error.message);
              } else {
                alert("Message submitted successfully!");
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
      </main>

      <footer className="footer">
        <div className="footerBrand">
          <img src="/together-support-logo.png" alt="Together Support logo" />
          <strong>Together Support Ltd</strong>
          <span>Safe homes • Stronger futures • Better lives</span>
          <span>Company No: 12247622</span>
        </div>
        <div>
          <strong>Website</strong>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#properties">Properties</a>
          <a href="#referrals">Referrals</a>
          <a href="#landlords">Landlords</a>
        </div>
        <div>
          <strong>Policies</strong>
          <span>Careers</span>
          <span>Privacy Policy</span>
          <span>Cookies</span>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <strong>Contact</strong>
          <span>27–31 Church Road, Bristol, BS5 9JJ</span>
          <span>0330 221 0527</span>
          <span>admin@togsupport.co.uk</span>
          <span>www.togsupport.co.uk</span>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
