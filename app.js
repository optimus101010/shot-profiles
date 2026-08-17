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

function calculateLuminance(r, g, b) {
    const channelLuminance = (c) => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

function getContrastingTextColor(r, g, b) {
    const lum = calculateLuminance(r, g, b);
    return lum > 0.45 ? '#0F172A' : '#FFFFFF';
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

    const onPrimary = getContrastingTextColor(r, g, b);

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

// Defined 15 Modern Professional Templates across 3 Categories
const DEFINED_TEMPLATES = [
    'corporate_executive', 'corporate_bento', 'corporate_minimal', 'corporate_luxe', 'corporate_badge',
    'creator_spotlight', 'creator_masonry', 'creator_terminal', 'creator_magazine', 'creator_neumorphic',
    'reviews_1', 'reviews_showcase', 'reviews_clinic_trust', 'reviews_coupon_reward', 'reviews_social_dining'
];

function mapTemplateId(rawId) {
    if (!rawId || typeof rawId !== 'string') return 'corporate_executive';
    const clean = rawId.trim().toLowerCase();
    
    const legacyAliases = {
        'business_1': 'corporate_executive',
        'executive_1': 'corporate_executive',
        'executive': 'corporate_executive',
        't_1': 'corporate_executive',
        'corporate_executive': 'corporate_executive',
        
        'business_2': 'corporate_bento',
        'corporate_bento': 'corporate_bento',
        
        'minimal_1': 'corporate_minimal',
        'minimal': 'corporate_minimal',
        'modern': 'corporate_minimal',
        'personal_2': 'corporate_minimal',
        'corporate_minimal': 'corporate_minimal',
        
        'business_3': 'corporate_luxe',
        'emerald': 'corporate_luxe',
        'luxury': 'corporate_luxe',
        't_4': 'corporate_luxe',
        'corporate_luxe': 'corporate_luxe',
        
        'corporate_badge': 'corporate_badge',
        'children_1': 'corporate_badge',
        'children_2': 'corporate_badge',
        'children_3': 'corporate_badge',
        'children_4': 'corporate_badge',
        'pets_1': 'corporate_badge',
        'pets_2': 'corporate_badge',
        
        'personal_1': 'creator_spotlight',
        'personal': 'creator_spotlight',
        't_3': 'creator_spotlight',
        'creator_spotlight': 'creator_spotlight',
        
        'creative_1': 'creator_masonry',
        'creative': 'creator_masonry',
        'creator': 'creator_masonry',
        'personal_3': 'creator_masonry',
        'creator_masonry': 'creator_masonry',
        
        'creator_terminal': 'creator_terminal',
        'creator_magazine': 'creator_magazine',
        'creator_neumorphic': 'creator_neumorphic',
        
        'reviews_1': 'reviews_1',
        'review_1': 'reviews_1',
        'google_1': 'reviews_1',
        '5star': 'reviews_1',
        
        'reviews_showcase': 'reviews_showcase',
        'reviews_2': 'reviews_showcase',
        'reviews_3': 'reviews_showcase',
        'cafe': 'reviews_showcase',
        'menu': 'reviews_showcase',
        
        'reviews_clinic_trust': 'reviews_clinic_trust',
        'reviews_4': 'reviews_clinic_trust',
        'clinic': 'reviews_clinic_trust',
        'medical': 'reviews_clinic_trust',
        'doctor': 'reviews_clinic_trust',
        
        'reviews_coupon_reward': 'reviews_coupon_reward',
        'coupon': 'reviews_coupon_reward',
        'ticket': 'reviews_coupon_reward',
        'voucher': 'reviews_coupon_reward',
        'discount': 'reviews_coupon_reward',
        
        'reviews_social_dining': 'reviews_social_dining',
        'dining': 'reviews_social_dining',
        'delivery': 'reviews_social_dining',
        'delivery_hub': 'reviews_social_dining',
        'food': 'reviews_social_dining'
    };

    if (legacyAliases[clean]) return legacyAliases[clean];
    if (DEFINED_TEMPLATES.includes(clean)) return clean;
    return 'corporate_executive';
}

function toggleTemplate(template) {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) return null;

    let targetTemplate;

    if (typeof template === 'string' && template.trim() !== '') {
        targetTemplate = mapTemplateId(template);
    } else {
        const currentTemplate = profileContainer.getAttribute('data-template') || 'personal_1';
        const currentIndex = DEFINED_TEMPLATES.indexOf(currentTemplate);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % DEFINED_TEMPLATES.length : 0;
        targetTemplate = DEFINED_TEMPLATES[nextIndex];
    }

    profileContainer.setAttribute('data-template', targetTemplate);

    if (window.currentProfileData) {
        const langCode = (window.currentProfileData.profileLanguage || window.currentProfileData.language || 'ar').toLowerCase();
        const isRtl = langCode.startsWith('ar');
        renderTemplateHeroCard(window.currentProfileData, targetTemplate, isRtl);
    }

    return targetTemplate;
}

if (typeof window !== 'undefined') {
    window.toggleTemplate = toggleTemplate;
    window.switchTemplate = toggleTemplate;
    window.setTemplate = toggleTemplate;
    window.toggleTemplateAttribute = toggleTemplate;
    window.DEFINED_TEMPLATES = DEFINED_TEMPLATES;
}

// Render Profile Data
function renderProfile(data) {
    window.currentProfileData = data;

    // 1. Language & LTR/RTL Enforcement
    const langCode = (data.profileLanguage || data.language || 'ar').toLowerCase();
    const isRtl = langCode.startsWith('ar');
    const dirStr = isRtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dirStr);

    // 2. Hide Loading
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.add('hidden');
    const profileContainer = document.getElementById('profile-container');
    profileContainer.classList.remove('hidden');
    profileContainer.setAttribute('dir', dirStr);

    // Update Section Headers according to language
    const contactSectionHeader = document.querySelector('#contact-section .section-title');
    if (contactSectionHeader) {
        contactSectionHeader.textContent = isRtl ? 'معلومات الاتصال' : 'Contact Information';
    }
    const linksSectionHeader = document.querySelector('#links-section .section-title');
    if (linksSectionHeader) {
        linksSectionHeader.textContent = isRtl ? 'الروابط الهامة' : 'Featured Links';
    }
    const gallerySectionHeader = document.querySelector('#gallery-section .section-title');
    if (gallerySectionHeader) {
        gallerySectionHeader.textContent = isRtl ? 'معرض الصور' : 'Photo Gallery';
    }

    // 3. Set Template Identifier Attribute & Apply Theme Color Engine
    const templateId = mapTemplateId(data.templateId);
    profileContainer.setAttribute('data-template', templateId);
    applyThemePalette(data);

    // Inject Hero Card for Special Templates
    renderTemplateHeroCard(data, templateId, isRtl);

    // 4. Cover Image
    const coverImg = document.getElementById('cover-image');
    const coverUri = data.coverUri || data.coverUrl || data.cover;
    if (coverUri && coverUri.trim() !== '') {
        coverImg.src = coverUri;
        coverImg.onload = () => coverImg.classList.remove('hidden');
        coverImg.onerror = () => coverImg.classList.add('hidden');
    } else {
        coverImg.classList.add('hidden');
    }

    // 5. Profile Photo & Initials Fallback
    const photoImg = document.getElementById('profile-photo');
    const placeholder = document.getElementById('avatar-placeholder');
    const nameStr = data.name || data.title || 'Lello ID Profile';
    const photoUri = data.photoUri || data.avatarUrl || data.photo;

    if (photoUri && photoUri.trim() !== '') {
        photoImg.src = photoUri;
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

    // 6. Name & Tagline
    document.getElementById('profile-name').textContent = nameStr;
    
    const taglineEl = document.getElementById('profile-tagline');
    const taglineStr = data.tagline || data.bio || '';
    if (taglineStr && taglineStr.trim() !== '') {
        taglineEl.textContent = taglineStr;
        taglineEl.classList.remove('hidden');
    } else {
        taglineEl.classList.add('hidden');
    }

    // 7. Role & Company
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
    } else {
        roleEl.classList.add('hidden');
    }

    if (data.company && data.company.trim() !== '') {
        companyEl.textContent = data.company;
        companyEl.classList.remove('hidden');
        hasCompany = true;
    } else {
        companyEl.classList.add('hidden');
    }

    if (hasRole && hasCompany) {
        sepEl.classList.remove('hidden');
    } else {
        sepEl.classList.add('hidden');
    }

    if (hasRole || hasCompany) {
        roleCompanyContainer.classList.remove('hidden');
    } else {
        roleCompanyContainer.classList.add('hidden');
    }

    // 8. Contact Section (respect showContact)
    const showContact = data.showContact !== false;
    if (showContact) {
        renderContactGrid(data, isRtl);
    } else {
        document.getElementById('contact-section').classList.add('hidden');
    }

    // 9. Custom Links Section (respect showLinks)
    const showLinks = data.showLinks !== false;
    if (showLinks) {
        renderCustomLinks(data);
    } else {
        document.getElementById('links-section').classList.add('hidden');
    }

    // 10. Gallery Section (respect showGallery)
    const showGallery = data.showGallery !== false;
    if (showGallery) {
        renderGallery(data);
    } else {
        document.getElementById('gallery-section').classList.add('hidden');
    }

    // 11. Save vCard Button
    const saveVCardBtn = document.getElementById('save-vcard-btn');
    if (hasContactDetails(data)) {
        saveVCardBtn.classList.remove('hidden');
        saveVCardBtn.textContent = isRtl ? 'حفظ جهة الاتصال' : 'Save vCard';
        saveVCardBtn.onclick = () => generateVCard(data);
    } else {
        saveVCardBtn.classList.add('hidden');
    }
}

