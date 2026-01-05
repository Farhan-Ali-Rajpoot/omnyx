const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
    console.log(baseUrl)
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
};

const wn = new URL(baseUrl).origin; // 🔥 Important fix

const favicon = `/favicon.svg`;
const shortcutIcon = `/favicon-16-16.svg`;
const appleIcon = `/apple-touch-icon.svg`;
const themeColor = '#fafafa';
const ogImageUrl = '/images/image-og.png';
const ogTwitterImage = '/images/image-og.png';
const category = 'Freelancer Web developer';
const type = `website`;
const applicationName = 'Tendor';
const authorName = 'Farhan';

export { wn, favicon, shortcutIcon, appleIcon, themeColor, ogImageUrl, ogTwitterImage, category, type, applicationName, authorName };
