// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'token',
  USER_USERNAME: 'username',
  ADMIN_TOKEN: 'admin_token',
  ADMIN_USERNAME: 'admin_username',
};

// Route Paths
export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // User Protected
  DASHBOARD: '/dashboard',
  DETECTION: '/detection',
  HASIL_DETEKSI: '/hasil-deteksi',
  HISTORY: '/history',
  
  // Admin
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_DETAIL: '/admin/users/:user_id',
  ADMIN_HARVEST: '/admin/harvests',
};

// Route Meta Keys
export const META_KEYS = {
  REQUIRES_AUTH: 'requiresAuth',
  REQUIRES_ADMIN_AUTH: 'requiresAdminAuth',
  GUEST_ONLY: 'guestOnly',
};
