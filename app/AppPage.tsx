import { getIframeNavbar } from "./_shared/iframeNavbar";

const DASHBOARD_HREF = "/survey"; // Ubah jika route survey/dashboard kamu berbeda
const NAVBAR = getIframeNavbar({ mode: "landing", dashboardHref: DASHBOARD_HREF });

const landingHtml = String.raw`
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EcoSurvey — Landing</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      --bg0:#07080b;
      --bg1:#0b0d12;
      --card:rgba(255,255,255,0.06);
      --card2:rgba(255,255,255,0.08);
      --stroke:rgba(255,255,255,0.10);
      --stroke2:rgba(255,255,255,0.14);
      --text:#f1f5f9;
      --text2:rgba(241,245,249,0.82);
      --text3:rgba(241,245,249,0.58);
      /* Dominan hijau */
      --accent:#16a34a;
      --accent2:#22c55e;
      --eco:#22c55e;
      --blue:#60a5fa;
      --radius:18px;
      --shadow:0 18px 60px rgba(0,0,0,0.45);
    }
    body{
      font-family:'DM Sans',sans-serif;
      color:var(--text);
      min-height:100vh;
      background:
        radial-gradient(900px 520px at 60% 35%, rgba(34,197,94,0.16), transparent 55%),
        radial-gradient(900px 520px at 22% 78%, rgba(34,197,94,0.14), transparent 60%),
        radial-gradient(800px 520px at 90% 80%, rgba(96,165,250,0.12), transparent 60%),
        radial-gradient(900px 520px at 50% 0%, rgba(255,255,255,0.08), transparent 55%),
        linear-gradient(180deg, #05060a 0%, #070811 35%, #05060a 100%);
    }
    a{color:inherit}
    .serif{font-family:'Playfair Display',serif}

    /* Navbar seperti contoh (menu kanan atas + tombol merah) */
    .header{
      position:fixed;top:0;left:0;right:0;
      height:64px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 clamp(16px, 3vw, 44px);
      z-index:50;
      background:linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.10));
      backdrop-filter:blur(10px);
    }
    .brand-mini{
      display:flex;align-items:center;gap:10px;
      font-weight:800;
      letter-spacing:-0.2px;
      color:rgba(241,245,249,0.9);
      text-decoration:none;
      min-width:120px;
    }
    .dot{
      width:10px;height:10px;border-radius:999px;background:var(--eco);
      box-shadow:0 0 0 6px rgba(34,197,94,0.10);
    }
    .nav{
      display:flex;align-items:center;gap:14px;
      color:rgba(241,245,249,0.86);
      font-weight:600;
      font-size:12.5px;
    }
    .nav a{
      text-decoration:none;
      padding:8px 8px;
      border-radius:10px;
      color:rgba(241,245,249,0.78);
      transition:all .15s;
      white-space:nowrap;
    }
    .nav a.active{color:var(--accent2)}
    .nav a:hover{color:#fff;background:rgba(255,255,255,0.06)}
    .btn-cta{
      text-decoration:none;
      padding:9px 14px;
      border-radius:10px;
      background:linear-gradient(135deg, #22c55e, var(--accent));
      color:#fff;
      font-weight:800;
      font-size:12.5px;
      box-shadow:0 12px 26px rgba(34,197,94,0.20);
      border:1px solid rgba(255,255,255,0.10);
    }
    .btn-cta:hover{filter:brightness(1.05);transform:translateY(-1px)}

    .hamburger{display:none}
    .drawer{display:none}

    /* HERO */
    .hero{
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:92px clamp(16px, 3vw, 44px) 52px;
    }
    .hero-inner{
      width:100%;
      text-align:center;
    }
    .mark{
      display:flex;flex-direction:column;align-items:center;gap:10px;
      margin-bottom:14px;
    }
    .logo{
      display:flex;align-items:center;gap:10px;
      font-weight:900;
      letter-spacing:-0.6px;
      font-size:42px;
    }
    .logo .x{color:var(--accent)}
    .logo-sub{
      display:inline-flex;
      align-items:center;
      gap:10px;
      font-size:10px;
      letter-spacing:2.6px;
      text-transform:uppercase;
      color:rgba(241,245,249,0.62);
    }
    .divider{
      height:1px;width:110px;
      background:linear-gradient(90deg, transparent, rgba(245,158,11,0.65), transparent);
    }

    h1{
      font-size:56px;
      line-height:1.06;
      letter-spacing:-0.8px;
      margin-top:6px;
    }
    .accent{
      color:var(--accent2);
      text-decoration:underline;
      text-decoration-thickness:3px;
      text-underline-offset:8px;
    }
    .sub{
      margin:14px auto 0;
      max-width:70ch;
      color:rgba(241,245,249,0.72);
      font-size:14px;
      line-height:1.8;
    }
    .actions{
      margin-top:18px;
      display:flex;
      justify-content:center;
      gap:12px;
      flex-wrap:wrap;
    }
    .btn{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      padding:11px 16px;
      border-radius:10px;
      text-decoration:none;
      font-weight:800;
      font-size:12.5px;
      border:1px solid rgba(255,255,255,0.14);
      background:rgba(255,255,255,0.06);
      color:rgba(241,245,249,0.92);
      transition:all .15s;
    }
    .btn:hover{background:rgba(255,255,255,0.10);transform:translateY(-1px)}
    .btn-primary{
      background:linear-gradient(135deg, #22c55e, var(--accent));
      border-color:rgba(255,255,255,0.10);
      box-shadow:0 16px 34px rgba(34,197,94,0.18);
    }

    .scroll-hint{
      margin-top:26px;
      display:flex;align-items:center;justify-content:center;gap:10px;
      color:rgba(241,245,249,0.55);
      font-size:11px;
    }
    .scroll-bar{
      width:1px;height:18px;background:rgba(241,245,249,0.18);
      position:relative;overflow:hidden;
    }
    .scroll-bar::after{
      content:"";
      position:absolute;left:0;right:0;top:-30%;
      height:40%;
      background:rgba(241,245,249,0.55);
      animation:scroll 1.6s ease-in-out infinite;
    }
    @keyframes scroll{0%{top:-30%}100%{top:110%}}

    /* Sections: tetap ada sesuai permintaan (fitur, pasar, pengguna, dll) */
    .container{
      /* Full kanan-kiri */
      width:100%;
      max-width:none;
      margin:0;
      padding:0 clamp(16px, 3vw, 44px) 58px;
    }
    .section{
      padding:40px 0;
      border-top:1px solid rgba(255,255,255,0.08);
    }
    .section:first-child{border-top:none;padding-top:22px}
    .section-head{
      display:flex;align-items:flex-end;justify-content:space-between;gap:12px;
      margin-bottom:14px;
    }
    .section-head h2{
      font-size:19px;
      letter-spacing:-0.2px;
    }
    .section-head p{
      color:rgba(241,245,249,0.58);
      font-size:13px;
      line-height:1.7;
      max-width:74ch;
    }
    .grid{
      display:grid;
      grid-template-columns:repeat(3, 1fr);
      gap:12px;
    }
    .card{
      background:rgba(255,255,255,0.06);
      border:1px solid rgba(255,255,255,0.10);
      border-radius:16px;
      box-shadow:0 12px 40px rgba(0,0,0,0.25);
      padding:16px;
    }
    .pill{
      display:inline-flex;
      font-size:10px;
      font-weight:900;
      letter-spacing:2px;
      text-transform:uppercase;
      padding:6px 10px;
      border-radius:999px;
      background:rgba(255,255,255,0.06);
      border:1px solid rgba(255,255,255,0.12);
      color:rgba(241,245,249,0.70);
      margin-bottom:10px;
    }
    .card h3{
      font-size:13px;
      margin-bottom:8px;
    }
    .card p{
      color:rgba(241,245,249,0.70);
      font-size:13px;
      line-height:1.65;
    }
    .cta{
      margin-top:16px;
      padding:16px;
      border-radius:18px;
      background:linear-gradient(135deg, rgba(34,197,94,0.18), rgba(96,165,250,0.10));
      border:1px solid rgba(255,255,255,0.10);
      box-shadow:var(--shadow);
      display:flex;align-items:center;justify-content:space-between;gap:16px;
    }

    /* Feature carousel (slider) */
    .feature-wrap{position:relative;margin-top:10px}
    .feature-viewport{
      position:relative;
      overflow:hidden;
      padding:24px 0 12px;
    }
    .feature-viewport::before,
    .feature-viewport::after{
      content:"";
      position:absolute;top:0;bottom:0;width:140px;
      z-index:3;pointer-events:none;
    }
    .feature-viewport::before{
      left:0;
      background:linear-gradient(90deg, rgba(5,6,10,0.95), rgba(5,6,10,0));
    }
    .feature-viewport::after{
      right:0;
      background:linear-gradient(270deg, rgba(5,6,10,0.95), rgba(5,6,10,0));
    }
    .feature-track{
      display:flex;
      gap:16px;
      align-items:stretch;
      transition:transform .5s cubic-bezier(.2,.9,.2,1);
      will-change:transform;
    }
    .feature-slide{
      width:360px;
      flex:0 0 auto;
      border-radius:18px;
      background:rgba(255,255,255,0.06);
      border:1px solid rgba(255,255,255,0.10);
      box-shadow:0 12px 44px rgba(0,0,0,0.30);
      padding:14px;
      opacity:0.32;
      transform:scale(0.92);
      filter:saturate(0.9) blur(0.4px);
      transition:opacity .35s, transform .35s, filter .35s, background .35s, border-color .35s;
    }
    .feature-slide.active{
      opacity:1;
      transform:scale(1.03);
      filter:none;
      background:rgba(255,255,255,0.10);
      border-color:rgba(34,197,94,0.24);
      box-shadow:0 18px 60px rgba(0,0,0,0.46);
    }
    .slide-media{
      height:170px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,0.10);
      overflow:hidden;
      position:relative;
      background:
        radial-gradient(700px 240px at 30% 20%, rgba(34,197,94,0.30), transparent 60%),
        radial-gradient(700px 240px at 90% 60%, rgba(96,165,250,0.22), transparent 60%),
        linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02));
    }
    .slide-media .icon{
      position:absolute;left:14px;bottom:12px;
      width:44px;height:44px;border-radius:14px;
      display:flex;align-items:center;justify-content:center;
      background:rgba(0,0,0,0.35);
      border:1px solid rgba(255,255,255,0.16);
      font-size:20px;
    }
    .slide-title{margin-top:12px;font-weight:900;font-size:16px}
    .slide-meta{margin-top:4px;color:rgba(241,245,249,0.60);font-size:11px}
    .slide-desc{margin-top:10px;color:rgba(241,245,249,0.72);font-size:12.5px;line-height:1.65}
    .slide-btn{
      margin-top:12px;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      padding:10px 14px;
      border-radius:999px;
      text-decoration:none;
      font-weight:900;
      font-size:12px;
      background:linear-gradient(135deg, rgba(34,197,94,0.95), rgba(22,163,74,0.92));
      border:1px solid rgba(255,255,255,0.10);
      color:#fff;
      box-shadow:0 12px 26px rgba(34,197,94,0.18);
    }
    .feature-nav{
      position:absolute;left:0;right:0;top:50%;
      transform:translateY(-36%);
      display:flex;justify-content:space-between;
      padding:0 8px;
      z-index:4;
      pointer-events:none;
    }
    .feature-arrow{
      pointer-events:auto;
      width:42px;height:42px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,0.14);
      background:rgba(255,255,255,0.06);
      color:rgba(241,245,249,0.92);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
      transition:all .15s;
    }
    .feature-arrow:hover{background:rgba(255,255,255,0.10);transform:translateY(-1px)}
    .feature-dots{display:flex;justify-content:center;gap:7px;margin-top:6px}
    .dotbtn{
      width:7px;height:7px;border-radius:999px;
      border:1px solid rgba(255,255,255,0.18);
      background:rgba(255,255,255,0.10);
      cursor:pointer;
      opacity:0.8;
    }
    .dotbtn.active{
      width:18px;
      background:rgba(34,197,94,0.90);
      border-color:rgba(34,197,94,0.35);
    }

    /* Section split layout (seperti contoh: copy kiri + slider kanan) */
    .section-split{
      display:grid;
      grid-template-columns:360px 1fr;
      gap:26px;
      align-items:start;
      margin-top:10px;
    }

    /* Market/Insight layout seperti screenshot (judul + 4 item kiri, media kanan) */
    .market-layout{
      display:grid;
      /* gambar kiri, teks kanan */
      grid-template-columns:0.95fr 1.05fr;
      gap:28px;
      align-items:center;
      margin-top:10px;
    }
    .market-left h2{
      margin-top:10px;
      font-size:40px;
      line-height:1.05;
      letter-spacing:-0.6px;
    }
    .market-items{
      margin-top:18px;
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:18px 18px;
    }
    .market-item{
      display:flex;
      align-items:flex-start;
      gap:12px;
      padding:0;
    }
    .mi-ic{
      width:36px;height:36px;border-radius:12px;
      display:flex;align-items:center;justify-content:center;
      background:rgba(34,197,94,0.10);
      border:1px solid rgba(34,197,94,0.18);
      color:rgba(241,245,249,0.95);
      flex-shrink:0;
      box-shadow:0 10px 22px rgba(34,197,94,0.10);
      font-size:18px;
    }
    .mi-title{font-weight:900;font-size:13px;color:rgba(241,245,249,0.92)}
    .mi-desc{margin-top:6px;color:rgba(241,245,249,0.64);font-size:12.5px;line-height:1.65}
    .market-media{
      border-radius:18px;
      border:1px solid rgba(255,255,255,0.10);
      background:
        radial-gradient(900px 340px at 35% 20%, rgba(34,197,94,0.22), transparent 60%),
        radial-gradient(900px 340px at 90% 70%, rgba(96,165,250,0.18), transparent 60%),
        linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04));
      box-shadow:0 18px 60px rgba(0,0,0,0.40);
      overflow:hidden;
      min-height:320px;
      display:flex;
      align-items:flex-end;
      justify-content:flex-start;
      padding:16px;
      position:relative;
    }
    .market-media::after{
      content:"";
      position:absolute;inset:0;
      background:linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.35) 100%);
      pointer-events:none;
    }
    .market-media-caption{
      position:relative;
      z-index:1;
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding:10px 12px;
      border-radius:14px;
      background:rgba(0,0,0,0.45);
      border:1px solid rgba(255,255,255,0.14);
      color:rgba(241,245,249,0.90);
      font-weight:800;
      font-size:12px;
      backdrop-filter:blur(8px);
    }
    .sidecopy{
      padding-top:8px;
    }
    .eyebrow{
      display:inline-flex;
      align-items:center;
      gap:10px;
      font-size:10px;
      letter-spacing:2.6px;
      text-transform:uppercase;
      color:rgba(241,245,249,0.62);
    }
    .eyebrow::before{
      content:"";
      width:44px;height:1px;
      background:linear-gradient(90deg, rgba(34,197,94,0.85), transparent);
    }
    .sidecopy h2{
      margin-top:10px;
      font-size:34px;
      line-height:1.08;
      letter-spacing:-0.5px;
    }
    .sidecopy p{
      margin-top:10px;
      color:rgba(241,245,249,0.68);
      font-size:13.5px;
      line-height:1.75;
    }
    .sidecopy .mini{
      margin-top:12px;
      display:flex;
      flex-direction:column;
      gap:8px;
    }
    .mini-item{
      display:flex;gap:10px;align-items:flex-start;
      color:rgba(241,245,249,0.70);
      font-size:13px;
      line-height:1.55;
    }
    .mini-item .b{
      width:22px;height:22px;border-radius:8px;
      display:flex;align-items:center;justify-content:center;
      background:rgba(34,197,94,0.14);
      border:1px solid rgba(34,197,94,0.18);
      color:rgba(241,245,249,0.92);
      flex-shrink:0;
      font-weight:900;
      font-size:12px;
    }

    /* Carousel gaya "kartu putih" seperti screenshot, tetap di background hitam */
    .svc-wrap{position:relative}
    .svc-viewport{overflow:hidden;padding:10px 0 0;position:relative}
    .svc-track{
      display:flex;
      gap:18px;
      align-items:stretch;
      transition:transform .55s cubic-bezier(.2,.9,.2,1);
      will-change:transform;
      padding:10px 0 6px;
    }
    .svc-slide{
      width:300px;
      flex:0 0 auto;
      opacity:0.30;
      transform:scale(0.92);
      filter:saturate(0.92) blur(0.4px);
      transition:opacity .35s, transform .35s, filter .35s;
    }
    .svc-slide.active{opacity:1;transform:scale(1.02);filter:none}
    .svc-card{
      height:100%;
      background:rgba(255,255,255,0.96);
      border-radius:16px;
      overflow:hidden;
      box-shadow:0 20px 60px rgba(0,0,0,0.42);
      border:1px solid rgba(255,255,255,0.10);
      color:#0f172a;
    }
    .svc-media{
      height:158px;
      position:relative;
      background:
        radial-gradient(900px 260px at 30% 10%, rgba(34,197,94,0.35), transparent 60%),
        radial-gradient(900px 260px at 90% 60%, rgba(96,165,250,0.25), transparent 60%),
        linear-gradient(135deg, rgba(15,23,42,0.12), rgba(15,23,42,0.06));
    }
    .svc-media .ic{
      position:absolute;left:14px;bottom:12px;
      width:44px;height:44px;border-radius:14px;
      display:flex;align-items:center;justify-content:center;
      background:rgba(15,23,42,0.65);
      border:1px solid rgba(255,255,255,0.22);
      color:#fff;
      font-size:20px;
    }
    .svc-badge{
      position:absolute;top:10px;right:10px;
      width:26px;height:26px;border-radius:10px;
      background:rgba(34,197,94,0.90);
      color:#052e16;
      display:flex;align-items:center;justify-content:center;
      font-weight:900;
      font-size:12px;
      box-shadow:0 10px 22px rgba(34,197,94,0.25);
      border:1px solid rgba(255,255,255,0.25);
    }
    .svc-body{padding:14px 14px 16px}
    .svc-title{font-weight:900;font-size:14px;color:#0b1220}
    .svc-desc{margin-top:8px;color:#334155;font-size:12.5px;line-height:1.65}
    .svc-footer{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      padding:10px 6px 0;
    }
    .svc-dots{display:flex;justify-content:center;gap:7px;flex:1}
    .svc-arrows{display:flex;gap:10px}
    .svc-arrow{
      width:36px;height:36px;border-radius:999px;
      border:1px solid rgba(255,255,255,0.16);
      background:rgba(255,255,255,0.06);
      color:rgba(241,245,249,0.92);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
      transition:all .15s;
    }
    .svc-arrow:hover{background:rgba(255,255,255,0.10);transform:translateY(-1px)}

    /* FAQ accordion (tetap bg hitam) */
    .faq-list{display:flex;flex-direction:column;gap:10px}
    .faq-item{
      border-radius:16px;
      background:rgba(255,255,255,0.06);
      border:1px solid rgba(255,255,255,0.10);
      box-shadow:0 12px 40px rgba(0,0,0,0.22);
      overflow:hidden;
    }
    .faq-q{
      width:100%;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:14px;
      padding:14px 14px;
      background:transparent;
      border:none;
      cursor:pointer;
      color:rgba(241,245,249,0.92);
      text-align:left;
      font-weight:900;
      font-size:13px;
    }
    .faq-q .tag{
      display:inline-flex;
      align-items:center;
      font-size:10px;
      font-weight:900;
      letter-spacing:2px;
      text-transform:uppercase;
      padding:6px 10px;
      border-radius:999px;
      background:rgba(255,255,255,0.06);
      border:1px solid rgba(255,255,255,0.12);
      color:rgba(241,245,249,0.70);
      flex-shrink:0;
    }
    .faq-q .chev{
      width:34px;height:34px;border-radius:999px;
      display:flex;align-items:center;justify-content:center;
      border:1px solid rgba(255,255,255,0.14);
      background:rgba(255,255,255,0.06);
      color:rgba(241,245,249,0.92);
      flex-shrink:0;
      transition:transform .18s, background .18s;
    }
    .faq-item.open .faq-q .chev{transform:rotate(180deg);background:rgba(255,255,255,0.10)}
    .faq-a{
      max-height:0;
      overflow:hidden;
      transition:max-height .28s ease;
    }
    .faq-a-inner{
      padding:0 14px 14px;
      color:rgba(241,245,249,0.70);
      font-size:12.5px;
      line-height:1.7;
    }
    .faq-a-inner a{color:rgba(34,197,94,0.92);font-weight:800;text-decoration:none}
    .faq-a-inner a:hover{text-decoration:underline}
    .cta h3{font-size:15px}
    .cta p{margin-top:6px;color:rgba(241,245,249,0.72);font-size:12.5px;line-height:1.6}
    footer{
      padding:24px 0 44px;
      color:rgba(241,245,249,0.50);
      font-size:12px;
      text-align:center;
    }

    /* Responsive */
    @media (max-width: 1024px){
      h1{font-size:48px}
      .grid{grid-template-columns:repeat(2,1fr)}
      .cta{flex-direction:column;align-items:flex-start}
      .feature-viewport::before,.feature-viewport::after{width:110px}
      .section-split{grid-template-columns:1fr;gap:16px}
      .market-layout{grid-template-columns:1fr;gap:16px}
      .market-left h2{font-size:34px}
    }
    @media (max-width: 760px){
      .brand-mini{min-width:auto}
      .nav{display:none}
      .hamburger{
        display:inline-flex;
        width:42px;height:42px;
        border-radius:12px;
        border:1px solid rgba(255,255,255,0.14);
        background:rgba(255,255,255,0.06);
        color:#fff;
        align-items:center;justify-content:center;
        cursor:pointer;
      }
      .drawer{
        display:none;
        position:fixed;inset:64px 0 0 0;
        background:rgba(0,0,0,0.78);
        backdrop-filter:blur(10px);
        border-top:1px solid rgba(255,255,255,0.10);
        padding:16px 18px;
        z-index:60;
      }
      .drawer.open{display:block}
      .drawer a{
        display:block;
        padding:12px 12px;
        border-radius:14px;
        text-decoration:none;
        font-weight:800;
        color:rgba(241,245,249,0.92);
        border:1px solid rgba(255,255,255,0.12);
        background:rgba(255,255,255,0.06);
        margin-bottom:10px;
      }
      .grid{grid-template-columns:1fr}
      h1{font-size:40px}
      .logo{font-size:38px}
      .feature-slide{width:300px}
      .feature-viewport::before,.feature-viewport::after{width:70px}
      .svc-slide{width:280px}
      .market-items{grid-template-columns:1fr}
      .market-media{min-height:240px}
    }
    @media (max-width: 420px){
      h1{font-size:34px}
      .logo{font-size:34px}
    }
  </style>
</head>
<body>
  ${NAVBAR.html}

  <section class="hero" id="beranda">
    <div class="hero-inner">
      <div class="mark">
        <div class="logo serif">
          Eco<span class="x">Survey</span>
        </div>
        <div class="logo-sub">
          <span class="divider"></span>
          <span>AI Field Analysis Platform</span>
          <span class="divider"></span>
        </div>
      </div>

      <h1 class="serif">
        Menjaga Keputusan Anda Tetap <span class="accent">Tepat</span>
      </h1>
      <p class="sub">
        Mitra profesional untuk analisis lapangan berbasis peta, dokumentasi foto, cuaca & iklim, pantauan warga,
        hingga rekomendasi AI — agar prioritas perbaikan infrastruktur dan mitigasi banjir bisa ditentukan lebih cepat.
      </p>

      <div class="actions">
        <a class="btn btn-primary" href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Mulai Analisis →</a>
        <a class="btn" href="#fitur">Jelajahi Layanan</a>
      </div>

      <div class="scroll-hint" aria-hidden="true">
        <div class="scroll-bar"></div>
        <span>Scroll untuk detail</span>
      </div>
    </div>
  </section>

  <main class="container">
    <section class="section" id="fitur">
      <div class="section-head">
        <div>
          <h2>Layanan / Fitur Utama</h2>
          <p>Semua poin di bawah ini terhubung langsung dengan fitur di dashboard EcoSurvey (peta, unggah foto, analisis AI, cuaca/iklim, berita, dan zonasi riwayat).</p>
        </div>
      </div>
      <div class="feature-wrap" aria-label="Slider fitur">
        <div class="feature-nav" aria-hidden="false">
          <button class="feature-arrow" id="featPrev" aria-label="Sebelumnya">‹</button>
          <button class="feature-arrow" id="featNext" aria-label="Berikutnya">›</button>
        </div>
        <div class="feature-viewport" id="featureViewport">
          <div class="feature-track" id="featureTrack">
            <div class="feature-slide">
              <div class="slide-media"><div class="icon">🗺️</div></div>
              <div class="slide-title">Peta Interaktif & Pencarian Lokasi</div>
              <div class="slide-meta">6 fitur • Peta</div>
              <div class="slide-desc">Klik peta atau cari alamat/kota. Koordinat otomatis menjadi basis analisis dan pemanggilan data eksternal.</div>
              <a class="slide-btn" href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Buka Dashboard</a>
            </div>
            <div class="feature-slide">
              <div class="slide-media"><div class="icon">📸</div></div>
              <div class="slide-title">Dokumentasi Lapangan (Upload Foto)</div>
              <div class="slide-meta">6 fitur • Dokumentasi</div>
              <div class="slide-desc">Drag & drop, preview, dan ganti foto kapan saja. Foto/citra menjadi input utama untuk AI.</div>
              <a class="slide-btn" href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Mulai Analisis</a>
            </div>
            <div class="feature-slide">
              <div class="slide-media"><div class="icon">📡</div></div>
              <div class="slide-title">Tangkap Area Satelit & Street View</div>
              <div class="slide-meta">6 fitur • Integrasi</div>
              <div class="slide-desc">Gunakan “Tangkap area ini” untuk citra satelit sekitar titik dan akses Street View untuk validasi kondisi.</div>
              <a class="slide-btn" href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Coba Sekarang</a>
            </div>
            <div class="feature-slide">
              <div class="slide-media"><div class="icon">🔬</div></div>
              <div class="slide-title">Analisis AI: Skor & Rekomendasi</div>
              <div class="slide-meta">6 fitur • AI</div>
              <div class="slide-desc">Menghasilkan skor kelayakan serta rekomendasi, termasuk kepadatan, akses jalan, drainase, hijau, dan risiko bencana.</div>
              <a class="slide-btn" href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Buka Dashboard</a>
            </div>
            <div class="feature-slide">
              <div class="slide-media"><div class="icon">🌦️</div></div>
              <div class="slide-title">Cuaca Real-time & Iklim Tahunan</div>
              <div class="slide-meta">6 fitur • Data Eksternal</div>
              <div class="slide-desc">Tampilkan cuaca hari ini dan pola curah hujan 1 tahun untuk konteks mitigasi dan ketahanan infrastruktur.</div>
              <a class="slide-btn" href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Cek Lokasi</a>
            </div>
            <div class="feature-slide">
              <div class="slide-media"><div class="icon">🟢</div></div>
              <div class="slide-title">Zonasi Riwayat & Pantauan Warga</div>
              <div class="slide-meta">6 fitur • Insight</div>
              <div class="slide-desc">Riwayat analisis divisualisasikan sebagai zona warna di peta, plus pantauan berita berbasis lokasi untuk mendeteksi laporan darurat.</div>
              <a class="slide-btn" href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Lihat Zonasi</a>
            </div>
          </div>
        </div>
        <div class="feature-dots" id="featureDots" aria-label="Navigasi slide"></div>
      </div>
    </section>

    <section class="section" id="pengguna">
      <div class="section-split">
        <div class="sidecopy">
          <div class="eyebrow">Tentang Pengguna</div>
          <h2 class="serif">Dibuat untuk kerja lapangan yang lebih rapi dan cepat.</h2>
          <p>
            EcoSurvey menghubungkan data lapangan (lokasi + foto) dengan analisis AI dan data pendukung,
            agar tim bisa menyusun prioritas penanganan dengan lebih cepat, jelas, dan konsisten.
          </p>
          <div class="mini">
            <div class="mini-item"><div class="b">1</div><div><b>Petugas Lapangan</b> — catat kondisi dan unggah bukti foto.</div></div>
            <div class="mini-item"><div class="b">2</div><div><b>Tim Analis</b> — membandingkan area dan melihat tren.</div></div>
            <div class="mini-item"><div class="b">3</div><div><b>Pengambil Keputusan</b> — melihat ringkasan dan rekomendasi.</div></div>
          </div>
        </div>

        <div class="svc-wrap" aria-label="Slider pengguna">
          <div class="svc-viewport" id="usersViewport">
            <div class="svc-track" id="usersTrack">
              <div class="svc-slide">
                <div class="svc-card">
                  <div class="svc-media"><div class="svc-badge">1</div><div class="ic">👷</div></div>
                  <div class="svc-body">
                    <div class="svc-title">Petugas Lapangan</div>
                    <div class="svc-desc">Pilih lokasi, unggah foto, lalu dapat ringkasan kondisi untuk pelaporan cepat dan konsisten.</div>
                  </div>
                </div>
              </div>
              <div class="svc-slide">
                <div class="svc-card">
                  <div class="svc-media"><div class="svc-badge">2</div><div class="ic">🗺️</div></div>
                  <div class="svc-body">
                    <div class="svc-title">Analis GIS / Perencana</div>
                    <div class="svc-desc">Butuh metrik terstruktur dan zonasi riwayat untuk membandingkan area serta menyusun prioritas program.</div>
                  </div>
                </div>
              </div>
              <div class="svc-slide">
                <div class="svc-card">
                  <div class="svc-media"><div class="svc-badge">3</div><div class="ic">🏛️</div></div>
                  <div class="svc-body">
                    <div class="svc-title">Pengambil Keputusan</div>
                    <div class="svc-desc">Mendapat skor kelayakan + rekomendasi AI dengan konteks cuaca, iklim, dan pantauan warga.</div>
                  </div>
                </div>
              </div>
              <div class="svc-slide">
                <div class="svc-card">
                  <div class="svc-media"><div class="svc-badge">4</div><div class="ic">🧭</div></div>
                  <div class="svc-body">
                    <div class="svc-title">Koordinator / Supervisor</div>
                    <div class="svc-desc">Memantau kualitas input, menyamakan standar penilaian, dan melihat tren area berdasarkan zonasi.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="svc-footer">
            <div class="svc-dots" id="usersDots" aria-label="Navigasi pengguna"></div>
            <div class="svc-arrows">
              <button class="svc-arrow" id="usersPrev" aria-label="Sebelumnya">‹</button>
              <button class="svc-arrow" id="usersNext" aria-label="Berikutnya">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="pasar">
      <div class="market-layout">
        <div class="market-media" aria-label="Ilustrasi insight pasar">
          <div class="market-media-caption">🌿 Insight lokasi + AI → prioritas kerja lebih cepat</div>
        </div>

        <div class="market-left">
          <div class="eyebrow">Insight Pasar</div>
          <h2 class="serif">EcoSurvey untuk Kota & Infrastruktur</h2>
          <div class="market-items">
            <div class="market-item">
              <div class="mi-ic">📊</div>
              <div>
                <div class="mi-title">Monitoring & Dashboard</div>
                <div class="mi-desc">Pantau skor, zonasi riwayat, cuaca/iklim, serta pantauan warga untuk menentukan prioritas area.</div>
              </div>
            </div>
            <div class="market-item">
              <div class="mi-ic">🧾</div>
              <div>
                <div class="mi-title">Informasi & Layanan Publik</div>
                <div class="mi-desc">Menyajikan ringkasan kondisi yang mudah dipahami untuk koordinasi lintas tim dan pelaporan.</div>
              </div>
            </div>
            <div class="market-item">
              <div class="mi-ic">📍</div>
              <div>
                <div class="mi-title">Operasional Lapangan</div>
                <div class="mi-desc">Alur cepat: pilih lokasi → unggah foto/citra → jalankan analisis AI, cocok untuk HP/Tablet.</div>
              </div>
            </div>
            <div class="market-item">
              <div class="mi-ic">🛠️</div>
              <div>
                <div class="mi-title">Administrasi Infrastruktur</div>
                <div class="mi-desc">Dukungan bukti foto, rekomendasi AI, dan tracking zona untuk evaluasi program & tindak lanjut.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="section-split">
        <div class="sidecopy">
          <div class="eyebrow">FAQ</div>
          <h2 class="serif">Pertanyaan yang sering ditanyakan</h2>
          <p>Jawaban singkat agar pengguna baru cepat paham alur penggunaan EcoSurvey.</p>
          <div class="mini">
            <div class="mini-item"><div class="b">?</div><div>Masih bingung? Coba langsung di dashboard untuk melihat alurnya.</div></div>
          </div>
        </div>

        <div class="faq-list" aria-label="Daftar FAQ">
          <div class="faq-item open">
            <button class="faq-q" type="button" aria-expanded="true">
              <span style="display:flex;flex-direction:column;gap:6px">
                <span class="tag">DATA</span>
                <span>Apakah harus unggah foto?</span>
              </span>
              <span class="chev">⌄</span>
            </button>
            <div class="faq-a" style="max-height:220px">
              <div class="faq-a-inner">
                Ya. Foto/citra adalah input utama analisis AI. Kamu juga bisa memakai tombol <b>“Tangkap area ini”</b> untuk citra satelit di sekitar titik.
              </div>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-q" type="button" aria-expanded="false">
              <span style="display:flex;flex-direction:column;gap:6px">
                <span class="tag">PETA</span>
                <span>Kenapa harus pilih lokasi?</span>
              </span>
              <span class="chev">⌄</span>
            </button>
            <div class="faq-a">
              <div class="faq-a-inner">
                Lokasi dipakai untuk memuat <b>cuaca</b>, <b>iklim historis</b>, <b>pantauan berita</b>, dan menyimpan <b>zonasi riwayat</b> pada peta.
              </div>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-q" type="button" aria-expanded="false">
              <span style="display:flex;flex-direction:column;gap:6px">
                <span class="tag">OUTPUT</span>
                <span>Output apa yang saya dapat?</span>
              </span>
              <span class="chev">⌄</span>
            </button>
            <div class="faq-a">
              <div class="faq-a-inner">
                Skor kelayakan, rekomendasi AI, metrik kondisi (kepadatan, jalan, drainase, hijau), risiko bencana, dan pembaruan zonasi di peta.
              </div>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-q" type="button" aria-expanded="false">
              <span style="display:flex;flex-direction:column;gap:6px">
                <span class="tag">KEAMANAN</span>
                <span>Apakah data saya tersimpan?</span>
              </span>
              <span class="chev">⌄</span>
            </button>
            <div class="faq-a">
              <div class="faq-a-inner">
                Hasil analisis dapat tersimpan sebagai riwayat zonasi (tergantung konfigurasi backend). Jika kamu ingin mode <i>tanpa simpan</i>, bisa ditambahkan opsi di backend.
              </div>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-q" type="button" aria-expanded="false">
              <span style="display:flex;flex-direction:column;gap:6px">
                <span class="tag">MULAI</span>
                <span>Bagaimana cara memulai paling cepat?</span>
              </span>
              <span class="chev">⌄</span>
            </button>
            <div class="faq-a">
              <div class="faq-a-inner">
                Klik <a href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Buka Dashboard</a>, pilih lokasi di peta, unggah foto/citra, lalu tekan tombol <b>Mulai Analisis</b>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="kontak">
      <div class="cta">
        <div>
          <h3>Siap mulai analisis lokasi?</h3>
          <p>Buka dashboard EcoSurvey untuk memilih titik, unggah foto/citra, lalu jalankan analisis AI.</p>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a class="btn btn-primary" href="${DASHBOARD_HREF}" target="_top" rel="noopener" onclick="return goDashboard(event)">Buka Dashboard →</a>
          <a class="btn" href="#beranda">Kembali ke atas</a>
        </div>
      </div>
      <footer>
        © <span id="y"></span> EcoSurvey — Sistem Analisis Lapangan AI
      </footer>
    </section>
  </main>

  <script>
    document.getElementById('y').textContent = new Date().getFullYear();
    ${NAVBAR.script}

    // Navigasi ke dashboard (keluar dari iframe)
    function goDashboard(e){
      if(e) e.preventDefault();
      try{
        window.top.location.href = "${DASHBOARD_HREF}";
      }catch(err){
        window.location.href = "${DASHBOARD_HREF}";
      }
      return false;
    }

    // Navigasi (smooth scroll + active state)
    (function(){
      var header = document.querySelector('.header');
      var headerH = header ? header.getBoundingClientRect().height : 64;
      var navLinks = Array.prototype.slice.call(document.querySelectorAll('.header a[href^="#"]'));
      var drawerLinks = Array.prototype.slice.call(document.querySelectorAll('#drawer a[href^="#"]'));
      var allLinks = navLinks.concat(drawerLinks);
      var sectionIds = ['beranda','fitur','pengguna','pasar','faq','kontak'];
      var sections = sectionIds.map(function(id){ return document.getElementById(id); }).filter(Boolean);

      function setActive(hash){
        var clean = (hash || '#beranda').toLowerCase();
        navLinks.forEach(function(a){ a.classList.toggle('active', (a.getAttribute('href')||'').toLowerCase() === clean); });
      }

      function scrollToHash(hash){
        var id = String(hash || '').replace('#','');
        var el = document.getElementById(id);
        if(!el) return;
        var top = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 12);
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        setActive('#' + id);
        try { history.replaceState(null, '', '#' + id); } catch(e) {}
      }

      allLinks.forEach(function(a){
        a.addEventListener('click', function(e){
          var href = a.getAttribute('href') || '';
          if(!href || href.charAt(0) !== '#') return;
          e.preventDefault();
          toggleDrawer(false);
          scrollToHash(href);
        });
      });

      // aktif saat scroll
      var last = '';
      function onScroll(){
        var y = window.pageYOffset + headerH + 40;
        var current = '#beranda';
        for(var i=0;i<sections.length;i++){
          var s = sections[i];
          if(!s) continue;
          if(y >= s.offsetTop) current = '#' + s.id;
        }
        if(current !== last){ last = current; setActive(current); }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', function(){ headerH = header ? header.getBoundingClientRect().height : 64; onScroll(); });

      // initial
      if(location.hash) scrollToHash(location.hash); else setActive('#beranda');
      setTimeout(onScroll, 50);
    })();

    function toggleDrawer(force){
      var el = document.getElementById('drawer');
      var open = el.classList.contains('open');
      var next = (typeof force === 'boolean') ? force : !open;
      el.classList.toggle('open', next);
    }

    // klik backdrop untuk menutup drawer (mobile)
    document.addEventListener('click', function(e){
      var d = document.getElementById('drawer');
      if(!d || !d.classList.contains('open')) return;
      var hb = document.querySelector('.hamburger');
      if(d.contains(e.target) || (hb && hb.contains(e.target))) return;
      toggleDrawer(false);
    });

    // Carousel generic (tanpa library) — dipakai untuk Fitur, Pengguna, dan Pasar
    function initCarousel(opts){
      var track = document.getElementById(opts.trackId);
      var viewport = document.getElementById(opts.viewportId);
      if(!track || !viewport) return;

      var slideSelector = opts.slideSelector || '.feature-slide';
      var slides = Array.prototype.slice.call(track.querySelectorAll(slideSelector));
      if(!slides.length) return;

      var dotsWrap = opts.dotsId ? document.getElementById(opts.dotsId) : null;
      var prevBtn = opts.prevId ? document.getElementById(opts.prevId) : null;
      var nextBtn = opts.nextId ? document.getElementById(opts.nextId) : null;
      var dotClass = opts.dotClass || 'dotbtn';
      var activeClass = opts.activeClass || 'active';
      var gap = typeof opts.gap === 'number' ? opts.gap : 16;
      var idx = Math.min((opts.start || 0), slides.length - 1);

      function makeDots(){
        if(!dotsWrap) return;
        dotsWrap.innerHTML = slides.map(function(_, i){
          return '<button class="' + dotClass + '" aria-label="Slide ' + (i+1) + '" data-i="' + i + '"></button>';
        }).join('');
        dotsWrap.addEventListener('click', function(e){
          var t = e.target;
          if(!t || !t.dataset || t.dataset.i === undefined) return;
          idx = parseInt(t.dataset.i, 10) || 0;
          update();
        });
      }

      function update(){
        var cardW = slides[0].getBoundingClientRect().width;
        var vpW = viewport.getBoundingClientRect().width;
        var x = (vpW/2 - cardW/2) - (idx * (cardW + gap));
        track.style.transform = 'translateX(' + x + 'px)';

        slides.forEach(function(s, i){ s.classList.toggle(activeClass, i === idx); });
        if(dotsWrap){
          var dots = dotsWrap.querySelectorAll('.' + dotClass);
          for(var i=0;i<dots.length;i++){
            dots[i].classList.toggle(activeClass, i === idx);
          }
        }
      }

      function prev(){ idx = (idx - 1 + slides.length) % slides.length; update(); }
      function next(){ idx = (idx + 1) % slides.length; update(); }
      if(prevBtn) prevBtn.addEventListener('click', prev);
      if(nextBtn) nextBtn.addEventListener('click', next);
      window.addEventListener('resize', function(){ update(); });

      // Swipe sederhana (mobile/tablet)
      var startX = 0, dragging = false;
      viewport.addEventListener('pointerdown', function(e){
        dragging = true; startX = e.clientX || 0;
      });
      viewport.addEventListener('pointerup', function(e){
        if(!dragging) return;
        dragging = false;
        var dx = (e.clientX || 0) - startX;
        if(Math.abs(dx) > 40){ dx < 0 ? next() : prev(); }
      });

      makeDots();
      update();
    }

    initCarousel({
      trackId:'featureTrack', viewportId:'featureViewport', dotsId:'featureDots',
      prevId:'featPrev', nextId:'featNext', slideSelector:'.feature-slide',
      dotClass:'dotbtn', activeClass:'active', start:2, gap:16
    });
    initCarousel({
      trackId:'usersTrack', viewportId:'usersViewport', dotsId:'usersDots',
      prevId:'usersPrev', nextId:'usersNext', slideSelector:'.svc-slide',
      dotClass:'dotbtn', activeClass:'active', start:1, gap:18
    });

    // FAQ accordion
    (function(){
      var items = document.querySelectorAll('.faq-item');
      if(!items || !items.length) return;

      function closeItem(it){
        it.classList.remove('open');
        var btn = it.querySelector('.faq-q');
        var ans = it.querySelector('.faq-a');
        if(btn) btn.setAttribute('aria-expanded', 'false');
        if(ans) ans.style.maxHeight = '0px';
      }

      function openItem(it){
        it.classList.add('open');
        var btn = it.querySelector('.faq-q');
        var ans = it.querySelector('.faq-a');
        if(btn) btn.setAttribute('aria-expanded', 'true');
        if(ans){
          // pakai scrollHeight untuk animasi yang mulus
          ans.style.maxHeight = (ans.scrollHeight + 8) + 'px';
        }
      }

      items.forEach(function(it){
        var btn = it.querySelector('.faq-q');
        if(!btn) return;
        btn.addEventListener('click', function(){
          var isOpen = it.classList.contains('open');
          items.forEach(function(x){ if(x !== it) closeItem(x); });
          if(isOpen) closeItem(it); else openItem(it);
        });
      });

      // initial: set tinggi item yang sudah open
      items.forEach(function(it){
        if(it.classList.contains('open')) openItem(it);
        else closeItem(it);
      });
      window.addEventListener('resize', function(){
        items.forEach(function(it){
          if(it.classList.contains('open')){
            var ans = it.querySelector('.faq-a');
            if(ans) ans.style.maxHeight = (ans.scrollHeight + 8) + 'px';
          }
        });
      });
    })();
  </script>
</body>
</html>
`;

export default function LandingPage() {
  return (
    <iframe
      title="EcoSurvey — Landing"
      srcDoc={landingHtml}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        border: "none",
        display: "block",
      }}
    />
  );
}
