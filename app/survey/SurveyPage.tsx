import { getIframeNavbar } from "../_shared/iframeNavbar";

const DASHBOARD_HREF = "/survey";
const NAVBAR = getIframeNavbar({ mode: "survey", dashboardHref: DASHBOARD_HREF });

const pageHtml = String.raw`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EcoSurvey — Sistem Analisis Lapangan AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  font-family:'DM Sans',sans-serif;
  color:var(--text);
  background:
    radial-gradient(900px 520px at 60% 35%, rgba(34,197,94,0.16), transparent 55%),
    radial-gradient(900px 520px at 22% 78%, rgba(34,197,94,0.14), transparent 60%),
    radial-gradient(800px 520px at 90% 80%, rgba(96,165,250,0.12), transparent 60%),
    radial-gradient(900px 520px at 50% 0%, rgba(255,255,255,0.08), transparent 55%),
    linear-gradient(180deg, #05060a 0%, #070811 35%, #05060a 100%);
  color:var(--text);
  min-height:100vh;
}
:root{
  /* Dark palette (senada dengan landing) */
  --bg0:#07080b;
  --bg1:#0b0d12;
  --bg2:rgba(255,255,255,0.06);
  --bg3:rgba(255,255,255,0.08);
  --border:rgba(255,255,255,0.10);
  --border2:rgba(255,255,255,0.14);

  --green:#16a34a;
  --green2:#22c55e;
  --green-glow:rgba(34,197,94,0.18);
  --blue:#60a5fa;
  --blue2:#3b82f6;
  --amber:#f59e0b;
  --red:#ef4444;

  /* Alias agar navbar sama persis dengan landing */
  --accent:var(--green);
  --accent2:var(--green2);
  --eco:var(--green2);

  --text:#f1f5f9;
  --text2:rgba(241,245,249,0.82);
  --text3:rgba(241,245,249,0.58);

  --radius:14px;
  --radius-sm:10px;
}
h1,h2,h3{font-family:'Playfair Display',serif}

.app{min-height:100vh;padding-top:64px}

/* HEADER */
.header{
  /* Semi-transparan (lebih terbaca), tanpa "strip" gelap tambahan di bawah navbar */
  background:linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0.10));
  border-bottom:1px solid rgba(255,255,255,0.10);
  position:fixed;top:0;left:0;right:0;
  z-index:50;
  padding:0 clamp(16px, 3vw, 44px);
  display:flex;align-items:center;justify-content:space-between;
  height:64px;
  backdrop-filter:blur(10px);
  -webkit-backdrop-filter:blur(10px);
}
.brand-mini{
  display:flex;align-items:center;gap:10px;
  font-weight:800;
  letter-spacing:-0.2px;
  color:rgba(241,245,249,0.9);
  text-decoration:none;
  min-width:120px;
}
.plant{font-size:14px;line-height:1;opacity:0.95}
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
  text-shadow:0 8px 22px rgba(0,0,0,0.55);
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

/* MAIN LAYOUT */
.main{
  display:grid;
  grid-template-columns:minmax(0,1fr) 420px;
  gap:18px;
  /* Konten turun (tidak tenggelam di bawah navbar) */
  height:calc(100vh - 64px);
  padding:18px 22px 22px;
  width:100%;
  /* Desktop: full-width kiri & kanan */
  max-width:none;
  margin:0;
  align-items:stretch;
}

/* LEFT PANEL */
.left-panel{
  display:flex;flex-direction:column;
  overflow-y:auto;
  background:rgba(255,255,255,0.06);
  border:1px solid var(--border);
  border-radius:16px;
  box-shadow:0 18px 60px rgba(0,0,0,0.45);
  backdrop-filter:blur(10px);
  min-height:0;
}
.panel-inner{padding:18px;display:flex;flex-direction:column;gap:16px}

/* CARD */
.card{
  background:rgba(255,255,255,0.06);
  border:1px solid var(--border);
  border-radius:var(--radius);
  overflow:hidden;
  box-shadow:0 12px 40px rgba(0,0,0,0.25);
}
.card-header{
  padding:16px 20px;border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;
}
.card-title{font-family:'DM Sans',sans-serif;font-weight:900;font-size:13px;display:flex;align-items:center;gap:8px;color:rgba(241,245,249,0.92)}
.card-body{padding:20px}

/* TABS */
.tabs{display:flex;gap:8px;padding:10px 12px;border-bottom:1px solid var(--border);background:rgba(255,255,255,0.04);}
.tab{
  padding:10px 12px;border-radius:10px;
  font-size:13px;font-weight:900;font-family:'DM Sans',sans-serif;
  color:rgba(241,245,249,0.70);border:1px solid transparent;
  background:transparent;user-select:none;
}
.tab.active{
  color:rgba(241,245,249,0.92);
  background:rgba(34,197,94,0.10);
  border-color:rgba(34,197,94,0.18);
}

/* SEARCH */
.search-row{display:flex;gap:12px;padding:16px 20px;border-bottom:1px solid var(--border);position:relative;z-index:2000;align-items:center;background:rgba(255,255,255,0.04);justify-content:flex-start}
.search-input-wrap{position:relative;flex:1;min-width:0}
.search-input{
  width:100%;padding:10px 14px;
  background:rgba(255,255,255,0.06);border:1px solid var(--border2);border-radius:var(--radius-sm);
  color:rgba(241,245,249,0.92);font-size:14px;font-family:'DM Sans',sans-serif;transition:border-color 0.2s;
}
.search-input:focus{outline:none;border-color:rgba(34,197,94,0.55);box-shadow:0 0 0 4px rgba(34,197,94,0.12)}
.search-input::placeholder{color:var(--text3)}
.btn-search{
  padding:10px 18px;background:rgba(255,255,255,0.06);border:1px solid var(--border2);
  border-radius:var(--radius-sm);color:rgba(241,245,249,0.92);font-size:13px;font-weight:900;
  cursor:pointer;transition:all 0.2s;white-space:nowrap;font-family:'DM Sans',sans-serif;
}
.btn-search:hover{background:rgba(255,255,255,0.10);border-color:rgba(34,197,94,0.45)}
.btn-search:disabled{opacity:0.7;cursor:wait}
.search-status{padding:12px 14px;font-size:12px;color:var(--text3)}
.search-results{
  position:absolute;top:100%;left:0;right:0;
  background:rgba(0,0,0,0.78);border:1px solid var(--border2);border-radius:12px;
  margin-top:8px;overflow:auto;max-height:320px;z-index:2000;
  box-shadow:0 18px 50px rgba(0,0,0,0.55);
  backdrop-filter:blur(10px);
}
.search-item{
  padding:12px 16px;display:flex;align-items:flex-start;gap:10px;cursor:pointer;
  justify-content:space-between;
  border-bottom:1px solid var(--border);transition:background 0.15s;
}
.search-item:last-child{border:none}
.search-item:hover{background:rgba(241,245,249,0.9)}
.search-item:hover{background:rgba(255,255,255,0.06)}
.search-item-icon{
  width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,0.06);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;margin-top:1px;
}
.search-item-main{font-size:13px;font-weight:800;color:rgba(241,245,249,0.92);line-height:1.4;overflow-wrap:break-word}
.search-item-main{font-size:13px;font-weight:600;color:var(--text);line-height:1.4;overflow-wrap:break-word}
.search-item-coord{font-size:11px;color:var(--text3);font-family:'Space Grotesk',sans-serif;white-space:nowrap;margin-left:10px}

/* MAP */
#map{width:100%;height:460px;position:relative;z-index:1;}
.map-footer{
  padding:12px 20px;border-top:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.04);
}
.coord-display{font-family:'Space Grotesk',sans-serif;font-size:12px;color:var(--green);display:flex;align-items:center;gap:6px}
.btn-link{font-size:13px;color:var(--blue);cursor:pointer;background:none;border:none;display:flex;align-items:center;gap:4px;transition:all 0.2s;}
.btn-link:hover{color:var(--blue2);}
.btn-link:disabled{opacity:0.5;cursor:wait;}

/* UPLOAD */
.upload-zone{
  border:1.5px dashed var(--border2);border-radius:var(--radius);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  min-height:140px;cursor:pointer;transition:all 0.2s;padding:24px;text-align:center;
}
.upload-zone:hover{border-color:rgba(34,197,94,0.55);background:rgba(34,197,94,0.05)}
.upload-icon{
  width:44px;height:44px;border-radius:12px;background:var(--bg2);
  display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px;border:1px solid var(--border);
}
.upload-title{font-weight:600;font-size:14px;color:var(--text);margin-bottom:4px}
.upload-sub{font-size:12px;color:var(--text3)}
.preview-wrap{position:relative;border-radius:var(--radius-sm);overflow:hidden;border:1px solid var(--border)}
.preview-wrap img{width:100%;height:200px;object-fit:cover;display:block}
.preview-overlay{
  position:absolute;inset:0;background:rgba(0,0,0,0.5);
  display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s;cursor:pointer;
}
.preview-wrap:hover .preview-overlay{opacity:1}
.preview-name{
  position:absolute;top:10px;left:10px;
  background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);
  padding:4px 10px;border-radius:6px;font-size:11px;color:var(--text);
}

/* NEWS FEED & WEATHER */
.news-item {
  background:rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px;
  transition: all 0.2s;
  margin-bottom: 10px;
}
.news-item:hover {
  background: rgba(255,255,255,0.10);
  border-color: rgba(96,165,250,0.35);
  box-shadow: 0 10px 22px rgba(15,23,42,0.10);
}
.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: var(--text3);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}
.news-source { color: var(--blue2); }
.news-text { font-size: 12px; color: rgba(241,245,249,0.78); line-height: 1.5; }

/* ANALYZE BUTTON */
.btn-analyze{
  width:100%;padding:16px;
  background:linear-gradient(135deg,#22c55e,#16a34a);
  border:none;border-radius:var(--radius);
  color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;
  cursor:pointer;transition:all 0.2s;
  display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 4px 24px rgba(34,197,94,0.25);
}
.btn-analyze:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 32px rgba(34,197,94,0.35)}
.btn-analyze:disabled{opacity:0.45;cursor:not-allowed;box-shadow:none;transform:none}

/* GENERIC BUTTONS */
.btn{
  padding:10px 16px;border-radius:var(--radius-sm);font-size:13px;font-weight:500;
  cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px;
  font-family:'DM Sans',sans-serif;border:1px solid var(--border);
}
.btn-ghost{background:rgba(255,255,255,0.06);color:rgba(241,245,249,0.78);border-color:var(--border2)}
.btn-ghost:hover{background:rgba(255,255,255,0.10);border-color:rgba(255,255,255,0.22);color:rgba(241,245,249,0.92)}
.btn-outline-blue{background:rgba(255,255,255,0.06);border-color:rgba(96,165,250,0.25);color:rgba(241,245,249,0.86)}
.btn-outline-blue:hover{background:rgba(96,165,250,0.12);border-color:rgba(96,165,250,0.35)}

/* LAYER BUTTONS */
.layer-btn{
  padding:6px 12px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;
  border:1px solid var(--border);background:var(--bg2);color:var(--text3);
  transition:all 0.15s;text-transform:uppercase;
}
.layer-btn.active{background:rgba(34,197,94,0.15);border-color:rgba(34,197,94,0.3);color:var(--green)}

/* STATUS BADGE */
.status-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600}
.badge-green{background:rgba(34,197,94,0.12);color:var(--green);border:1px solid rgba(34,197,94,0.2)}
.badge-amber{background:rgba(245,158,11,0.12);color:#92400e;border:1px solid rgba(245,158,11,0.22)}
.badge-red{background:rgba(239,68,68,0.12);color:#b91c1c;border:1px solid rgba(239,68,68,0.2)}

/* RIGHT PANEL */
.right-panel{
  background:rgba(255,255,255,0.06);
  border:1px solid var(--border);
  border-radius:16px;
  display:flex;flex-direction:column;overflow-y:auto;
  box-shadow:0 18px 60px rgba(0,0,0,0.45);
  backdrop-filter:blur(10px);
  min-height:0;
}
.right-header{
  padding:18px 18px 16px;
  border-bottom:1px solid var(--border);
  background:rgba(255,255,255,0.04);
}
.right-header::before{
  content:"";
  display:block;
  height:3px;
  width:80px;
  border-radius:999px;
  background:linear-gradient(90deg, rgba(34,197,94,0.85), rgba(59,130,246,0.75));
  margin-bottom:12px;
}
.right-header h3{font-family:'DM Sans',sans-serif;font-weight:900;font-size:15px;color:rgba(241,245,249,0.92)}
.right-header p{font-size:12px;color:var(--text3);margin-top:2px}
.right-loc{
  margin-top:10px;
  display:none;
  align-items:center;
  gap:8px;
  padding:8px 10px;
  border-radius:12px;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12);
  color:rgba(241,245,249,0.86);
  font-size:12px;
  font-weight:800;
}
.right-loc .pin{opacity:0.9}
.right-loc .txt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.right-body{padding:16px 18px 18px;flex:1;display:flex;flex-direction:column;}

/* STEPS */
.step-item{
  display:flex;align-items:center;gap:12px;padding:14px 16px;
  border-radius:var(--radius-sm);border:1px solid var(--border);background:rgba(255,255,255,0.04);transition:all 0.3s;
}
.step-item.done{border-color:rgba(34,197,94,0.25);background:rgba(34,197,94,0.06)}
.step-num{
  width:26px;height:26px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;
}
.step-num.pending{background:var(--bg3);color:var(--text3)}
.step-num.done{background:#22c55e;color:#fff}
.step-label{font-size:13px;font-weight:800;color:rgba(241,245,249,0.86)}
.step-item.done .step-label{color:var(--green)}

/* SCORE */
.score-card{
  background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(16,163,74,0.05));
  border:1px solid rgba(34,197,94,0.22);border-radius:var(--radius);padding:24px;height:100%;
}
.score-label{font-size:11px;font-weight:700;color:var(--green);text-transform:uppercase;margin-bottom:12px;letter-spacing:0.4px}
.score-value{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:56px;line-height:1;color:var(--green)}
.score-bar-track{height:6px;border-radius:3px;background:rgba(34,197,94,0.15);margin-top:20px;overflow:hidden}
.score-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#22c55e,#86efac);transition:width 1s ease}

/* METRIC CARD */
.metric-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px;}
.metric-icon-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.metric-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px}
.metric-name{font-size:12px;font-weight:600;text-transform:uppercase;color:var(--text3)}
.metric-val{font-size:13px;color:var(--text2);line-height:1.6}

/* CONCLUSION */
.conclusion-card{background:rgba(96,165,250,0.10);border:1px solid rgba(96,165,250,0.18);border-radius:var(--radius-sm);padding:20px;}
.conclusion-label{font-size:12px;font-weight:700;color:var(--blue2);text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:6px;letter-spacing:0.4px}
.conclusion-text{font-size:14px;color:rgba(241,245,249,0.78);line-height:1.7}

/* Stat boxes (dipakai di kartu iklim) */
.statbox{
  background:rgba(255,255,255,0.06);
  border:1px solid var(--border);
  border-radius:12px;
  box-shadow:0 18px 60px rgba(0,0,0,0.35);
}

/* RESPONSIVE */
@media (max-width: 1024px){
  .main{grid-template-columns:1fr; height:auto; min-height:100vh;}
  .right-panel{order:2}
  #map{height:420px}
}
@media (max-width: 760px){
  .brand-mini{min-width:auto}
  .header{padding:0 14px}
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
  .main{padding:14px}
  .panel-inner{padding:14px}
  #map{height:320px}

  /* Search bar stack */
  .search-row{flex-direction:column;align-items:stretch;gap:10px}
  .btn-search{width:100%}

  /* Map footer stack */
  .map-footer{flex-direction:column;align-items:flex-start;gap:10px}
  .map-footer > div:last-child{width:100%;justify-content:space-between}

  /* Result grids stack */
  .results-grid{grid-template-columns:1fr}
  .metrics-grid{grid-template-columns:1fr}

  /* Action buttons stack */
  .result-actions{flex-direction:column}
  .result-actions button.flex-1{width:100%}
}
@media (max-width: 420px){
  .main{padding:10px}
  .panel-inner{padding:12px}
  #map{height:280px}
  .score-value{font-size:48px}
}

/* GRID LAYOUT */
.results-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; margin-bottom: 16px; }
.metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }

/* LOADING */
.spinner-big{
  width:64px;height:64px;border-radius:50%;
  border:3px solid rgba(34,197,94,0.2);border-top:3px solid #22c55e;
  animation:spin 1s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg)}}
.typing{display:flex;align-items:center;gap:4px;padding:12px 16px}
.typing span{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:typing 1.4s infinite}
.typing span:nth-child(2){animation-delay:0.2s}
.typing span:nth-child(3){animation-delay:0.4s}
@keyframes typing{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.1)}}

/* SCROLLBAR */
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}

/* UTILS */
.hidden{display:none!important}
.flex-1{flex:1}

/* LEAFLET OVERRIDES */
.leaflet-container{background:#0b0d12!important}
.leaflet-control-zoom a{background:rgba(0,0,0,0.55)!important;border-color:rgba(255,255,255,0.18)!important;color:rgba(241,245,249,0.90)!important}
.leaflet-control-zoom a:hover{background:rgba(0,0,0,0.70)!important}
.leaflet-control-attribution{background:rgba(0,0,0,0.55)!important;color:rgba(241,245,249,0.55)!important;font-size:10px!important}
.leaflet-control-attribution a{color:rgba(241,245,249,0.55)!important}
.leaflet-popup-content-wrapper{background:rgba(0,0,0,0.75)!important;border:1px solid rgba(255,255,255,0.16)!important;color:rgba(241,245,249,0.92)!important;border-radius:12px!important;box-shadow:0 18px 50px rgba(0,0,0,0.55)!important;backdrop-filter:blur(10px)!important}
.leaflet-popup-tip{background:rgba(0,0,0,0.75)!important}
.leaflet-popup-content{margin:18px 20px!important}
.leaflet-popup-close-button{color:var(--text3)!important;top:14px!important;right:14px!important;font-size:18px!important;line-height:1!important;padding:0!important;font-weight:400!important}
.leaflet-popup-close-button:hover{color:var(--text)!important;background:transparent!important}
.map-marker-wrap{background:transparent!important;border:none!important}
.map-marker{position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center}
.map-marker-pulse{
  position:absolute;inset:0;border-radius:50%;
  background:rgba(34,197,94,0.3);animation:markerPulse 2s ease-out infinite;
}
.map-marker-core{
  position:relative;width:20px;height:20px;border-radius:50%;
  background:#22c55e;border:3px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,0.3);z-index:2;
}
@keyframes markerPulse{
  0%{transform:scale(0.6);opacity:1}
  100%{transform:scale(2.2);opacity:0}
}
</style>
</head>
<body>

<div class="app">
  ${NAVBAR.html}

  <div class="main">

    <div class="left-panel">
      <div class="panel-inner">

        <div class="card" style="margin-bottom:0;">
          <div class="tabs">
            <div class="tab active" style="flex:1;cursor:default">🗺️ Peta Interaktif & Zonasi</div>
          </div>
          <div>
            <div class="search-row">
              <div class="search-input-wrap">
                <input class="search-input" id="searchInput" type="text" placeholder="Cari lokasi, alamat, atau kota..." autocomplete="new-password" />
                <div id="searchResults" class="search-results hidden"></div>
              </div>
              <button class="btn-search" id="btnSearch" onclick="doSearch()">Cari Lokasi</button>
            </div>
            <div id="map"></div>
            <div class="map-footer">
              <div class="coord-display" id="coordDisplay" style="opacity:0.4">
                <span>🚩</span>
                <span id="mapCoord">Klik peta untuk memilih lokasi</span>
              </div>
              <div style="display:flex; gap:10px;">
                <button class="btn-link" onclick="openStreetView()" id="btnStreetView" style="display:none; color:var(--amber);">
                  👁️ Buka Street View
                </button>
                <button class="btn-link" onclick="autoCapture()" id="capBtn" style="display:none">
                  📡 Tangkap area ini
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card" id="uploadCard" style="margin-bottom:0;">
          <div class="card-header">
            <div class="card-title">📸 Dokumentasi Lapangan</div>
            <span class="status-badge badge-amber" id="photoStatus">Diperlukan</span>
          </div>
          <div class="card-body">
            <input type="file" id="fileInput" accept="image/*" style="display:none" onchange="handleFile(event)" />
            <div id="uploadZone" class="upload-zone" onclick="document.getElementById('fileInput').click()">
              <div class="upload-icon">📁</div>
              <div class="upload-title">Unggah foto atau citra lapangan</div>
              <div class="upload-sub">Gunakan tangkapan Street View untuk akurasi drainase terbaik</div>
            </div>
            <div id="previewWrap" class="hidden">
              <div class="preview-wrap" onclick="document.getElementById('fileInput').click()">
                <img id="previewImg" src="" alt="Preview" />
                <div class="preview-overlay">
                  <span style="color:#fff;font-size:13px;font-weight:500">📷 Ganti Foto</span>
                </div>
                <div class="preview-name" id="previewName"></div>
              </div>
            </div>
          </div>
        </div>

        <button class="btn-analyze" id="btnAnalyze" onclick="doAnalyze()" disabled>
          <span>🔬</span>
          <span id="analyzeLabel">Mulai Analisis Komprehensif AI</span>
          <span>→</span>
        </button>

        <div class="card" id="analysisCard" style="margin-top:4px;">
          <div class="card-header" style="background:var(--bg2);">
            <div class="card-title">📊 Laporan Analisis AI</div>
          </div>
          <div class="card-body">
             
            <div id="stepsPanel">
              <div style="color:var(--text3);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px">Langkah Persiapan</div>
              <div style="display:flex;flex-direction:column;gap:8px">
                <div class="step-item" id="step1">
                  <div class="step-num pending" id="sn1">1</div>
                  <div style="flex:1">
                    <div class="step-label" id="sl1">Tentukan lokasi di peta</div>
                    <div style="font-size:11px;color:var(--text3);margin-top:2px">Klik atau cari lokasi survei</div>
                  </div>
                </div>
                <div class="step-item" id="step2">
                  <div class="step-num pending" id="sn2">2</div>
                  <div style="flex:1">
                    <div class="step-label" id="sl2">Unggah citra lapangan</div>
                    <div style="font-size:11px;color:var(--text3);margin-top:2px">Foto atau tangkap peta satelit</div>
                  </div>
                </div>
                <div class="step-item" id="step3">
                  <div class="step-num pending" id="sn3">3</div>
                  <div style="flex:1">
                    <div class="step-label" id="sl3">Jalankan analisis AI</div>
                    <div style="font-size:11px;color:var(--text3);margin-top:2px">AI akan mengevaluasi kondisi infrastruktur</div>
                  </div>
                </div>
              </div>
            </div>

            <div id="loadingPanel" class="hidden" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 0">
              <div class="spinner-big"></div>
              <div style="text-align:center; margin-top:16px">
                <div style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:14px;margin-bottom:4px">Menganalisis...</div>
                <div style="font-size:12px;color:var(--text3)" id="loadingMsg">AI sedang memproses citra kepadatan, infrastruktur, dan risiko.</div>
              </div>
              <div class="typing"><span></span><span></span><span></span></div>
            </div>

            <div id="resultPanel" class="hidden">
              <div class="results-grid">
                <div class="score-card">
                  <div class="score-label">Skor Kelayakan</div>
                  <div style="display:flex;align-items:flex-end;justify-content:center;gap:4px">
                    <span class="score-value" id="scoreVal">0</span>
                    <span style="font-family:'Space Grotesk',sans-serif;font-size:24px;color:var(--green);opacity:0.75;padding-bottom:4px">/100</span>
                  </div>
                  <div id="scoreBadge" style="margin-top:12px"></div>
                  <div class="score-bar-track">
                    <div class="score-bar-fill" id="scoreBar" style="width:0%"></div>
                  </div>
                </div>

                <div class="conclusion-card" style="margin:0; height:100%; display:flex; flex-direction:column;">
                  <div class="conclusion-label">✨ Kesimpulan & Rekomendasi AI</div>
                  <div class="conclusion-text" id="metKesimpulan" style="flex:1;">—</div>
                </div>
              </div>

              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-icon-row">
                    <div class="metric-icon" style="background:rgba(245,158,11,0.12)">🏘️</div>
                    <div class="metric-name">Kepadatan Pemukiman</div>
                  </div>
                  <div class="metric-val" id="metKepadatan">—</div>
                </div>
                <div class="metric-card">
                  <div class="metric-icon-row">
                    <div class="metric-icon" style="background:rgba(59,130,246,0.12)">🛣️</div>
                    <div class="metric-name">Akses Jalan</div>
                  </div>
                  <div class="metric-val" id="metJalan">—</div>
                </div>
                <div class="metric-card">
                  <div class="metric-icon-row">
                    <div class="metric-icon" style="background:rgba(59,130,246,0.12)">💧</div>
                    <div class="metric-name">Sistem Drainase</div>
                  </div>
                  <div class="metric-val" id="metDrainase">—</div>
                </div>
                <div class="metric-card">
                  <div class="metric-icon-row">
                    <div class="metric-icon" style="background:rgba(34,197,94,0.12)">🌳</div>
                    <div class="metric-name">Sebaran Hijau</div>
                  </div>
                  <div class="metric-val" id="metHijau">—</div>
                </div>
              </div>
              
              <div class="metric-card" style="margin-bottom: 20px; border-color:rgba(239,68,68,0.3); background:linear-gradient(to right, rgba(239,68,68,0.05), transparent);">
                  <div class="metric-icon-row">
                    <div class="metric-icon" style="background:rgba(239,68,68,0.15)">⚠️</div>
                    <div class="metric-name" style="color:#b91c1c">Analisis Risiko Bencana AI</div>
                  </div>
                  <div class="metric-val" id="metBencana" style="color:var(--text)">—</div>
              </div>

              <div class="result-actions" style="display:flex;gap:12px">
                <button class="btn btn-ghost flex-1" onclick="resetApp()" style="padding:14px">🔄 Analisis Baru</button>
                <button class="btn btn-outline-blue flex-1" onclick="exportReport()" style="padding:14px">📄 Ekspor Laporan</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <div class="right-panel">
      <div class="right-header">
        <h3>📊 Data Eksternal</h3>
        <p>Cuaca real-time, pola iklim & Pantauan Warga</p>
        <div class="right-loc" id="rightLoc">
          <span class="pin">🚩</span>
          <span class="txt" id="rightLocText">—</span>
        </div>
      </div>
      <div class="right-body" style="padding-top:16px;">

        <div class="card" id="weatherCard" style="margin-bottom: 16px;">
          <div class="card-header" style="background:var(--bg2);">
            <div class="card-title">🌤️ Cuaca Hari Ini (Satelit)</div>
          </div>
          <div class="card-body" id="weatherBody" style="padding:16px;">
            <div class="search-status" style="text-align:center; padding:10px; color:var(--text3); font-size:12px;">Pilih lokasi di peta untuk memuat data cuaca.</div>
          </div>
        </div>

        <div class="card" id="climateCard" style="margin-bottom: 16px;">
          <div class="card-header" style="background:var(--bg2);">
            <div class="card-title">🌧️ Pola Iklim & Curah Hujan (1 Tahun Terakhir)</div>
          </div>
          <div class="card-body" id="climateBody" style="padding:16px;">
            <div class="search-status" style="text-align:center; padding:10px; color:var(--text3); font-size:12px;">Pilih lokasi di peta untuk menarik rekam jejak iklim tahunan.</div>
          </div>
        </div>
        
        <div style="font-size:12px; color:var(--text3); margin-bottom:8px; margin-top:8px;">Area Deteksi Berita: <strong id="newsRegion" style="color:var(--text)">—</strong></div>
        
        <div style="font-size:11px; padding:10px; border-radius:8px; background:rgba(34,197,94,0.08); border:1px solid rgba(34,197,94,0.18); color:var(--green); margin-bottom:16px;">
          <i>✨ <b>Sistem Pelacakan Live:</b> Memindai berita secara transparan dari tingkat terkecil (RT/RW) hingga meluas ke Kecamatan.</i>
        </div>

        <div id="newsFeed" style="display:flex; flex-direction:column;">
          <div class="search-status" style="text-align:center; padding:40px 10px; border:1px dashed var(--border); border-radius:8px;">
            Pilih lokasi di peta untuk memuat pantauan real-time
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>

<script>
var map, marker;
var selLat = null, selLng = null;
var uploadedFile = null, uploadedPreview = null;
var currentRegionName = '';
var historyLayer; // Layer khusus untuk zonasi warna dari Supabase

var layers = {
  sat: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution:'© ESRI', maxZoom:19, maxNativeZoom: 17})
};
${NAVBAR.script}

// Navigasi lintas halaman (keluar dari iframe)
function goLanding(e, hash){
  if(e) e.preventDefault();
  var h = (hash || '').toString();
  if(h && h.charAt(0) !== '#') h = '#' + h;
  var url = '/' + h;
  try { window.top.location.href = url; } catch(err) { window.location.href = url; }
  return false;
}
function goDashboard(e){
  if(e) e.preventDefault();
  try { window.top.location.href = '/survey'; } catch(err) { window.location.href = '/survey'; }
  return false;
}

function toggleDrawer(force){
  var el = document.getElementById('drawer');
  if(!el) return;
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

window.addEventListener('load', function () {
  map = L.map('map', { zoomControl: true }).setView([-6.2, 106.816], 13);
  layers.sat.addTo(map);
  
  // Inisialisasi layer zonasi
  historyLayer = L.layerGroup().addTo(map);
  
  map.on('click', function (e) { setMapLocation(e.latlng.lat, e.latlng.lng); });

  var zone = document.getElementById('uploadZone');
  zone.addEventListener('dragover', function(e){ e.preventDefault(); zone.style.borderColor='var(--green)'; });
  zone.addEventListener('dragleave', function(){ zone.style.borderColor=''; });
  zone.addEventListener('drop', function(e){
    e.preventDefault(); zone.style.borderColor='';
    var f = e.dataTransfer.files[0];
    if(f && f.type.startsWith('image/')) processFile(f);
  });
  
  // Panggil data riwayat zonasi saat halaman pertama kali dimuat
  loadSurveyHistory();
});

// ─── FUNGSI MENGAMBIL & MENGGAMBAR ZONASI DARI SUPABASE ────────
async function loadSurveyHistory() {
  try {
    var res = await fetch('/api/surveys');
    if (!res.ok) return;
    var data = await res.json();
    
    // Hapus gambar lama jika ada
    historyLayer.clearLayers();

    // Gambar zona warna untuk setiap data survei
    data.forEach(function(item) {
      if (!item.lat || !item.lng || !item.score) return;
      
      var lat = parseFloat(item.lat);
      var lng = parseFloat(item.lng);
      var score = parseInt(item.score);

      // Logika pewarnaan zona AI
      var circleColor = '#ef4444'; // Default Merah (Buruk)
      var circleFill = '#fca5a5';
      if (score >= 75) {
        circleColor = '#22c55e'; // Hijau (Baik)
        circleFill = '#86efac';
      } else if (score >= 50) {
        circleColor = '#f59e0b'; // Kuning (Sedang)
        circleFill = '#fcd34d';
      }

      // Buat lingkaran radius 40 meter
      var circle = L.circle([lat, lng], {
        color: circleColor,
        fillColor: circleFill,
        fillOpacity: 0.35,
        weight: 2,
        radius: 40 
      });

      // Munculkan skor dan kesimpulan saat zona diklik
      var popupHTML = '<div style="font-family:\'DM Sans\',sans-serif; text-align:left;">' +
                      '<div style="font-weight:bold; font-size:14px; margin-bottom:4px; color:'+circleColor+'">Skor Analisis AI: ' + score + '/100</div>' +
                      '<div style="font-size:12px; color:#5c6580; line-height:1.4;">' + (item.kesimpulan || 'Tidak ada data') + '</div>' +
                      '</div>';
      
      circle.bindPopup(popupHTML);
      historyLayer.addLayer(circle);
    });
  } catch (e) {
    console.error("Gagal menarik data zonasi: ", e);
  }
}

function openStreetView() {
  if (selLat !== null && selLng !== null) {
    var url = 'https://www.google.com/maps?layer=c&cbll=' + selLat + ',' + selLng;
    window.open(url, '_blank');
  }
}

function setMapLocation(lat, lng) {
  selLat = lat; selLng = lng;
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lng], {
    icon: L.divIcon({
      className: 'map-marker-wrap',
      html: '<div class="map-marker"><div class="map-marker-pulse"></div><div class="map-marker-core"></div></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    })
  }).addTo(map);
  
  document.getElementById('mapCoord').textContent = lat.toFixed(6) + ', ' + lng.toFixed(6);
  document.getElementById('coordDisplay').style.opacity = '1';
  document.getElementById('capBtn').style.display = 'flex';
  document.getElementById('btnStreetView').style.display = 'flex';
  
  map.flyTo([lat, lng], Math.max(map.getZoom(), 16), { duration: 0.6 });
  markStep(1, true);
  updateAnalyzeBtn();
  
  fetchWeatherData(lat, lng);
  fetchHistoricalWeather(lat, lng);
  fetchSocialNews(lat, lng);
}

// ─── FETCH CUACA HARI INI ────────
async function fetchWeatherData(lat, lng) {
  var wb = document.getElementById('weatherBody');
  wb.innerHTML = '<div class="typing" style="justify-content:center;"><span></span><span></span><span></span></div>';
  try {
      var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lng + '&current_weather=true&daily=precipitation_sum,precipitation_probability_max&timezone=Asia%2FJakarta';
      var res = await fetch(url);
      var data = await res.json();
      
      var temp = data.current_weather.temperature;
      var rainProb = data.daily.precipitation_probability_max[0];
      var rainSum = data.daily.precipitation_sum[0];

      wb.innerHTML = '<div style="display:flex; justify-content:space-between; text-align:center;">' +
          '<div style="flex:1"><div style="font-size:24px; font-weight:700; color:var(--text)">' + temp + '°C</div><div style="font-size:11px; color:var(--text3)">Suhu Udara</div></div>' +
          '<div style="flex:1; border-left:1px solid var(--border); border-right:1px solid var(--border);"><div style="font-size:24px; font-weight:700; color:var(--blue)">' + rainProb + '%</div><div style="font-size:11px; color:var(--text3)">Potensi Hujan</div></div>' +
          '<div style="flex:1"><div style="font-size:24px; font-weight:700; color:var(--green)">' + rainSum + '</div><div style="font-size:11px; color:var(--text3)">Curah Hujan (mm)</div></div>' +
          '</div>';
  } catch(e) {
      wb.innerHTML = '<div style="text-align:center; color:var(--amber); font-size:12px;">Gagal memuat data cuaca.</div>';
  }
}

// ─── FETCH IKLIM TAHUNAN (1 TAHUN TERAKHIR) ────────
async function fetchHistoricalWeather(lat, lng) {
  var card = document.getElementById('climateBody');
  card.innerHTML = '<div class="typing" style="justify-content:center;"><span></span><span></span><span></span></div>';
  try {
      var end = new Date();
      end.setDate(end.getDate() - 15);
      
      var start = new Date(end);
      start.setFullYear(start.getFullYear() - 1);
      
      var sd = start.toISOString().split('T')[0];
      var ed = end.toISOString().split('T')[0];

      var url = 'https://archive-api.open-meteo.com/v1/archive?latitude=' + lat + '&longitude=' + lng + '&start_date=' + sd + '&end_date=' + ed + '&daily=temperature_2m_max,precipitation_sum&timezone=Asia%2FJakarta';

      var res = await fetch(url);
      var data = await res.json();

      var rainArr = data.daily.precipitation_sum;
      var tempArr = data.daily.temperature_2m_max;
      var timeArr = data.daily.time;

      var totalRain = 0;
      var sumTemp = 0;
      var validTempCount = 0;
      var monthlyRain = {};

      for (var i = 0; i < rainArr.length; i++) {
          if (rainArr[i] !== null) totalRain += rainArr[i];
          if (tempArr[i] !== null) {
              sumTemp += tempArr[i];
              validTempCount++;
          }
          
          var month = timeArr[i].substring(0, 7); 
          if (!monthlyRain[month]) monthlyRain[month] = 0;
          monthlyRain[month] += rainArr[i] || 0;
      }

      var avgTemp = (sumTemp / validTempCount).toFixed(1);
      var totalRainRound = Math.round(totalRain);

      var wettestMonth = '';
      var maxMonthlyRain = -1;
      for (var m in monthlyRain) {
          if (monthlyRain[m] > maxMonthlyRain) {
              maxMonthlyRain = monthlyRain[m];
              wettestMonth = m;
          }
      }

      var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      var wMonthIndex = parseInt(wettestMonth.split('-')[1]) - 1;
      var wMonthName = monthNames[wMonthIndex];
      var wYear = wettestMonth.split('-')[0];

      card.innerHTML = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; text-align:center;">' +
          '<div class="statbox" style="padding:10px;">' +
          '<div style="font-size:20px; font-weight:900; color:rgba(241,245,249,0.92)">' + avgTemp + '°C</div>' +
          '<div style="font-size:10px; color:var(--text3); margin-top:4px; letter-spacing:0.6px; text-transform:uppercase;">Rata-rata Suhu Maksimal</div></div>' +
          '<div class="statbox" style="padding:10px;">' +
          '<div style="font-size:20px; font-weight:900; color:var(--blue)">' + totalRainRound + ' mm</div>' +
          '<div style="font-size:10px; color:var(--text3); margin-top:4px; letter-spacing:0.6px; text-transform:uppercase;">Total Curah Hujan Tahunan</div></div>' +
          '<div class="statbox" style="grid-column: span 2; background:linear-gradient(135deg, rgba(34,197,94,0.14), rgba(96,165,250,0.10)); border-color:rgba(255,255,255,0.12); padding:12px; text-align:left;">' +
          '<div style="font-size:11px; font-weight:900; color:rgba(241,245,249,0.92); margin-bottom:4px;">🌧️ Pola Puncak Musim Hujan</div>' +
          '<div style="font-size:12px; color:rgba(241,245,249,0.78); line-height:1.5;">Berdasarkan riwayat tahunan, curah hujan tertinggi terjadi pada <b>' + wMonthName + ' ' + wYear + '</b> (' + Math.round(maxMonthlyRain) + ' mm). Perhatikan ketahanan infrastruktur dan drainase pada periode bulan ini untuk mitigasi banjir.</div>' +
          '</div>' +
          '</div>';

  } catch (e) {
      card.innerHTML = '<div class="search-status" style="text-align:center; color:var(--amber); font-size:12px;">Gagal menarik data iklim tahunan.</div>';
  }
}

// ─── FETCH BERITA MELALUI API BACKEND SENDIRI (MENGAMBIL SEMUA BERITA) ────────
async function fetchGoogleNewsRSS(query) {
   try {
      var res = await fetch('/api/news?q=' + encodeURIComponent(query));
      if (!res.ok) return [];
      
      var text = await res.text();
      var parser = new DOMParser();
      var xml = parser.parseFromString(text, "text/xml");
      var items = xml.querySelectorAll("item");
      
      var results = [];
      // Mengambil semua hasil berita, tanpa Math.min
      for(var i=0; i < items.length; i++) {
        results.push({
          title: items[i].querySelector("title")?.textContent || "Berita Tanpa Judul",
          link: items[i].querySelector("link")?.textContent || "#",
          pubDate: items[i].querySelector("pubDate")?.textContent || new Date().toISOString(),
          source: items[i].querySelector("source")?.textContent || "Google News"
        });
      }
      return results;
   } catch(e) { 
      return []; 
   }
}

async function fetchSocialNews(lat, lng) {
  var feed = document.getElementById('newsFeed');
  var regionLabel = document.getElementById('newsRegion');
  
  feed.innerHTML = '<div class="typing" style="justify-content:center; padding:20px;"><span></span><span></span><span></span></div>';
  regionLabel.textContent = 'Mendeteksi area spesifik...';
  
  // Default fallback jika reverse geocoding gagal
  var regionFull = 'Koordinat ' + lat.toFixed(5) + ', ' + lng.toFixed(5);
  var mikro = "", kelurahan = "", kecamatan = "", kota = "", provinsi = "";

  try {
    var resGeo = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&zoom=18&addressdetails=1');
    var dataGeo = await resGeo.json();
    
    if (dataGeo && dataGeo.address) {
      // Pakai display_name untuk detail maksimum (alamat lengkap versi Nominatim)
      if (dataGeo.display_name) {
        regionFull = dataGeo.display_name;
      }
      var addr = dataGeo.address;
      
      mikro = addr.neighbourhood || addr.city_block || addr.residential || addr.hamlet || addr.allotment || addr.road || "";
      kelurahan = addr.village || addr.suburb || addr.quarter || "";
      kecamatan = addr.city_district || addr.district || "";
      kota = addr.city || addr.county || addr.municipality || addr.town || "";
      provinsi = addr.state || "";

      // Jika display_name kosong, fallback ke rangkuman berjenjang
      if (!dataGeo.display_name) {
        var details = [mikro, kelurahan, kecamatan, kota, provinsi].filter(Boolean);
        var uniqueDetails = [];
        for (var i = 0; i < details.length; i++) {
          if (uniqueDetails.indexOf(details[i]) === -1) uniqueDetails.push(details[i]);
        }
        if (uniqueDetails.length > 0) regionFull = uniqueDetails.join(', ');
      }
    }
  } catch(e) { console.warn("Geocoding gagal."); }
  
  currentRegionName = regionFull;
  regionLabel.textContent = regionFull;

  // tampilkan lokasi terpilih di header sidebar kanan
  var rl = document.getElementById('rightLoc');
  var rlt = document.getElementById('rightLocText');
  if (rl && rlt) {
    rlt.textContent = regionFull;
    // Tooltip untuk melihat detail lengkap kalau kepanjangan
    rlt.title = regionFull;
    rl.style.display = 'flex';
  }
  
  var hdrText = document.getElementById('headerRegionText');
  var hdrWrap = document.getElementById('headerRegionWrap');
  if (hdrText) hdrText.textContent = regionFull;
  if (hdrWrap) hdrWrap.classList.remove('hidden');
  
  var cleanMikro = mikro.replace(/(Jalan|Gang|Jl\.|Gg\.)\s+/i, '').trim();
  var cleanKel = kelurahan.replace(/(Kelurahan|Desa)\s+/i, '').trim();
  var cleanKec = kecamatan.replace(/(Kecamatan|Kec\.)\s+/i, '').trim();
  var cleanKota = kota.replace(/(Kota|Kabupaten|Kab\.)\s+/i, '').trim();
  
  try {
    var articles = [];
    var scopeUsed = "";
    var keywords = ' AND (banjir OR infrastruktur OR macet OR jalan OR warga)';

    // TIER 1: Tingkat Mikro (RT/RW/Kampung/Lingkungan)
    if (cleanMikro) {
        feed.innerHTML = '<div style="text-align:center; padding:15px; color:var(--text3); font-size:12px;">🔍 Sedang melacak berita darurat tingkat RT/RW/Jalan ('+mikro+')...</div>';
        var tier1Query = cleanMikro + " " + cleanKel + " " + cleanKota + keywords;
        articles = await fetchGoogleNewsRSS(tier1Query);
        scopeUsed = "Tingkat RT/RW/Jalan (" + mikro + ")";
    }

    // TIER 2: Tingkat Kelurahan (jika Tier 1 kosong)
    if (articles.length === 0 && cleanKel) {
        if (cleanMikro) {
            feed.innerHTML = '<div style="text-align:center; padding:15px; color:var(--amber); font-size:12px;">⚠️ Berita tingkat RT/RW bersih.<br>🔍 Memperluas pelacakan ke tingkat Kelurahan ('+kelurahan+')...</div>';
        } else {
            feed.innerHTML = '<div style="text-align:center; padding:15px; color:var(--text3); font-size:12px;">🔍 Sedang melacak berita tingkat Kelurahan ('+kelurahan+')...</div>';
        }
        var tier2Query = cleanKel + " " + cleanKec + " " + cleanKota + keywords;
        articles = await fetchGoogleNewsRSS(tier2Query);
        scopeUsed = "Tingkat Kelurahan/Desa (" + kelurahan + ")";
    }

    // TIER 3: Tingkat Kecamatan (jika Tier 2 kosong)
    if (articles.length === 0 && cleanKec) {
        feed.innerHTML = '<div style="text-align:center; padding:15px; color:var(--amber); font-size:12px;">⚠️ Berita tingkat Kelurahan bersih.<br>🔍 Memperluas pelacakan ke tingkat Kecamatan ('+kecamatan+')...</div>';
        var tier3Query = cleanKec + " " + cleanKota + keywords;
        articles = await fetchGoogleNewsRSS(tier3Query);
        scopeUsed = "Tingkat Kecamatan (" + kecamatan + ")";
    }

    if (articles.length > 0) {
       var html = '<div style="font-size:11px; margin-bottom:8px; color:var(--green); font-weight:600; display:flex; align-items:center; gap:6px;">' +
                  '<span style="width:6px; height:6px; background:var(--green); border-radius:50%"></span>' +
                  'Berita spesifik ditemukan di ' + scopeUsed + '</div>';
       html += articles.map(function(article) {
          var dateObj = new Date(article.pubDate);
          var dateStr = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
          return '<a href="' + article.link + '" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:block;">' +
                 '<div class="news-item">' +
                 '<div class="news-meta"><span class="news-source">' + article.source + '</span><span style="color:var(--text3)">' + dateStr + '</span></div>' +
                 '<div class="news-text"><b>' + article.title + '</b></div>' +
                 '<div style="font-size:10px; color:#3b82f6; text-align:right; margin-top:8px; font-weight:600;">Baca Berita ↗</div>' +
                 '</div>' +
                 '</a>';
       }).join('');
       feed.innerHTML = html;
    } else {
       feed.innerHTML = '<div class="search-status" style="text-align:center; font-size:12px; color:var(--text3); border:1px dashed var(--border); padding:15px; border-radius:8px;">✅ <b>Tidak ada laporan darurat.</b><br>Trek berita dari tingkat <b>RT/RW, Kelurahan, hingga Kecamatan</b> bersih dari laporan masalah infrastruktur.</div>';
    }
  } catch(e) {
    feed.innerHTML = '<div class="search-status" style="text-align:center; color:var(--amber)">Koneksi server berita gagal. Coba lagi nanti.</div>';
  }
}

async function doSearch() {
  var q = document.getElementById('searchInput').value.trim();
  var container = document.getElementById('searchResults');
  if (!q) { container.classList.add('hidden'); return; }
  var btn = document.getElementById('btnSearch');
  btn.textContent = 'Mencari...'; btn.disabled = true;
  container.innerHTML = '<div class="search-status">Mencari lokasi...</div>';
  container.classList.remove('hidden');
  try {
    var res = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + encodeURIComponent(q), { headers: { 'Accept-Language': 'id,en' } });
    var data = await res.json();
    if (!data.length) { container.innerHTML = '<div class="search-status">Lokasi tidak ditemukan.</div>'; return; }
    container.innerHTML = data.map(function(item) {
      var parts = item.display_name.split(', ');
      var main = parts[0], sub = parts.slice(1,3).join(', ');
      var lat = parseFloat(item.lat), lon = parseFloat(item.lon);
      return '<div class="search-item" onclick="selectLoc(' + lat + ',' + lon + ')">' +
             '<div class="search-item-icon">🚩</div>' +
             '<div class="search-item-text"><div class="search-item-main">' + main + '</div>' +
             '<div class="search-item-sub">' + (sub || item.display_name) + '</div></div>' +
             '<div class="search-item-coord">' + lat.toFixed(3) + ', ' + lon.toFixed(3) + '</div></div>';
    }).join('');
  } catch(e) { container.innerHTML = '<div class="search-status">Gagal mencari.</div>'; } 
  finally { btn.textContent = 'Cari Lokasi'; btn.disabled = false; }
}

function selectLoc(lat, lon) {
  document.getElementById('searchResults').classList.add('hidden');
  map.setView([parseFloat(lat), parseFloat(lon)], 16);
  setMapLocation(parseFloat(lat), parseFloat(lon));
}

document.addEventListener('click', function(e) {
  var sr = document.getElementById('searchResults');
  if (sr && !sr.contains(e.target) && e.target.id !== 'searchInput' && e.target.id !== 'btnSearch') sr.classList.add('hidden');
});
document.getElementById('searchInput').addEventListener('keydown', function(e){ if(e.key==='Enter') doSearch(); });

async function autoCapture() {
  if (selLat === null || selLng === null) return;
  var btn = document.getElementById('capBtn');
  var originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Menangkap...';
  btn.disabled = true;
  
  // PEMBULATAN KOORDINAT (FIX ERROR 500 ARCGIS)
  var delta = 0.0015;
  var minLat = (selLat - delta).toFixed(5);
  var maxLat = (selLat + delta).toFixed(5);
  var minLng = (selLng - delta).toFixed(5);
  var maxLng = (selLng + delta).toFixed(5);
  
  var url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=' + minLng+','+minLat+','+maxLng+','+maxLat + '&bboxSR=4326&imageSR=4326&size=640,480&format=png&f=image';
  
  try {
    var res = await fetch(url);
    if (!res.ok) throw new Error('Gagal');
    var blob = await res.blob();
    var file = new File([blob], 'satelit.png', {type:'image/png'});
    processFile(file, url);
    document.getElementById('uploadCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch(e) { 
    alert('❌ Gagal menangkap area dari satelit. Anda bisa menggunakan tangkapan layar manual.'); 
  } 
  finally { btn.innerHTML = originalText; btn.disabled = false; }
}

function handleFile(e) { var f = e.target.files[0]; if (f) processFile(f); }

function processFile(file, previewUrl) {
  uploadedFile = file;
  uploadedPreview = previewUrl || URL.createObjectURL(file);
  document.getElementById('previewImg').src = uploadedPreview;
  document.getElementById('previewName').textContent = file.name;
  document.getElementById('uploadZone').classList.add('hidden');
  document.getElementById('previewWrap').classList.remove('hidden');
  document.getElementById('photoStatus').textContent = '✓ Siap';
  document.getElementById('photoStatus').className = 'status-badge badge-green';
  markStep(2, true); updateAnalyzeBtn();
}

function markStep(n, done) {
  var si = document.getElementById('step'+n), sn = document.getElementById('sn'+n);
  si.classList.toggle('done', done); sn.classList.toggle('done', done); sn.classList.toggle('pending', !done);
  sn.textContent = done ? '✓' : n;
}

function updateAnalyzeBtn() { document.getElementById('btnAnalyze').disabled = !(selLat !== null && uploadedFile !== null); }

async function doAnalyze() {
  if (!uploadedFile || selLat === null) return;
  document.getElementById('stepsPanel').classList.add('hidden');
  document.getElementById('resultPanel').classList.add('hidden');
  document.getElementById('loadingPanel').classList.remove('hidden');
  document.getElementById('loadingPanel').style.display = 'flex';
  document.getElementById('btnAnalyze').disabled = true;
  document.getElementById('analyzeLabel').textContent = 'Memproses...';
  
  document.getElementById('analysisCard').scrollIntoView({ behavior: 'smooth', block: 'start' });

  try {
    const formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('lat', selLat.toString());
    formData.append('lng', selLng.toString());

    var response = await fetch('/api/analyze', { method: 'POST', body: formData });
    
    var responseText = await response.text();
    var data;
    try {
      data = JSON.parse(responseText);
    } catch(err) {
      throw new Error("AI gagal merespons dengan format yang benar. Teks asli: " + responseText.substring(0, 50) + "...");
    }
    
    if (!response.ok) {
      throw new Error(data.error || 'Terjadi kesalahan sistem AI');
    }
    
    showResult(data);
    
    // Perbarui riwayat peta zonasi secara otomatis setelah selesai analisis
    loadSurveyHistory();
    
  } catch(e) {
    document.getElementById('loadingPanel').classList.add('hidden');
    document.getElementById('stepsPanel').classList.remove('hidden');
    document.getElementById('btnAnalyze').disabled = false;
    document.getElementById('analyzeLabel').textContent = 'Mulai Analisis Komprehensif AI';
    alert('❌ Gagal Menganalisis: ' + e.message);
  }
}

function showResult(r) {
  document.getElementById('loadingPanel').classList.add('hidden');
  document.getElementById('resultPanel').classList.remove('hidden');
  var score = Math.min(100, Math.max(0, parseInt(r.score) || 0));
  document.getElementById('scoreVal').textContent = score;
  setTimeout(function(){ document.getElementById('scoreBar').style.width = score + '%'; }, 100);
  
  var badge = score >= 75 ? '<span class="status-badge badge-green">✓ Baik</span>' : score >= 50 ? '<span class="status-badge badge-amber">⚠ Sedang</span>' : '<span class="status-badge badge-red">✗ Perhatian</span>';
  document.getElementById('scoreBadge').innerHTML = badge;
  
  document.getElementById('metKepadatan').textContent = r.kepadatan || '—';
  document.getElementById('metJalan').textContent = r.jalan || '—';
  document.getElementById('metDrainase').textContent = r.drainase || '—';
  document.getElementById('metHijau').textContent = r.hijau || '—';
  document.getElementById('metBencana').textContent = r.bencana || '—';
  document.getElementById('metKesimpulan').textContent = r.kesimpulan || '—';
  
  markStep(3, true); document.getElementById('btnAnalyze').disabled = false;
  document.getElementById('analyzeLabel').textContent = 'Mulai Analisis Komprehensif AI';
}

function resetApp() {
  uploadedFile = null; uploadedPreview = null; selLat = null; selLng = null; currentRegionName = '';
  if (marker) { map.removeLayer(marker); marker = null; }
  document.getElementById('previewWrap').classList.add('hidden');
  document.getElementById('uploadZone').classList.remove('hidden');
  document.getElementById('photoStatus').textContent = 'Diperlukan';
  document.getElementById('photoStatus').className = 'status-badge badge-amber';
  document.getElementById('mapCoord').textContent = 'Klik peta untuk memilih lokasi';
  document.getElementById('coordDisplay').style.opacity = '0.4';
  document.getElementById('capBtn').style.display = 'none';
  document.getElementById('btnStreetView').style.display = 'none';
  var headerCoords = document.getElementById('headerCoords');
  if (headerCoords) headerCoords.classList.add('hidden');
  var hdrWrap2 = document.getElementById('headerRegionWrap');
  var hdrText2 = document.getElementById('headerRegionText');
  if (hdrWrap2) hdrWrap2.classList.add('hidden');
  if (hdrText2) hdrText2.textContent = '—';
  document.getElementById('resultPanel').classList.add('hidden');
  document.getElementById('stepsPanel').classList.remove('hidden');
  [1,2,3].forEach(function(n){ markStep(n, false); });
  
  document.getElementById('newsRegion').textContent = '—';
  document.getElementById('newsFeed').innerHTML = '<div class="search-status" style="text-align:center; padding:40px 10px; border:1px dashed var(--border); border-radius:8px;">Pilih lokasi di peta untuk memuat pantauan real-time</div>';

  // reset lokasi terpilih di header sidebar kanan
  var rl = document.getElementById('rightLoc');
  var rlt = document.getElementById('rightLocText');
  if (rl && rlt) {
    rlt.textContent = '—';
    rl.style.display = 'none';
  }
  
  document.getElementById('weatherBody').innerHTML = '<div class="search-status" style="text-align:center; padding:10px; color:var(--text3); font-size:12px;">Pilih lokasi di peta untuk memuat data cuaca.</div>';
  document.getElementById('climateBody').innerHTML = '<div class="search-status" style="text-align:center; padding:10px; color:var(--text3); font-size:12px;">Pilih lokasi di peta untuk menarik rekam jejak iklim tahunan.</div>';

  updateAnalyzeBtn();
}

function exportReport() {
  var score = document.getElementById('scoreVal').textContent;
  var txt = 'LAPORAN ECOSURVEY\\nDaerah: ' + currentRegionName + '\\nSkor: ' + score + '/100';
  var blob = new Blob([txt], {type:'text/plain'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'laporan_survey.txt'; a.click();
}
</script>

</body>
</html>
`;

export default function Page() {
  return (
    <iframe
      title="EcoSurvey"
      srcDoc={pageHtml}
      // PENAMBAHAN allow-modals AGAR POPUP ERROR BISA MUNCUL
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-modals allow-top-navigation-by-user-activation"
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
