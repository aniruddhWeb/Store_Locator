import { useProductAdBudgetQuery } from 'generated/graphql';

export const useBusinessAdBudget = () => {
  const { data: productBudgetData } = useProductAdBudgetQuery({
    fetchPolicy: 'no-cache',
  });

  return productBudgetData?.userAdBudgetByUserId || 0;
};
