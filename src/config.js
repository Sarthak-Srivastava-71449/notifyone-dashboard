// Keys exposed on client for each workspace
export const allowedConfigs = {
  dmg: [
    'serverDomain',
    'appUrl',
    'login',
    'userAppUrlPort',
    'sentry',
    'loginRoute',
    'serverDomain',
    'dmgRedirectHost',
    'userRole',
    'userInfoRoute',
    'logoutRoute',
    'usermanagementURL',
    'gumletS3BaseUrl',
  ],
  pricing: [
    'serverDomain',
    'appUrl',
    'login',
    'userAppUrlPort',
    'sentry',
    'loginRoute',
    'dmgRedirectHost',
    'userRole',
    'userInfoRoute',
    'logoutRoute',
    'usermanagementURL',
  ],
  platform: [
    'appUrl',
    'emails',
    'google_client_id',
    'loginRoute',
    'platformAppUrlPort',
    'sentry',
    'serverDomain',
    'userInfoRoute',
    'logoutRoute',
    'usermanagementURL',
  ],
  'vendor-hub': [
    'appUrl',
    'login',
    'userAppUrlPort',
    'sentry',
    'cenopsBaseApiUrl',
    'phoenixBaseApiUrl',
    'citiesListJsonUrl',
    'etaServiceBaseApiUrl',
    'loginRoute',
    'serverDomain',
    'userRole',
    'userInfoRoute',
    'logoutRoute',
    'usermanagementURL',
    'rehashWidget',
    'bulkCSVTemplate',
  ],
  diagnostics: [
    'appUrl',
    'labsAdmin',
    'labsApi',
    'labsApiVersion',
    'userAppUrlPort',
    'login',
    'sentry',
    'serverDomain',
    'tata1mgLogo',
    'useMockAPI',
  ],
  orders: [
    'appName',
    'appUrl',
    'dmgRedirectHost',
    'google_client_id',
    'login',
    'loginRoute',
    'logoutRoute',
    'nodeIdentifier',
    'sentry',
    'serverDomain',
    'userAppUrlPort',
    'userInfoRoute',
    'userRole',
    'usermanagementURL',
    'patientManagementSourceListUrl',
    'onemgProdHost',
  ],
  onboarding: [
    'appName',
    'appUrl',
    'login',
    'userAppUrlPort',
    'sentry',
    'loginRoute',
    'serverDomain',
    'nodeIdentifier',
    'dmgRedirectHost',
    'userRole',
    'userInfoRoute',
    'usermanagementURL',
  ],
  communication: [
    'appUrl',
    'communicationAppUrlPort',
    'emailEvents',
    'emailEventsUpdate',
    'platformLogin',
    'previewEmailEvent',
    'pushNotificationEvents',
    'pushNotificationEventsUpdate',
    'sentry',
    'serverDomain',
    'smsEvents',
    'smsEventsUpdate',
    'tata1mgLogo',
    'useMockAPI',
    'whatsAppEvents',
    'whatsAppEventsUpdate',
    'ravenAppEndpoint',
  ],
  payment: [
    'appUrl',
    'login',
    'paymentAppUrlPort',
    'paymentItem',
    'refundOrder',
    'refundOrderSearch',
    'wallet',
    'sentry',
    'serverDomain',
    'tata1mgLogo',
    'useMockAPI',
  ],
  user: [
    'appUrl',
    'login',
    'userAppUrlPort',
    'sentry',
    'loginRoute',
    'serverDomain',
    'userRole',
    'userInfoRoute',
    'usermanagementURL',
  ],
  healthrecords: [
    'appUrl',
    'healthRecordAdmin',
    'healthRecordApiVersion',
    'userAppUrlPort',
    'login',
    'sentry',
    'serverDomain',
    'tata1mgLogo',
    'useMockAPI',
  ],
};

/**
 * Filter keys of an object based on allowedkeys
 *
 * @param object Object including multiple keys
 * @param allowedKeys Array of keys present in "object" that are allowed to exist
 * @returns New Object after filtering out all keys not present in allowedKeys
 */
export const filterConfig = (object, allowedKeys = []) => {
  return allowedKeys.reduce((keyMap, key) => {
    keyMap[key] = JSON.stringify(object[key]);
    return keyMap;
  }, {});
};
