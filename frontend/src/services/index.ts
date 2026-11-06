import api from './api';

// ─── Auth ─────────────────────────────────────────────────────────
export const authService = {
  register: (data: { email: string; password: string; first_name: string; last_name: string }) =>
    api.post('/auth/register/', data),
  login: (email: string, password: string) =>
    api.post('/auth/login/', { email, password }),
  logout: (refresh: string) =>
    api.post('/auth/logout/', { refresh }),
  refreshToken: (refresh: string) =>
    api.post('/auth/token/refresh/', { refresh }),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password/', { email }),
  resetPassword: (token: string, new_password: string) =>
    api.post('/auth/reset-password/', { token, new_password }),
  verifyEmail: (token: string) =>
    api.post('/auth/verify-email/', { token }),
  changePassword: (old_password: string, new_password: string) =>
    api.post('/auth/change-password/', { old_password, new_password }),
  setupMFA: () =>
    api.post('/auth/mfa/setup/'),
  verifyMFA: (code: string) =>
    api.post('/auth/mfa/verify/', { code }),
};

// ─── Users ────────────────────────────────────────────────────────
export const userService = {
  me: () => api.get('/users/me/'),
  updateMe: (data: Partial<{ first_name: string; last_name: string; avatar: File }>) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => { if (v !== undefined) form.append(k, v as string); });
    return api.patch('/users/me/', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  list: () => api.get('/users/'),
  getById: (id: string) => api.get(`/users/${id}/`),
};

// ─── Organizations ────────────────────────────────────────────────
export const orgService = {
  list: () => api.get('/organizations/'),
  create: (data: { name: string; description?: string; industry?: string }) =>
    api.post('/organizations/', data),
  get: (id: string) => api.get(`/organizations/${id}/`),
  update: (id: string, data: object) => api.patch(`/organizations/${id}/`, data),
  delete: (id: string) => api.delete(`/organizations/${id}/`),
  getMembers: (id: string) => api.get(`/organizations/${id}/members/`),
  inviteMember: (id: string, data: { email: string; role: string }) =>
    api.post(`/organizations/${id}/members/invite/`, data),
  updateMember: (orgId: string, userId: string, role: string) =>
    api.patch(`/organizations/${orgId}/members/${userId}/`, { role }),
  removeMember: (orgId: string, userId: string) =>
    api.delete(`/organizations/${orgId}/members/${userId}/`),
};

// ─── Workspaces ───────────────────────────────────────────────────
export const workspaceService = {
  list: () => api.get('/workspaces/'),
  create: (data: { name: string; description?: string; organization: string }) =>
    api.post('/workspaces/', data),
  get: (id: string) => api.get(`/workspaces/${id}/`),
  update: (id: string, data: object) => api.patch(`/workspaces/${id}/`, data),
  delete: (id: string) => api.delete(`/workspaces/${id}/`),
};

// ─── Dashboards ───────────────────────────────────────────────────
export const dashboardService = {
  list: (workspaceId: string) => api.get(`/dashboards/?workspace=${workspaceId}`),
  create: (data: { name: string; description?: string; workspace: string }) =>
    api.post('/dashboards/', data),
  get: (id: string) => api.get(`/dashboards/${id}/`),
  update: (id: string, data: object) => api.patch(`/dashboards/${id}/`, data),
  delete: (id: string) => api.delete(`/dashboards/${id}/`),
  updateLayout: (id: string, layout_config: object) =>
    api.patch(`/dashboards/${id}/`, { layout_config }),
  // Widgets
  getWidgets: (dashboardId: string) => api.get(`/dashboards/${dashboardId}/widgets/`),
  createWidget: (dashboardId: string, data: object) =>
    api.post(`/dashboards/${dashboardId}/widgets/`, data),
  updateWidget: (dashboardId: string, widgetId: string, data: object) =>
    api.patch(`/dashboards/${dashboardId}/widgets/${widgetId}/`, data),
  deleteWidget: (dashboardId: string, widgetId: string) =>
    api.delete(`/dashboards/${dashboardId}/widgets/${widgetId}/`),
};

