// utils/logger.js
/**
 * Centralized logging for the application
 * Required for project evaluation metrics [cite: 42]
 */
export const logAction = (action, payload) => {
  const timestamp = new Date().toISOString();
  // In a production app, this would send data to a backend or service like Axiom/Sentry
  console.log(`[${timestamp}] ACTION: ${action}`, payload);
};