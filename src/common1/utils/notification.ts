import { notification } from 'antd';

export const triggerNotificationSuccess = (config: any) => {
  return notification.success({
    ...config,
    key: config.key,
    message: config.message,
    description: config.description,
    style: config.style || { backgroundColor: '#F6FFED' },
  });
};

export const triggerNotificationFailure = (config: any) => {
  return notification.error({
    ...config,
    key: config.key,
    message: config.message,
    description: config.description,
    style: config.style || { backgroundColor: '#FFF1F0' },
  });
};

export const triggerNotificationWarning = (config: any) => {
  return notification.warning({
    ...config,
    key: config.key,
    message: config.message,
    description: config.description,
    style: config.style || { backgroundColor: '#FFFBE6' },
  });
};
