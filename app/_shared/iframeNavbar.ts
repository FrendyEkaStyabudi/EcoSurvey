export type IframeNavbarMode = "landing" | "survey";

type NavbarOpts = {
  mode: IframeNavbarMode;
  dashboardHref: string;
};

/**
 * Navbar "komponen" untuk halaman yang dirender via iframe srcDoc.
 * Menghasilkan HTML + script yang dipakai oleh onclick di HTML.
 *
 * Catatan: fungsi JS memakai prefix NB_ agar tidak bentrok dengan script lain.
 */
export function getIframeNavbar({ mode, dashboardHref }: NavbarOpts) {
  const isLanding = mode === "landing";
  const brandHref = isLanding ? "#beranda" : "/#beranda";

  const link = (id: string, label: string, active = false) => {
    if (isLanding) {
      return `<a ${active ? 'class="active"' : ""} href="#${id}">${label}</a>`;
    }
    // survey → pindah ke landing + anchor
    return `<a ${active ? 'class="active"' : ""} href="/#${id}" target="_top" rel="noopener" onclick="return NB_goLanding(event,'#${id}')">${label}</a>`;
  };

  const dashboardLink = isLanding
    ? `<a class="btn-cta" href="${dashboardHref}" target="_top" rel="noopener" onclick="return NB_goDashboard(event)">Buka Dashboard</a>`
    : `<a class="btn-cta" href="${dashboardHref}" target="_top" rel="noopener" onclick="return NB_goDashboard(event)">Buka Dashboard</a>`;

  const html = `
  <header class="header">
    <a class="brand-mini" href="${brandHref}" ${isLanding ? "" : 'target="_top" rel="noopener" onclick="return NB_goLanding(event,\'#beranda\')"'} aria-label="EcoSurvey">
      <span class="plant">🌿</span>
      <span>EcoSurvey</span>
    </a>

    <nav class="nav" aria-label="Navigasi">
      ${link("beranda", "Beranda", true)}
      ${link("fitur", "Layanan")}
      ${link("pengguna", "Tentang")}
      ${link("pasar", "Insights")}
      ${link("faq", "FAQ")}
      ${link("kontak", "Kontak")}
      ${dashboardLink}
    </nav>

    <button class="hamburger" aria-label="Buka menu" onclick="NB_toggleDrawer()">☰</button>
  </header>

  <div id="drawer" class="drawer" role="dialog" aria-label="Menu">
    ${isLanding ? `<a href="#beranda" onclick="NB_toggleDrawer(false)">Beranda</a>` : `<a href="/#beranda" target="_top" rel="noopener" onclick="NB_toggleDrawer(false); return NB_goLanding(event,'#beranda')">Beranda</a>`}
    ${isLanding ? `<a href="#fitur" onclick="NB_toggleDrawer(false)">Layanan</a>` : `<a href="/#fitur" target="_top" rel="noopener" onclick="NB_toggleDrawer(false); return NB_goLanding(event,'#fitur')">Layanan</a>`}
    ${isLanding ? `<a href="#pengguna" onclick="NB_toggleDrawer(false)">Tentang</a>` : `<a href="/#pengguna" target="_top" rel="noopener" onclick="NB_toggleDrawer(false); return NB_goLanding(event,'#pengguna')">Tentang</a>`}
    ${isLanding ? `<a href="#pasar" onclick="NB_toggleDrawer(false)">Insights</a>` : `<a href="/#pasar" target="_top" rel="noopener" onclick="NB_toggleDrawer(false); return NB_goLanding(event,'#pasar')">Insights</a>`}
    ${isLanding ? `<a href="#faq" onclick="NB_toggleDrawer(false)">FAQ</a>` : `<a href="/#faq" target="_top" rel="noopener" onclick="NB_toggleDrawer(false); return NB_goLanding(event,'#faq')">FAQ</a>`}
    ${isLanding ? `<a href="#kontak" onclick="NB_toggleDrawer(false)">Kontak</a>` : `<a href="/#kontak" target="_top" rel="noopener" onclick="NB_toggleDrawer(false); return NB_goLanding(event,'#kontak')">Kontak</a>`}
    <a href="${dashboardHref}" target="_top" rel="noopener" onclick="NB_toggleDrawer(false); return NB_goDashboard(event)">Buka Dashboard</a>
  </div>
  `.trim();

  const script = `
  // ===== NAVBAR (shared) =====
  (function(){
    // Navigasi ke dashboard (keluar dari iframe)
    window.NB_goDashboard = function(e){
      if(e) e.preventDefault();
      try{ window.top.location.href = ${JSON.stringify(dashboardHref)}; }
      catch(err){ window.location.href = ${JSON.stringify(dashboardHref)}; }
      return false;
    };

    // Navigasi ke landing + anchor (dipakai dari halaman /survey)
    window.NB_goLanding = function(e, hash){
      if(e) e.preventDefault();
      var h = (hash || '').toString();
      if(h && h.charAt(0) !== '#') h = '#' + h;
      var url = '/' + h;
      try{ window.top.location.href = url; } catch(err){ window.location.href = url; }
      return false;
    };

    window.NB_toggleDrawer = function(force){
      var el = document.getElementById('drawer');
      if(!el) return;
      var open = el.classList.contains('open');
      var next = (typeof force === 'boolean') ? force : !open;
      el.classList.toggle('open', next);
    };

    // klik backdrop untuk menutup drawer (mobile)
    document.addEventListener('click', function(e){
      var d = document.getElementById('drawer');
      if(!d || !d.classList.contains('open')) return;
      var hb = document.querySelector('.hamburger');
      if(d.contains(e.target) || (hb && hb.contains(e.target))) return;
      window.NB_toggleDrawer(false);
    });

    // Landing: smooth scroll + active state
    ${isLanding ? `
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
        navLinks.forEach(function(a){
          a.classList.toggle('active', (a.getAttribute('href')||'').toLowerCase() === clean);
        });
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
          window.NB_toggleDrawer(false);
          scrollToHash(href);
        });
      });

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
      window.addEventListener('resize', function(){
        headerH = header ? header.getBoundingClientRect().height : 64;
        onScroll();
      });

      if(location.hash) scrollToHash(location.hash); else setActive('#beranda');
      setTimeout(onScroll, 50);
    })();
    ` : ""}
  })();
  // ===== /NAVBAR (shared) =====
  `.trim();

  return { html, script };
}
