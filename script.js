const CONFIG = {
    // Profile Details
    name: "Manzeal Shrestha",


    // Paths to Images (Ensure these match the actual files in your directory)
    profilePath: "Image/profile.jpg",
    logoPath: "Image/logo.jpg",
    brandLogoPath: "Image/nepatop-logo.png",
    backgroundPath: "Image/background.jpg",

    // Primary Action Buttons (Grid)
    actions: [
        { id: "call", label: "Call Now", url: "tel:+977-9856078478", icon: "fas fa-phone-alt" },
        { id: "gmail", label: "Email Us", url: "mailto:[sthamanzeal@gmail.com]", icon: "fas fa-envelope" },
        { id: "location", label: "Location", url: "https://maps.app.goo.gl/kAYN8UBF11pZ58Ro6", icon: "fas fa-map-marker-alt" },
        { id: "website", label: "Website", url: "https://bhagirathfabrication.com.np/", icon: "fas fa-globe" }
    ],

    // Social Media Links (Small circular icons)
    socials: [
        { id: "facebook", url: "https://www.facebook.com/share/1DoMDH6vNJ/", icon: "fab fa-facebook-f" },
        { id: "instagram", url: "https://www.instagram.com/manzeal1?stkn=dmF1NzVvMG5nOWhk", icon: "fab fa-instagram" },
        { id: "tiktok", url: "https://www.tiktok.com/@manzealshrestha2?_r=1&_t=ZS-99vKw0igjtU", icon: "fab fa-tiktok" }
    ],

    // Direct WhatsApp Link
    whatsappUrl: "whatsapp://send?phone=9779802826629",

    // Save Contact (vCard) Details for Address Book
    vcard: {
        firstName: "Manzeal",
        lastName: "Shrestha",
        phone: "+977-9856078478",
        email: "sthamanzeal@gmail.com",
        website: "#"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Background and Profile Picture
    document.getElementById('background-container').style.backgroundImage = `url('${CONFIG.backgroundPath}')`;
    document.getElementById('profile-picture').src = CONFIG.profilePath;

    // 2. Set Profile Information
    document.getElementById('profile-name').textContent = CONFIG.name;
    document.getElementById('profile-title').textContent = CONFIG.title;

    // 3. Generate Social Icons
    const socialsRow = document.getElementById('socials-row');
    CONFIG.socials.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.className = 'social-icon';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const i = document.createElement('i');
        i.className = social.icon;
        a.appendChild(i);

        socialsRow.appendChild(a);
    });

    // 4. Generate Action Grid Buttons
    const actionsGrid = document.getElementById('actions-grid');
    CONFIG.actions.forEach(action => {
        const a = document.createElement('a');
        a.href = action.url;
        a.className = 'action-btn';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const i = document.createElement('i');
        i.className = action.icon;

        const span = document.createElement('span');
        span.textContent = action.label;

        a.appendChild(i);
        a.appendChild(span);
        actionsGrid.appendChild(a);
    });

    // 5. Setup WhatsApp
    document.getElementById('whatsapp-btn').href = CONFIG.whatsappUrl;

    // 6. Handle 'Save Contact' Generation (vCard format)
    const saveBtn = document.getElementById('save-contact-btn');
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const v = CONFIG.vcard;

        // Construct vCard 3.0 String
        const locationUrl = CONFIG.actions.find(a => a.id === 'location')?.url || '';
        const whatsappNumber = v.phone.replace(/[^0-9]/g, '');
        const whatsappLink = `https://wa.me/${whatsappNumber}`;

        let itemIndex = 1;
        const customUrls = [];
        const socialProfiles = [];

        // WhatsApp
        customUrls.push(`item${itemIndex}.URL:${whatsappLink}`);
        customUrls.push(`item${itemIndex}.X-ABLabel:WhatsApp`);
        itemIndex++;

        // Location
        if (locationUrl) {
            customUrls.push(`item${itemIndex}.URL:${locationUrl}`);
            customUrls.push(`item${itemIndex}.X-ABLabel:Location`);
            itemIndex++;
        }

        // Socials
        CONFIG.socials.forEach(s => {
            const label = s.id.charAt(0).toUpperCase() + s.id.slice(1);
            customUrls.push(`item${itemIndex}.URL:${s.url}`);
            customUrls.push(`item${itemIndex}.X-ABLabel:${label}`);
            itemIndex++;
            socialProfiles.push(`X-SOCIALPROFILE;type=${s.id.toLowerCase()}:${s.url}`);
        });

        const vcardData = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `N:${v.lastName};${v.firstName};;;`,
            `FN:${v.firstName} ${v.lastName}`,
            `ORG:${v.company}`,
            `TEL;TYPE=WORK,VOICE:${v.phone}`,
            `EMAIL;TYPE=PREF,INTERNET:${v.email}`,
            `URL;TYPE=WORK:${v.website}`,
            ...customUrls,
            ...socialProfiles,
            `NOTE:Nepatop, Bhagirath fabrication, Upvc`,
            "END:VCARD"
        ].join("\r\n");

        // Trigger file download
        const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${v.firstName}_${v.lastName}.vcf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    });


});
