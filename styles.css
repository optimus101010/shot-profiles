:root {
    --primary-color: #2563EB;
    --primary-dark: #1D4ED8;
    --primary-light: #DBEAFE;
    --primary-hover: #1D4ED8;
    --accent-color: #0284C7;
    --bg-color: #F8FAFC;
    --card-bg: #FFFFFF;
    --surface-variant: #F1F5F9;
    --text-main: #0F172A;
    --text-muted: #475569;
    --border-color: #E2E8F0;
    --on-primary: #FFFFFF;
    --gradient-start: #2563EB;
    --gradient-end: #1D4ED8;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-full: 9999px;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Cairo', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-main);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
}

#app {
    width: 100%;
    max-width: 520px;
    min-height: 100vh;
    background-color: var(--card-bg);
    position: relative;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
}

.hidden {
    display: none !important;
}

/* State Containers (Loading, Error) */
.state-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    padding: 32px 24px;
    text-align: center;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.error-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.state-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 8px;
}

.state-text {
    font-size: 16px;
    color: var(--text-muted);
}

/* Cover Section */
.cover-section {
    width: 100%;
    height: 180px;
    position: relative;
    background-color: var(--primary-color);
    overflow: hidden;
}

.cover-gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
    position: absolute;
    top: 0;
    left: 0;
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

/* Profile Header */
.profile-header {
    padding: 0 24px 20px 24px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -60px;
}

.avatar-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: var(--radius-full);
    border: 4px solid var(--card-bg);
    box-shadow: var(--shadow-md);
    background-color: var(--card-bg);
    margin-bottom: 16px;
    overflow: hidden;
}

.profile-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    color: var(--on-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: 800;
}

.profile-info {
    width: 100%;
    margin-bottom: 20px;
}

.profile-name {
    font-size: 24px;
    font-weight: 800;
    color: var(--text-main);
    line-height: 1.3;
    margin-bottom: 4px;
}

.profile-tagline {
    font-size: 15px;
    color: var(--text-muted);
    margin-bottom: 8px;
    font-weight: 600;
}

.profile-role-company {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-wrap: wrap;
    font-size: 14px;
    margin-top: 4px;
}

.role-badge {
    background-color: var(--primary-light);
    color: var(--primary-color);
    padding: 2px 10px;
    border-radius: var(--radius-full);
    font-weight: 700;
    font-size: 13px;
}

.separator {
    color: var(--text-muted);
}

.company-text {
    color: var(--text-main);
    font-weight: 600;
}

/* Action Buttons */
.primary-actions {
    display: flex;
    gap: 12px;
    width: 100%;
    justify-content: center;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: var(--radius-md);
    font-family: 'Cairo', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    flex: 1;
    max-width: 220px;
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--on-primary);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.btn-primary:hover {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
}

.btn-secondary {
    background-color: var(--bg-color);
    color: var(--text-main);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover {
    background-color: var(--border-color);
}

.btn-icon {
    width: 18px;
    height: 18px;
}

/* Profile Body */
.profile-body {
    padding: 0 20px 24px 20px;
    flex: 1;
}

.section {
    margin-bottom: 24px;
}

.section-title {
    font-size: 16px;
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid var(--primary-light);
}

/* Contact Grid */
.contact-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.contact-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-main);
    transition: all 0.2s ease;
}

.contact-card:hover {
    border-color: var(--primary-color);
    background-color: var(--primary-light);
    transform: translateX(-2px);
}

.contact-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-sm);
    background-color: var(--card-bg);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
}

.contact-icon-wrapper svg {
    width: 20px;
    height: 20px;
}

.contact-details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.contact-label {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 600;
}

.contact-value {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-main);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
    text-align: right;
}

/* Links List */
.links-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.link-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-main);
    font-weight: 700;
    font-size: 15px;
    transition: all 0.2s ease;
}

.link-button:hover {
    border-color: var(--primary-color);
    background-color: var(--primary-light);
    color: var(--primary-color);
    transform: translateY(-1px);
}

.link-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.link-icon {
    width: 20px;
    height: 20px;
    color: var(--primary-color);
}

