export const fetchFileDetailUrl = (baseUrl: string, fileId: string) => `${baseUrl}/api/file/${fileId}`;
export const uploadFileUrl = (baseUrl: string) => `${baseUrl}/api/file`;
export const deleteFileUrl = (baseUrl: string, fileId: string, softDelete?: boolean) => `${baseUrl}/api/file/${fileId}${softDelete ? '?softDelete=true' : ''}`;
