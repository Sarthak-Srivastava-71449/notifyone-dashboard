/**
 * Unique identifier for each service. This identifier will help to
 * proxy pass a request to appropriate service
 */
// PAYMENT_DASHBOARD: '/pharmacy_app/payment',
export const SERVICE_IDENTIFIER = {
  WALLET: '/wallet_api',
  NOTIFICATION_CORE: '/notification_core',
  PHARMACY: '/pharmacy_api',
  PAYMENT_DASHBOARD: '/pharmacy_app/payment',
  WEBSERVICE: '/webservice_api',
  PHARMACY_APP: '/pharmacy_app/v2',
  PHARMACY_APP_V1: '/pharmacy_app',
  LARA_ADMIN: '/lara',
  USER_ADMIN: '/user/admin',
  LABS_ADMIN: '/labs',
  LABS: '/labs_api',
  LABS_ADMIN_API: '/labs-api',
  DMG_ADMIN_GENERIC_API: '/dmg-generic',
  DMG_ADMIN_DATA_SERVICE_API: '/dmg-data-service',
  VENDOR_HUB_CENOPS_API: '/vendor_cenops_api',
  VENDOR_HUB_PHOENIX_API: '/vendor_phoenix_api',
  VENDOR_HUB_ETA_SERVICE_API: '/vendor_eta_service_api',
  PRICING_IDENTIFIER: '/pricing-api',
  ONBOARDING: '/onboarding-api',
  ORDERS: '/orders-api',
  AUTH: '/auth-api',
  HEALTH_RECORD_ADMIN: '/hra',
};
