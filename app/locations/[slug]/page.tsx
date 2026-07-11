import { fetchStrapi } from "@/lib/strapi";
import { LocationPage, StrapiResponse, ServicePage } from "@/types";
import { generateWeaponsGradeSeo } from "@/data/meta-data/meta-bones";
import { generateBreadcrumbs } from "@/data/meta-data/jsonBreadcrumbs";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import FAQ from "@/components/FAQ";
import GoogleMap from "@/components/GoogleMap";
import { WaveDivider } from "@/components/common/WaveDivider";
import { LatestProjects } from "@/components/LatestProjects";
import LocalServicesGrid from "@/components/LocalServicesGrid";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pure math helper: Calculates great-circle distance between two coordinate nodes
 */
function getDistanceInMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const EARTH_RADIUS_MILES = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const rLat1 = (lat1 * Math.PI) / 180;
  const rLat2 = (lat2 * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_MILES * c;
}

// const getQuery = (slug: string) => ({
//   filters: { slug: { $eq: slug } },
//   populate: ["state", "region", "og_image", "faq", "map_component", "projects"],
// });
const getQuery = (slug: string) => ({
  filters: { slug: { $eq: slug } },
  populate: {
    state: true,
    region: true,
    og_image: true,
    faq: true,
    map_component: true,
    // Step inside the projects relation and populate its media_gallery
    projects: {
      populate: {
        media_gallery: true,
      },
    },
  },
});

const getServicesQuery = () => ({
  fields: ["title", "slug", "h2_subheadning", "order"],
  populate: {
    hero_image: { fields: ["url", "alternativeText"] },
    og_image: { fields: ["url", "alternativeText"] },
    service_hub: { fields: ["title", "slug"] },
  },
  sort: ["order:asc"],
  pagination: { page: 1, pageSize: 100 },
});

export async function getAllServicesData(): Promise<ServicePage[]> {
  try {
    const response = await fetchStrapi<ServicePage>(
      "service-pages",
      getServicesQuery(),
      { next: { revalidate: 3600, tags: ["services"] } },
    );
    return (response?.data as unknown as ServicePage[]) || [];
  } catch (error) {
    console.error("Failed to compile service data tree collection:", error);
    return [];
  }
}

/**
 * NEW: Queries peer locations in the same region and sorts them by geographic distance
 */