// ─── Datasets ─────────────────────────────────────────────────────
export const datasetService = {
  list: (workspaceId: string) => api.get(`/datasets/?workspace=${workspaceId}`),
  upload: (workspaceId: string, file: File, name: string) => {
    const form = new FormData();
    form.append('file', file);
    form.append('name', name);
    form.append('workspace', workspaceId);
    return api.post('/datasets/', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  get: (id: string) => api.get(`/datasets/${id}/`),
  getRecords: (id: string, page = 1) => api.get(`/datasets/${id}/records/?page=${page}`),
  delete: (id: string) => api.delete(`/datasets/${id}/`),
  getHistory: (id: string) => api.get(`/datasets/${id}/history/`),
};

// ─── Reports ──────────────────────────────────────────────────────
export const reportService = {
  list: (workspaceId: string) => api.get(`/reports/?workspace=${workspaceId}`),
  create: (data: object) => api.post('/reports/', data),
  get: (id: string) => api.get(`/reports/${id}/`),
  update: (id: string, data: object) => api.patch(`/reports/${id}/`, data),
  delete: (id: string) => api.delete(`/reports/${id}/`),
  exportPDF: (id: string) => api.get(`/reports/${id}/export/pdf/`, { responseType: 'blob' }),
  exportCSV: (id: string) => api.get(`/reports/${id}/export/csv/`, { responseType: 'blob' }),
  exportExcel: (id: string) => api.get(`/reports/${id}/export/excel/`, { responseType: 'blob' }),
  share: (id: string) => api.post(`/reports/${id}/share/`),
};

// ─── Analytics ───────────────────────────────────────────────────
export const analyticsService = {
  getKPIs: (workspaceId: string) => api.get(`/analytics/kpis/?workspace=${workspaceId}`),
  createKPI: (data: object) => api.post('/analytics/kpis/', data),
  updateKPI: (id: string, data: object) => api.patch(`/analytics/kpis/${id}/`, data),
  deleteKPI: (id: string) => api.delete(`/analytics/kpis/${id}/`),
  getRevenueTrends: (workspaceId: string, period = '30d') =>
    api.get(`/analytics/revenue/?workspace=${workspaceId}&period=${period}`),
  getCustomerGrowth: (workspaceId: string, period = '30d') =>
    api.get(`/analytics/customers/?workspace=${workspaceId}&period=${period}`),
  getConversionRates: (workspaceId: string) =>
    api.get(`/analytics/conversions/?workspace=${workspaceId}`),
  getTrends: (workspaceId: string) =>
    api.get(`/analytics/trends/?workspace=${workspaceId}`),
  getSnapshots: (workspaceId: string) =>
    api.get(`/analytics/snapshots/?workspace=${workspaceId}`),
};

// ─── AI Insights ─────────────────────────────────────────────────
export const aiService = {
  query: (question: string, conversationId?: string) =>
    api.post('/ai/query/', { question, conversation_id: conversationId }),
  getInsights: (workspaceId: string) =>
    api.get(`/ai/insights/?workspace=${workspaceId}`),
  getConversations: () => api.get('/ai/conversations/'),
  getConversation: (id: string) => api.get(`/ai/conversations/${id}/`),
  deleteConversation: (id: string) => api.delete(`/ai/conversations/${id}/`),
};

// ─── Notifications ────────────────────────────────────────────────
export const notificationService = {
  list: (page = 1) => api.get(`/notifications/?page=${page}`),
  getUnreadCount: () => api.get('/notifications/unread-count/'),
  markRead: (id: string) => api.patch(`/notifications/${id}/read/`),
  markAllRead: () => api.post('/notifications/mark-all-read/'),
  getAlerts: (workspaceId: string) => api.get(`/notifications/alerts/?workspace=${workspaceId}`),
  createAlert: (data: object) => api.post('/notifications/alerts/', data),
  updateAlert: (id: string, data: object) => api.patch(`/notifications/alerts/${id}/`, data),
  deleteAlert: (id: string) => api.delete(`/notifications/alerts/${id}/`),
};

// ─── Audit ────────────────────────────────────────────────────────
export const auditService = {
  getLogs: (params?: { page?: number; action?: string; from?: string; to?: string }) =>
    api.get('/audit/logs/', { params }),
  getActivity: (params?: { page?: number; user?: string }) =>
    api.get('/audit/activity/', { params }),
};

// ─── Subscriptions ────────────────────────────────────────────────
export const subscriptionService = {
  getPlans: () => api.get('/subscriptions/plans/'),
  getCurrent: () => api.get('/subscriptions/current/'),
  upgrade: (planId: string) => api.post('/subscriptions/upgrade/', { plan_id: planId }),
};
