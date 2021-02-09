export const fetchPackageListUrl = (baseUrl: string) => `${baseUrl}/api/package`;
export const fetchPackageDetailUrl = (baseUrl: string, packageId: string) => `${baseUrl}/api/package/${packageId}`;
export const createPackageUrl = (baseUrl: string) => `${baseUrl}/api/package`;
export const editPackageUrl = (baseUrl: string, packageId: string) => `${baseUrl}/api/package/${packageId}`;
export const deletePackageUrl = (baseUrl: string, packageId: string) => `${baseUrl}/api/package/${packageId}`;
