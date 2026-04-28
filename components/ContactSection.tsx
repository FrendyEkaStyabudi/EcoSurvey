"use client";
import { useEffect, useState } from "react";

const DASHBOARD_HREF = "/survey";

export default function ContactSection() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      window.top!.location.href = DASHBOARD_HREF;
    } catch {
      window.location.href = DASHBOARD_HREF;
    }
    return false;
  };

  return (
    <section className="section" id="kontak">
      <div className="cta">
        <div>
          <h3>Siap mulai analisis lokasi?</h3>
          <p>
            Buka dashboard EcoSurvey untuk memilih titik, unggah foto/citra,
            lalu jalankan analisis AI.
          </p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-primary" href={DASHBOARD_HREF} onClick={handleDashboardClick}>
            Buka Dashboard →
          </a>
          <a className="btn" href="#beranda">
            Kembali ke atas
          </a>
        </div>
      </div>
      <footer>
        © {year} EcoSurvey — Sistem Analisis Lapangan AI
      </footer>
    </section>
  );
}