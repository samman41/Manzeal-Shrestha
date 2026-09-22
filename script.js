// Deep linking function for social media apps
function openSocial(appScheme, webUrl) {
    var now = Date.now();
    setTimeout(function () {
        if (Date.now() - now < 600) {
            window.open(webUrl, '_blank');
        }
    }, 500);
    window.location.href = appScheme;
}

// Helper to convert image to base64
async function getBase64ImageFromUrl(imageUrl) {
    try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.error("Failed to load image for vCard", e);
        return null;
    }
}

document.getElementById('save-contact-btn').addEventListener('click', async function () {
    // Update button state to show loading
    const btn = this;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SAVING...';
    btn.style.pointerEvents = 'none';

    // Fetch photo base64
    const photoBase64 = await getBase64ImageFromUrl('image/profile.png');

    // Contact Details
    const contact = {
        firstName: "Manzeal",
        lastName: "Shrestha",
        phone: "+9779856078478",
        email: "sthamanzeal@gmail.com",
        website: "https://manzeal-shrestha.tappooo.workers.dev/",
        whatsapp: "https://wa.me/9779802826629",
        facebook: "https://www.facebook.com/share/1DoMDH6vNJ/",
        instagram: "https://www.instagram.com/manzeal1?stkn=dmF1NzVvMG5nOWhk",
        tiktok: "https://www.tiktok.com/@manzealshrestha2?_r=1&_t=ZS-99vKw0igjtU"
    };

    // Format vCard 3.0 String with standard CRLF line endings
    let vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${contact.lastName};${contact.firstName};;;`,
        `FN:${contact.firstName} ${contact.lastName}`,
        `TEL;TYPE=CELL:${contact.phone}`,
        `EMAIL;TYPE=WORK:${contact.email}`,
        `URL:${contact.website}`,
        `URL;type=Facebook:${contact.facebook}`,
        `URL;type=Instagram:${contact.instagram}`,
        `URL;type=TikTok:${contact.tiktok}`,
        `URL;type=WhatsApp:${contact.whatsapp}`,
        `item1.URL:${contact.facebook}`,
        `item1.X-ABLabel:Facebook`,
        `item2.URL:${contact.instagram}`,
        `item2.X-ABLabel:Instagram`,
        `item3.URL:${contact.tiktok}`,
        `item3.X-ABLabel:TikTok`,
        `item4.URL:${contact.whatsapp}`,
        `item4.X-ABLabel:WhatsApp`,
        `X-SOCIALPROFILE;TYPE=whatsapp:${contact.whatsapp}`,
        `X-SOCIALPROFILE;TYPE=facebook:${contact.facebook}`,
        `X-SOCIALPROFILE;TYPE=instagram:${contact.instagram}`,
        `X-SOCIALPROFILE;TYPE=tiktok:${contact.tiktok}`,
        `NOTE:WhatsApp: ${contact.whatsapp} | Facebook: ${contact.facebook} | Instagram: ${contact.instagram} | TikTok: ${contact.tiktok}`
    ];

    if (photoBase64) {
        vcard.push(`PHOTO;ENCODING=b;TYPE=PNG:${photoBase64}`);
    }

    vcard.push("END:VCARD");
    const vcardString = vcard.join("\r\n");

    // Create a Blob with standard vCard MIME type
    const blob = new Blob([vcardString], { type: "text/vcard;charset=utf-8" });

    // Create object URL
    const url = URL.createObjectURL(blob);

    // Create hidden anchor to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.firstName}_${contact.lastName}_Contact.vcf`;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
    }, 100);
});
