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

// Display Error State
function showError(title, message) {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('profile-container').classList.add('hidden');
    
    document.getElementById('error-title').textContent = title;
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-state').classList.remove('hidden');
}

// Render Profile Data
function renderProfile(data) {
    // 1. Hide Loading
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.add('hidden');
    const profileContainer = document.getElementById('profile-container');
    profileContainer.classList.remove('hidden');

    // 2. Apply Theme Color
    if (data.themeColorHex && /^#([0-9A-F]{3}){1,2}$/i.test(data.themeColorHex)) {
        document.documentElement.style.setProperty('--primary-color', data.themeColorHex);
    }

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