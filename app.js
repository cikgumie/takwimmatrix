/**
 * TakwimMatrik Pro - Landing Page Interactive Logic
 * Handles interactive demo sandbox, filter chips, FAQ accordion, and dynamic school week calculations.
 */

// Sample Demo Data for Live Sandbox
const DEMO_EVENTS = [
  {
    id: 1,
    unit: 'Pentadbiran',
    title: 'Mesyuarat Guru & Staf Bil 1/2027',
    date: '2027-01-04',
    time: '08:30 - 12:30',
    location: 'Dewan Kuliah Utama',
    pic: 'Pengetua / Pengarah',
    color: '#0284c7', // Sky Blue
    week: 'M1'
  },
  {
    id: 2,
    unit: 'Kurikulum',
    title: 'Penetapan Sasaran Akademik (Headcount)',
    date: '2027-01-11',
    time: '14:30 - 16:30',
    location: 'Bilik Mesyuarat Bestari',
    pic: 'PK Pentadbiran',
    color: '#2563eb', // Blue
    week: 'M2'
  },
  {
    id: 3,
    unit: 'HEM',
    title: 'Minggu Orientasi & Suaikenal Pelajar Baharu',
    date: '2027-01-18',
    time: 'Sepanjang Hari',
    location: 'Kompleks Dewan Kediaman',
    pic: 'PK HEM & Kaunselor',
    color: '#059669', // Emerald
    week: 'M3'
  },
  {
    id: 4,
    unit: 'Kokurikulum',
    title: 'Kejohanan Merentas Desa Peringkat Kolej',
    date: '2027-02-06',
    time: '07:30 - 11:30',
    location: 'Padang Utama & Trek Kampus',
    pic: 'Penyelaras Sukan',
    color: '#d97706', // Amber
    week: 'M5'
  },
  {
    id: 5,
    unit: 'Takwim KPM',
    title: 'Cuti Penggal 1 Persekolahan Sesi 2027',
    date: '2027-03-06 s/d 2027-03-14',
    time: 'Sepanjang Hari',
    location: 'Seluruh Negara',
    pic: 'Kementerian Pendidikan Malaysia',
    color: '#dc2626', // Red
    week: 'CUTI P1'
  },
  {
    id: 6,
    unit: 'Kurikulum',
    title: 'Ujian Penilaian Kurikulum 1 (UPK 1)',
    date: '2027-03-22',
    time: '08:00 - 13:00',
    location: 'Dewan Peperiksaan',
    pic: 'Setiausaha Peperiksaan',
    color: '#2563eb', // Blue
    week: 'M11'
  },
  {
    id: 7,
    unit: 'Kokurikulum',
    title: 'Hari Anugerah Kecemerlangan Kokurikulum',
    date: '2027-04-10',
    time: '08:00 - 13:00',
    location: 'Dewan Sri Gemilang',
    pic: 'PK Kokurikulum',
    color: '#d97706', // Amber
    week: 'M13'
  }
];

// State
let currentFilter = 'Semua';
let searchQuery = '';

