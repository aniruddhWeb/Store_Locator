import { useBusinessAdvertisementAnalyticsQuery } from 'generated/graphql';
import { useCurrentUserDynamic } from '../../services/user';

export const useBusinessAdAnalytics = (startDate: string, endDate: string) => {
  const userProps = useCurrentUserDynamic();

  const { data: userBudgetData } = useBusinessAdvertisementAnalyticsQuery({
    fetchPolicy: 'no-cache',
    skip: !userProps?.currentUser?.usrUserID || !startDate || !endDate,
    variables: {
      userId: userProps?.currentUser?.usrUserID || '',
      startDate,
      endDate,
    },
  });

  return {
    positive: userBudgetData?.userAdPositiveTransactionsByUserId || [],
    negative: userBudgetData?.userAdNegativeTransactionsByUserId || [],
    budget: userBudgetData?.userAdBudgetByUserIdByDate || [],
  };
};
