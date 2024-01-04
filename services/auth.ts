import { apolloClient } from '../api/client';
import {
  ResendVerificationDocument,
  ResendVerificationMutation,
  ResendVerificationMutationVariables,
  SubscribeMailDocument,
  SubscribeMailQuery,
  SubscribeMailQueryVariables,
  UserVerificationDocument,
  UserVerificationMutation,
  UserVerificationMutationVariables,
} from '../generated/graphql';

export const useUserEmailVerify = async (code: string, userId: string) => {
  const { data } = await apolloClient.mutate<
    UserVerificationMutation,
    UserVerificationMutationVariables
  >({
    mutation: UserVerificationDocument,
    fetchPolicy: 'no-cache',
    variables: {
      id: userId,
      code,
    },
  });
  return !!data?.userVerification;
};

export const useUserEmailResend = async (userId: string) => {
  const { data } = await apolloClient.mutate<
    ResendVerificationMutation,
    ResendVerificationMutationVariables
  >({
    mutation: ResendVerificationDocument,
    fetchPolicy: 'no-cache',
    variables: {
      userId,
    },
  });
  return !!data?.resendEmailConfirm;
};

export const useUserSubscription = async (
  name: string,
  email: string,
  regionId: string,
) => {
  const { data } = await apolloClient.query<
    SubscribeMailQuery,
    SubscribeMailQueryVariables
  >({
    query: SubscribeMailDocument,
    fetchPolicy: 'no-cache',
    variables: {
      name,
      email,
      userRegionID: regionId,
    },
  });
  return true;
};
