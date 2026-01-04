// utils/roleGuard.js
/**
 * Helper to check if a user has the required permission
 */
export const hasPermission = (userRole, requiredRole) => {
  if (!userRole) return false;
  return userRole === requiredRole;
};