// Render Template Special Hero Cards
function renderTemplateHeroCard(data, templateId, isRtl = true) {
    let existingHero = document.getElementById('template-hero-card');
    if (existingHero) existingHero.remove();

    const profileBody = document.querySelector('.profile-body');
    if (!profileBody) return;

    if (templateId === 'children_1' || templateId === 'children_2' || templateId === 'children_3' || templateId === 'children_4') {
        const hero = document.createElement('div');
        hero.id = 'template-hero-card';
        hero.className = `template-hero-card ${
            templateId === 'children_1' ? 'emergency-kids' :
            templateId === 'children_2' ? 'adventurer-kids' :
            templateId === 'children_3' ? 'sentinel-kids' : 'campus-kids'
        }`;
        const phone = data.phone ? normalizePhone(data.phone) : '';

        let titleText = '';
        let subtitleText = '';
        let btnText = isRtl ? '📞 الاتصال بولي الأمر / الحارس الآن' : '📞 CALL PARENT / GUARDIAN NOW';

        if (templateId === 'children_1') {
            titleText = isRtl ? '🚨 هُوية طوارئ الطفل' : '🚨 KIDS SAFETY ID';
            subtitleText = isRtl ? 'إذا تم العثور على الطفل منفصلاً عن ولي أمره، يرجى الاتصال فوراً!' : 'If found separated from guardian, please call immediately!';
        } else if (templateId === 'children_2') {
            titleText = isRtl ? '🎒 المغامر الصغير' : '🎒 JUNIOR ADVENTURER ID';
            subtitleText = isRtl ? 'بطاقة اتصال الطوارئ وسلامة المدرّسة' : 'Emergency ICE Contact & School Safety Badge';
        } else if (templateId === 'children_3') {
            titleText = isRtl ? '🚨 هوية طوارئ طبية عاجلة للطفل (ICE)' : '🚨 URGENT ICE CHILD MEDICAL ID';
            subtitleText = isRtl ? 'حالة طارئة: إذا كان الطفل تائهاً أو يحتاج مساعدة، يرجى الاتصال بولي الأمر فوراً.' : 'CRITICAL: If child is lost or in distress, please call guardian immediately.';
            btnText = isRtl ? '📞 الاتصال بولي الأمر فوراً للطوارئ' : '📞 CALL GUARDIAN EMERGENCY NOW';
        } else if (templateId === 'children_4') {
            titleText = isRtl ? '🎓 بطاقة الحرم المدرسي الذكية' : '🎓 STUDENT CAMPUS SMART PASS';
            subtitleText = isRtl ? 'بطاقة هوية معتمدة للطالب والتوصيل المدرسي والتواصل مع الأهل.' : 'Authorized student identity pass & emergency guardian pickup ID.';
            btnText = isRtl ? '📞 الاتصال بولي الأمر' : '📞 CALL PARENT / GUARDIAN';
        }

        hero.innerHTML = `
            <div class="hero-title">${titleText}</div>
            <div class="hero-subtitle">${subtitleText}</div>
            ${phone ? `<a href="tel:${phone}" class="hero-btn hero-btn-green">${btnText}</a>` : ''}
        `;
        profileBody.insertBefore(hero, profileBody.firstChild);
    } else if (templateId === 'pets_1' || templateId === 'pets_2') {
        const hero = document.createElement('div');
        hero.id = 'template-hero-card';
        hero.className = `template-hero-card ${templateId === 'pets_1' ? 'rescue-pets' : 'companion-pets'}`;
        const phone = data.phone ? normalizePhone(data.phone) : '';
        const titleText = templateId === 'pets_1' ? (isRtl ? '🐾 تاغ إنقاذ الأليف' : '🐾 PET RESCUE TAG') : (isRtl ? '🐾 بروفايل الأليف وبطاقة البيطري' : '🐾 PET PROFILE & VET CARD');
        const subtitleText = templateId === 'pets_1' ? (isRtl ? 'إذا ضاع الأليف، يرجى الاتصال بالمالك فوراً!' : 'If lost, please contact owner immediately!') : (isRtl ? 'معلومات الهوية الطبية ومعلومات الاتصال بالطارئ' : 'Medical ID & Emergency Contact Info');
        const btnText = isRtl ? '📞 الاتصال بالمالك / الطبيب فوراً' : '📞 CALL OWNER / VET IMMEDIATELY';

        hero.innerHTML = `
            <div class="hero-title">${titleText}</div>
            <div class="hero-subtitle">${subtitleText}</div>
            ${phone ? `<a href="tel:${phone}" class="hero-btn hero-btn-green">${btnText}</a>` : ''}
        `;
        profileBody.insertBefore(hero, profileBody.firstChild);
    } else if (templateId.startsWith('reviews_')) {
        const hero = document.createElement('div');
        hero.id = 'template-hero-card';
        const reviewUrl = normalizeUrl(data.website || 'https://maps.google.com');

        if (templateId === 'reviews_1') {
            hero.className = 'template-hero-card review-5star-master';
            const titleText = isRtl ? 'قيّمنا بـ 5 نجوم على جوجل' : 'TAP TO RATE 5 STARS ON GOOGLE';
            const subtitleText = isRtl ? 'رأيك يسعدنا ويدعم متجرنا خلال ثوانٍ معدودة!' : 'Takes only 5 seconds to support our local storefront!';
            const btnText = isRtl ? '⭐ كتابة تقييم 5 نجوم على خرائط جوجل' : '⭐ RATE US 5 STARS ON GOOGLE';
            
            hero.innerHTML = `
                <div class="hero-stars-gold">★★★★★</div>
                <div class="hero-badge-tag">★ 4.9 ${isRtl ? 'تقييم ممتاز موثق على جوجل' : 'Google Verified Business'}</div>
                <div class="hero-title">${titleText}</div>
                <div class="hero-subtitle">${subtitleText}</div>
                <a href="${reviewUrl}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-gold" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('GOOGLE_REVIEW_CLICK', 'google_5star_cta');">${btnText}</a>
            `;
        } else if (templateId === 'reviews_showcase') {
            hero.className = 'template-hero-card review-showcase-bento';
            const menuUrl = normalizeUrl(data.website || 'https://artisancafe.com/menu');
            const mapsUrl = data.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}` : 'https://maps.google.com';
            
            hero.innerHTML = `
                <div class="open-status-pill">
                    <span class="live-pulse-dot"></span>
                    <span>${isRtl ? 'مفتوح الآن • حتى 12:00 منتصف الليل' : 'Open Now • Until 12:00 AM'}</span>
                </div>
                <div class="bento-hero-grid">
                    <a href="${menuUrl}" target="_blank" rel="noopener noreferrer" class="bento-hero-card bento-menu" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('MENU_CLICK', 'bento_menu');">
                        <span class="bento-icon">☕</span>
                        <div class="bento-title">${isRtl ? 'قائمة المنيو' : 'Digital Menu'}</div>
                        <div class="bento-sub">${isRtl ? 'تصفح الأصناف' : 'Browse items'}</div>
                    </a>
                    <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="bento-hero-card bento-maps" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('MAPS_CLICK', 'bento_directions');">
                        <span class="bento-icon">📍</span>
                        <div class="bento-title">${isRtl ? 'موقع الفرع' : 'Directions'}</div>
                        <div class="bento-sub">${isRtl ? 'خرائط جوجل' : 'Google Maps'}</div>
                    </a>
                    <div class="bento-hero-card bento-wifi" onclick="alert('${isRtl ? 'شبكة الواي فاي: Guest-WiFi | الرقم السري: welcome2026' : 'Wi-Fi: Guest-WiFi | Password: welcome2026'}');">
                        <span class="bento-icon">📶</span>
                        <div class="bento-title">${isRtl ? 'واي فاي مجاني' : 'Guest Wi-Fi'}</div>
                        <div class="bento-sub">${isRtl ? 'انقر للتفاصيل' : 'Tap for details'}</div>
                    </div>
                    <a href="${reviewUrl}" target="_blank" rel="noopener noreferrer" class="bento-hero-card bento-rating" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('GOOGLE_REVIEW_CLICK', 'bento_review');">
                        <span class="bento-icon">⭐</span>
                        <div class="bento-title">${isRtl ? 'تقييم جوجل' : 'Google Review'}</div>
                        <div class="bento-sub">${isRtl ? '★ 5.0 ممتاز' : '★ 5.0 Excellent'}</div>
                    </a>
                </div>
            `;
        } else if (templateId === 'reviews_clinic_trust') {
            hero.className = 'template-hero-card review-clinic-trust';
            const bookingUrl = data.whatsapp ? `https://wa.me/${normalizePhone(data.whatsapp)}` : reviewUrl;
            const phone = data.phone ? normalizePhone(data.phone) : '';

            hero.innerHTML = `
                <div class="clinic-trust-badge">
                    <span>🛡️</span>
                    <span>${isRtl ? 'مركز طبي معتمد وموثق' : 'Verified & Accredited Healthcare Provider'}</span>
                </div>
                <div class="hero-title">${isRtl ? 'خدمات طبية ورعاية متخصصة' : 'Accredited Clinical Care & Appointments'}</div>
                <div class="hero-subtitle">${isRtl ? 'صحتكم ورعايتكم أولويتنا. احجز موعد كشف واستشارة مباشرة.' : 'Your health and wellness are our top priority. Book an appointment online.'}</div>
                <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-clinic" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('APPOINTMENT_BOOK_CLICK', 'clinic_booking');">📅 ${isRtl ? 'احجز موعد كشف واستشارة' : 'Book Appointment Online'}</a>
                ${phone ? `
                    <a href="tel:${phone}" class="clinic-hotline-btn" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('EMERGENCY_CALL_CLICK', 'clinic_hotline');">
                        <span>🚨 ${isRtl ? 'طوارئ العيادة (24/7):' : '24/7 Hotline:'} <strong>${data.phone}</strong></span>
                        <span class="hotline-pill">${isRtl ? 'اتصال فوري' : 'Call Now'}</span>
                    </a>
                ` : ''}
            `;
        } else if (templateId === 'reviews_coupon_reward') {
            hero.className = 'template-hero-card review-coupon-ticket';
            hero.innerHTML = `
                <div class="coupon-ticket-header">
                    <div class="coupon-tag">🎉 ${isRtl ? 'قسيمة خصم خاص' : 'SPECIAL REWARD'}</div>
                    <div class="coupon-title">${isRtl ? 'خصم 15% على فاتورتك' : '15% OFF YOUR BILL'}</div>
                </div>
                <div class="coupon-perforation">
                    <span class="scissor-icon">✂️</span>
                    <span class="perforation-line"></span>
                    <span class="perforation-text">${isRtl ? 'اقطع القسيمة بالتقييم' : 'CLIP & REDEEM'}</span>
                    <span class="perforation-line"></span>
                </div>
                <div class="coupon-ticket-body">
                    <div class="coupon-instructions">${isRtl ? 'قيّمنا بـ 5 نجوم على جوجل لفتح كود الخصم فوراً!' : 'Rate us 5 stars on Google to unlock and reveal your discount code!'}</div>
                    <a href="${reviewUrl}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-gold" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('COUPON_UNLOCK_CLICK', 'coupon_review'); document.getElementById('revealed-code-box').classList.remove('hidden');">⭐ ${isRtl ? 'اضغط للتقييم وفتح الخصم' : 'Rate on Google & Unlock Code'}</a>
                    <div id="revealed-code-box" class="revealed-code-box">
                        <span>${isRtl ? 'كود الخصم:' : 'PROMO CODE:'} <strong class="promo-code">LELLO15</strong></span>
                        <span class="code-validity">${isRtl ? 'صالح اليوم' : 'Valid Today'}</span>
                    </div>
                </div>
            `;
        } else if (templateId === 'reviews_social_dining') {
            hero.className = 'template-hero-card review-social-dining';
            hero.innerHTML = `
                <div class="delivery-hub-header">
                    <span class="hub-icon">🛵</span>
                    <span class="hub-title">${isRtl ? 'اطلب عبر تطبيقات التوصيل المعتمدة' : 'Order via Preferred Delivery Apps'}</span>
                </div>
                <div class="delivery-apps-grid">
                    <a href="https://jahez.net" target="_blank" rel="noopener noreferrer" class="delivery-app-card" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('DELIVERY_APP_CLICK', 'Jahez');">
                        <span class="delivery-icon">🛵</span>
                        <span class="delivery-name">${isRtl ? 'جاهز (Jahez)' : 'Jahez'}</span>
                        <span class="delivery-cta">${isRtl ? 'اطلب الآن' : 'Order'}</span>
                    </a>
                    <a href="https://hungerstation.com" target="_blank" rel="noopener noreferrer" class="delivery-app-card" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('DELIVERY_APP_CLICK', 'HungerStation');">
                        <span class="delivery-icon">🍔</span>
                        <span class="delivery-name">${isRtl ? 'هنقرستيشن' : 'HungerStation'}</span>
                        <span class="delivery-cta">${isRtl ? 'اطلب الآن' : 'Order'}</span>
                    </a>
                    <a href="https://ubereats.com" target="_blank" rel="noopener noreferrer" class="delivery-app-card" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('DELIVERY_APP_CLICK', 'UberEats');">
                        <span class="delivery-icon">⚡</span>
                        <span class="delivery-name">${isRtl ? 'أوبر إيتس' : 'Uber Eats'}</span>
                        <span class="delivery-cta">${isRtl ? 'اطلب الآن' : 'Order'}</span>
                    </a>
                    <a href="https://deliveroo.com" target="_blank" rel="noopener noreferrer" class="delivery-app-card" onclick="if(window.trackAnalyticsEvent) window.trackAnalyticsEvent('DELIVERY_APP_CLICK', 'Deliveroo');">
                        <span class="delivery-icon">🚴</span>
                        <span class="delivery-name">${isRtl ? 'دليفرو' : 'Deliveroo'}</span>
                        <span class="delivery-cta">${isRtl ? 'اطلب الآن' : 'Order'}</span>
                    </a>
                </div>
            `;
        }
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
function renderContactGrid(data, isRtl = true) {
    const contactGrid = document.getElementById('contact-grid');
    contactGrid.innerHTML = '';
    let count = 0;

    // Phone
    if (data.phone && data.phone.trim() !== '') {
        const cleanPhone = normalizePhone(data.phone);
        const label = isRtl ? 'الهاتف' : 'Phone';
        contactGrid.appendChild(createContactCard(label, data.phone, `tel:${cleanPhone}`, SVG_ICONS.phone));
        count++;
    }

    // WhatsApp
    if (data.whatsapp && data.whatsapp.trim() !== '') {
        const cleanWa = normalizePhone(data.whatsapp);
        const label = isRtl ? 'واتساب' : 'WhatsApp';
        contactGrid.appendChild(createContactCard(label, data.whatsapp, `https://wa.me/${cleanWa}`, SVG_ICONS.whatsapp));
        count++;
    }

    // Email
    if (data.email && data.email.trim() !== '') {
        const label = isRtl ? 'البريد الإلكتروني' : 'Email';
        contactGrid.appendChild(createContactCard(label, data.email, `mailto:${data.email.trim()}`, SVG_ICONS.email));
        count++;
    }

    // Website
    if (data.website && data.website.trim() !== '') {
        const normUrl = normalizeUrl(data.website);
        const label = isRtl ? 'الموقع الإلكتروني' : 'Website';
        contactGrid.appendChild(createContactCard(label, data.website, normUrl, SVG_ICONS.website));
        count++;
    }

    // Address
    if (data.address && data.address.trim() !== '') {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`;
        const label = isRtl ? 'العنوان' : 'Address';
        contactGrid.appendChild(createContactCard(label, data.address, mapsUrl, SVG_ICONS.location));
        count++;
    }

    if (count > 0) {
        document.getElementById('contact-section').classList.remove('hidden');
    } else {
        document.getElementById('contact-section').classList.add('hidden');
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
        const title = link.title || link.label || link.name || 'Link';
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
    } else {
        document.getElementById('links-section').classList.add('hidden');
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
    } else {
        document.getElementById('gallery-section').classList.add('hidden');
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
                text: `SHOT Profile: ${profileName}`,
                url: shareUrl
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                showToast('Link copied to clipboard');
            }).catch(() => {
                showToast('Failed to copy link');
            });
        }
    };
}

// Dynamic vCard Download / Global vCard Exporter
function downloadGlobalVCard(profile) {
    if (!profile) profile = window.currentProfileData || {};
    let vCard = "BEGIN:VCARD\r\nVERSION:3.0\r\n";
    const name = profile.name || profile.title || "LELLO ID Contact";
    vCard += `FN:${name}\r\nN:${name};;;;\r\n`;

    if (profile.company) vCard += `ORG:${profile.company}\r\n`;
    if (profile.role) vCard += `TITLE:${profile.role}\r\n`;
    if (profile.phone) vCard += `TEL;TYPE=CELL:${normalizePhone(profile.phone)}\r\n`;
    if (profile.whatsapp && profile.whatsapp !== profile.phone) {
        vCard += `TEL;TYPE=WORK,VOICE:${normalizePhone(profile.whatsapp)}\r\n`;
    }
    if (profile.email) vCard += `EMAIL;TYPE=INTERNET:${profile.email.trim()}\r\n`;
    if (profile.website) vCard += `URL:${normalizeUrl(profile.website)}\r\n`;
    if (profile.address) vCard += `ADR;TYPE=WORK:;;${profile.address.trim()};;;;\r\n`;
    if (profile.tagline) vCard += `NOTE:${profile.tagline.replace(/\n/g, ' ')}\r\n`;

    vCard += "END:VCARD\r\n";

    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Contact Saved (vCard)');
}

function generateVCard(profile) {
    downloadGlobalVCard(profile);
}

if (typeof window !== 'undefined') {
    window.downloadGlobalVCard = downloadGlobalVCard;
    window.generateVCard = downloadGlobalVCard;
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
