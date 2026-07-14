/* =========================================================
   Shared site components: header, footer, mobile-nav, back-to-top
   ---------------------------------------------------------
   Kisi bhi naye page me reuse karne ke liye:

   1) <head> me (style.css se PEHLE/baad koi bhi, par script tag):
        <script src="assets/js/components.js"></script>

   2) <body> ke andar -- header (smooth-wrapper se BAHAR):
        <div id="site-header"></div>
        <script>document.getElementById('site-header').innerHTML = renderHeader();</script>

   3) #smooth-content ke andar, page content ke BAAD -- footer:
        <div id="site-footer"></div>
        <script>document.getElementById('site-footer').innerHTML = renderFooter();</script>

   4) smooth-wrapper ke BAAD -- mobile nav + back-to-top:
        <div id="site-extras"></div>
        <script>document.getElementById('site-extras').innerHTML = renderExtras();</script>

   Inline <script> jaan-boojh kar placeholder ke turant baad rakha hai taki
   header/footer SYNCHRONOUSLY inject ho jaye -- trigger.js (jo sticky header,
   mobile menu banata hai) usse pehle hi DOM me sab kuch mil jaye.
   ========================================================= */
(function () {
  // Home page par anchor links same-page (#home), baaki pages par index.html#home
  var page = location.pathname.split("/").pop();
  var P = (page === "" || page === "index.html") ? "" : "index.html";

  window.renderHeader = function () {
    return `
  <header class="header_style_01">
    <nav class="main-menu sticky-header">
      <div class="main-menu-wrapper">
        <div class="main-menu-logo">
          <a href="${P}#home">
            <img src="images/dkphoto/logo.png" alt="DK Studio" />
          </a>
        </div>
        <ul class="main-nav-menu">
          <li><a href="${P}#home">Home</a></li>
          <li><a href="${P}#about">About</a></li>
          <li><a href="${P}#services">Services</a></li>
          <li><a href="${P}#portfolio">Portfolio</a></li>
          <li><a href="${P}#testimonials">Testimonials</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <div class="main-menu-right">
          <div class="portivio-btn-block">
            <a class="portivio-btn portivio-btn-circle" href="contact.html"><i
                class="fas fa-arrow-up icon-up-right"></i></a>
            <a class="portivio-btn portivio-btn-primary" href="contact.html">Hire Me</a>
            <a class="portivio-btn portivio-btn-circle" href="contact.html"><i
                class="fas fa-arrow-up icon-up-right"></i></a>
          </div>
          <a href="#" class="mobile-nav-toggler">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </div>
    </nav>
  </header>`;
  };

  window.renderFooter = function () {
    return `
      <footer id="contact" class="dk_footer">
        <div class="container">
          <div class="dk_footer_top">
            <div class="dk_footer_brand">
              <a href="${P}#home" class="dk_footer_logo" aria-label="DK Studio">
                <img src="images/dkphoto/logo-white.png" alt="DK Studio" />
              </a>
              <p class="dk_footer_tagline">Crafting brands through creative design, video editing &amp; social media —
                built to make your business stand out.</p>
              <ul class="dk_footer_social">
                <li><a href="https://www.instagram.com/dk_creative_studio_" target="_blank" rel="noopener"
                    aria-label="Instagram"><iconify-icon icon="mdi:instagram"></iconify-icon></a></li>
                <li><a href="#" aria-label="LinkedIn"><iconify-icon icon="mdi:linkedin"></iconify-icon></a></li>
                <li><a href="#" aria-label="Facebook"><iconify-icon icon="mdi:facebook"></iconify-icon></a></li>
                <li><a href="#" aria-label="Behance"><iconify-icon icon="mdi:behance"></iconify-icon></a></li>
              </ul>
            </div>
            <div class="dk_footer_col">
              <h5 class="dk_footer_heading">Services</h5>
              <ul class="dk_footer_links">
                <li><a href="${P}#services">Video Editing</a></li>
                <li><a href="${P}#services">Graphic Design</a></li>
                <li><a href="${P}#services">Brand Identity</a></li>
                <li><a href="${P}#services">Social Media</a></li>
              </ul>
            </div>
            <div class="dk_footer_col">
              <h5 class="dk_footer_heading">Company</h5>
              <ul class="dk_footer_links">
                <li><a href="${P}#about">About</a></li>
                <li><a href="${P}#portfolio">Portfolio</a></li>
                <li><a href="${P}#testimonials">Testimonials</a></li>
              </ul>
              <p class="dk_footer_questions">Have a project in mind?</p>
              <a href="contact.html" class="dk_footer_btn">Let's work together <span
                  class="dk_footer_btn_arrow">→</span></a>
            </div>
          </div>
          <div class="dk_footer_watermark">DK Studio</div>
          <div class="dk_footer_bottom">
            <span class="dk_footer_copy">Copyright © 2025 DK Creative Studio. All rights reserved</span>
          </div>
        </div>
      </footer>`;
  };

  window.renderExtras = function () {
    return `
  <div class="mobile-nav-wrapper">
    <div class="mobile-nav-overlay mobile-nav-toggler"></div>
    <div class="mobile-nav-content">
      <a href="#" class="mobile-nav-close mobile-nav-toggler">
        <span></span>
        <span></span>
      </a>
      <div class="side-panel-logo logo-box">
        <a href="${P}#home" aria-label="logo image">
          <img src="images/dkphoto/logo.png" alt="DK Studio" />
        </a>
      </div>
      <div class="mobile-nav-container"></div>
      <ul class="list-items mobile-sidebar-contact">
        <li><span class="fa fa-map-marker-alt mrr-10 text-primary-color"></span>Ahmedabad, India</li>
        <li><span class="fas fa-envelope mrr-10 text-primary-color"></span><a
            href="mailto:dkstudio370@gmail.com">dkstudio370@gmail.com</a></li>
        <li><span class="fas fa-phone-alt mrr-10 text-primary-color"></span><a href="tel:+919157638051">+91 91576
            38051</a></li>
      </ul>
      <ul class="social-list list-primary-color">
        <li><a href="#"><i class="fab fa-facebook"></i></a></li>
        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
        <li><a href="https://www.instagram.com/dk_creative_studio_" target="_blank" rel="noopener"><i
              class="fab fa-instagram"></i></a></li>
        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
      </ul>
    </div>
  </div>
  <div class="anim-scroll-to-top">
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>`;
  };
})();
