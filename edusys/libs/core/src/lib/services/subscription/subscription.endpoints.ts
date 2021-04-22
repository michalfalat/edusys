export const fetchSubscriptionListUrl = (baseUrl: string) => `${baseUrl}/api/subscription`;
export const fetchSubscriptionDetailUrl = (baseUrl: string, subscriptionId: string) => `${baseUrl}/api/subscription/${subscriptionId}`;
export const createSubscriptionUrl = (baseUrl: string) => `${baseUrl}/api/subscription}`;
export const editSubscriptionUrl = (baseUrl: string, subscriptionId: string) => `${baseUrl}/api/subscription/${subscriptionId}`;
export const deleteSubscriptionUrl = (baseUrl: string, subscriptionId: string) => `${baseUrl}/api/subscription/${subscriptionId}`;
