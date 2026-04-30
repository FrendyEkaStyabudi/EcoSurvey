import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js"; // Import Supabase

// Supabase initialization inside POST

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY belum disetel di file .env.local" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const lat = formData.get("lat") as string;
    const lng = formData.get("lng") as string;

    if (!imageFile) {
      return NextResponse.json(
        { error: "Gambar tidak ditemukan/gagal diunggah." },
        { status: 400 },
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // Menggunakan model Gemini 2.5 Flash yang lebih stabil,
    // dan memaksa output HANYA dalam bentuk JSON
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        // Output rekomendasi sangat panjang, jadi butuh token lebih besar agar tidak terpotong.
        maxOutputTokens: 8192,
        temperature: 0.4,
      },
    });

    const prompt = `Anda adalah Sistem Pendukung Keputusan (DSS) Tata Kota, Drainase Permukiman, dan Penghijauan Perkotaan berbasis AI.
Analisis gambar ini pada koordinat (Lat: ${lat}, Lng: ${lng}).

TARGET: Output rekomendasi harus SANGAT DETAIL, terstruktur, dan bisa dipakai sebagai rencana tindakan (action plan).
Gaya bahasa: Bahasa Indonesia yang mudah dipahami publik, namun teknis. Gunakan angka, rentang, asumsi, dan langkah kerja.

ANDA WAJIB MEMATUHI ATURAN BERIKUT SECARA KETAT:

[ATURAN 1: DETEKSI SUDUT PANDANG (PENTING UNTUK DRAINASE)]
- Deteksi apakah gambar ini "Citra Satelit (dari atas)" atau "Foto Jalanan/Street View (dari depan)".
- JIKA Citra Satelit: Jangan menyimpulkan "tidak ada drainase" jika tidak terlihat (sering tertutup atap/pepohonan). Jangan kurangi skor hanya karena drainase tidak terlihat. Tulis: "Sulit dipastikan dari satelit (potensi tertutup)".
- JIKA Foto Jalanan: Evaluasi tepi jalan. Jika ada drainase bersih/berfungsi, beri skor baik. Jika mampet/tidak ada, beri penalti.

[ATURAN 2: IDENTIFIKASI VISUAL]
- KONBLOK VS TANAH: Jalan cokelat/krem berpola rapi di perumahan = Paving Block (Layak). Cokelat berantakan tanpa batas tepi = Jalan Tanah (Buruk).
- KEPADATAN: Atap bersentuhan rapat tanpa jarak = "Sangat Padat".
- RUANG HIJAU: identifikasi pepohonan, kanopi, kebun kecil, sempadan sungai, lapangan, median, dsb.

[ATURAN 3: SKOR KELAYAKAN (0-100)]
- 80–100: Jalan aspal/konblok relatif layak + ada pengelolaan air permukaan + ada ruang hijau atau peluang penghijauan.
- 50–79: Pemukiman padat + jalan sempit + pengelolaan air permukaan kurang/parsial.
- 0–49: Jalan tanah rusak ATAU sangat kumuh ATAU indikasi risiko bencana tinggi dan minim mitigasi.

[ATURAN 4: RISIKO BENCANA (BMKG/BNPB – HEURISTIK UMUM)]
- Jika (Kepadatan Tinggi) + (Dekat sungai/saluran air/cekungan) + (Vegetasi minim), tetapkan: "Risiko Banjir Tinggi".
- Jika (Topografi miring/tebing) + (Vegetasi minim), tetapkan: "Risiko Longsor Tinggi".
- Jika relatif aman, tetapkan: "Risiko Relatif Rendah".

[ATURAN 5: REKOMENDASI DETAIL (WAJIB ADA ANGKA + ASUMSI)]
Berikan rekomendasi rinci minimal mencakup:
1) PENGHIJAUAN (pohon & tanaman)
   - Berapa pohon ditanam (rentang min–max) + dasar hitung (mis. per 100 m koridor jalan, per 1.000 m2, atau per “titik prioritas”).
   - Jenis pohon yang cocok untuk lingkungan padat di Indonesia + alasan (akar, kanopi, perawatan, toleransi polusi).
   - Tanaman pendamping (semak/groundcover) + fungsi (resapan, mengikat tanah, estetika).
   - Dampak yang diharapkan: penurunan suhu mikro (kualitatif + rentang wajar), penurunan polusi (PM2.5/NO2 secara kualitatif), peningkatan resapan, penurunan limpasan.
   - Catatan risiko & mitigasi: akar merusak drainase, jarak tanam aman, jarak dari bangunan, jalur utilitas.

2) DRAINASE (dimensi & solusi lahan sempit)
   - Rekomendasi dimensi drainase lingkungan (lebar/kedalaman dalam cm) + kapan memakai saluran terbuka vs tertutup.
   - Jika padat penduduk dan lahan sempit: solusi alternatif yang realistis (box culvert kecil, drainase tertutup + inlet berkala, sumur resapan, biopori, trench resapan, permeable paving, rain garden mini, penjadwalan pembersihan).
   - Sertakan langkah implementasi bertahap (quick wins 0–2 minggu, menengah 1–3 bulan, panjang 6–12 bulan).

3) PRIORITAS & RENCANA EKSEKUSI
   - Daftar prioritas (P1, P2, P3) + alasan.
   - Perkiraan kebutuhan material/tenaga kerja secara kasar (orde besar, bukan angka pasti) dan indikator keberhasilan.

[ATURAN 6: FORMAT OUTPUT]
- Anda HARUS mengembalikan HANYA JSON valid (tanpa markdown, tanpa penjelasan di luar JSON).
- Semua field string harus dalam Bahasa Indonesia.
- Jika Anda membuat asumsi, tulis pada field "asumsi" dan beri "tingkat_keyakinan" (0–100).

Keluarkan output JSON dengan skema berikut (ikuti persis key-nya):
{
  "perspektif": "Citra Satelit" | "Foto Jalanan/Street View",
  "tingkat_keyakinan": 0,
  "asumsi": ["..."],
  "score": 0,
  "kepadatan": "penjelasan kerapatan",
  "jalan": "penjelasan material jalan",
  "drainase": "penjelasan kondisi drainase",
  "hijau": "penjelasan pohon/ruang hijau",
  "bencana": "tingkat risiko bencana",
  "kesimpulan_ringkas": "ringkasan 2–4 kalimat untuk publik",
  "rekomendasi_detail": {
    "penghijauan": {
      "target_pohon": {
        "min": 0,
        "max": 0,
        "satuan": "pohon",
        "dasar_perhitungan": "jelaskan rumus/heuristik",
        "titik_prioritas": ["contoh lokasi tanam: tepi jalan, sempadan, halaman fasilitas umum, dll"]
      },
      "jenis_pohon_disarankan": [
        { "nama": "string", "alasan": "string", "catatan_akar_dan_jarak": "string" }
      ],
      "tanaman_pendamping": [
        { "nama": "string", "fungsi": "string", "catatan": "string" }
      ],
      "pola_tanam_dan_perawatan": {
        "jarak_tanam_m": "contoh: 6–10",
        "tahapan": ["..."],
        "pemeliharaan_3_bulan_pertama": ["..."]
      },
      "dampak_yang_diharapkan": {
        "suhu": "perkiraan dampak + rentang wajar + syarat",
        "polusi": "perkiraan dampak + catatan",
        "limpasan_air": "perkiraan dampak + catatan"
      }
    },
    "drainase": {
      "rekomendasi_dimensi": {
        "lebar_cm": "rentang angka",
        "kedalaman_cm": "rentang angka",
        "opsi_saluran": [
          { "tipe": "terbuka/tertutup", "kapan_dipakai": "string", "catatan": "string" }
        ]
      },
      "solusi_lahan_sempit": [
        { "opsi": "string", "cara_kerja": "string", "estimasi_kebutuhan": "string" }
      ],
      "tahapan_implementasi": {
        "quick_wins_0_2_minggu": ["..."],
        "menengah_1_3_bulan": ["..."],
        "panjang_6_12_bulan": ["..."]
      }
    },
    "prioritas_aksi": [
      { "prioritas": "P1", "aksi": "string", "alasan": "string", "indikator_sukses": "string" }
    ]
  }
}`;

    // Minta Gemini menganalisis
    const result = await model.generateContent([
      { inlineData: { data: base64Image, mimeType: imageFile.type } },
      prompt,
    ]);

    // Karena sudah dikunci ke application/json, biasanya aman parse.
    // Namun, untuk berjaga-jaga jika ada karakter tambahan, lakukan sanitasi sederhana.
    let textResult = result.response.text();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let aiData: any;

    const extractJSON = (text: string) => {
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start >= 0 && end >= 0 && end > start) {
        return text.slice(start, end + 1);
      }
      return text;
    };

    try {
      aiData = JSON.parse(extractJSON(textResult));
    } catch (e1) {
      console.warn(
        "JSON Parse awal gagal, mencoba auto-repair dengan Gemini...",
        e1,
      );
      try {
        const repairPrompt =
          "Teks berikut seharusnya berupa JSON namun memiliki error sintaks. Perbaiki sintaks JSON tersebut agar menjadi JSON yang benar-benar valid. Kembalikan HANYA format JSON tanpa teks lain atau markdown:\n\n" +
          textResult;
        const repairResult = await model.generateContent(repairPrompt);
        textResult = repairResult.response.text();
        aiData = JSON.parse(extractJSON(textResult));
      } catch (e2) {
        console.error("Auto-repair gagal:", e2);
        throw new Error(
          "AI menghasilkan format data yang tidak valid. Silakan coba analisis ulang.",
        );
      }
    }

    // ==========================================
    // NORMALISASI + BACKWARD COMPATIBILITY
    // ==========================================
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isBlank = (v: any) => typeof v !== "string" || v.trim().length === 0;

    // Jika model hanya mengisi "kesimpulan_ringkas", tetap sediakan "kesimpulan"
    if (isBlank(aiData.kesimpulan) && !isBlank(aiData.kesimpulan_ringkas)) {
      aiData.kesimpulan = aiData.kesimpulan_ringkas;
    }

    // Jika ringkasan kosong, buat fallback ringkas agar UI tidak kosong
    if (isBlank(aiData.kesimpulan_ringkas) && !isBlank(aiData.kesimpulan)) {
      aiData.kesimpulan_ringkas = aiData.kesimpulan;
    }

    if (isBlank(aiData.kesimpulan_ringkas)) {
      const s = typeof aiData.score === "number" ? aiData.score : "—";
      const b = aiData.bencana || "—";
      aiData.kesimpulan_ringkas =
        `Skor kelayakan lokasi: ${s}. Risiko bencana: ${b}. ` +
        `Prioritaskan perbaikan pengelolaan air permukaan (drainase/resapan) dan peningkatan ruang hijau untuk menurunkan limpasan serta panas mikro di area ini.`;
      aiData.kesimpulan = aiData.kesimpulan_ringkas;
      aiData.asumsi = Array.isArray(aiData.asumsi) ? aiData.asumsi : [];
      aiData.asumsi.push(
        "Ringkasan otomatis dibuat server karena ringkasan dari AI kosong.",
      );
    }

    // Banyak UI lama memakai key "rekomendasi" (string). Kita sediakan ringkasan juga.
    if (isBlank(aiData.rekomendasi)) {
      aiData.rekomendasi =
        aiData.kesimpulan_ringkas ||
        "Rekomendasi rinci tersedia pada field rekomendasi_detail (penghijauan, drainase, prioritas_aksi).";
    }

    // Jika rekomendasi_detail hilang (biasanya karena output terpotong), minta AI melengkapi tanpa gambar.
    if (
      !aiData.rekomendasi_detail ||
      typeof aiData.rekomendasi_detail !== "object"
    ) {
      try {
        const repairPrompt = `Anda sebelumnya menganalisis lokasi Lat ${lat}, Lng ${lng} dan menghasilkan data berikut (JSON):
${JSON.stringify(aiData)}

Lengkapi JSON tersebut agar sesuai skema lengkap berikut (key WAJIB ada, boleh memakai asumsi jika informasi kurang):
- kesimpulan_ringkas (2–4 kalimat)
- rekomendasi_detail.penghijauan (target pohon, jenis pohon, tanaman pendamping, pola tanam, dampak)
- rekomendasi_detail.drainase (dimensi, solusi lahan sempit, tahapan)
- rekomendasi_detail.prioritas_aksi (minimal 3 item P1–P3)

Kembalikan HANYA JSON valid. Jangan hapus field yang sudah ada, hanya lengkapi.`;

        const repaired = await model.generateContent(repairPrompt);
        const repairedText = repaired.response.text();
        aiData = JSON.parse(repairedText);
        // Pastikan kompatibilitas lagi setelah repair
        if (isBlank(aiData.kesimpulan) && !isBlank(aiData.kesimpulan_ringkas)) {
          aiData.kesimpulan = aiData.kesimpulan_ringkas;
        }
        if (isBlank(aiData.rekomendasi)) {
          aiData.rekomendasi =
            aiData.kesimpulan_ringkas ||
            "Rekomendasi rinci tersedia pada field rekomendasi_detail.";
        }
      } catch (e) {
        console.warn("Gagal memperbaiki output AI yang terpotong:", e);
      }
    }

    // ==========================================
    // PROSES MENYIMPAN DATA KE SUPABASE
    // ==========================================
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: dbData, error: dbError } = await supabase
        .from("surveys")
        .insert([
          {
            lat: lat,
            lng: lng,
            score: aiData.score,
            kepadatan: aiData.kepadatan,
            jalan: aiData.jalan,
            drainase: aiData.drainase,
            hijau: aiData.hijau,
            bencana: aiData.bencana,
            // Simpan ringkasan saja agar popup/riwayat tetap singkat.
            kesimpulan: aiData.kesimpulan_ringkas || aiData.kesimpulan || "",
          },
        ]);

      if (dbError) {
        console.error("Gagal menyimpan ke Supabase:", dbError);
      }
    } else {
      console.warn("Kredensial Supabase tidak lengkap. Melewati penyimpanan data survei ke database.");
    }

    // Mengembalikan hasil AI ke frontend (browser)
    return NextResponse.json(aiData);
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
