export const fetchOrganizationListUrl = (baseUrl: string) => `${baseUrl}/api/organization`;
export const fetchOrganizationDetailUrl = (baseUrl: string, organizationId: string) => `${baseUrl}/api/organization/${organizationId}`;
export const fetchOrganizationAvailablePermissionsUrl = (baseUrl: string, organizationId: string) =>
  `${baseUrl}/api/organization/${organizationId}/available-permissions`;
export const createOrganizationUrl = (baseUrl: string) => `${baseUrl}/api/organization`;
export const editOrganizationUrl = (baseUrl: string, organizationId: string) => `${baseUrl}/api/organization/${organizationId}`;
export const deleteOrganizationUrl = (baseUrl: string, organizationId: string) => `${baseUrl}/api/organization/${organizationId}`;

export const fetchCompanyInfoDetailUrl = (baseUrl: string) => `${baseUrl}/api/company-info`;
export const editCompanyInfoDetailUrl = (baseUrl: string) => `${baseUrl}/api/company-info`;