.chevron-icon {
    width: 16px;
    height: 16px;
    color: var(--text-muted);
}

/* Gallery Grid */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.gallery-item {
    aspect-ratio: 1;
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    background-color: var(--border-color);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.gallery-item:hover img {
    transform: scale(1.08);
}

/* Lightbox */
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.lightbox-content {
    max-width: 90%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: var(--radius-md);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.lightbox-caption {
    color: #FFFFFF;
    margin-top: 16px;
    font-size: 16px;
    text-align: center;
}

.lightbox-close {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #FFFFFF;
    font-size: 36px;
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
}

/* Footer */
.profile-footer {
    text-align: center;
    padding: 20px;
    background-color: var(--bg-color);
    border-top: 1px solid var(--border-color);
    font-size: 13px;
    color: var(--text-muted);
}

.profile-footer strong {
    color: var(--primary-color);
}

/* ==========================================================================
   TEMPLATE-SPECIFIC DESIGN TOKENS & STYLES (14 DISTINCT TEMPLATES)
   ========================================================================== */

/* Hero Banner Cards (Emergency / Reviews) */
.template-hero-card {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: var(--radius-lg);
    text-align: center;
    box-shadow: var(--shadow-md);
}

.template-hero-card.emergency-kids {
    background-color: #DC2626;
    color: #FFFFFF;
}

.template-hero-card.adventurer-kids {
    background-color: #2563EB;
    color: #FFFFFF;
}

.template-hero-card.rescue-pets {
    background-color: #D97706;
    color: #FFFFFF;
}

.template-hero-card.companion-pets {
    background-color: #059669;
    color: #FFFFFF;
}

.template-hero-card.review-5star {
    background-color: var(--primary-color);
    color: var(--on-primary);
}

.hero-stars {
    font-size: 28px;
    margin-bottom: 6px;
}

.hero-title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 4px;
}

.hero-subtitle {
    font-size: 13px;
    opacity: 0.9;
    margin-bottom: 16px;
}

.hero-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px;
    border-radius: var(--radius-full);
    font-weight: 800;
    font-size: 15px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s ease;
}

.hero-btn:active {
    transform: scale(0.98);
}

.hero-btn-green {
    background-color: #16A34A;
    color: #FFFFFF;
}

.hero-btn-white {
    background-color: #FFFFFF;
    color: var(--text-main);
}

/* 1. Personal 1: Creator Spotlight */
.profile-container[data-template="personal_1"] .cover-section {
    height: 200px;
}
.profile-container[data-template="personal_1"] .avatar-wrapper {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 4px solid var(--primary-color);
    box-shadow: 0 0 0 6px var(--primary-light), 0 8px 20px rgba(0,0,0,0.15);
}
.profile-container[data-template="personal_1"] .section-title {
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 3px solid var(--primary-color);
}
.profile-container[data-template="personal_1"] .contact-card {
    border-radius: 16px;
    border: 1px solid var(--primary-light);
    background: linear-gradient(180deg, var(--card-bg) 0%, var(--bg-color) 100%);
}
.profile-container[data-template="personal_1"] .link-button {
    border-radius: 9999px;
    padding: 14px 22px;
    font-weight: 800;
    background-color: var(--primary-color);
    color: var(--on-primary);
}

/* 2. Personal 2: Minimal Bio */
.profile-container[data-template="personal_2"] .cover-section {
    height: 90px;
    background: var(--surface-variant);
    opacity: 0.6;
}
.profile-container[data-template="personal_2"] .profile-header {
    margin-top: -45px;
    text-align: center;
}
.profile-container[data-template="personal_2"] .avatar-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    box-shadow: var(--shadow-sm);
}
.profile-container[data-template="personal_2"] .profile-name {
    font-size: 26px;
    font-weight: 300;
    letter-spacing: -0.5px;
}
.profile-container[data-template="personal_2"] .section-title {
    border-bottom: none;
    text-align: center;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-muted);
    padding-bottom: 4px;
}
.profile-container[data-template="personal_2"] .contact-card {
    border: none;
    border-bottom: 1px solid var(--border-color);
    border-radius: 0;
    background: transparent;
    padding: 12px 4px;
}
.profile-container[data-template="personal_2"] .link-button {
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    font-weight: 600;
}

