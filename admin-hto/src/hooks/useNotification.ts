import { APP_CONFIG } from '@/consts/path';
import { notification } from 'antd';

const useNotification = () => {
  const triggerNotification = (type : string, message : string = "", desc : string = "" , key : any = 0) => {
    if (type === 'destroy') {
      notification.destroy(key);
      return;
    }
    const config : any = APP_CONFIG.notificationConfig;

    function getConfig() {
      if(message) config.message = message;
      if(desc) config.description = desc;

      return config
    }

    switch (type) {
      case 'success':
        notification.success(getConfig());
        break;
      case 'error':
        notification.error(getConfig());
        break;
      case 'info':
        notification.info(getConfig());
        break;
      case 'warning':
        notification.warning(getConfig());
        break;
      case 'open':
        notification.open(getConfig());
        break;
      default:
        console.warn('Unsupported notification type:', type);
    }
  };

  return triggerNotification;
};

export default useNotification;