export async function getNeighboringLocations(
  currentLocation: LocationPage,
): Promise<LocationPage[]> {
  const regionId = currentLocation.region?.id;
  const pivotLat = currentLocation.map_component?.latitude;
  const pivotLng = currentLocation.map_component?.longitude;

  // Failsafe exit check if relation parameters are missing
  if (!regionId || pivotLat === undefined || pivotLng === undefined) {
    return [];
  }

  const query = {
    filters: {
      region: { id: { $eq: regionId } },
      id: { $ne: currentLocation.id }, // Exclude the current location page itself
    },
    fields: ["city_name", "slug", "h2_subheadning"],
    populate: {
      map_component: { fields: ["latitude", "longitude"] },
    },
    pagination: { page: 1, pageSize: 40 },
  };

  try {
    const response = await fetchStrapi<LocationPage>("location-pages", query);
    const candidateLocations = response?.data || [];

    return candidateLocations
      .map((loc) => {
        const targetLat = loc.map_component?.latitude;
        const targetLng = loc.map_component?.longitude;

        if (targetLat === undefined || targetLng === undefined) {
          return { loc, distance: Infinity };
        }

        const distance = getDistanceInMiles(
          pivotLat,
          pivotLng,
          targetLat,
          targetLng,
        );
        return { loc, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .map((item) => item.loc)
      .slice(0, 2); // Return exactly the top 2 closest neighbors
  } catch (error) {
    console.error("Failed fetching regional neighbors:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const rawResponse = await fetchStrapi<LocationPage>(
    "location-pages",
    getQuery(slug),
  );
  const { metadata } = generateWeaponsGradeSeo(
    rawResponse,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/locations/${slug}`,
  );
  return metadata;
}

export default async function Location({ params }: PageProps) {
  const { slug } = await params;
  const pathname = `/locations/${slug}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}${pathname}`;

  let rawResponse: StrapiResponse<LocationPage>;
  let allServices: ServicePage[] = [];
  let neighbors: LocationPage[] = [];

  // 1. Core Fetch Phase
  try {
    const [locationData, servicesData] = await Promise.all([
      fetchStrapi<LocationPage>("location-pages", getQuery(slug)),
      getAllServicesData(),
    ]);
    rawResponse = locationData;
    allServices = servicesData;
  } catch (error) {
    console.error(error);
    return (
      <main className="p-10 text-red-500">Error loading page content.</main>
    );
  }

  if (!rawResponse?.data?.length) {
    return <main className="p-10">No data found for this location.</main>;
  }

  const location = rawResponse.data[0];

  // 2. Neighbor Identification Phase (Calculated dynamically via server-side location coordinates)
  try {
    neighbors = await getNeighboringLocations(location);
  } catch (error) {
    console.error("Non-blocking neighbor resolution failure:", error);
  }

  const { jsonLd } = generateWeaponsGradeSeo(rawResponse, fullUrl);
  const schema = generateBreadcrumbs(pathname);
  const combinedSchema = JSON.stringify(
    [...jsonLd, schema].filter(Boolean),
    null,
    2,
  );
  // Inside Location component, after: const location = rawResponse.data[0];
  const breadcrumbSegments = [
    { label: "Home", path: "/" },
    { label: "Service Areas", path: "/locations" },
    { label: location.city_name, path: `/locations/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combinedSchema }}
      />

      <main>
        <section className="px-4 max-w-7xl mx-auto">
          <Breadcrumbs segments={breadcrumbSegments} className="mt-8" />
          <Hero
            video={false}
            header={location.h1_heading}
            heroImage={
              process.env.NEXT_PUBLIC_STRAPI_URL + location.og_image.url
            }
          />
        </section>

        <section>
          <LogoTicker />
        </section>

        <section className="relative py-16 md:py-32 my-8 md:my-16">
          <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-primary/10 to-background"></div>
          <div className="absolute bottom-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-background to-primary/10"></div>
          <WaveDivider position="top" fill="var(--color-background)" />
          <WaveDivider position="bottom" fill="var(--color-background)" />
          <LocalServicesGrid
            services={allServices}
            cityName={location.city_name}
          />
        </section>

        {location.projects?.length > 0 && (
          <section className="mb-16 md:mb-32">
            <LatestProjects
              locationSlug={location.slug}
              projects={location.projects}
              cityName={location.city_name}
            />
          </section>
        )}

        <section className="relative py-16 md:py-32 w-full mt-8 md:mt-16">
          <div className="absolute top-0 left-0 h-[30%] w-full bg-linear-180 from-primary/30 to-background"></div>
          <WaveDivider position="top" fill="var(--color-background)" />
          <FAQ cityName={location.city_name} items={location.faq} />
        </section>

        <section className="mb-16 px-4 max-w-6xl mx-auto">
          <GoogleMap
            lat={location.map_component.latitude}
            lng={location.map_component.longitude}
            labelText={location.meta_title}
            zoom={location.map_component.zoom}
          />
        </section>
        {/* NEW: Neighboring Areas Internal Linking Section for Enhanced SEO Crawlability */}
        {neighbors.length > 0 && (
          <section className="w-full  py-16 md:py-24 my-8 md:my-16">
            <div className="container mx-auto max-w-7xl px-6">
              <div className="mb-10 max-w-2xl">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  Other Service Areas Near {location.city_name}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  We provide premium, eco-friendly deep cleaning solutions
                  across adjacent communities.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full">
                {neighbors.map((neighbor) => (
                  <Link
                    key={neighbor.id}
                    href={`/locations/${neighbor.slug}`}
                    className="group flex items-center justify-between p-6 rounded-2xl border border-primary/10 bg-background transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)]"
                  >
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-primary">
                        Deep Cleaning in {neighbor.city_name}
                      </h3>
                      {neighbor.h2_subheadning && (
                        <p className="text-xs text-muted line-clamp-1">
                          {neighbor.h2_subheadning}
                        </p>
                      )}
                    </div>
                    <span className="text-primary font-bold transition-transform duration-300 group-hover:translate-x-1 pl-4">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
