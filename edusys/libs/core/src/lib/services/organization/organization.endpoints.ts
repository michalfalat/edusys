export const fetchOrganizationListUrl = (baseUrl: string) => `${baseUrl}/api/organization`;
export const fetchOrganizationDetailUrl = (baseUrl: string, organizationId: string) => `${baseUrl}/api/organization/${organizationId}`;
export const createOrganizationUrl = (baseUrl: string) => `${baseUrl}/api/organization`;
export const editOrganizationUrl = (baseUrl: string, organizationId: string) => `${baseUrl}/api/organization/${organizationId}`;
export const deleteOrganizationUrl = (baseUrl: string, organizationId: string) => `${baseUrl}/api/organization/${organizationId}`;