/* 3. Creative 1: Creative Studio */
.profile-container[data-template="creative_1"] .cover-section {
    height: 220px;
    background: radial-gradient(circle at top right, var(--primary-color), var(--accent-color), #EC4899);
}
.profile-container[data-template="creative_1"] .avatar-wrapper {
    width: 125px;
    height: 125px;
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    border: 4px solid var(--card-bg);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
}
.profile-container[data-template="creative_1"] .section-title {
    border-bottom: 3px dashed var(--accent-color);
    font-size: 18px;
    color: var(--primary-color);
}
.profile-container[data-template="creative_1"] .contact-card {
    border-radius: 20px;
    border: 2px solid var(--accent-color);
    transition: transform 0.2s ease;
}
.profile-container[data-template="creative_1"] .contact-card:hover {
    transform: scale(1.02);
}
.profile-container[data-template="creative_1"] .link-button {
    border-radius: 20px 4px 20px 4px;
    border: 2px solid var(--primary-color);
    background-color: var(--primary-light);
}

/* 4. Business 1: Executive Pro */
.profile-container[data-template="business_1"] .cover-section {
    height: 160px;
    background: linear-gradient(135deg, #0F172A 0%, var(--primary-dark) 100%);
}
.profile-container[data-template="business_1"] .avatar-wrapper {
    width: 110px;
    height: 110px;
    border-radius: var(--radius-md);
    border: 3px solid var(--primary-color);
    box-shadow: var(--shadow-lg);
}
.profile-container[data-template="business_1"] .profile-name {
    font-size: 24px;
    font-weight: 800;
}
.profile-container[data-template="business_1"] .section-title {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 2px solid var(--primary-color);
    color: var(--primary-color);
}
.profile-container[data-template="business_1"] .contact-card {
    border-radius: 8px;
    border-right: 4px solid var(--primary-color);
    background-color: var(--surface-variant);
}

/* 5. Business 2: Corporate Minimal */
.profile-container[data-template="business_2"] .cover-section {
    height: 120px;
    background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-dark) 100%);
}
.profile-container[data-template="business_2"] .avatar-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 6px;
    border: 3px solid var(--card-bg);
    box-shadow: var(--shadow-md);
}
.profile-container[data-template="business_2"] .section-title {
    border-bottom: 1px solid var(--border-color);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.profile-container[data-template="business_2"] .contact-card {
    border-radius: 6px;
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    padding: 10px 14px;
}

/* 6. Business 3: Boutique Luxe */
.profile-container[data-template="business_3"] {
    border: 2px solid var(--primary-color);
    outline: 2px solid var(--accent-color);
    outline-offset: -8px;
    border-radius: var(--radius-lg);
    background: #FAF9F6;
}
.profile-container[data-template="business_3"] .cover-section {
    height: 190px;
    background: linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%);
}
.profile-container[data-template="business_3"] .avatar-wrapper {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid #D4AF37;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}
.profile-container[data-template="business_3"] .profile-name {
    font-size: 26px;
    font-weight: 700;
    color: #064E3B;
    letter-spacing: 0.5px;
}
.profile-container[data-template="business_3"] .section-title {
    font-size: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #D4AF37;
    border-bottom: 1px solid #D4AF37;
    text-align: center;
}
.profile-container[data-template="business_3"] .contact-card {
    border-radius: 24px;
    border: 1px solid #E5E7EB;
    background: #FFFFFF;
    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}

/* 7. Reviews 1: 5-Star Review Tap */
.profile-container[data-template="reviews_1"] .cover-section {
    height: 150px;
    background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
}
.profile-container[data-template="reviews_1"] .avatar-wrapper {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 4px solid #F59E0B;
    box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
}
.profile-container[data-template="reviews_1"] .section-title {
    text-align: center;
    color: #1E40AF;
    border-bottom: 2px solid #F59E0B;
    font-size: 17px;
}
.profile-container[data-template="reviews_1"] .contact-card {
    border-radius: 16px;
    border: 2px solid var(--primary-light);
    background: #FFFFFF;
    box-shadow: var(--shadow-sm);
}
.profile-container[data-template="reviews_1"] .link-button {
    border-radius: 16px;
    border: 2px solid #F59E0B;
    background-color: #FEF3C7;
    color: #78350F;
    font-weight: 800;
}

/* 8. Reviews 2: Local Business Review */
.profile-container[data-template="reviews_2"] .cover-section {
    height: 160px;
    background: linear-gradient(225deg, #0F766E 0%, #14B8A6 100%);
}
.profile-container[data-template="reviews_2"] .avatar-wrapper {
    width: 115px;
    height: 115px;
    border-radius: 16px;
    border: 3px solid #FFFFFF;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}
.profile-container[data-template="reviews_2"] .section-title {
    border-bottom: 2px solid #14B8A6;
    color: #0F766E;
    font-size: 16px;
}
.profile-container[data-template="reviews_2"] .contact-card {
    border-radius: 12px;
    border: 1px solid #CCFBF1;
    background-color: #F0FDFA;
}
.profile-container[data-template="reviews_2"] .contact-icon-wrapper {
    background-color: #0F766E;
    color: #FFFFFF;
    border-radius: 8px;
}

/* 9. Children 1: Kids Safety ID */
.profile-container[data-template="children_1"] .cover-section {
    height: 140px;
    background: linear-gradient(135deg, #EF4444 0%, #F87171 100%);
}
.profile-container[data-template="children_1"] .avatar-wrapper {
    width: 125px;
    height: 125px;
    border-radius: 36px;
    border: 5px solid #FFFFFF;
    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
}
.profile-container[data-template="children_1"] .section-title {
    background-color: #FEE2E2;
    color: #991B1B;
    border-radius: 12px;
    padding: 8px 16px;
    border-bottom: none;
    text-align: center;
    font-size: 16px;
}
.profile-container[data-template="children_1"] .contact-card {
    border-radius: 20px;
    border: 2px solid #FCA5A5;
    background: #FFF5F5;
    padding: 16px;
}
.profile-container[data-template="children_1"] .contact-icon-wrapper {
    background-color: #EF4444;
    color: #FFFFFF;
    border-radius: 50%;
    width: 44px;
    height: 44px;
}

/* 10. Children 2: Junior Adventurer */
.profile-container[data-template="children_2"] .cover-section {
    height: 150px;
    background: repeating-linear-gradient(45deg, #3B82F6, #3B82F6 15px, #2563EB 15px, #2563EB 30px);
}
.profile-container[data-template="children_2"] .avatar-wrapper {
    width: 115px;
    height: 115px;
    border-radius: 28px 8px 28px 8px;
    border: 4px solid #F59E0B;
    box-shadow: var(--shadow-md);
}
.profile-container[data-template="children_2"] .section-title {
    border-bottom: 3px solid #F59E0B;
    color: #1E40AF;
    font-size: 17px;
}
.profile-container[data-template="children_2"] .contact-card {
    border-radius: 14px;
    border: 2px solid #93C5FD;
    background: #EFF6FF;
}
.profile-container[data-template="children_2"] .contact-icon-wrapper {
    background-color: #3B82F6;
    color: #FFFFFF;
    border-radius: 10px;
}

/* 11. Pets 1: Pet Tag & Rescue ID */
.profile-container[data-template="pets_1"] .cover-section {
    height: 145px;
    background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%);
}
.profile-container[data-template="pets_1"] .avatar-wrapper {
    width: 120px;
    height: 120px;
    border-radius: 50% 20% 50% 20%;
    border: 4px solid #FFFFFF;
    box-shadow: 0 6px 20px rgba(217, 119, 6, 0.35);
}
.profile-container[data-template="pets_1"] .section-title {
    background-color: #FEF3C7;
    color: #92400E;
    border-radius: 10px;
    padding: 6px 14px;
    border-bottom: none;
    font-size: 15px;
    text-align: center;
}
.profile-container[data-template="pets_1"] .contact-card {
    border-radius: 14px;
    border-right: 6px solid #D97706;
    border-left: 1px solid #FDE68A;
    background-color: #FFFBEB;
}
.profile-container[data-template="pets_1"] .contact-icon-wrapper {
    background-color: #D97706;
    color: #FFFFFF;
    border-radius: 50%;
}

/* 12. Pets 2: Pawsome Companion */
.profile-container[data-template="pets_2"] .cover-section {
    height: 155px;
    background: linear-gradient(135deg, #059669 0%, #34D399 100%);
}
.profile-container[data-template="pets_2"] .avatar-wrapper {
    width: 115px;
    height: 115px;
    border-radius: 60px 60px 16px 16px;
    border: 4px solid #FFFFFF;
    box-shadow: var(--shadow-md);
}
.profile-container[data-template="pets_2"] .section-title {
    border-bottom: 2px solid #059669;
    color: #065F46;
    font-size: 16px;
}
.profile-container[data-template="pets_2"] .contact-card {
    border-radius: 18px;
    border: 1px solid #A7F3D0;
    background-color: #ECFDF5;
}
.profile-container[data-template="pets_2"] .contact-icon-wrapper {
    background-color: #059669;
    color: #FFFFFF;
    border-radius: 12px;
}

/* 13. Executive 1: Executive Suite */
.profile-container[data-template="executive_1"] {
    background-color: #0F172A;
    color: #F8FAFC;
}
.profile-container[data-template="executive_1"] .cover-section {
    height: 210px;
    background: linear-gradient(180deg, #1E293B 0%, #0F172A 100%);
}
.profile-container[data-template="executive_1"] .avatar-wrapper {
    width: 110px;
    height: 110px;
    border-radius: 8px;
    border: 2px solid #CBD5E1;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.profile-container[data-template="executive_1"] .profile-name {
    color: #F8FAFC;
    font-weight: 800;
    font-size: 26px;
}
.profile-container[data-template="executive_1"] .profile-tagline {
    color: #94A3B8;
}
.profile-container[data-template="executive_1"] .company-text {
    color: #E2E8F0;
}
.profile-container[data-template="executive_1"] .section-title {
    border-bottom: 1px solid #334155;
    color: #38BDF8;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 13px;
}
.profile-container[data-template="executive_1"] .contact-card {
    background-color: #1E293B;
    border: 1px solid #334155;
    border-radius: 4px;
    color: #F8FAFC;
}
.profile-container[data-template="executive_1"] .contact-value {
    color: #F8FAFC;
}
.profile-container[data-template="executive_1"] .contact-icon-wrapper {
    background-color: #0F172A;
    color: #38BDF8;
}

/* 14. Minimal 1: Minimalist Pro */
.profile-container[data-template="minimal_1"] .cover-section {
    display: none;
}
.profile-container[data-template="minimal_1"] .profile-header {
    margin-top: 0;
    padding-top: 32px;
    border-bottom: 2px solid #000000;
}
.profile-container[data-template="minimal_1"] .avatar-wrapper {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 1px solid #000000;
    box-shadow: none;
}
.profile-container[data-template="minimal_1"] .profile-name {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: -1px;
    text-transform: uppercase;
}
.profile-container[data-template="minimal_1"] .section-title {
    border-bottom: 2px solid #000000;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #000000;
}
.profile-container[data-template="minimal_1"] .contact-card {
    border: 1px solid #000000;
    border-radius: 0;
    background: #FFFFFF;
    box-shadow: none;
}
.profile-container[data-template="minimal_1"] .btn-primary {
    border-radius: 0;
    background-color: #000000;
    color: #FFFFFF;
    font-weight: 900;
    text-transform: uppercase;
}

/* Children & Pets Emergency Call Buttons */
.emergency-call-bar {
    width: 100%;
    margin-top: 16px;
}

/* Toast */
.toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--text-main);
    color: #FFFFFF;
    padding: 10px 20px;
    border-radius: var(--radius-full);
    font-size: 14px;
    font-weight: 600;
    box-shadow: var(--shadow-lg);
    z-index: 100;
    transition: opacity 0.3s ease;
}

@media (min-width: 640px) {
    body {
        padding: 40px 0;
    }
    #app {
        border-radius: var(--radius-lg);
        min-height: auto;
    }
}
