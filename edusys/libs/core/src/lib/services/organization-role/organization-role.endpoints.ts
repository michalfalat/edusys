export const fetchOrganizationRoleListUrl = (baseUrl: string) => `${baseUrl}/api/organization-role`;
export const fetchOrganizationRoleDetailUrl = (baseUrl: string, organizationRoleId: string) => `${baseUrl}/api/organization-role/${organizationRoleId}`;
export const createOrganizationRoleUrl = (baseUrl: string) => `${baseUrl}/api/organization-role`;
export const editOrganizationRoleUrl = (baseUrl: string, organizationRoleId: string) => `${baseUrl}/api/organization-role/${organizationRoleId}`;
export const deleteOrganizationRoleUrl = (baseUrl: string, organizationRoleId: string) => `${baseUrl}/api/organization-role/${organizationRoleId}`;
