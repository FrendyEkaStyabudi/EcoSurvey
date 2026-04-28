"use client";

const DASHBOARD_HREF = "/survey";

export default function HeroSection() {
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
    <section className="hero" id="beranda">
      <div className="hero-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="https://cdn.pixabay.com/video/2023/05/19/163786-828705244_large.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-inner">
        <div className="mark">
          <div className="logo serif">
            Eco<span className="x">Survey</span>
          </div>
          <div className="logo-sub">
            <span className="divider"></span>
            <span>AI Field Analysis Platform</span>
            <span className="divider"></span>
          </div>
        </div>

        <h1 className="serif">
          Menjaga Keputusan Anda Tetap <span className="accent">Tepat</span>
        </h1>
        <p className="sub">
          Mitra profesional untuk analisis lapangan berbasis peta, dokumentasi
          foto, cuaca & iklim, pantauan warga, hingga rekomendasi AI — agar
          prioritas perbaikan infrastruktur dan mitigasi banjir bisa ditentukan
          lebih cepat.
        </p>

        <div className="actions">
          <a className="btn btn-primary" href={DASHBOARD_HREF} onClick={handleDashboardClick}>
            Mulai Analisis →
          </a>
          <a className="btn" href="#fitur">
            Jelajahi Layanan
          </a>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-bar"></div>
          <span>Scroll untuk detail</span>
        </div>
      </div>
    </section>
  );
}