// Firebase Configuration
const firebaseConfig = {
    projectId: "shot-lello3d"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// DOM Elements
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const errorMessage = document.getElementById('error-message');
const profileContainer = document.getElementById('profile-container');

// Profile Elements
const coverSection = document.getElementById('cover-section');
const coverImage = document.getElementById('cover-image');
const profilePhoto = document.getElementById('profile-photo');
const avatarPlaceholder = document.getElementById('avatar-placeholder');
const avatarInitials = document.getElementById('avatar-initials');
const profileName = document.getElementById('profile-name');
const profileTagline = document.getElementById('profile-tagline');
const profileRoleCompany = document.getElementById('profile-role-company');
const profileRole = document.getElementById('profile-role');
const profileCompany = document.getElementById('profile-company');
const profileCompanySeparator = document.getElementById('profile-company-separator');
const saveVcardBtn = document.getElementById('save-vcard-btn');
const shareBtn = document.getElementById('share-btn');

// Sections
const contactSection = document.getElementById('contact-section');
const contactGrid = document.getElementById('contact-grid');
const linksSection = document.getElementById('links-section');
const linksList = document.getElementById('links-list');
const gallerySection = document.getElementById('gallery-section');
const galleryGrid = document.getElementById('gallery-grid');

// Get Profile ID from URL (?id=...)
function getProfileId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function loadProfile() {
    const profileId = getProfileId();
    if (!profileId) {
        showError("لم يتم تحديد معرّف البروفايل المطلوب في الرابط.");
        return;
    }

    try {
        const docRef = db.collection("profiles").document ? db.collection("profiles").doc(profileId) : db.collection("profiles").doc(profileId);
        const doc = await docRef.get();

        if (!doc.exists) {
            showError("عذراً، البروفايل المطلوب غير موجود أو تم حذفه.");
            return;
        }

        const data = doc.data();
        renderProfile(data);

        // Atomic increment views count
        docRef.update({
            viewsCount: firebase.firestore.FieldValue.increment(1)
        }).catch(err => console.log("Analytics view count update ignored:", err));

    } catch (error) {
        console.error("Firestore fetch error:", error);
        showError("حدث خطأ أثناء تحميل بيانات البروفايل: " + error.message);
    }
}

function renderProfile(data) {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    profileContainer.classList.remove('hidden');

    // Apply template styling
    if (data.templateId) {
        profileContainer.setAttribute('data-template', data.templateId);
    }
    if (data.themeColorHex) {
        document.documentElement.style.setProperty('--primary-color', data.themeColorHex);
    }

    // Name & Tagline
    profileName.textContent = data.name || data.title || "Lello ID";
    if (data.tagline) {
        profileTagline.textContent = data.tagline;
        profileTagline.classList.remove('hidden');
    }

    // Role & Company
    if (data.role || data.company) {
        profileRoleCompany.classList.remove('hidden');
        if (data.role) {
            profileRole.textContent = data.role;
            profileRole.classList.remove('hidden');
        }
        if (data.company) {
            profileCompany.textContent = data.company;
            profileCompany.classList.remove('hidden');
        }
        if (data.role && data.company) {
            profileCompanySeparator.classList.remove('hidden');
        }
    }

    // Photo / Avatar
    const photo = data.avatarUrl || data.photoUrl || data.photoUri || data.avatar;
    if (photo && photo.startsWith('http')) {
        profilePhoto.src = photo;
        profilePhoto.classList.remove('hidden');
        avatarPlaceholder.classList.add('hidden');
    } else {
        const initials = (data.name || "L").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
        avatarInitials.textContent = initials;
    }

    // Cover Image
    const cover = data.coverUrl || data.coverUri || data.cover;
    if (cover && cover.startsWith('http')) {
        coverImage.src = cover;
        coverImage.classList.remove('hidden');
    }

    // Contact Section
    if (data.showContact !== false && (data.phone || data.whatsapp || data.email || data.website || data.address)) {
        contactSection.classList.remove('hidden');
        contactGrid.innerHTML = '';

        if (data.phone) addContactCard('phone', 'الهاتف', data.phone, `tel:${data.phone}`);
        if (data.whatsapp) addContactCard('message-circle', 'واتساب', data.whatsapp, `https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`);
        if (data.email) addContactCard('mail', 'البريد', data.email, `mailto:${data.email}`);
        if (data.website) addContactCard('globe', 'الموقع', data.website, data.website.startsWith('http') ? data.website : `https://${data.website}`);
        if (data.address) addContactCard('map-pin', 'العنوان', data.address, `https://maps.google.com/?q=${encodeURIComponent(data.address)}`);
    }

    // Custom Links Section
    const links = data.customLinks || (data.customLinksJson ? JSON.parse(data.customLinksJson) : []);
    if (data.showLinks !== false && links && links.length > 0) {
        linksSection.classList.remove('hidden');
        linksList.innerHTML = '';
        links.forEach(link => {
            const a = document.createElement('a');
            a.className = 'link-button';
            a.href = link.url && link.url.startsWith('http') ? link.url : `https://${link.url || ''}`;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = link.title || 'رابط';
            linksList.appendChild(a);
        });
    }

    // Gallery Section
    const gallery = data.gallery || (data.galleryJson ? JSON.parse(data.galleryJson) : []);
    if (data.showGallery !== false && gallery && gallery.length > 0) {
        gallerySection.classList.remove('hidden');
        galleryGrid.innerHTML = '';
        gallery.forEach(item => {
            const url = item.imageUrl || item.url;
            if (url && url.startsWith('http')) {
                const img = document.createElement('img');
                img.className = 'gallery-thumb';
                img.src = url;
                img.alt = item.caption || 'صورة';
                galleryGrid.appendChild(img);
            }
        });
    }

    // Share button
    if (shareBtn) {
        shareBtn.onclick = () => {
            if (navigator.share) {
                navigator.share({
                    title: data.name || "Lello ID Profile",
                    url: window.location.href
                }).catch(() => {});
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("تم نسخ رابط البروفايل!");
            }
        };
    }
}

function addContactCard(icon, title, value, href) {
    const card = document.createElement('a');
    card.className = 'contact-card';
    card.href = href;
    card.target = '_blank';
    card.innerHTML = `<div class="contact-info"><div class="contact-title">${title}</div><div class="contact-value">${value}</div></div>`;
    contactGrid.appendChild(card);
}

function showError(msg) {
    loadingState.classList.add('hidden');
    profileContainer.classList.add('hidden');
    errorState.classList.remove('hidden');
    errorMessage.textContent = msg;
}

// Run on load
document.addEventListener('DOMContentLoaded', loadProfile);
