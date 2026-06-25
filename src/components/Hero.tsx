import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { heroSlides } from '../data/siteData';

type HeroProps = {
  slide: number;
  setSlide: (index: number) => void;
};

export function Hero({ slide, setSlide }: HeroProps) {
  return (
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
        <div className="floatingCard top"><ShieldCheck /> Safeguarding-first approach</div>
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
  );
}
