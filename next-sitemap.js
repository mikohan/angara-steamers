/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://angarasteamers.com", // Replace with your actual domain
  generateRobotsTxt: true, // (Optional) Generates robots.txt
  exclude: ["/test", "/admin"],
};
