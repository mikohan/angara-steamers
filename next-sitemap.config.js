/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl:
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE ?? "https://angarasteamers.com", // Replace with your actual domain
  generateRobotsTxt: true,
  // Optional: Add other settings here
  exclude: [
    "/admin/*",
    "/test",
    "/booking/*",
    "/styleguide",
    "/cart",
    "/thank-you",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/", // This tells all bots NOT to crawl your site
      },
    ],
  },
};

export default config;
