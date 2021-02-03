export const fetchModuleListUrl = (baseUrl: string) => `${baseUrl}/api/module`;
export const fetchModuleDetailUrl = (baseUrl: string, moduleId: string) => `${baseUrl}/api/module/${moduleId}`;
export const createModuleUrl = (baseUrl: string) => `${baseUrl}/api/module`;
export const editModuleUrl = (baseUrl: string, moduleId: string) => `${baseUrl}/api/module/${moduleId}`;
export const deleteModuleUrl = (baseUrl: string, moduleId: string) => `${baseUrl}/api/module/${moduleId}`;
