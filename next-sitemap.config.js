const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://prodpost.vercel.app';

const sitemapConfig = {
    siteUrl,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    additionalPaths: async (config) => [
        { loc: '/', changefreq: 'daily', priority: 1 },
        { loc: '/help/contact', changefreq: 'monthly', priority: 0.6 },
        { loc: '/help/work', changefreq: 'monthly', priority: 0.6 },
        { loc: '/help/services', changefreq: 'monthly', priority: 0.6 },
        { loc: '/help/policies/privacy', changefreq: 'monthly', priority: 0.6 },
        { loc: '/help/policies/terms', changefreq: 'monthly', priority: 0.6 },
        { loc: '/user/profile', changefreq: 'monthly', priority: 0.5 },
        { loc: '/admin/auth/login', changefreq: 'monthly', priority: 0.5 },
    ],
};

export default sitemapConfig;
