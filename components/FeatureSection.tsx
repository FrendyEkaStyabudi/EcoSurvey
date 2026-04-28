"use client";
import { useState, useRef, useEffect } from "react";

const DASHBOARD_HREF = "/survey";

const features = [
  {
    icon: "🗺️",
    title: "Peta Interaktif & Pencarian Lokasi",
    meta: "6 fitur • Peta",
    desc: "Klik peta atau cari alamat/kota. Koordinat otomatis menjadi basis analisis dan pemanggilan data eksternal.",
    Image: "https://i.imgur.com/p8VodTq.png",
  },
  {
    icon: "📸",
    title: "Dokumentasi Lapangan (Upload Foto)",
    meta: "6 fitur • Dokumentasi",
    desc: "Drag & drop, preview, dan ganti foto kapan saja. Foto/citra menjadi input utama untuk AI.",
  Image: "https://i.imgur.com/dQzAUCe.png",
},
  {
    icon: "📡",
    title: "Tangkap Area Satelit & Street View",
    meta: "6 fitur • Integrasi",
    desc: 'Gunakan "Tangkap area ini" untuk citra satelit sekitar titik dan akses Street View untuk validasi kondisi.',
    Image: "https://i.imgur.com/F7Gr8iy.png",
  },
  {
    icon: "🔬",
    title: "Analisis AI: Skor & Rekomendasi",
    meta: "6 fitur • AI",
    desc: "Menghasilkan skor kelayakan serta rekomendasi, termasuk kepadatan, akses jalan, drainase, hijau, dan risiko bencana.",
    Image: "https://i.imgur.com/p8VodTq.png",
  },
  {
    icon: "🌦️",
    title: "Cuaca Real-time & Iklim Tahunan",
    meta: "6 fitur • Data Eksternal",
    desc: "Tampilkan cuaca hari ini dan pola curah hujan 1 tahun untuk konteks mitigasi dan ketahanan infrastruktur.",
    Image: "https://i.imgur.com/R3r2pZp.png",   
  },
  {
    icon: "🟢",
    title: "Zonasi Riwayat & Pantauan Warga",
    meta: "6 fitur • Insight",
    desc: "Riwayat analisis divisualisasikan sebagai zona warna di peta, plus pantauan berita berbasis lokasi untuk mendeteksi laporan darurat.",
    Image: "https://i.imgur.com/p8VodTq.png",
  },
];

export default function FeatureSection() {
  const [idx, setIdx] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      window.top!.location.href = DASHBOARD_HREF;
    } catch {
      window.location.href = DASHBOARD_HREF;
    }
    return false;
  };

  useEffect(() => {
    const updatePosition = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const cardW = trackRef.current.children[0]?.getBoundingClientRect().width || 360;
      const vpW = viewportRef.current.getBoundingClientRect().width;
      const gap = 16;
      const x = vpW / 2 - cardW / 2 - idx * (cardW + gap);
      trackRef.current.style.transform = `translateX(${x}px)`;
    };

    updatePosition();
    const resizeHandler = () => updatePosition();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [idx]);

  const prev = () => setIdx((i) => (i - 1 + features.length) % features.length);
  const next = () => setIdx((i) => (i + 1) % features.length);

  return (
    <section className="section" id="fitur">
      <div className="section-head justify-self-center">
        <div className="text-center">
          <h2>Layanan / Fitur Utama</h2>
          <p>
            Semua poin di bawah ini terhubung langsung dengan fitur di dashboard
            EcoSurvey (peta, unggah foto, analisis AI, cuaca/iklim, berita, dan
            zonasi riwayat).
          </p>
        </div>
      </div>

      <div className="feature-wrap" aria-label="Slider fitur">
        <div className="feature-nav" aria-hidden="false">
          <button className="feature-arrow" onClick={prev} aria-label="Sebelumnya">
            ‹
          </button>
          <button className="feature-arrow" onClick={next} aria-label="Berikutnya">
            ›
          </button>
        </div>

        <div className="feature-viewport" ref={viewportRef}>
          <div className="feature-track" ref={trackRef}>
            {features.map((feature, i) => (
              <div
                key={i}
                className={`feature-slide ${i === idx ? "active" : ""}`}
              >
                <div className="slide-media">
                  <div className="icon">{feature.icon}</div>
                    {feature.Image && (
                      <img src={feature.Image} alt={feature.title} />
                    )}
                </div>
                <div className="slide-title">{feature.title}</div>
                <div className="slide-meta">{feature.meta}</div>
                <div className="slide-desc">{feature.desc}</div>
                <a
                  className="slide-btn"
                  href={DASHBOARD_HREF}
                  onClick={handleDashboardClick}
                >
                  Buka Dashboard
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-dots" aria-label="Navigasi slide">
          {features.map((_, i) => (
            <button
              key={i}
              className={`dotbtn ${i === idx ? "active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}