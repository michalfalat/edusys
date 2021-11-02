import { IDashboardResponse } from '@edusys/model';

export const dashboardWidgets = async (): Promise<IDashboardResponse> => {
  const response: IDashboardResponse = {
    taskData: {
      myFixedTasks: 5,
      myOpenTasks: 2,
      myTasks: 7,
      totalTasks: 120,
    },
  };

  return response;
};
