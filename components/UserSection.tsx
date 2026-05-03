"use client";
import { useState, useRef, useEffect } from "react";

const users = [
  {
    badge: "1",
    icon: "👷",
    title: "Petugas Lapangan",
    desc: "Pilih lokasi, unggah foto, lalu dapat ringkasan kondisi untuk pelaporan cepat dan konsisten.",
  Image: "https://i.imgur.com/9AdVttA.png",
},
  {
    badge: "2",
    icon: "🗺️",
    title: "Analis GIS / Perencana",
    desc: "Butuh metrik terstruktur dan zonasi riwayat untuk membandingkan area serta menyusun prioritas program.",
  Image: "https://i.imgur.com/Vh2NLQP.png",
},
  {
    badge: "3",
    icon: "🏛️",
    title: "Pengambil Keputusan",
    desc: "Mendapat skor kelayakan + rekomendasi AI dengan konteks cuaca, iklim, dan pantauan warga.",
    Image: "https://lpkn.org/wp-content/uploads/2026/02/Mengapa-SIG-Penting-tapi-Sering-Diabaikan-768x512.jpg", 
  },
  {
    badge: "4",
    icon: "🧭",
    title: "Koordinator / Supervisor",
    desc: "Memantau kualitas input, menyamakan standar penilaian, dan melihat tren area berdasarkan zonasi.",
    Image: "https://manpro.id/blog/wp-content/uploads/2022/07/manajer-proyek-dan-konstruksi-600x600.jpg",
  },
];

export default function UserSection() {
  const [idx, setIdx] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const cardW = trackRef.current.children[0]?.getBoundingClientRect().width || 300;
      const vpW = viewportRef.current.getBoundingClientRect().width;
      const gap = 18;
      const x = vpW / 2 - cardW / 2 - idx * (cardW + gap);
      trackRef.current.style.transform = `translateX(${x}px)`;
    };

    updatePosition();
    const resizeHandler = () => updatePosition();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [idx]);

  const prev = () => setIdx((i) => (i - 1 + users.length) % users.length);
  const next = () => setIdx((i) => (i + 1) % users.length);

  return (
    <section className="section" id="pengguna">
      <div className="section-split">
        <div className="sidecopy">
          <div className="eyebrow">Tentang Pengguna</div>
          <h2 className="serif">
            Dibuat untuk kerja lapangan yang lebih rapi dan cepat.
          </h2>
          <p>
            EcoSurvey menghubungkan data lapangan (lokasi + foto) dengan analisis
            AI dan data pendukung, agar tim bisa menyusun prioritas penanganan
            dengan lebih cepat, jelas, dan konsisten.
          </p>
          <div className="mini pl-9">
            <div className="mini-item">
              <div className="b">1</div>
              <div>
                <b>Petugas Lapangan</b> — catat kondisi dan unggah bukti foto.
              </div>
            </div>
            <div className="mini-item">
              <div className="b">2</div>
              <div>
                <b>Tim Analis</b> — membandingkan area dan melihat tren.
              </div>
            </div>
            <div className="mini-item">
              <div className="b">3</div>
              <div>
                <b>Pengambil Keputusan</b> — melihat ringkasan dan rekomendasi.
              </div>
            </div>
          </div>
        </div>

        <div className="svc-wrap" aria-label="Slider pengguna">
          <div className="svc-viewport" ref={viewportRef}>
            <div className="svc-track" ref={trackRef}>
              {users.map((user, i) => (
                <div key={i} className={`svc-slide ${i === idx ? "active" : ""}`}>
                  <div className="svc-card">
                    
                    <div className="svc-media">
                      <div className="svc-badge">{user.badge}</div>
                       {user.Image && (
                        <img src={user.Image} alt={user.title} />
                      )}
                    </div>
                    <div className="svc-body">
                      <div className="svc-title">{user.title}</div>
                      <div className="svc-desc">{user.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="svc-footer">
            <div className="svc-dots">
              {users.map((_, i) => (
                <button
                  key={i}
                  className={`dotbtn ${i === idx ? "active" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`User ${i + 1}`}
                />
              ))}
            </div>
            <div className="svc-arrows">
              <button className="svc-arrow" onClick={prev} aria-label="Sebelumnya">
                ‹
              </button>
              <button className="svc-arrow" onClick={next} aria-label="Berikutnya">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}