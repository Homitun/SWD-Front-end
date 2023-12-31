export default function ({ NODE_ENV = 'development' } = {}) {
  return {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    api: {
      login: 'signIn',
      blogList: 'blogs',
      createPost: 'posts',
      updatePost: 'posts',
      getPost: 'posts',
      getCategory: 'categories',
      getBlogDetail: 'blogs',
      getUserList: 'user',
      getRoleList: 'roles',
      marketingDashboard: 'dashboards/marketing',
      saleDashboard: 'dashboards/saler',
      adminDashboard: 'dashboards/admin',
    },
    isDevelopment: NODE_ENV === 'development',
  };
}
