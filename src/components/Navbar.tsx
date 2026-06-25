import { Menu, X } from 'lucide-react';
import { nav } from '../data/siteData';

type NavbarProps = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  return (
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
      <button className="menuBtn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>
      {menuOpen && (
        <div className="mobile">
          {nav.map((n) => (
            <a onClick={() => setMenuOpen(false)} key={n} href={'#' + n.toLowerCase()}>
              {n}
            </a>
          ))}
          <a onClick={() => setMenuOpen(false)} href="#admin">Admin Login</a>
        </div>
      )}
    </header>
  );
}
