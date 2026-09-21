/**
 * ARC Associates - Core Application Engine & Multi-Page View Controller
 */

class ARCApp {
  constructor() {
    this.currentView = 'home';
    this.initElements();
    this.initEvents();
    this.handleRouting();
    this.renderInitialViews();
  }

  initElements() {
    this.viewContainer = document.getElementById('view-container');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.navLinksContainer = document.getElementById('nav-links');
    this.modalBackdrop = document.getElementById('modal-backdrop');
    this.modalBody = document.getElementById('modal-body');
  }

  initEvents() {
    // Navigation link clicks
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-nav]');
      if (target) {
        e.preventDefault();
        const route = target.getAttribute('data-nav');
        const param = target.getAttribute('data-param');
        this.navigateTo(route, param);
        if (this.navLinksContainer) {
          this.navLinksContainer.classList.remove('mobile-open');
        }
      }

      // Modal close button
      if (e.target.closest('#modal-close-btn') || e.target === this.modalBackdrop) {
        this.closeModal();
      }
    });

    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', () => {
        this.navLinksContainer.classList.toggle('mobile-open');
      });
    }

    // Hash change routing
    window.addEventListener('hashchange', () => {
      this.handleRouting();
    });

    // Listen for custom photo updates from Admin portal
    window.addEventListener('arc:photos-updated', () => {
      if (this.currentView === 'projects' || this.currentView === 'home') {
        this.renderProjectsGrid();
      }
      if (this.currentView === 'admin') {
        this.renderAdminPortal();
      }
    });
  }

  handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const parts = hash.split('/');
    const route = parts[0] || 'home';
    const param = parts[1] || null;
    this.renderView(route, param);
  }

  navigateTo(route, param = null) {
    if (param) {
      window.location.hash = `#${route}/${param}`;
    } else {
      window.location.hash = `#${route}`;
    }
  }

  updateActiveNav(route) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      const navTarget = link.getAttribute('data-nav');
      if (navTarget === route || (route === 'service-detail' && navTarget === 'services')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  renderInitialViews() {
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderView(route, param = null) {
    this.currentView = route;
    this.updateActiveNav(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (route) {
      case 'home':
        this.renderHome();
        break;
      case 'about':
        this.renderAbout();
        break;
      case 'services':
        this.renderServicesHub();
        break;
      case 'service-detail':
        this.renderServiceDetail(param || 'houses-and-offices');
        break;
      case 'projects':
      case 'realizations':
        this.renderProjects(param);
        break;
      case 'cost-estimator':
        this.renderCostEstimator();
        break;
      case 'reviews':
        this.renderReviews();
        break;
      case 'tips':
      case 'articles':
        this.renderTips();
        break;
      case 'contact':
        this.renderContact();
        break;
      case 'admin':
        this.renderAdminPortal();
        break;
      default:
        this.renderHome();
        break;
    }
  }

  /* ==========================================================================
     HOME VIEW
     ========================================================================== */
  renderHome() {
    const d = window.ARC_DATA;
    const services = d.services;
    const allProjects = window.ARC_ADMIN.getAllProjects().slice(0, 6);

    let servicesCardsHtml = services.map(s => `
      <div class="service-card">
        <div class="service-card-img-wrap">
          <img src="${s.heroImg}" alt="${s.title}" loading="lazy" />
          <span class="service-card-badge">${s.startingPrice}</span>
        </div>
        <div class="service-card-body">
          <div class="service-card-icon">
            <i class="fas ${s.icon}"></i>
          </div>
          <h3 class="service-card-title">${s.title}</h3>
          <p class="service-card-desc">${s.shortDesc}</p>
          <div class="service-card-footer">
            <span class="service-card-price">Since 1998</span>
            <a href="#service-detail/${s.id}" data-nav="service-detail" data-param="${s.id}" class="service-card-btn">
              Explore Details <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');

    let projectsCardsHtml = allProjects.map(p => `
      <div class="portfolio-item" onclick="window.ARC_APP.openProjectModal('${p.id}')">
        <div class="portfolio-thumb-wrap">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <span class="portfolio-category-tag">${p.category}</span>
        </div>
        <div class="portfolio-item-body">
          <h4 class="portfolio-item-title">${p.title}</h4>
          <div class="portfolio-item-loc"><i class="fas fa-map-marker-alt"></i> ${p.location}</div>
          <p class="portfolio-item-desc">${p.description}</p>
          <div class="portfolio-tag-pills">
            ${p.features.map(f => `<span class="tag-pill">${f}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    this.viewContainer.innerHTML = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-pattern"></div>
        <div class="hero-glow"></div>
        <div class="container hero-container">
          <div class="hero-content">
            <div class="badge badge-gold">
              25+ Years of Engineering &amp; Construction
            </div>
            <h1 class="hero-title">
              Crafting &amp; Constructing <span class="text-gold-gradient">Luxury Residences</span> &amp; Landmarks in Cuddalore
            </h1>
            <p class="hero-desc">
              Premier civil engineering, bespoke 3D spatial elevations, commercial complexes, and end-to-end luxury renovations backed by 25+ years of certified structural expertise.
            </p>
            <div class="hero-actions">
              <a href="#cost-estimator" data-nav="cost-estimator" class="btn btn-gold">
                <i class="fas fa-calculator"></i> Calculate Construction Cost
              </a>
              <a href="#contact" data-nav="contact" class="btn btn-outline-light">
                <i class="fas fa-calendar-check"></i> Book Free Consultation
              </a>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <h3 id="hero-stat-years">25+</h3>
                <p>Years of Service</p>
              </div>
              <div class="stat-item">
                <h3 id="hero-stat-projects">580+</h3>
                <p>Projects Delivered</p>
              </div>
              <div class="stat-item">
                <h3 id="hero-stat-clients">100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>

          <div class="hero-card-preview">
            <div class="hero-main-img-card">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" alt="ARC Associates Luxury Architecture" />
            </div>
            <div class="floating-satisfaction-card">
              <div class="floating-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div>
                <div class="floating-satisfaction-title">100% Satisfaction Guaranteed</div>
                <div class="floating-satisfaction-sub">Rock Solid Construction & Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section (Matching Reference Style: Dark Gradient Overlay Cards) -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title" style="font-size: 2.4rem;">Our Services – ARC Associates</h2>
            <p class="section-subtitle">
              At ARC Associates, we provide complete civil engineering, interior design, and turnkey construction solutions in Cuddalore, delivering high quality, modern, and customized spaces across all residential and commercial sectors.
            </p>
          </div>

          <div class="services-modern-grid">
            <a href="#service-detail/houses-and-offices" data-nav="service-detail" data-param="houses-and-offices" class="service-modern-card">
              <img src="assets/construction-service.jpg" alt="Construction Services" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Turnkey</span>
                <h3 class="service-modern-card-title">Construction Services</h3>
              </div>
            </a>

            <a href="#service-detail/carpentry" data-nav="service-detail" data-param="carpentry" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" alt="Modular Kitchen" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Bespoke</span>
                <h3 class="service-modern-card-title">Modular Kitchen</h3>
              </div>
            </a>

            <a href="#service-detail/houses-and-offices" data-nav="service-detail" data-param="houses-and-offices" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Office Interiors" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Commercial</span>
                <h3 class="service-modern-card-title">Office Interiors</h3>
              </div>
            </a>

            <a href="#service-detail/houses-and-offices" data-nav="service-detail" data-param="houses-and-offices" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80" alt="Commercial Interiors" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Retail & Malls</span>
                <h3 class="service-modern-card-title">Commercial Interiors</h3>
              </div>
            </a>

            <a href="#service-detail/renovations" data-nav="service-detail" data-param="renovations" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" alt="Renovation Services" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">10-Yr Warranty</span>
                <h3 class="service-modern-card-title">Renovation Services</h3>
              </div>
            </a>

            <a href="#service-detail/electrical" data-nav="service-detail" data-param="electrical" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" alt="False Ceiling & Lighting" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Architectural</span>
                <h3 class="service-modern-card-title">False Ceiling & Lighting</h3>
              </div>
            </a>

            <!-- Featured Wide Card at Bottom -->
            <a href="#service-detail/carpentry" data-nav="service-detail" data-param="carpentry" class="service-modern-card featured-wide">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Home Interiors" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Luxury Craftsmanship</span>
                <h3 class="service-modern-card-title" style="font-size: 1.6rem;">Home & Villa Interiors</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- About Snapshot -->
      <section class="section section-alt">
        <div class="container">
          <div class="about-snapshot-grid">
            <div class="about-snapshot-content">
              <div class="badge badge-gold">About ARC Associates</div>
              <h2>Building Strong Foundations For Over Two Decades</h2>
              <p>
                ARC Associates was established in 1998 in Cuddalore with a mission to bring high-grade structural engineering, transparent pricing, and aesthetic architectural innovation to Tamil Nadu. 
              </p>
              <p>
                Promoted by experienced civil engineers and architects, we operate specialized divisions in Turnkey Civil Construction, Architectural & 3D Spatial Planning, Commercial Infrastructure, and High-End Interior Renovations.
              </p>
              <div class="values-checklist">
                <div class="value-check-item"><i class="fas fa-check"></i> DTCP & Corporation Approvals</div>
                <div class="value-check-item"><i class="fas fa-check"></i> Fe550D Branded Steel & OPC Cement</div>
                <div class="value-check-item"><i class="fas fa-check"></i> Vastu-Compliant 3D Elevations</div>
                <div class="value-check-item"><i class="fas fa-check"></i> 10-Year Waterproofing Warranty</div>
              </div>
              <a href="#about" data-nav="about" class="btn btn-primary">
                Read Full Company History <i class="fas fa-arrow-right"></i>
              </a>
            </div>

            <div class="about-image-stack">
              <img class="about-img-main" src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80" alt="ARC Associates Engineers on Site" />
              <div class="about-experience-badge">
                <div class="exp-years">1998</div>
                <div class="exp-text">Established in Cuddalore</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3D COVERFLOW "Our Projects" Section (Matching Reference Style) -->
      <section class="section coverflow-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title" style="font-size: 2.4rem;">Our Projects</h2>
            <p class="section-subtitle">Explore our interior design, civil engineering & construction works</p>
          </div>

          <!-- Category Filter Pills -->
          <div class="coverflow-filter-pills" id="coverflow-pills">
            <button class="coverflow-pill active" onclick="window.ARC_APP.filterCoverflow('all', this)">All Projects</button>
            <button class="coverflow-pill" onclick="window.ARC_APP.filterCoverflow('Cuddalore', this)">Cuddalore</button>
            <button class="coverflow-pill" onclick="window.ARC_APP.filterCoverflow('Residential', this)">Residential</button>
            <button class="coverflow-pill" onclick="window.ARC_APP.filterCoverflow('Commercial', this)">Commercial</button>
            <button class="coverflow-pill" onclick="window.ARC_APP.filterCoverflow('Renovation', this)">Renovation</button>
            <button class="coverflow-pill" onclick="window.ARC_APP.filterCoverflow('Carpentry', this)">Interiors & Woodwork</button>
            <button class="coverflow-pill" onclick="window.ARC_APP.filterCoverflow('Flooring', this)">Flooring & Marble</button>
          </div>

          <!-- 3D Stage Container -->
          <div class="coverflow-container">
            <div class="coverflow-stage" id="coverflow-stage">
              <!-- Dynamically rendered 3D cards -->
            </div>
          </div>

          <!-- Navigation Arrow Buttons -->
          <div class="coverflow-nav-controls">
            <button class="coverflow-arrow-btn" onclick="window.ARC_APP.coverflowPrev()" title="Previous Project">
              <i class="fas fa-arrow-left"></i>
            </button>
            <button class="coverflow-arrow-btn" onclick="window.ARC_APP.coverflowNext()" title="Next Project">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>

          <div style="text-align: center; margin-top: 28px;">
            <a href="#projects" data-nav="projects" class="btn btn-secondary">
              View Our Gallery <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      <!-- Google Reviews Running Slider Strip -->
      <section class="section section-alt" style="overflow: hidden;">
        <div class="container">
          <div class="google-reviews-header-card">
            <div class="google-score-box">
              <i class="fab fa-google google-icon-large"></i>
              <div class="google-score-details">
                <div class="google-score-heading-row">
                  <strong class="google-score-text">4.9 / 5.0 Google Rating</strong>
                  <div class="google-stars">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                  </div>
                </div>
                <p class="google-score-sub">Over 140+ Verified Google Reviews across Cuddalore</p>
              </div>
            </div>
            <div class="google-header-actions">
              <div class="slider-status-tag">
                <span class="live-dot"></span> Auto-Sliding Feed (Hover to Pause)
              </div>
              <a href="#reviews" data-nav="reviews" class="btn btn-sm btn-primary">
                <i class="fas fa-pen"></i> Write / View All
              </a>
            </div>
          </div>
        </div>

        <!-- Full-bleed Running Slider Marquee -->
        <div class="reviews-slider-wrapper">
          <div class="reviews-marquee-track" id="home-marquee-track">
            ${[...d.reviews, ...d.reviews].map(r => this.generateReviewCardHtml(r)).join('')}
          </div>
        </div>
      </section>

      <!-- Quick Estimation CTA Banner -->
      <section class="section" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: #ffffff;">
        <div class="container" style="text-align: center; max-width: 800px;">
          <div class="badge badge-gold" style="margin-bottom: 12px;">Instant Estimation</div>
          <h2 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 16px;">Planning to Build Your Dream Home in Cuddalore?</h2>
          <p style="color: var(--text-light); font-size: 1.05rem; line-height: 1.7; margin-bottom: 28px;">
            Get an instant, itemized building cost estimate based on your square footage, soil condition, and preferred finish tier.
          </p>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="#cost-estimator" data-nav="cost-estimator" class="btn btn-gold">
              <i class="fas fa-calculator"></i> Launch Cost Calculator
            </a>
            <a href="https://wa.me/919382312700?text=Hello%20ARC%20Associates,%20I%20would%20like%20to%20discuss%20a%20construction%20project." target="_blank" class="btn btn-outline-light">
              <i class="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    `;

    this.initCoverflow();
    this.animateHeroCounters();
  }

  /* ==========================================================================
     3D COVERFLOW PROJECT CAROUSEL CONTROLLER
     ========================================================================== */
  initCoverflow() {
    this.coverflowFilter = 'all';
    this.coverflowProjects = window.ARC_ADMIN.getAllProjects();
    this.coverflowIndex = Math.floor(this.coverflowProjects.length / 2);
    this.renderCoverflowStage();

    // Auto-advance every 4.5 seconds
    if (this.coverflowInterval) clearInterval(this.coverflowInterval);
    const container = document.querySelector('.coverflow-container');
    if (container) {
      this.coverflowInterval = setInterval(() => {
        this.coverflowNext();
      }, 4500);

      container.addEventListener('mouseenter', () => clearInterval(this.coverflowInterval));
      container.addEventListener('mouseleave', () => {
        this.coverflowInterval = setInterval(() => {
          this.coverflowNext();
        }, 4500);
      });
    }
  }

  filterCoverflow(category, btnEl) {
    if (btnEl) {
      document.querySelectorAll('.coverflow-pill').forEach(p => p.classList.remove('active'));
      btnEl.classList.add('active');
    }

    this.coverflowFilter = category;
    const all = window.ARC_ADMIN.getAllProjects();
    if (category === 'all') {
      this.coverflowProjects = all;
    } else if (category === 'Cuddalore') {
      this.coverflowProjects = all.filter(p => p.location.toLowerCase().includes('cuddalore'));
    } else {
      this.coverflowProjects = all.filter(p => 
        p.category.toLowerCase().includes(category.toLowerCase()) || 
        p.title.toLowerCase().includes(category.toLowerCase())
      );
      if (this.coverflowProjects.length === 0) {
        this.coverflowProjects = all;
      }
    }

    this.coverflowIndex = Math.floor(this.coverflowProjects.length / 2);
    this.renderCoverflowStage();
  }

  renderCoverflowStage() {
    const stage = document.getElementById('coverflow-stage');
    if (!stage || !this.coverflowProjects || this.coverflowProjects.length === 0) return;

    stage.innerHTML = this.coverflowProjects.map((p, idx) => {
      const diff = idx - this.coverflowIndex;
      let posClass = 'pos-hidden';

      if (diff === 0) posClass = 'pos-center active';
      else if (diff === -1) posClass = 'pos-left-1';
      else if (diff === 1) posClass = 'pos-right-1';
      else if (diff === -2) posClass = 'pos-left-2';
      else if (diff === 2) posClass = 'pos-right-2';
      else posClass = 'pos-hidden';

      return `
        <div class="coverflow-card ${posClass}" onclick="window.ARC_APP.onCoverflowCardClick(${idx}, '${p.id}')">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="coverflow-card-caption">
            <h4 class="coverflow-card-title">${p.title}</h4>
            <div class="coverflow-card-sub"><i class="fas fa-map-marker-alt"></i> ${p.location}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  onCoverflowCardClick(idx, projectId) {
    if (idx === this.coverflowIndex) {
      // Center card clicked -> open details modal
      this.openProjectModal(projectId);
    } else {
      // Side card clicked -> center it
      this.coverflowIndex = idx;
      this.renderCoverflowStage();
    }
  }

  coverflowNext() {
    if (!this.coverflowProjects || this.coverflowProjects.length === 0) return;
    this.coverflowIndex = (this.coverflowIndex + 1) % this.coverflowProjects.length;
    this.renderCoverflowStage();
  }

  coverflowPrev() {
    if (!this.coverflowProjects || this.coverflowProjects.length === 0) return;
    this.coverflowIndex = (this.coverflowIndex - 1 + this.coverflowProjects.length) % this.coverflowProjects.length;
    this.renderCoverflowStage();
  }

  /* ==========================================================================
     ABOUT US VIEW
     ========================================================================== */
  renderAbout() {
    const d = window.ARC_DATA;
    this.viewContainer.innerHTML = `
      <section class="section" style="background: var(--primary-dark); color: #ffffff; padding: 60px 0;">
        <div class="container">
          <div class="badge badge-gold">Since 1998</div>
          <h1 style="font-size: 2.8rem; font-weight: 800; margin-top: 10px;">About ARC Associates</h1>
          <p style="color: var(--text-light); max-width: 650px; margin-top: 10px; font-size: 1.1rem;">
            Over 25 years of shaping the skyline of Cuddalore with structural precision, architectural beauty, and client trust.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="about-snapshot-grid" style="margin-bottom: 60px;">
            <div>
              <div class="badge badge-blue">Our Legacy</div>
              <h2 style="font-size: 2.2rem; font-weight: 800; color: var(--primary); margin: 12px 0 18px;">
                From Small Beginnings in 1998 to Leading Construction Firm
              </h2>
              <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 16px;">
                ARC Associates was established in 1998 in Cuddalore as a dedicated civil engineering and building construction consultancy. Over the past 25+ years, we have grown into a multi-disciplinary construction firm operating two distinct divisions:
              </p>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                <li style="display: flex; gap: 10px; align-items: flex-start; color: var(--text-main); font-weight: 600;">
                  <i class="fas fa-check-circle" style="color: var(--accent); margin-top: 4px;"></i>
                  <span><strong>Division 1: Turnkey Engineering & Heavy Civil Construction</strong> (Residential Villas, Commercial Malls, Industrial Sheds, Multi-Story Frameworks)</span>
                </li>
                <li style="display: flex; gap: 10px; align-items: flex-start; color: var(--text-main); font-weight: 600;">
                  <i class="fas fa-check-circle" style="color: var(--accent); margin-top: 4px;"></i>
                  <span><strong>Division 2: Architecture, Interior Woodcraft & Remodeling</strong> (3D Elevations, Vastu Layouts, Modular Joinery, Marble & Tiling, MEP Engineering)</span>
                </li>
              </ul>
            </div>
            <div>
              <img src="assets/construction-service.jpg" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-xl);" alt="ARC Construction Works" />
            </div>
          </div>

          <!-- Promoters / Leadership Bio Cards -->
          <div class="section-header" style="margin-top: 70px;">
            <div class="badge badge-gold">Leadership & Promoters</div>
            <h2 class="section-title">Promoted by Experienced Professionals</h2>
            <p class="section-subtitle">
              Meet the structural engineers and architects steering ARC Associates with decades of hands-on expertise.
            </p>
          </div>

          <div class="promoters-grid">
            ${d.promoters.map(p => `
              <div class="promoter-card">
                <img src="${p.image}" alt="${p.name}" class="promoter-avatar" />
                <div class="promoter-info">
                  <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary);">${p.name}</h3>
                  <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent); margin: 4px 0 2px;">${p.role}</div>
                  <div style="font-size: 0.78rem; color: #92400e; background: #fef3c7; border: 1px solid #fcd34d; padding: 3px 10px; border-radius: var(--radius-full); font-weight: 700; margin-bottom: 12px; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fas fa-certificate" style="font-size: 0.7rem; color: #d97706;"></i> ${p.experience}
                  </div>
                  <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">${p.bio}</p>
                  <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-main); background: var(--bg-surface); padding: 6px 12px; border-radius: 6px;">
                    <strong>Specialization:</strong> ${p.specialization}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     SERVICES HUB VIEW
     ========================================================================== */
  renderServicesHub() {
    this.viewContainer.innerHTML = `
      <section class="section" style="background: var(--primary-dark); color: #ffffff; padding: 60px 0;">
        <div class="container">
          <div class="badge badge-gold">Turnkey Engineering & Interior Solutions</div>
          <h1 style="font-size: 2.8rem; font-weight: 800; margin-top: 10px;">Our Services – ARC Associates</h1>
          <p style="color: var(--text-light); max-width: 720px; margin-top: 10px; font-size: 1.1rem; line-height: 1.7;">
            At ARC Associates, we provide complete interior design, civil engineering, and construction solutions in Cuddalore, delivering high quality, modern, and customized spaces across all residential, commercial, and industrial sectors.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="services-modern-grid">
            <a href="#service-detail/houses-and-offices" data-nav="service-detail" data-param="houses-and-offices" class="service-modern-card">
              <img src="assets/construction-service.jpg" alt="Construction Services" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Turnkey Building</span>
                <h3 class="service-modern-card-title">Construction Services</h3>
              </div>
            </a>

            <a href="#service-detail/carpentry" data-nav="service-detail" data-param="carpentry" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" alt="Modular Kitchen" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Bespoke Woodwork</span>
                <h3 class="service-modern-card-title">Modular Kitchen</h3>
              </div>
            </a>

            <a href="#service-detail/houses-and-offices" data-nav="service-detail" data-param="houses-and-offices" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Office Interiors" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Corporate</span>
                <h3 class="service-modern-card-title">Office Interiors</h3>
              </div>
            </a>

            <a href="#service-detail/houses-and-offices" data-nav="service-detail" data-param="houses-and-offices" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80" alt="Commercial Interiors" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Retail & Complex</span>
                <h3 class="service-modern-card-title">Commercial Interiors</h3>
              </div>
            </a>

            <a href="#service-detail/renovations" data-nav="service-detail" data-param="renovations" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" alt="Renovation Services" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">10-Yr Waterproofing</span>
                <h3 class="service-modern-card-title">Renovation Services</h3>
              </div>
            </a>

            <a href="#service-detail/electrical" data-nav="service-detail" data-param="electrical" class="service-modern-card">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" alt="False Ceiling" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Lighting & Power</span>
                <h3 class="service-modern-card-title">False Ceiling & Lighting</h3>
              </div>
            </a>

            <!-- Featured Wide Card at Bottom -->
            <a href="#service-detail/carpentry" data-nav="service-detail" data-param="carpentry" class="service-modern-card featured-wide">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Home Interiors" class="service-modern-card-img" />
              <div class="service-modern-card-overlay">
                <span class="service-modern-card-badge">Luxury Craftsmanship</span>
                <h3 class="service-modern-card-title" style="font-size: 1.6rem;">Home & Villa Interiors</h3>
              </div>
            </a>
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     DEDICATED SERVICE DETAIL PAGE (SUBPAGES AS REQUESTED IN AUDIO)
     ========================================================================== */
  renderServiceDetail(serviceId) {
    const service = window.ARC_DATA.services.find(s => s.id === serviceId) || window.ARC_DATA.services[0];
    const relatedProjects = window.ARC_ADMIN.getAllProjects().filter(p => p.serviceId === service.id || p.category.toLowerCase().includes(service.id.split('-')[0]));

    this.viewContainer.innerHTML = `
      <!-- Service Hero -->
      <section class="section" style="background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%); color: #ffffff; padding: 70px 0;">
        <div class="container">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-light); margin-bottom: 12px;">
            <a href="#services" data-nav="services" style="color: var(--accent-light);">Services</a> <i class="fas fa-chevron-right" style="font-size: 0.7rem;"></i> <span>${service.title}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center;">
            <div>
              <div class="badge badge-gold" style="margin-bottom: 10px;"><i class="fas ${service.icon}"></i> Specialization</div>
              <h1 style="font-size: 2.8rem; font-weight: 800; line-height: 1.2;">${service.title}</h1>
              <p style="font-size: 1.15rem; color: var(--text-light); margin: 16px 0 24px; line-height: 1.7;">
                ${service.shortDesc}
              </p>
              <div style="display: flex; gap: 14px; flex-wrap: wrap;">
                <a href="#contact" data-nav="contact" class="btn btn-gold">
                  <i class="fas fa-envelope"></i> Request Service Quote
                </a>
                <a href="https://wa.me/919382312700?text=Hello%20ARC%20Associates,%20I%20need%20details%20about%20${encodeURIComponent(service.title)}" target="_blank" class="btn btn-outline-light">
                  <i class="fab fa-whatsapp"></i> WhatsApp Direct
                </a>
              </div>
            </div>
            <div>
              <img src="${service.heroImg}" alt="${service.title}" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); height: 320px; width: 100%; object-fit: cover;" />
            </div>
          </div>
        </div>
      </section>

      <!-- Highlights & Specifications -->
      <section class="section">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; margin-bottom: 60px;">
            <div>
              <div class="badge badge-blue">Key Features & Standards</div>
              <h2 style="font-size: 2.1rem; font-weight: 800; color: var(--primary); margin: 12px 0 20px;">
                Why Choose ARC Associates for ${service.title}
              </h2>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 16px;">
                ${service.highlights.map(h => `
                  <li style="display: flex; align-items: flex-start; gap: 14px; background: var(--bg-card); padding: 16px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
                    <i class="fas fa-check-circle" style="color: var(--accent); font-size: 1.2rem; margin-top: 2px;"></i>
                    <span style="font-size: 0.95rem; color: var(--text-main); font-weight: 600;">${h}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div>
              <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-md);">
                <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary); margin-bottom: 16px;">
                  Quick Estimation & Rates
                </h3>
                <div style="background: var(--gold-soft); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-md); padding: 18px; margin-bottom: 20px;">
                  <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--gold);">Indicative Pricing</span>
                  <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary);">${service.startingPrice}</div>
                  <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">*Final rate depends on material specifications, floor plan, and site survey.</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <a href="#cost-estimator" data-nav="cost-estimator" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-calculator"></i> Calculate Detailed Project Cost
                  </a>
                  <a href="#contact" data-nav="contact" class="btn btn-secondary" style="width: 100%;">
                    <i class="fas fa-calendar-check"></i> Book Free Site Inspection
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Realizations & Photo Gallery -->
          <div class="section-header" style="margin-top: 50px;">
            <div class="badge badge-gold">Project Photo Gallery</div>
            <h2 class="section-title">Sample Realizations &amp; Workmanship</h2>
            <p class="section-subtitle">
              Authentic photographic examples of our ${service.title} works executed across Cuddalore.
            </p>
          </div>

          <div class="service-gallery-grid">
            ${(service.samplePhotos || []).map(photo => `
              <div class="service-gallery-item" onclick="window.ARC_APP.openImageModal('${photo.image}', '${photo.title.replace(/'/g, "\\'")}', '${photo.tag.replace(/'/g, "\\'")}')">
                <img src="${photo.image}" alt="${photo.title}" loading="lazy" />
                <div class="service-gallery-overlay">
                  <span class="service-gallery-tag"><i class="fas fa-tag"></i> ${photo.tag}</span>
                  <h4 class="service-gallery-title">${photo.title}</h4>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Step by Step Workflow Process -->
          <div class="section-header">
            <div class="badge badge-gold">Execution Workflow</div>
            <h2 class="section-title">Our Step-by-Step Engineering Process</h2>
            <p class="section-subtitle">
              Every project follows structured stage-gates to ensure 100% safety, zero delay, and certified quality.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 60px;">
            ${service.process.map(p => `
              <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; position: relative;">
                <span style="font-size: 2.2rem; font-weight: 800; color: rgba(2, 132, 199, 0.15); line-height: 1; display: block; margin-bottom: 8px;">${p.step}</span>
                <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--primary); margin-bottom: 8px;">${p.title}</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">${p.desc}</p>
              </div>
            `).join('')}
          </div>

          <!-- Frequently Asked Questions -->
          <div style="max-width: 800px; margin: 0 auto;">
            <div class="section-header">
              <div class="badge badge-blue">FAQ</div>
              <h2 class="section-title">Frequently Asked Questions</h2>
            </div>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${service.faq.map(f => `
                <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px;">
                  <h4 style="font-size: 1rem; font-weight: 700; color: var(--primary); margin-bottom: 8px;"><i class="fas fa-question-circle" style="color: var(--accent); margin-right: 8px;"></i> ${f.q}</h4>
                  <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${f.a}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     PROJECTS / REALIZATIONS VIEW
     ========================================================================== */
  renderProjects(categoryFilter = null) {
    this.viewContainer.innerHTML = `
      <section class="section" style="background: var(--primary-dark); color: #ffffff; padding: 60px 0;">
        <div class="container">
          <div class="badge badge-gold">Realizations & Gallery</div>
          <h1 style="font-size: 2.8rem; font-weight: 800; margin-top: 10px;">Our Completed Realizations</h1>
          <p style="color: var(--text-light); max-width: 650px; margin-top: 10px; font-size: 1.1rem;">
            Explore our verified portfolio of residential villas, commercial structures, renovations, and custom interiors in Cuddalore.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="filter-bar">
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="Residential">Residential</button>
            <button class="filter-btn" data-filter="Commercial">Commercial</button>
            <button class="filter-btn" data-filter="Renovation">Renovations</button>
            <button class="filter-btn" data-filter="Carpentry">Carpentry & Interiors</button>
            <button class="filter-btn" data-filter="Flooring">Flooring & Marble</button>
          </div>

          <div id="projects-grid-target" class="portfolio-grid">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </section>
    `;

    this.renderProjectsGrid('all');
    this.initProjectFilters();
  }

  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.renderProjectsGrid(filter);
      });
    });
  }

  renderProjectsGrid(filter = 'all') {
    const target = document.getElementById('projects-grid-target');
    if (!target) return;

    let allProjects = window.ARC_ADMIN.getAllProjects();
    if (filter !== 'all') {
      allProjects = allProjects.filter(p => p.category.toLowerCase() === filter.toLowerCase());
    }

    if (allProjects.length === 0) {
      target.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <i class="fas fa-images" style="font-size: 3rem; color: var(--text-light); margin-bottom: 12px;"></i>
          <h3 style="color: var(--primary);">No Projects Found In This Category</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">You can upload project photos using the <a href="#admin" data-nav="admin" style="color: var(--accent); font-weight: bold;">Admin Portal</a>.</p>
        </div>
      `;
      return;
    }

    target.innerHTML = allProjects.map(p => `
      <div class="portfolio-item" onclick="window.ARC_APP.openProjectModal('${p.id}')">
        <div class="portfolio-thumb-wrap">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <span class="portfolio-category-tag">${p.category}</span>
          ${p.isCustom ? `<span style="position: absolute; bottom: 10px; right: 10px; background: rgba(37, 211, 102, 0.9); color: #fff; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 4px;">Uploaded</span>` : ''}
        </div>
        <div class="portfolio-item-body">
          <h4 class="portfolio-item-title">${p.title}</h4>
          <div class="portfolio-item-loc"><i class="fas fa-map-marker-alt"></i> ${p.location}</div>
          <p class="portfolio-item-desc">${p.description}</p>
          <div class="portfolio-tag-pills">
            ${p.features.map(f => `<span class="tag-pill">${f}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  openProjectModal(projectId) {
    const project = window.ARC_ADMIN.getAllProjects().find(p => p.id === projectId);
    if (!project) return;

    this.modalBody.innerHTML = `
      <div>
        <img src="${project.image}" alt="${project.title}" style="width: 100%; max-height: 440px; object-fit: cover; border-radius: var(--radius-lg) var(--radius-lg) 0 0;" />
        <div style="padding: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="badge badge-blue">${project.category}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fas fa-calendar-alt"></i> Completed in ${project.year}</span>
          </div>
          <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 8px;">${project.title}</h2>
          <div style="color: var(--accent); font-weight: 600; font-size: 0.95rem; margin-bottom: 16px;">
            <i class="fas fa-map-marker-alt"></i> ${project.location} ${project.area ? `| Area: ${project.area}` : ''}
          </div>
          <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">
            ${project.description}
          </p>
          <h4 style="font-size: 1rem; font-weight: 700; color: var(--primary); margin-bottom: 10px;">Highlights & Specifications:</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px;">
            ${project.features.map(f => `<span class="tag-pill" style="font-size: 0.85rem; padding: 6px 12px;">${f}</span>`).join('')}
          </div>
          <div style="display: flex; gap: 12px;">
            <a href="https://wa.me/919382312700?text=Hello%20ARC%20Associates,%20I%20am%20interested%20in%20a%20similar%20project%20like%20${encodeURIComponent(project.title)}" target="_blank" class="btn btn-gold" style="flex: 1;">
              <i class="fab fa-whatsapp"></i> Inquire About Similar Project
            </a>
          </div>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
  }

  openImageModal(imgUrl, title, tag) {
    this.modalBody.innerHTML = `
      <div>
        <img src="${imgUrl}" alt="${title}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: var(--radius-lg) var(--radius-lg) 0 0;" />
        <div style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="badge badge-gold"><i class="fas fa-tag"></i> ${tag}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">ARC Associates • Cuddalore</span>
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 16px;">${title}</h2>
          <div style="display: flex; gap: 12px;">
            <a href="https://wa.me/919382312700?text=Hello%20ARC%20Associates,%20I%20would%20like%20to%20inquire%20about%20a%20project%20design%20similar%20to%20${encodeURIComponent(title)}" target="_blank" class="btn btn-gold" style="flex: 1;">
              <i class="fab fa-whatsapp"></i> Inquire About This Project
            </a>
          </div>
        </div>
      </div>
    `;
    this.modalBackdrop.classList.add('open');
  }

  animateHeroCounters() {
    const counters = [
      { id: 'hero-stat-years', target: 25, suffix: '+' },
      { id: 'hero-stat-projects', target: 580, suffix: '+' },
      { id: 'hero-stat-clients', target: 100, suffix: '%' }
    ];

    counters.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const duration = 1600;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * item.target);
        el.textContent = current + item.suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = item.target + item.suffix;
        }
      };
      requestAnimationFrame(step);
    });
  }

  closeModal() {
    this.modalBackdrop.classList.remove('open');
  }

  /* ==========================================================================
     COST ESTIMATOR CALCULATOR
     ========================================================================== */
  renderCostEstimator() {
    this.viewContainer.innerHTML = `
      <section class="section" style="background: var(--primary-dark); color: #ffffff; padding: 60px 0;">
        <div class="container">
          <div class="badge badge-gold">Interactive Calculator</div>
          <h1 style="font-size: 2.8rem; font-weight: 800; margin-top: 10px;">Construction Cost Estimator</h1>
          <p style="color: var(--text-light); max-width: 650px; margin-top: 10px; font-size: 1.1rem;">
            Calculate realistic turnkey construction budgets for your plot in Cuddalore based on live 2024 material and labor costs.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="estimator-card">
            <!-- Inputs -->
            <div>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--primary); margin-bottom: 20px;">
                Specify Your Building Requirements
              </h3>

              <div class="estimator-form-group">
                <label class="estimator-label">Type of Construction</label>
                <select id="est-type" class="estimator-select">
                  <option value="residential_villa" data-rate="1950">Independent Residential Villa (₹ 1,950/sq.ft)</option>
                  <option value="residential_apt" data-rate="1850">Residential Duplex / Apartment (₹ 1,850/sq.ft)</option>
                  <option value="commercial_plaza" data-rate="2100">Commercial Complex / Office Space (₹ 2,100/sq.ft)</option>
                  <option value="renovation_civil" data-rate="1100">Full Home Renovation & Remodel (₹ 1,100/sq.ft)</option>
                </select>
              </div>

              <div class="estimator-form-group">
                <label class="estimator-label">Total Built-Up Area (in Sq. Feet)</label>
                <input type="number" id="est-area" class="estimator-input" value="1800" min="500" max="50000" step="50" />
              </div>

              <div class="estimator-form-group">
                <label class="estimator-label">Material & Finishing Quality Tier</label>
                <select id="est-tier" class="estimator-select">
                  <option value="1.0" selected>Standard Premium (Ramco Cement, Fe550D Steel, Jaquar, Asian Paints)</option>
                  <option value="1.2">Luxury Class (Italian Marble, Teak Joinery, Kohler, Smart Automation) [+20%]</option>
                  <option value="0.9">Budget Functional (Branded Standard Materials) [-10%]</option>
                </select>
              </div>

              <div class="estimator-form-group">
                <label class="estimator-label">Number of Floors</label>
                <select id="est-floors" class="estimator-select">
                  <option value="1">Ground Floor Only (G)</option>
                  <option value="2" selected>Ground + 1 Floor (G + 1)</option>
                  <option value="3">Ground + 2 Floors (G + 2)</option>
                  <option value="4">Ground + 3 Floors (G + 3)</option>
                </select>
              </div>
            </div>

            <!-- Calculated Output Card -->
            <div class="estimator-result-card">
              <div>
                <div class="result-heading">Estimated Total Budget</div>
                <div id="est-total-cost" class="result-value">₹ 35,10,000</div>
                <div style="font-size: 0.85rem; color: var(--accent-light); margin-bottom: 16px;">
                  Rate: <strong id="est-effective-rate" style="color: #ffffff;">₹ 1,950</strong> / sq.ft
                </div>

                <ul class="result-breakdown">
                  <li><span>Steel & Cement Structure:</span> <span id="est-structure-cost">₹ 17,55,000</span></li>
                  <li><span>Plumbing & Electrical (MEP):</span> <span id="est-mep-cost">₹ 5,26,500</span></li>
                  <li><span>Flooring & Tiling:</span> <span id="est-flooring-cost">₹ 4,56,300</span></li>
                  <li><span>Carpentry & Painting:</span> <span id="est-finishes-cost">₹ 7,72,200</span></li>
                  <li><span>Estimated Completion Time:</span> <span id="est-duration">6 - 8 Months</span></li>
                </ul>
              </div>

              <div>
                <a id="est-whatsapp-btn" href="#" target="_blank" class="btn btn-gold" style="width: 100%; margin-bottom: 10px;">
                  <i class="fab fa-whatsapp"></i> Send Estimate to WhatsApp
                </a>
                <a href="#contact" data-nav="contact" class="btn btn-outline-light" style="width: 100%;">
                  Book Site Survey for Formal Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    this.initEstimatorLogic();
  }

  initEstimatorLogic() {
    const typeEl = document.getElementById('est-type');
    const areaEl = document.getElementById('est-area');
    const tierEl = document.getElementById('est-tier');
    const totalCostEl = document.getElementById('est-total-cost');
    const rateEl = document.getElementById('est-effective-rate');
    const structEl = document.getElementById('est-structure-cost');
    const mepEl = document.getElementById('est-mep-cost');
    const floorEl = document.getElementById('est-flooring-cost');
    const finishEl = document.getElementById('est-finishes-cost');
    const durationEl = document.getElementById('est-duration');
    const whatsappBtn = document.getElementById('est-whatsapp-btn');

    const calculate = () => {
      const selectedOption = typeEl.options[typeEl.selectedIndex];
      const baseRate = parseFloat(selectedOption.getAttribute('data-rate')) || 1950;
      const area = parseFloat(areaEl.value) || 1500;
      const tierMult = parseFloat(tierEl.value) || 1.0;

      const effectiveRate = Math.round(baseRate * tierMult);
      const totalCost = effectiveRate * area;

      const structCost = Math.round(totalCost * 0.50);
      const mepCost = Math.round(totalCost * 0.15);
      const flooringCost = Math.round(totalCost * 0.13);
      const finishesCost = totalCost - (structCost + mepCost + flooringCost);

      const months = area < 1500 ? "5 - 7 Months" : area < 3000 ? "7 - 9 Months" : "10 - 14 Months";

      const formatInr = (n) => '₹ ' + n.toLocaleString('en-IN');

      totalCostEl.textContent = formatInr(totalCost);
      rateEl.textContent = formatInr(effectiveRate);
      structEl.textContent = formatInr(structCost);
      mepEl.textContent = formatInr(mepCost);
      floorEl.textContent = formatInr(flooringCost);
      finishEl.textContent = formatInr(finishesCost);
      durationEl.textContent = months;

      const waMsg = `Hello ARC Associates, I calculated an estimate on your website for ${selectedOption.text.split('(')[0].trim()} with ${area} sq.ft area. Estimated Total: ${formatInr(totalCost)}. I would like to schedule a site inspection in Cuddalore.`;
      whatsappBtn.href = `https://wa.me/919382312700?text=${encodeURIComponent(waMsg)}`;
    };

    [typeEl, areaEl, tierEl].forEach(el => {
      if (el) el.addEventListener('input', calculate);
    });

    calculate();
  }

  /* ==========================================================================
     REVIEW CARD GENERATOR & SLIDER CONTROLLER
     ========================================================================== */
  generateReviewCardHtml(r) {
    const avatarColors = [
      'linear-gradient(135deg, #0284c7 0%, #0a192f 100%)',
      'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
      'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
      'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
      'linear-gradient(135deg, #db2777 0%, #831843 100%)'
    ];
    const colorIndex = (r.author.charCodeAt(0) || 0) % avatarColors.length;
    const avatarBg = avatarColors[colorIndex];

    return `
      <div class="review-card">
        <div class="review-header">
          <div class="review-author-info">
            <div class="author-avatar" style="background: ${avatarBg};">${r.author.charAt(0)}</div>
            <div>
              <div class="author-name">${r.author}</div>
              <div class="author-role">${r.role}</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
            <i class="fab fa-google" style="color: #4285F4; font-size: 1.15rem;"></i>
            <div class="google-stars">
              ${Array(r.rating).fill('<i class="fas fa-star"></i>').join('')}
            </div>
          </div>
        </div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-footer">
          <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified Google Review</span>
          <span>${r.date}</span>
        </div>
      </div>
    `;
  }

  nudgeReviewMarquee(offset) {
    const track = document.getElementById('home-marquee-track') || document.getElementById('reviews-marquee-track');
    if (!track) return;
    track.style.animationPlayState = 'paused';
    const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(track).transform);
    track.style.transform = `translateX(${currentTransform.m41 + offset}px)`;
    setTimeout(() => {
      track.style.animationPlayState = 'running';
    }, 2500);
  }

  toggleMarqueePlay() {
    const track = document.getElementById('home-marquee-track') || document.getElementById('reviews-marquee-track');
    const btn = document.getElementById('marquee-toggle-btn');
    if (!track || !btn) return;

    if (track.style.animationPlayState === 'paused') {
      track.style.animationPlayState = 'running';
      btn.innerHTML = '<i class="fas fa-pause"></i>';
      btn.title = 'Pause Slide';
    } else {
      track.style.animationPlayState = 'paused';
      btn.innerHTML = '<i class="fas fa-play"></i>';
      btn.title = 'Resume Auto-Slide';
    }
  }

  /* ==========================================================================
     GOOGLE REVIEWS VIEW
     ========================================================================== */
  renderReviews() {
    const d = window.ARC_DATA;
    this.viewContainer.innerHTML = `
      <section class="section" style="background: var(--primary-dark); color: #ffffff; padding: 60px 0;">
        <div class="container">
          <div class="badge badge-gold">Client Feedback</div>
          <h1 style="font-size: 2.8rem; font-weight: 800; margin-top: 10px;">Google Reviews & Testimonials</h1>
          <p style="color: var(--text-light); max-width: 650px; margin-top: 10px; font-size: 1.1rem;">
            Over 140+ 5-star ratings from homeowners, architects, and business clients across Cuddalore and surrounding districts.
          </p>
        </div>
      </section>

      <!-- Auto-Sliding Live Marquee Strip -->
      <section class="section section-alt" style="overflow: hidden; padding-bottom: 30px;">
        <div class="container">
          <div class="google-reviews-header-card">
            <div class="google-score-box">
              <i class="fab fa-google google-icon-large"></i>
              <div class="google-score-details">
                <div class="google-score-heading-row">
                  <strong class="google-score-text">4.9 / 5.0 Star Rating</strong>
                  <div class="google-stars">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                  </div>
                </div>
                <p class="google-score-sub">Verified Google Business Profile | Cuddalore, Tamil Nadu</p>
              </div>
            </div>
            <div class="google-header-actions">
              <div class="slider-status-tag">
                <span class="live-dot"></span> Live Running Feed (${d.reviews.length} Reviews)
              </div>
              <button class="btn btn-primary" onclick="window.ARC_APP.openWriteReviewModal()">
                <i class="fas fa-star"></i> Write a Google Review
              </button>
            </div>
          </div>
        </div>

        <div class="reviews-slider-wrapper">
          <div class="reviews-marquee-track" id="reviews-marquee-track">
            ${[...d.reviews, ...d.reviews].map(r => this.generateReviewCardHtml(r)).join('')}
          </div>
        </div>
      </section>

      <!-- All Reviews Grid Section -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <div class="badge badge-blue">All Client Testimonials</div>
            <h2 class="section-title">What Our Clients Say About ARC Associates</h2>
            <p class="section-subtitle">Read complete reviews from recent turnkey home, commercial plaza, and interior projects.</p>
          </div>

          <div class="reviews-grid">
            ${d.reviews.map(r => this.generateReviewCardHtml(r)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  openWriteReviewModal() {
    this.modalBody.innerHTML = `
      <div style="padding: 32px;">
        <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 8px;">Write a Review for ARC Associates</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">Your feedback helps us continue providing top quality construction engineering in Cuddalore.</p>
        
        <form id="new-review-form" onsubmit="event.preventDefault(); window.ARC_APP.submitNewReview();">
          <div class="form-field">
            <label>Your Name</label>
            <input type="text" id="rev-name" class="form-input" required placeholder="e.g. S. Karthikeyan" />
          </div>
          <div class="form-field">
            <label>Your Project Location / City</label>
            <input type="text" id="rev-loc" class="form-input" required placeholder="e.g. Homeowner, K.K. Nagar, Cuddalore" />
          </div>
          <div class="form-field">
            <label>Rating</label>
            <select id="rev-rating" class="form-select">
              <option value="5">★★★★★ (5 Stars - Exceptional)</option>
              <option value="4">★★★★☆ (4 Stars - Very Good)</option>
            </select>
          </div>
          <div class="form-field">
            <label>Your Review & Experience</label>
            <textarea id="rev-text" class="form-textarea" required placeholder="Describe the quality of construction, timeline adherence, and team professionalism..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            Submit Review
          </button>
        </form>
      </div>
    `;
    this.modalBackdrop.classList.add('open');
  }

  submitNewReview() {
    const name = document.getElementById('rev-name').value;
    const role = document.getElementById('rev-loc').value;
    const rating = parseInt(document.getElementById('rev-rating').value) || 5;
    const text = document.getElementById('rev-text').value;

    window.ARC_DATA.reviews.unshift({
      id: 'rev_' + Date.now(),
      author: name,
      role: role,
      rating: rating,
      date: 'Just now',
      text: text,
      verified: true
    });

    this.closeModal();
    this.renderReviews();
    alert("Thank you! Your review has been added to ARC Associates.");
  }

  /* ==========================================================================
     TIPS & ARTICLES (BLOG) VIEW
     ========================================================================== */
  renderTips() {
    const articles = window.ARC_DATA.articles;
    this.viewContainer.innerHTML = `
      <section class="section" style="background: var(--primary-dark); color: #ffffff; padding: 60px 0;">
        <div class="container">
          <div class="badge badge-gold">Knowledge Center</div>
          <h1 style="font-size: 2.8rem; font-weight: 800; margin-top: 10px;">Useful Building Tips & Articles</h1>
          <p style="color: var(--text-light); max-width: 650px; margin-top: 10px; font-size: 1.1rem;">
            Expert engineering guidance, Vastu tips, soil mechanics, and renovation advice from the ARC engineering desk.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
            ${articles.map(a => `
              <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span class="badge badge-blue">${a.category}</span>
                  <span style="font-size: 0.78rem; color: var(--text-muted);">${a.readTime}</span>
                </div>
                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-bottom: 12px; line-height: 1.4;">${a.title}</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; flex: 1;">${a.summary}</p>
                <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-main); margin-bottom: 20px; border-left: 3px solid var(--accent);">
                  ${a.content}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-light); border-top: 1px solid var(--border-color); padding-top: 12px;">
                  <span>ARC Engineering Team</span>
                  <span>${a.date}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     CONTACT VIEW
     ========================================================================== */
  renderContact() {
    const d = window.ARC_DATA;
    this.viewContainer.innerHTML = `
      <section class="section" style="background: var(--primary-dark); color: #ffffff; padding: 60px 0;">
        <div class="container">
          <div class="badge badge-gold">Get In Touch</div>
          <h1 style="font-size: 2.8rem; font-weight: 800; margin-top: 10px;">Contact ARC Associates</h1>
          <p style="color: var(--text-light); max-width: 650px; margin-top: 10px; font-size: 1.1rem;">
            Visit our office in Vannarapalayam, Cuddalore or connect directly for initial plot consultations and quotation requests.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="contact-layout">
            <!-- Contact Cards -->
            <div class="contact-info-cards">
              <div class="contact-card-item">
                <div class="contact-card-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="contact-card-details">
                  <h4>Head Office Address</h4>
                  <p>
                    <strong>ARC ASSOCIATES</strong><br>
                    ${d.company.address.line1}<br>
                    ${d.company.address.line2}<br>
                    ${d.company.address.state}
                  </p>
                </div>
              </div>

              <div class="contact-card-item">
                <div class="contact-card-icon">
                  <i class="fas fa-phone-alt"></i>
                </div>
                <div class="contact-card-details">
                  <h4>Phone & Direct Lines</h4>
                  <p>
                    Landline: <a href="tel:${d.company.phones[0].raw}">${d.company.phones[0].display}</a><br>
                    Mobile / WhatsApp: <a href="tel:${d.company.phones[1].raw}">${d.company.phones[1].display}</a>
                  </p>
                </div>
              </div>

              <div class="contact-card-item">
                <div class="contact-card-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-card-details">
                  <h4>Email Support</h4>
                  <p>
                    Official: <a href="mailto:${d.company.email}">${d.company.email}</a>
                  </p>
                </div>
              </div>

              <div class="contact-card-item">
                <div class="contact-card-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="contact-card-details">
                  <h4>Working Hours</h4>
                  <p>${d.company.workingHours}</p>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="contact-form-card">
              <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--primary); margin-bottom: 6px;">
                Send Us an Enquiry / Quotation Request
              </h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">
                Fill out the details below and our structural engineering team will reach out within 24 hours.
              </p>

              <form id="contact-form" onsubmit="event.preventDefault(); window.ARC_APP.handleContactSubmit();">
                <div class="form-grid-2">
                  <div class="form-field">
                    <label>Your Full Name *</label>
                    <input type="text" id="c-name" class="form-input" required placeholder="e.g. Ramesh Kumar" />
                  </div>
                  <div class="form-field">
                    <label>Mobile Number *</label>
                    <input type="tel" id="c-phone" class="form-input" required placeholder="e.g. +91 98765 43210" />
                  </div>
                </div>

                <div class="form-grid-2">
                  <div class="form-field">
                    <label>Email Address</label>
                    <input type="email" id="c-email" class="form-input" placeholder="e.g. ramesh@gmail.com" />
                  </div>
                  <div class="form-field">
                    <label>Service Required *</label>
                    <select id="c-service" class="form-select" required>
                      <option value="Residential Construction">Houses & Residential Construction</option>
                      <option value="Commercial Construction">Commercial Office / Complex</option>
                      <option value="Renovation">Building Renovation & Remodeling</option>
                      <option value="Carpentry & Interior">Carpentry & Modular Joinery</option>
                      <option value="Flooring & Marble">Flooring & Italian Marble</option>
                      <option value="Plumbing & Electrical">Plumbing, Drainage & Electrical</option>
                    </select>
                  </div>
                </div>

                <div class="form-field">
                  <label>Plot / Project Location in Cuddalore</label>
                  <input type="text" id="c-location" class="form-input" placeholder="e.g. K.K. Nagar / Vannarapalayam / Semmandalam" />
                </div>

                <div class="form-field">
                  <label>Project Details & Requirements</label>
                  <textarea id="c-message" class="form-textarea" placeholder="Tell us about plot size, number of floors, timeline, or specific requirements..."></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">
                  <i class="fas fa-paper-plane"></i> Submit Construction Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  handleContactSubmit() {
    const name = document.getElementById('c-name').value;
    const phone = document.getElementById('c-phone').value;
    const service = document.getElementById('c-service').value;
    const loc = document.getElementById('c-location').value;
    const msg = document.getElementById('c-message').value;

    const waText = `Hello ARC Associates,%0A%0ANew Construction Enquiry:%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0ALocation: ${encodeURIComponent(loc)}%0AMessage: ${encodeURIComponent(msg)}`;
    
    // Open WhatsApp
    window.open(`https://wa.me/919382312700?text=${waText}`, '_blank');
    alert("Thank you! Your message has been prepared. You can now send it directly to ARC Associates on WhatsApp or our engineering team will call you back.");
  }

  /* ==========================================================================
     ADMIN PHOTO MANAGEMENT & OPTIMIZER PORTAL (REQUESTED IN AUDIO 1 & 2)
     ========================================================================== */
  renderAdminPortal() {
    const customPhotos = window.ARC_ADMIN.customPhotos;
    const totalProjects = window.ARC_ADMIN.getAllProjects().length;

    this.viewContainer.innerHTML = `
      <section class="section" style="background: var(--primary-dark); color: #ffffff; padding: 50px 0;">
        <div class="container">
          <div class="badge badge-gold"><i class="fas fa-shield-alt"></i> Management Portal</div>
          <h1 style="font-size: 2.6rem; font-weight: 800; margin-top: 10px;">Admin Photo & Portfolio Manager</h1>
          <p style="color: var(--text-light); max-width: 680px; margin-top: 8px; font-size: 1.05rem;">
            Upload new site photos for specific services with <strong>automatic client-side image resizing and compression</strong> before publishing to the live website.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="admin-portal-wrapper">
            <div class="admin-header-row">
              <div>
                <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--primary);">Live Portfolio Status</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Photos added here immediately synchronize with the public gallery and specific service pages.</p>
              </div>
              <div style="display: flex; gap: 10px;">
                <button class="btn btn-sm btn-secondary" onclick="window.ARC_ADMIN.resetToDefaults()">
                  <i class="fas fa-undo"></i> Reset All Uploads
                </button>
                <a href="#projects" data-nav="projects" class="btn btn-sm btn-primary">
                  <i class="fas fa-external-link-alt"></i> View Public Gallery
                </a>
              </div>
            </div>

            <!-- Stats strip -->
            <div class="admin-stats-strip">
              <div class="admin-stat-card">
                <div class="num">${totalProjects}</div>
                <div class="lbl">Total Active Projects</div>
              </div>
              <div class="admin-stat-card">
                <div class="num">${customPhotos.length}</div>
                <div class="lbl">User Uploaded Photos</div>
              </div>
              <div class="admin-stat-card">
                <div class="num">1280px</div>
                <div class="lbl">Max Auto-Resized Width</div>
              </div>
              <div class="admin-stat-card">
                <div class="num" style="color: #16a34a;">~80-95%</div>
                <div class="lbl">Avg File Size Reduction</div>
              </div>
            </div>

            <!-- Drag & Drop Upload Zone -->
            <div id="dropzone" class="upload-dropzone">
              <input type="file" id="file-input" accept="image/*" style="display: none;" />
              <div class="upload-icon"><i class="fas fa-cloud-upload-alt"></i></div>
              <h3 class="upload-title">Drag & Drop Project Photo Here, or Click to Browse</h3>
              <p class="upload-sub">
                Supports JPG, PNG, WEBP. The engine will automatically resize & optimize the photo for lightning fast page loads.
              </p>
            </div>

            <!-- Optimization Compression Monitor -->
            <div id="opt-monitor" class="optimization-monitor">
              <div class="opt-row">
                <span>[OPTIMIZER STATUS]</span>
                <span class="opt-badge-success">COMPRESSION COMPLETE</span>
              </div>
              <div class="opt-row">
                <span>Original File Size:</span>
                <span id="opt-orig-size">--</span>
              </div>
              <div class="opt-row">
                <span>Optimized Web Size:</span>
                <span id="opt-new-size" class="opt-badge-success">--</span>
              </div>
              <div class="opt-row">
                <span>Dimensions & Format:</span>
                <span id="opt-dims">--</span>
              </div>
              <div class="opt-row">
                <span>Bandwidth Savings:</span>
                <span id="opt-savings" style="color: var(--gold-light); font-weight: bold;">--</span>
              </div>
            </div>

            <!-- Upload Metadata Form -->
            <div id="photo-meta-form" style="display: none; background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); margin-bottom: 36px; border: 1px solid var(--border-color);">
              <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-bottom: 16px;">
                <i class="fas fa-tag" style="color: var(--accent);"></i> Project Details & Service Tagging
              </h4>
              <div class="form-grid-2">
                <div class="form-field">
                  <label>Project Title *</label>
                  <input type="text" id="adm-title" class="form-input" placeholder="e.g. Modern Residential Villa" required />
                </div>
                <div class="form-field">
                  <label>Assign to Service Category *</label>
                  <select id="adm-category" class="form-select">
                    <option value="Residential" data-service="houses-and-offices">Residential Construction (Houses & Offices)</option>
                    <option value="Commercial" data-service="houses-and-offices">Commercial Complex / Office</option>
                    <option value="Renovation" data-service="renovations">Building Renovation & Remodeling</option>
                    <option value="Carpentry" data-service="carpentry">Carpentry & Modular Joinery</option>
                    <option value="Flooring" data-service="flooring">Flooring, Tiling & Marble</option>
                    <option value="Electrical" data-service="electrical">Electrical & Smart Home</option>
                  </select>
                </div>
              </div>
              <div class="form-grid-2">
                <div class="form-field">
                  <label>Location in Cuddalore</label>
                  <input type="text" id="adm-loc" class="form-input" placeholder="e.g. K.K. Nagar, Cuddalore" />
                </div>
                <div class="form-field">
                  <label>Built-Up Area / Scope</label>
                  <input type="text" id="adm-area" class="form-input" placeholder="e.g. 2,400 sq.ft" />
                </div>
              </div>
              <div class="form-field">
                <label>Description / Caption</label>
                <textarea id="adm-desc" class="form-textarea" style="min-height: 80px;" placeholder="Describe the structural works, materials used, or client requirements..."></textarea>
              </div>
              <button id="publish-photo-btn" class="btn btn-gold" style="width: 100%;">
                <i class="fas fa-check-circle"></i> Save & Publish Photo to Website
              </button>
            </div>

            <!-- Uploaded Photos Grid -->
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary); margin-bottom: 20px;">
              Manage Uploaded Photos (${customPhotos.length})
            </h3>
            
            ${customPhotos.length === 0 ? `
              <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic;">No custom photos uploaded yet. Use the upload box above to add photos.</p>
            ` : `
              <div class="admin-photos-grid">
                ${customPhotos.map(p => `
                  <div class="admin-photo-card">
                    <div class="admin-photo-thumb">
                      <img src="${p.image}" alt="${p.title}" />
                    </div>
                    <div class="admin-photo-body">
                      <div class="admin-photo-title">${p.title}</div>
                      <div class="admin-photo-meta">${p.category} | ${p.location}</div>
                      <div class="admin-photo-actions">
                        <button class="btn btn-sm btn-secondary" style="color: #ef4444; width: 100%;" onclick="window.ARC_ADMIN.deletePhoto('${p.id}'); window.ARC_APP.renderAdminPortal();">
                          <i class="fas fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </section>
    `;

    this.initAdminUploader();
  }

  initAdminUploader() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const optMonitor = document.getElementById('opt-monitor');
    const origSizeEl = document.getElementById('opt-orig-size');
    const newSizeEl = document.getElementById('opt-new-size');
    const dimsEl = document.getElementById('opt-dims');
    const savingsEl = document.getElementById('opt-savings');
    const metaForm = document.getElementById('photo-meta-form');
    const publishBtn = document.getElementById('publish-photo-btn');

    if (!dropzone || !fileInput) return;

    let pendingOptimizedResult = null;

    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        processFile(e.target.files[0]);
      }
    });

    const processFile = async (file) => {
      try {
        dropzone.innerHTML = `<div style="color: var(--accent); font-weight: 700;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i><br>Optimizing and Resizing Image...</div>`;
        const res = await window.ARC_ADMIN.optimizer.optimizeImage(file);
        pendingOptimizedResult = res;

        // Display results in monitor
        origSizeEl.textContent = window.ARC_ADMIN.optimizer.formatBytes(res.originalSize);
        newSizeEl.textContent = window.ARC_ADMIN.optimizer.formatBytes(res.optimizedSize);
        dimsEl.textContent = `${res.width} x ${res.height}px (${res.format})`;
        savingsEl.textContent = `${res.reductionPct}% Size Reduction (Optimized for Web)`;
        optMonitor.classList.add('active');

        // Show metadata form
        metaForm.style.display = 'block';
        dropzone.innerHTML = `
          <div style="color: #16a34a; font-weight: 700;">
            <i class="fas fa-check-circle" style="font-size: 2.2rem; margin-bottom: 8px;"></i><br>
            Image Ready! Complete Details Below & Click Save
          </div>
        `;
      } catch (err) {
        alert("Error optimizing image: " + err.message);
        this.renderAdminPortal();
      }
    };

    if (publishBtn) {
      publishBtn.addEventListener('click', () => {
        if (!pendingOptimizedResult) {
          alert("Please upload a photo first!");
          return;
        }

        const title = document.getElementById('adm-title').value.trim() || 'ARC Project';
        const categorySelect = document.getElementById('adm-category');
        const category = categorySelect.value;
        const serviceId = categorySelect.options[categorySelect.selectedIndex].getAttribute('data-service') || 'houses-and-offices';
        const loc = document.getElementById('adm-loc').value.trim() || 'Cuddalore, Tamil Nadu';
        const area = document.getElementById('adm-area').value.trim() || 'Turnkey Project';
        const desc = document.getElementById('adm-desc').value.trim() || 'Project executed with engineering precision by ARC Associates, Cuddalore.';

        window.ARC_ADMIN.addPhoto({
          title,
          category,
          serviceId,
          location: loc,
          area,
          description: desc,
          image: pendingOptimizedResult.dataUrl,
          features: ['Verified Execution', 'Quality Assured', 'ARC Construction']
        });

        alert("Success! Photo optimized and added to the website portfolio!");
        this.renderAdminPortal();
      });
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.ARC_APP = new ARCApp();
});
