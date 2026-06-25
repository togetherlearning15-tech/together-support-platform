import { MapPin } from 'lucide-react';
import type { Property } from '../data/siteData';

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="property">
      <div className="propertyImage"><img src="/hero-house-front.png" alt={`${property.title} supported accommodation`} /></div>
      <div className="propertyBody">
        <span className="badge">{property.status}</span>
        <h3>{property.title}</h3>
        <p><MapPin size={16} /> {property.area}, {property.city}, {property.postcode}</p>
        <div className="propertyFacts">
          <span>{property.type}</span>
          <span>{property.rooms}</span>
          <span>{property.supportLevel}</span>
          <span>{property.accessibility}</span>
        </div>
        <p>{property.suitable}</p>
        <div className="actions compact">
          <a className="btn small" href="#referrals">Make a Referral</a>
          <a className="btn small outline" href="#contact">Ask a Question</a>
        </div>
      </div>
    </article>
  );
}
