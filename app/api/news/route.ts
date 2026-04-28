import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Mengambil parameter pencarian 'q' dari URL frontend
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get('q');

  if (!q) {
    return new NextResponse('Kata kunci pencarian tidak ditemukan', { status: 400 });
  }

  // URL asli Google News RSS
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=id&gl=ID&ceid=ID:id`;

  try {
    // Server Next.js bertindak sebagai agen untuk mengambil berita (Kebal blokir CORS)
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Google News menolak dengan status: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // Mengembalikan data XML ke frontend
    return new NextResponse(xmlText, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return new NextResponse('Gagal mengambil berita', { status: 500 });
  }
}