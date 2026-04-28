"use client";
import { useState } from "react";

const DASHBOARD_HREF = "/survey";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const navLinks = [
    { href: "#beranda", label: "Beranda" },
    { href: "#fitur", label: "Fitur" },
    { href: "#pengguna", label: "Pengguna" },
    { href: "#pasar", label: "Pasar" },
    { href: "#faq", label: "FAQ" },
    { href: "#kontak", label: "Kontak" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setDrawerOpen(false);
    }
  };

  return (
    <header className="header">
      <a className="brand-mini" href="#beranda">
        <div className="dot"></div>
        EcoSurvey
      </a>

      <nav className="nav">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a className="btn-cta" href={DASHBOARD_HREF}>
          Dashboard
        </a>
        <button
          className="hamburger"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="drawer"
        className={`drawer ${drawerOpen ? "open" : ""}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleNavClick}
          >
            {link.label}
          </a>
        ))}
        <a href={DASHBOARD_HREF} className="drawer-cta">
          Dashboard
        </a>
      </div>
    </header>
  );
}