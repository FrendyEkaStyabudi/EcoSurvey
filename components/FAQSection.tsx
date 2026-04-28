"use client";
import { useState } from "react";

const DASHBOARD_HREF = "/survey";

const faqs = [
  {
    tag: "DATA",
    question: "Apakah harus unggah foto?",
    answer: (
      <>
        Ya. Foto/citra adalah input utama analisis AI. Kamu juga bisa memakai
        tombol <b>"Tangkap area ini"</b> untuk citra satelit di sekitar titik.
      </>
    ),
  },
  {
    tag: "PETA",
    question: "Kenapa harus pilih lokasi?",
    answer: (
      <>
        Lokasi dipakai untuk memuat <b>cuaca</b>, <b>iklim historis</b>,{" "}
        <b>pantauan berita</b>, dan menyimpan <b>zonasi riwayat</b> pada peta.
      </>
    ),
  },
  {
    tag: "OUTPUT",
    question: "Output apa yang saya dapat?",
    answer: (
      <>
        Skor kelayakan, rekomendasi AI, metrik kondisi (kepadatan, jalan,
        drainase, hijau), risiko bencana, dan pembaruan zonasi di peta.
      </>
    ),
  },
  {
    tag: "KEAMANAN",
    question: "Apakah data saya tersimpan?",
    answer: (
      <>
        Hasil analisis dapat tersimpan sebagai riwayat zonasi (tergantung
        konfigurasi backend). Jika kamu ingin mode <i>tanpa simpan</i>, bisa
        ditambahkan opsi di backend.
      </>
    ),
  },
  {
    tag: "MULAI",
    question: "Bagaimana cara memulai paling cepat?",
    answer: (
      <>
        Klik{" "}
        <a
          href={DASHBOARD_HREF}
          className="faq-link"
        >
          Buka Dashboard
        </a>
        , pilih lokasi di peta, unggah foto/citra, lalu tekan tombol{" "}
        <b>Mulai Analisis</b>.
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="section" id="faq">
      <div className="section-split">
        <div className="sidecopy">
          <div className="eyebrow">FAQ</div>
          <h2 className="serif">Pertanyaan yang sering ditanyakan</h2>
          <p>
            Jawaban singkat agar pengguna baru cepat paham alur penggunaan
            EcoSurvey.
          </p>
          <div className="mini">
            <div className="mini-item">
              <div className="b">?</div>
              <div>
                Masih bingung? Coba langsung di dashboard untuk melihat
                alurnya.
              </div>
            </div>
          </div>
        </div>

        <div className="faq-list" aria-label="Daftar FAQ">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIdx === i ? "open" : ""}`}
            >
              <button
                className="faq-q"
                type="button"
                onClick={() => toggleFAQ(i)}
                aria-expanded={openIdx === i ? "true" : "false"}
              >
                <span className="faq-q-text">
                  <span className="tag">{faq.tag}</span>
                  <span>{faq.question}</span>
                </span>
                <span className="chev">⌄</span>
              </button>
              <div
                className="faq-a"
                style={{
                  maxHeight: openIdx === i ? "220px" : "0px",
                }}
              >
                <div className="faq-a-inner">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}