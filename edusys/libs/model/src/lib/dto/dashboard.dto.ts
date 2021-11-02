export interface IDashboardResponse {
  taskData?: IDashboardTaskData;
}

export interface IDashboardTaskData {
  totalTasks: number;
  myTasks: number;
  myFixedTasks: number;
  myOpenTasks: number;
}
