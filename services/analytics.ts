import { useCallback, useState } from 'react';
import {
  useAnalyticsBannerClickMutation,
  useAnalyticsSaveMutation,
} from '../generated/graphql';
import { getUserClientIpDynamic } from './location';

export enum AnalyticsAction {
  WebView = 'view',
  DealView = 'view',
  TopPickView = 'top',
  ProductMapBusinessView = 'productMapView',
  VerifiedView = 'verified',
  Engagements = 'engagement',
  Share = 'engagementSharenow',
}

export const useSaveAnalytics = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [save] = useAnalyticsSaveMutation();

  const saveAnalytics = useCallback(
    (anaBusinessID: string, anaUserAction: string, dealId?: any) => {
      setIsLoading(true);
      save({
        variables: {
          input: {
            anaBusinessID,
            anaUserAction,
            anaDealID: dealId || null,
          },
        },
      })
        .then(undefined)
        .catch(undefined)
        .finally(() => setIsLoading(false));
    },
    [save],
  );

  return {
    isLoading,
    saveAnalytics,
  };
};

export const useBannerClickAnalytics = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [save] = useAnalyticsBannerClickMutation();

  const saveClickAnalytics = useCallback(
    async (anaUserAction: string) => {
      setIsLoading(true);
      const userIP = await getUserClientIpDynamic();
      await save({
        variables: {
          userAction: anaUserAction,
          userIP,
        },
      });
      setIsLoading(false);
    },
    [save],
  );

  return {
    isLoading,
    saveClickAnalytics,
  };
};
