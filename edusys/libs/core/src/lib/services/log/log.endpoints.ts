export const fetchLogListUrl = (baseUrl: string) => `${baseUrl}/api/log`;
export const fetchLogDetailUrl = (baseUrl: string, logId: string) => `${baseUrl}/api/log/${logId}`;
export const deleteLogUrl = (baseUrl: string, logId: string) => `${baseUrl}/api/log/${logId}`;
