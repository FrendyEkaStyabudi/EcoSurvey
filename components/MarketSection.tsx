export default function MarketSection() {
    return (
        <section className="section" id="pasar">
            <div className="market-layout">

                <div className="market-media" aria-label="Ilustrasi insight pasar">
                    <div>
                        <img src="https://i.imgur.com/PrAYeiq.png" alt="Ilustrasi insight pasar" />
                        <div className="market-media-caption">
                        🌿 Insight lokasi + AI → prioritas kerja lebih cepat
                    </div>
                    </div>

                    
                </div>

                <div className="market-left">
                    <div className="eyebrow">Insight Pasar</div>
                    <h2 className="serif">EcoSurvey untuk Kota & Infrastruktur</h2>
                    <div className="market-items">
                        <div className="market-item">
                            <div className="mi-ic">📊</div>
                            <div>
                                <div className="mi-title">Monitoring & Dashboard</div>
                                <div className="mi-desc">
                                    Pantau skor, zonasi riwayat, cuaca/iklim, serta pantauan warga
                                    untuk menentukan prioritas area.
                                </div>
                            </div>
                        </div>
                        <div className="market-item">
                            <div className="mi-ic">🧾</div>
                            <div>
                                <div className="mi-title">Informasi & Layanan Publik</div>
                                <div className="mi-desc">
                                    Menyajikan ringkasan kondisi yang mudah dipahami untuk
                                    koordinasi lintas tim dan pelaporan.
                                </div>
                            </div>
                        </div>
                        <div className="market-item">
                            <div className="mi-ic">📍</div>
                            <div>
                                <div className="mi-title">Operasional Lapangan</div>
                                <div className="mi-desc">
                                    Alur cepat: pilih lokasi → unggah foto/citra → jalankan analisis
                                    AI, cocok untuk HP/Tablet.
                                </div>
                            </div>
                        </div>
                        <div className="market-item">
                            <div className="mi-ic">🛠️</div>
                            <div>
                                <div className="mi-title">Administrasi Infrastruktur</div>
                                <div className="mi-desc">
                                    Dukungan bukti foto, rekomendasi AI, dan tracking zona untuk
                                    evaluasi program & tindak lanjut.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}