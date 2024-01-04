import { useSendFeedbackLazyQuery } from 'generated/graphql';
import { useCallback } from 'react';

export const useSendFeedback = () => {
  const [sendFeedback, { data, loading }] = useSendFeedbackLazyQuery();

  const send = useCallback(
    (message: string, questions: Array<string[]>, email: string) => {
      sendFeedback({
        variables: { message, questions, email },
      });
    },
    [],
  );

  return { send, data, isLoading: loading };
};
