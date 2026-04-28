import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Memastikan data selalu segar (tidak di-cache oleh browser)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Menarik koordinat, skor, dan kesimpulan dari tabel 'surveys'
    const { data, error } = await supabase
      .from("surveys")
      .select("lat, lng, score, kesimpulan")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Kirim data ke frontend
    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan pada server saat mengambil data.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
