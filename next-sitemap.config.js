/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl:
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE ?? "https://angaraprosteamers.com", // Replace with your actual domain
  generateRobotsTxt: true,
  // Optional: Add other settings here
  exclude: ["/admin/*", "/secret-page", "/booking/*", "/styleguide"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: "/", // This tells all bots NOT to crawl your site
      },
    ],
  },
};

export default config;
