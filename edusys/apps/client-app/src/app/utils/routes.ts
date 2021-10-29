export const routes = {
  home: '/home',
  login: {
    home: '/login',
    forgotPassword: '/login/forgot-password',
  },
  profile: '/profile',

  task: {
    home: '/task',
    create: '/task/create',
    detail: '/task/detail/{0}',
    edit: '/task/edit/{0}',
  },
};
