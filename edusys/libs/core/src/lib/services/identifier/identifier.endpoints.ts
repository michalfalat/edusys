export const fetchIdentifierListUrl = (baseUrl: string, data: any) => `${baseUrl}/api/identifier?${new URLSearchParams(data)}`;
export const fetchIdentifierDetailUrl = (baseUrl: string, identifierId: string) => `${baseUrl}/api/identifier/${identifierId}`;
export const createIdentifierUrl = (baseUrl: string) => `${baseUrl}/api/identifier`;
export const editIdentifierUrl = (baseUrl: string, identifierId: string) => `${baseUrl}/api/identifier/${identifierId}`;
export const deleteIdentifierUrl = (baseUrl: string, identifierId: string) => `${baseUrl}/api/identifier/${identifierId}`;
