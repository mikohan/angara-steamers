export const checkPath = (pathname: string | null | undefined) => {
  const path = pathname ?? "";

  return {
    isUpholstery: path.startsWith("/upholstery"),
    isCarpet: path.startsWith("/carpet"),
    isLocations: path.startsWith("/locations"),
  };
};
