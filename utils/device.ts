import { GetServerSidePropsContext } from 'next';
import { hasWindow } from './window';

export const useDeviceDetect = (context?: GetServerSidePropsContext) => {
  let userAgent;
  if (context?.req) {
    userAgent = context.req.headers['user-agent'];
  } else if (hasWindow) {
    userAgent = navigator.userAgent;
  }

  const isMobile = Boolean(
    userAgent?.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
    ),
  );

  const isLightHouse = Boolean(userAgent?.includes('Chrome-Lighthouse'));

  return {
    isLightHouse,
    isMobile,
  };
};
