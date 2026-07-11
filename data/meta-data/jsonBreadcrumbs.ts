export function generateBreadcrumbs(pathname: string) {
  // Split path into segments (e.g., /locations/playa-vista -> ["", "locations", "playa-vista"])
  const segments = pathname.split("/").filter(Boolean);
  const baseUrl =
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://angarasteamers.com";

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
  ];

  // Dynamically build the breadcrumbs from URL segments
  segments.forEach((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      // Capitalize first letter and replace hyphens with spaces for readability
      name:
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      item: `${baseUrl}${path}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElement,
  };
}
