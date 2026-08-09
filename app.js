// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9NzA3Q_yZQaCxEmNq2o5GK9NflbFQXck",
    authDomain: "shot-lello3d.firebaseapp.com",
    projectId: "shot-lello3d",
    storageBucket: "shot-lello3d.firebasestorage.app",
    messagingSenderId: "125059907963",
    appId: "1:125059907963:web:46a68c493fe16fd424fdde"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Centralized Deterministic Theme Color Engine (Matches Android Kotlin Math)
const DEFAULT_PRIMARY_HEX = '#2563EB';

function normalizeHex(hex) {
    if (!hex || typeof hex !== 'string') return DEFAULT_PRIMARY_HEX;
    let cleaned = hex.trim().replace('#', '');
    if (cleaned.length === 3) {
        cleaned = cleaned[0] + cleaned[0] + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2];
    }
    if (cleaned.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
        return DEFAULT_PRIMARY_HEX;
    }
    return '#' + cleaned.toUpperCase();
}

function hexToRgb(hex) {
    const norm = normalizeHex(hex);
    const r = parseInt(norm.substring(1, 3), 16) / 255.0;
    const g = parseInt(norm.substring(3, 5), 16) / 255.0;
    const b = parseInt(norm.substring(5, 7), 16) / 255.0;
    return [r, g, b];
}

function rgbToHsl(r, g, b) {
    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (maxVal + minVal) / 2.0;

    if (maxVal !== minVal) {
        const d = maxVal - minVal;
        s = l > 0.5 ? d / (2.0 - maxVal - minVal) : d / (maxVal + minVal);
        switch (maxVal) {
            case r: h = (g - b) / d + (g < b ? 6.0 : 0.0); break;
            case g: h = (b - r) / d + 2.0; break;
            case b: h = (r - g) / d + 4.0; break;
        }
        h *= 60.0;
    }
    return [h, s, l];
}