// DOM Elements & Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Render Initial Demo Events
  renderDemoEvents();

  // Setup Event Listeners
  setupDemoFilters();
  setupDemoSearch();
  setupFaqAccordion();
  setupMobileMenu();
  setupMockupTabs();
  setupOrderFormToggle();
  setupStickyPromoBar();

  // Final icon render pass
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// Render Interactive Demo List
function renderDemoEvents() {
  const container = document.getElementById('demoEventsContainer');
  const countBadge = document.getElementById('demoEventCount');
  if (!container) return;

  const filtered = DEMO_EVENTS.filter(evt => {
    const matchesFilter = currentFilter === 'Semua' || evt.unit.toLowerCase() === currentFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      evt.title.toLowerCase().includes(searchQuery) ||
      evt.location.toLowerCase().includes(searchQuery) ||
      evt.pic.toLowerCase().includes(searchQuery) ||
      evt.unit.toLowerCase().includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Acara Ditemui`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <i data-lucide="calendar-x" class="w-6 h-6"></i>
        </div>
        <p class="text-sm font-semibold text-slate-700">Tiada acara sepadan ditemui</p>
        <p class="text-xs text-slate-400 mt-1">Cuba tukar kata kunci carian atau pilih kategori unit lain.</p>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(evt => `
    <div class="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-rose-400/50 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group">
      <div class="flex items-start gap-3.5">
        <div class="w-3 h-12 rounded-full flex-shrink-0" style="background-color: ${evt.color};"></div>
        <div>
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase" style="background-color: ${evt.color}15; color: ${evt.color};">
              ${evt.unit}
            </span>
            <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              ${evt.week}
            </span>
            <span class="text-xs text-slate-400 flex items-center gap-1">
              <i data-lucide="calendar" class="w-3 h-3"></i> ${evt.date}
            </span>
          </div>
          <h4 class="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
            ${evt.title}
          </h4>
          <div class="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
            <span class="flex items-center gap-1">
              <i data-lucide="clock" class="w-3 h-3 text-slate-400"></i> ${evt.time}
            </span>
            <span class="flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i> ${evt.location}
            </span>
            <span class="flex items-center gap-1 text-slate-600 font-medium">
              <i data-lucide="user" class="w-3 h-3 text-slate-400"></i> ${evt.pic}
            </span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end md:self-center">
        <span class="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
          <i data-lucide="check-circle" class="w-3 h-3"></i> GCal Synced
        </span>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Setup Demo Filters
function setupDemoFilters() {
  const buttons = document.querySelectorAll('.demo-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-unit') || 'Semua';
      renderDemoEvents();
    });
  });
}

// Setup Demo Search
function setupDemoSearch() {
  const searchInput = document.getElementById('demoSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderDemoEvents();
  });
}

// Setup FAQ Accordion
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Mobile Menu Navigation Toggle
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu on link click
  const links = mobileMenu.querySelectorAll('a');
  links.forEach(l => {
    l.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Setup Interactive Mockup Showcase Tabs
function setupMockupTabs() {
  const tabs = document.querySelectorAll('.mockup-tab-btn');
  const panels = document.querySelectorAll('.mockup-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-mockup-target');
      if (!target) return;

      // Update Tab Styles
      tabs.forEach(t => t.classList.remove('active', 'bg-rose-600', 'text-white'));
      tabs.forEach(t => t.classList.add('bg-white', 'text-slate-700'));
      tab.classList.add('active', 'bg-rose-600', 'text-white');
      tab.classList.remove('bg-white', 'text-slate-700');

      // Update Panels
      panels.forEach(panel => {
        if (panel.id === target) {
          panel.classList.remove('hidden');
          panel.classList.add('animate-fadeIn');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('animate-fadeIn');
        }
      });

      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });
}

// Setup Embedded Order Form Toggle
function setupOrderFormToggle() {
  const toggleBtn = document.getElementById('toggleEmbedFormBtn');
  const embedWrapper = document.getElementById('embeddedOrderFormWrapper');
  if (!toggleBtn || !embedWrapper) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = embedWrapper.classList.contains('hidden');
    if (isHidden) {
      embedWrapper.classList.remove('hidden');
      toggleBtn.innerHTML = `
        <i data-lucide="chevron-up" class="w-4 h-4"></i>
        <span>Sembunyikan Borang Terbenam</span>
      `;
      // Smooth scroll into view
      embedWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      embedWrapper.classList.add('hidden');
      toggleBtn.innerHTML = `
        <i data-lucide="file-text" class="w-4 h-4"></i>
        <span>Buka & Isi Borang Terus Di Halaman</span>
      `;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });
}

// Sticky Bottom Promo Announcement Bar
function setupStickyPromoBar() {
  const stickyBar = document.getElementById('stickyPromoBar');
  const closeBtn = document.getElementById('closeStickyPromoBtn');
  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    // Show after scrolling 400px
    if (window.scrollY > 400 && !sessionStorage.getItem('dismissPromoBar')) {
      stickyBar.classList.remove('translate-y-32', 'opacity-0');
      stickyBar.classList.add('translate-y-0', 'opacity-100');
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      stickyBar.classList.add('translate-y-32', 'opacity-0');
      sessionStorage.setItem('dismissPromoBar', 'true');
    });
  }
}

