import { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { apolloClient } from '../../api/client';
import {
  SubscribeMailDocument,
  SubscribeMailQuery,
  SubscribeMailQueryVariables,
} from '../../generated/graphql';
import { Props } from '../../components/common/MailPop/MailPop';
import { useCheckboxState } from './registrationForm';
import { useCurrentLocationDynamic } from '../location';
import { useCurrentUserDynamic } from '../user';

export const useMailPopForm = (props: Props) => {
  const typesCheckbox = useCheckboxState({ state: [] });
  const deliveryCheckbox = useCheckboxState({ state: [] });
  const participationCheckbox = useCheckboxState({ state: [] });

  const { currentUser } = useCurrentUserDynamic();
  const { selectedLocation } = useCurrentLocationDynamic();

  const [error, setError] = useState<string>('');

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: currentUser?.email || '',
      username:
        `${currentUser?.usrFirstName || ''} ${
          currentUser?.usrLastName || ''
        }`.trim() || '',
    },
    enableReinitialize: true,
    onSubmit: values =>
      apolloClient
        .query<SubscribeMailQuery, SubscribeMailQueryVariables>({
          query: SubscribeMailDocument,
          variables: {
            email: values.email,
            name: values.username,
            mailPreferences: ((typesCheckbox.state as string[]) || [])
              .concat(deliveryCheckbox.state as string[])
              .map(item => item.replace(' ', '_'))
              .join(' '),
            userRegionID: selectedLocation?.plRegionID
              ? `${selectedLocation?.plRegionID}`
              : null,
          },
        })
        .then(response => {
          if (response?.data?.userSubscription) {
            props.closeMailPop();
          }
        })
        .catch(e => {
          setError(e.message);
        }),
  });

  return {
    formik,
    onPreventDefault,
    error,
    typesCheckbox,
    deliveryCheckbox,
    participationCheckbox,
  };
};