function hslToHex(h, s, l) {
    const clampedH = (h % 360.0 + 360.0) % 360.0;
    const clampedS = Math.max(0.0, Math.min(1.0, s));
    const clampedL = Math.max(0.0, Math.min(1.0, l));

    const c = (1.0 - Math.abs(2.0 * clampedL - 1.0)) * clampedS;
    const x = c * (1.0 - Math.abs((clampedH / 60.0) % 2.0 - 1.0));
    const m = clampedL - c / 2.0;

    let rP = 0, gP = 0, bP = 0;
    if (clampedH < 60) { rP = c; gP = x; bP = 0; }
    else if (clampedH < 120) { rP = x; gP = c; bP = 0; }
    else if (clampedH < 180) { rP = 0; gP = c; bP = x; }
    else if (clampedH < 240) { rP = 0; gP = x; bP = c; }
    else if (clampedH < 300) { rP = x; gP = 0; bP = c; }
    else { rP = c; gP = 0; bP = x; }

    const r = Math.min(255, Math.max(0, Math.round((rP + m) * 255.0)));
    const g = Math.min(255, Math.max(0, Math.round((gP + m) * 255.0)));
    const b = Math.min(255, Math.max(0, Math.round((bP + m) * 255.0)));

    const toHex = (num) => num.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generatePalette(rawHex, isDark = false) {
    const primary = normalizeHex(rawHex);
    const [r, g, b] = hexToRgb(primary);
    const [h, s, l] = rgbToHsl(r, g, b);

    const primaryDark = hslToHex(h, s, Math.max(0.12, l - 0.18));
    const primaryLight = hslToHex(h, Math.max(0.15, s * 0.75), Math.min(0.92, l + 0.35));

    const accentH = (h + 30.0) % 360.0;
    const accentS = Math.max(0.0, Math.min(1.0, s + 0.15));
    const accentL = Math.max(0.40, Math.min(0.60, l));
    const accent = hslToHex(accentH, accentS, accentL);

    const relLuminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const onPrimary = relLuminance < 0.45 ? '#FFFFFF' : '#0F172A';

    if (!isDark) {
        return {
            primary,
            primaryDark,
            primaryLight,
            accent,
            background: hslToHex(h, Math.min(0.10, s), 0.98),
            surface: '#FFFFFF',
            surfaceVariant: hslToHex(h, Math.min(0.12, s), 0.94),
            card: '#FFFFFF',
            textPrimary: '#0F172A',
            textSecondary: '#475569',
            border: hslToHex(h, Math.min(0.15, s), 0.88),
            onPrimary,
            onBackground: '#0F172A',
            gradientStart: primary,
            gradientEnd: primaryDark
        };
    } else {
        return {
            primary,
            primaryDark,
            primaryLight,
            accent,
            background: hslToHex(h, Math.min(0.18, s), 0.07),
            surface: hslToHex(h, Math.min(0.16, s), 0.12),
            surfaceVariant: hslToHex(h, Math.min(0.16, s), 0.17),
            card: hslToHex(h, Math.min(0.16, s), 0.12),
            textPrimary: '#F8FAFC',
            textSecondary: '#94A3B8',
            border: hslToHex(h, Math.min(0.16, s), 0.22),
            onPrimary,
            onBackground: '#F8FAFC',
            gradientStart: primary,
            gradientEnd: primaryDark
        };
    }
}

function applyThemePalette(data) {
    const rawHex = data.themeColorHex || '#2563EB';
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const palette = generatePalette(rawHex, isDark);

    const root = document.documentElement;
    root.style.setProperty('--primary-color', palette.primary);
    root.style.setProperty('--primary-dark', palette.primaryDark);
    root.style.setProperty('--primary-light', palette.primaryLight);
    root.style.setProperty('--primary-hover', palette.primaryDark);
    root.style.setProperty('--accent-color', palette.accent);
    root.style.setProperty('--bg-color', palette.background);
    root.style.setProperty('--card-bg', palette.surface);
    root.style.setProperty('--surface-variant', palette.surfaceVariant);
    root.style.setProperty('--text-main', palette.textPrimary);
    root.style.setProperty('--text-muted', palette.textSecondary);
    root.style.setProperty('--border-color', palette.border);
    root.style.setProperty('--on-primary', palette.onPrimary);
    root.style.setProperty('--gradient-start', palette.gradientStart);
    root.style.setProperty('--gradient-end', palette.gradientEnd);
}

// SVG Icons Map
const SVG_ICONS = {
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`
};

// Main Execution
document.addEventListener('DOMContentLoaded', () => {
    const profileId = getProfileIdFromUrl();
    const source = getSourceFromUrl();
    
    if (!profileId) {
        showError('رابط البروفايل غير صالح', 'يرجى التأكد من استخدام الرابط الصحيح كـ (?id=YOUR_ID).');
        return;
    }

    db.collection('profiles').doc(profileId).get()
        .then((doc) => {
            if (!doc.exists) {
                showError('هذا البروفايل غير متاح حاليًا', 'لم نتمكن من العثور على البروفايل المطلوب.');
                return;
            }
            const data = doc.data();
            renderProfile(data);

            // Immediately increment analytics counters in Firestore
            trackProfileOpen(profileId, source);
        })
        .catch((error) => {
            console.error('Error fetching profile from Firestore:', error);
            showError('تعذر تحميل البروفايل', 'حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى.');
        });

    setupLightboxEvents();
    setupShareEvent();
});

// Extract profileId from URL query string
function getProfileIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Extract optional source from URL query string (nfc, qr, etc.)
function getSourceFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    return source ? source.toLowerCase().trim() : null;
}

// Increment profile analytics counters in Firestore
function trackProfileOpen(profileId, source) {
    const updateObj = {
        viewsCount: firebase.firestore.FieldValue.increment(1)
    };
    if (source === 'nfc') {
        updateObj.nfcOpensCount = firebase.firestore.FieldValue.increment(1);
    } else if (source === 'qr') {
        updateObj.qrOpensCount = firebase.firestore.FieldValue.increment(1);
    }

    db.collection('profiles').doc(profileId).update(updateObj)
        .catch((error) => {
            console.error('Error incrementing analytics counters in Firestore:', error);
        });
}

// Display Error State
function showError(title, message) {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('profile-container').classList.add('hidden');
    
    document.getElementById('error-title').textContent = title;
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-state').classList.remove('hidden');
}

function mapTemplateId(rawId) {
    if (!rawId) return 'personal_1';
    const clean = rawId.trim().toLowerCase();
    const validTemplates = [
        'personal_1', 'personal_2',
        'business_1', 'business_2', 'business_3',
        'reviews_1', 'reviews_2',
        'children_1', 'children_2',
        'pets_1', 'pets_2',
        'executive_1', 'minimal_1', 'creative_1'
    ];
    if (validTemplates.includes(clean)) return clean;
    if (clean === 'executive' || clean === 't_1') return 'executive_1';
    if (clean === 'minimal' || clean === 'modern') return 'minimal_1';
    if (clean === 'creative' || clean === 'creator' || clean === 'personal_3') return 'creative_1';
    if (clean === 'google_reviews' || clean === 'review' || clean === 'reviews' || clean === 'reviews_3' || clean === 't_2') return 'reviews_1';
    if (clean === 't_3' || clean === 'personal') return 'personal_1';
    if (clean === 'emerald' || clean === 'luxury' || clean === 't_4') return 'business_3';
    if (clean === 'children_3' || clean === 'children' || clean === 'child' || clean === 'kids') return 'children_1';
    if (clean === 'pets' || clean === 'pet' || clean === 'rescue') return 'pets_1';
    return 'personal_1';
}

// Render Profile Data
function renderProfile(data) {
    // 1. Hide Loading
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.add('hidden');
    const profileContainer = document.getElementById('profile-container');
    profileContainer.classList.remove('hidden');

    // 2. Set Template Identifier Attribute & Apply Theme Color Engine
    const templateId = mapTemplateId(data.templateId);
    profileContainer.setAttribute('data-template', templateId);
    applyThemePalette(data);

    // Inject Hero Card for Special Templates (Emergency Kids, Pet Rescue, Google Reviews)
    renderTemplateHeroCard(data, templateId);

    // 3. Cover Image
    if (data.coverUri && data.coverUri.trim() !== '') {
        const coverImg = document.getElementById('cover-image');
        coverImg.src = data.coverUri;
        coverImg.onload = () => coverImg.classList.remove('hidden');
    }

    // 4. Profile Photo & Initials Fallback
    const photoImg = document.getElementById('profile-photo');
    const placeholder = document.getElementById('avatar-placeholder');
    const nameStr = data.name || data.title || 'SHOT User';

    if (data.photoUri && data.photoUri.trim() !== '') {
        photoImg.src = data.photoUri;
        photoImg.onload = () => {
            photoImg.classList.remove('hidden');
            placeholder.classList.add('hidden');
        };
        photoImg.onerror = () => {
            showAvatarInitials(nameStr);
        };
    } else {
        showAvatarInitials(nameStr);
    }

    // 5. Name & Tagline
    document.getElementById('profile-name').textContent = nameStr;
    
    if (data.tagline && data.tagline.trim() !== '') {
        const taglineEl = document.getElementById('profile-tagline');
        taglineEl.textContent = data.tagline;
        taglineEl.classList.remove('hidden');
    }

    // 6. Role & Company
    const roleEl = document.getElementById('profile-role');
    const companyEl = document.getElementById('profile-company');
    const sepEl = document.getElementById('profile-company-separator');
    const roleCompanyContainer = document.getElementById('profile-role-company');

    let hasRole = false;
    let hasCompany = false;

    if (data.role && data.role.trim() !== '') {
        roleEl.textContent = data.role;
        roleEl.classList.remove('hidden');
        hasRole = true;
    }

    if (data.company && data.company.trim() !== '') {
        companyEl.textContent = data.company;
        companyEl.classList.remove('hidden');
        hasCompany = true;
    }

    if (hasRole && hasCompany) {
        sepEl.classList.remove('hidden');
    }

    if (hasRole || hasCompany) {
        roleCompanyContainer.classList.remove('hidden');
    }

    // 7. Contact Section (respect showContact)
    const showContact = data.showContact !== false;
    if (showContact) {
        renderContactGrid(data);
    }

    // 8. Custom Links Section (respect showLinks)
    const showLinks = data.showLinks !== false;
    if (showLinks) {
        renderCustomLinks(data);
    }

    // 9. Gallery Section (respect showGallery)
    const showGallery = data.showGallery !== false;
    if (showGallery) {
        renderGallery(data);
    }

    // 10. Save vCard Button
    const saveVCardBtn = document.getElementById('save-vcard-btn');
    if (hasContactDetails(data)) {
        saveVCardBtn.classList.remove('hidden');
        saveVCardBtn.onclick = () => generateVCard(data);
    }
}

// Render Template Special Hero Cards
function renderTemplateHeroCard(data, templateId) {
    let existingHero = document.getElementById('template-hero-card');
    if (existingHero) existingHero.remove();

    const profileBody = document.querySelector('.profile-body');
    if (!profileBody) return;

    if (templateId === 'children_1' || templateId === 'children_2') {
        const hero = document.createElement('div');
        hero.id = 'template-hero-card';
        hero.className = `template-hero-card ${templateId === 'children_1' ? 'emergency-kids' : 'adventurer-kids'}`;
        const phone = data.phone ? normalizePhone(data.phone) : '';
        hero.innerHTML = `
            <div class="hero-title">${templateId === 'children_1' ? '🚨 KIDS SAFETY ID' : '🎒 JUNIOR ADVENTURER ID'}</div>
            <div class="hero-subtitle">${templateId === 'children_1' ? 'If found separated from guardian, please call immediately!' : 'Emergency ICE Contact & School Safety Badge'}</div>
            ${phone ? `<a href="tel:${phone}" class="hero-btn hero-btn-green">📞 CALL PARENT / GUARDIAN NOW</a>` : ''}
        `;
        profileBody.insertBefore(hero, profileBody.firstChild);
    } else if (templateId === 'pets_1' || templateId === 'pets_2') {
        const hero = document.createElement('div');
        hero.id = 'template-hero-card';
        hero.className = `template-hero-card ${templateId === 'pets_1' ? 'rescue-pets' : 'companion-pets'}`;
        const phone = data.phone ? normalizePhone(data.phone) : '';
        hero.innerHTML = `
            <div class="hero-title">${templateId === 'pets_1' ? '🐾 PET RESCUE TAG' : '🐾 PET PROFILE & VET CARD'}</div>
            <div class="hero-subtitle">${templateId === 'pets_1' ? 'If lost, please contact owner immediately!' : 'Medical ID & Emergency Contact Info'}</div>
            ${phone ? `<a href="tel:${phone}" class="hero-btn hero-btn-green">📞 CALL OWNER / VET IMMEDIATELY</a>` : ''}
        `;
        profileBody.insertBefore(hero, profileBody.firstChild);
    } else if (templateId.startsWith('reviews_')) {
        const hero = document.createElement('div');
        hero.id = 'template-hero-card';
        hero.className = 'template-hero-card review-5star';
        const reviewUrl = normalizeUrl(data.website || 'https://maps.google.com');
        hero.innerHTML = `
            <div class="hero-stars">⭐⭐⭐⭐⭐</div>
            <div class="hero-title">${templateId === 'reviews_2' ? 'Local Business Reviews' : 'Rate Us On Google'}</div>
            <div class="hero-subtitle">${templateId === 'reviews_2' ? 'Verified customer satisfaction & direct Google Maps reviews' : 'Tap below to leave us a 5-star review!'}</div>
            <a href="${reviewUrl}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-white">⭐ WRITE A 5-STAR REVIEW</a>
        `;
        profileBody.insertBefore(hero, profileBody.firstChild);
    }
}

// Show avatar initials
function showAvatarInitials(name) {
    document.getElementById('profile-photo').classList.add('hidden');
    const placeholder = document.getElementById('avatar-placeholder');
    const initialsEl = document.getElementById('avatar-initials');
    
    const parts = name.trim().split(' ').filter(p => p.length > 0);
    let initials = '';
    if (parts.length >= 2) {
        initials = parts[0][0] + parts[1][0];
    } else if (parts.length === 1) {
        initials = parts[0][0];
    } else {
        initials = 'S';
    }
    
    initialsEl.textContent = initials.toUpperCase();
    placeholder.classList.remove('hidden');
}

// Check if profile has enough contact details for vCard
function hasContactDetails(data) {
    return !!(data.name || data.phone || data.whatsapp || data.email || data.company || data.address || data.website);
}

// Render Contact Cards Grid
function renderContactGrid(data) {
    const contactGrid = document.getElementById('contact-grid');
    contactGrid.innerHTML = '';
    let count = 0;

    // Phone
    if (data.phone && data.phone.trim() !== '') {
        const cleanPhone = normalizePhone(data.phone);
        contactGrid.appendChild(createContactCard('الهاتف', data.phone, `tel:${cleanPhone}`, SVG_ICONS.phone));
        count++;
    }

    // WhatsApp
    if (data.whatsapp && data.whatsapp.trim() !== '') {
        const cleanWa = normalizePhone(data.whatsapp);
        contactGrid.appendChild(createContactCard('واتساب', data.whatsapp, `https://wa.me/${cleanWa}`, SVG_ICONS.whatsapp));
        count++;
    }

    // Email
    if (data.email && data.email.trim() !== '') {
        contactGrid.appendChild(createContactCard('البريد الإلكتروني', data.email, `mailto:${data.email.trim()}`, SVG_ICONS.email));
        count++;
    }

    // Website
    if (data.website && data.website.trim() !== '') {
        const normUrl = normalizeUrl(data.website);
        contactGrid.appendChild(createContactCard('الموقع الإلكتروني', data.website, normUrl, SVG_ICONS.website));
        count++;
    }

    // Address
    if (data.address && data.address.trim() !== '') {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`;
        contactGrid.appendChild(createContactCard('العنوان', data.address, mapsUrl, SVG_ICONS.location));
        count++;
    }

    if (count > 0) {
        document.getElementById('contact-section').classList.remove('hidden');
    }
}

// Create single contact card
function createContactCard(label, value, href, iconSvg) {
    const a = document.createElement('a');
    a.className = 'contact-card';
    a.href = href;
    a.target = href.startsWith('http') ? '_blank' : '_self';
    a.rel = 'noopener noreferrer';

    a.innerHTML = `
        <div class="contact-icon-wrapper">${iconSvg}</div>
        <div class="contact-details">
            <span class="contact-label">${label}</span>
            <span class="contact-value">${escapeHtml(value)}</span>
        </div>
    `;
    return a;
}

// Render Custom Links
function renderCustomLinks(data) {
    const linksListContainer = document.getElementById('links-list');
    linksListContainer.innerHTML = '';

    let links = [];

    if (Array.isArray(data.customLinks) && data.customLinks.length > 0) {
        links = data.customLinks;
    } else if (data.customLinksJson && typeof data.customLinksJson === 'string') {
        try {
            const parsed = JSON.parse(data.customLinksJson);
            if (Array.isArray(parsed)) links = parsed;
        } catch (e) {
            console.warn('Could not parse customLinksJson:', e);
        }
    }

    let validCount = 0;

    links.forEach((link) => {
        const title = link.title || link.label || link.name || 'رابط';
        const rawUrl = link.url || link.href;

        if (rawUrl && rawUrl.trim() !== '') {
            const normUrl = normalizeUrl(rawUrl);
            const a = document.createElement('a');
            a.className = 'link-button';
            a.href = normUrl;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';

            a.innerHTML = `
                <div class="link-left">
                    <span class="link-icon">${SVG_ICONS.link}</span>
                    <span>${escapeHtml(title)}</span>
                </div>
                <span class="chevron-icon">${SVG_ICONS.chevronLeft}</span>
            `;

            linksListContainer.appendChild(a);
            validCount++;
        }
    });

    if (validCount > 0) {
        document.getElementById('links-section').classList.remove('hidden');
    }
}

// Render Gallery Grid
function renderGallery(data) {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';

    let items = [];

    if (Array.isArray(data.gallery) && data.gallery.length > 0) {
        items = data.gallery;
    } else if (data.galleryJson && typeof data.galleryJson === 'string') {
        try {
            const parsed = JSON.parse(data.galleryJson);
            if (Array.isArray(parsed)) items = parsed;
        } catch (e) {
            console.warn('Could not parse galleryJson:', e);
        }
    }

    let validCount = 0;

    items.forEach((item) => {
        let imgUrl = '';
        let caption = '';

        if (typeof item === 'string') {
            imgUrl = item;
        } else if (item && typeof item === 'object') {
            imgUrl = item.imageUrl || item.url || item.src || '';
            caption = item.caption || item.title || '';
        }

        if (imgUrl && imgUrl.trim() !== '') {
            const div = document.createElement('div');
            div.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = caption || 'Gallery Image';
            img.loading = 'lazy';

            div.onclick = () => openLightbox(imgUrl, caption);
            div.appendChild(img);
            galleryGrid.appendChild(div);
            validCount++;
        }
    });

    if (validCount > 0) {
        document.getElementById('gallery-section').classList.remove('hidden');
    }
}

// Setup Lightbox Modal
function setupLightboxEvents() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');

    closeBtn.onclick = () => lightbox.classList.add('hidden');
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
        }
    };
}

function openLightbox(url, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = url;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.remove('hidden');
}

// Setup Share Event
function setupShareEvent() {
    const shareBtn = document.getElementById('share-btn');
    shareBtn.onclick = () => {
        const shareUrl = window.location.href;
        const profileName = document.getElementById('profile-name').textContent;

        if (navigator.share) {
            navigator.share({
                title: profileName,
                text: `بروفايل ${profileName} على SHOT`,
                url: shareUrl
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                showToast('تم نسخ رابط البروفايل إلى الحافظة');
            }).catch(() => {
                showToast('تعذر نسخ الرابط');
            });
        }
    };
}

// Dynamic vCard Download
function generateVCard(profile) {
    let vCard = "BEGIN:VCARD\nVERSION:3.0\n";
    const name = profile.name || profile.title || "SHOT Contact";
    vCard += `FN:${name}\nN:${name};;;;\n`;

    if (profile.company) vCard += `ORG:${profile.company}\n`;
    if (profile.role) vCard += `TITLE:${profile.role}\n`;
    if (profile.phone) vCard += `TEL;TYPE=CELL:${normalizePhone(profile.phone)}\n`;
    if (profile.whatsapp && profile.whatsapp !== profile.phone) {
        vCard += `TEL;TYPE=WORK,VOICE:${normalizePhone(profile.whatsapp)}\n`;
    }
    if (profile.email) vCard += `EMAIL;TYPE=INTERNET:${profile.email.trim()}\n`;
    if (profile.website) vCard += `URL:${normalizeUrl(profile.website)}\n`;
    if (profile.address) vCard += `ADR;TYPE=WORK:;;${profile.address.trim()};;;;\n`;

    vCard += "END:VCARD";

    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('تمت إضافة جهة الاتصال');
}

// Utility Helpers
function normalizeUrl(url) {
    if (!url) return '';
    let trimmed = url.trim();
    if (trimmed.toLowerCase().startsWith('javascript:')) return '#';
    if (!/^https?:\/\//i.test(trimmed)) {
        return 'https://' + trimmed;
    }
    return trimmed;
}

function normalizePhone(phone) {
    if (!phone) return '';
    return phone.replace(/[^\d+]/g, '');
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
