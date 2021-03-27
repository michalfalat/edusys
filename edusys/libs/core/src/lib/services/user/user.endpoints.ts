export const fetchUserListUrl = (baseUrl: string) => `${baseUrl}/api/user`;
export const fetchUserDetailUrl = (baseUrl: string, userId: string) => `${baseUrl}/api/user/${userId}`;
export const createUserUrl = (baseUrl: string) => `${baseUrl}/api/user`;
export const editUserUrl = (baseUrl: string, userId: string) => `${baseUrl}/api/user/${userId}`;
export const deleteUserUrl = (baseUrl: string, userId: string) => `${baseUrl}/api/user/${userId}`;
