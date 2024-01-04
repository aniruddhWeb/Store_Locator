import * as yup from 'yup';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import {
  LocationItemFragment,
  useLocationAllListProvinceForUserQuery,
  useLocationListRegionByProvinceForUserQuery,
  useRegisterUserMutation,
} from '../../generated/graphql';

const validationSchema = yup.object({
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password must have at least 8 characters'),
  email: yup.string().email('Invalid Email Address').required('Required field'),
  firstName: yup.string().required('Required field'),
  lastName: yup.string().required('Required field'),
  username: yup.string().required('Required field'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  country: '',
  province: '',
  region: '',
  password: '',
};

export const useEventRegistrationForm = (
  initialUserRegion?: LocationItemFragment | null,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [agreeCheckbox, setAgreeCheckbox] = useState(false);

  const [registerUser] = useRegisterUserMutation();
  const { data: provinceDataAll } = useLocationAllListProvinceForUserQuery();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      country: initialUserRegion?.province?.country?.plCountryID,
    },
    validationSchema,
    onSubmit: values => {
      setIsLoading(true);
      registerUser({
        variables: {
          input: {
            email: values.email,
            password: values.password,
            username: values.username,
            usrFirstName: values.firstName,
            usrLastName: values.lastName,
            userSubscription: agreeCheckbox,
            usrProvinceID: `${values.province}`,
            usrRegionID: `${values.region}`,
            usrRegistrationSource: 'event_signup',
          },
          wired: agreeCheckbox,
          source: 'eventsignup',
        },
      })
        .then(() => {
          // eslint-disable-next-line no-alert
          alert('Thank you for signing up!');
          window.location.reload();
        })
        .catch((e: any) => setError(e.message))
        .finally(() => setIsLoading(false));
    },
  });

  const provinceData = useMemo(
    () => ({
      locationListProvinceForUser: (
        provinceDataAll?.locationListProvinceForUser || []
      ).filter(item =>
        formik.values.country
          ? Number(item?.country?.plCountryID) === Number(formik.values.country)
          : true,
      ),
    }),
    [formik.values.country, provinceDataAll?.locationListProvinceForUser],
  );

  const { data: regionData } = useLocationListRegionByProvinceForUserQuery({
    variables: {
      provinceId: Number(formik.values.province!),
    },
    skip: !formik.values.province,
  });

  useEffect(() => {
    if ((regionData?.locationListRegionByProvinceForUser || []).length === 1) {
      if (regionData?.locationListRegionByProvinceForUser[0].plRegionID) {
        formik.setFieldValue(
          'region',
          regionData?.locationListRegionByProvinceForUser[0].plRegionID,
        );
      }
    }
  }, [regionData]);

  useEffect(() => {
    formik.setFieldValue('province', '');
    formik.setFieldValue('region', '');
  }, [formik.values.country]);

  const handleKeyPress = useCallback(
    e => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
      if (e.key === 'Enter') {
        if (!Object.values(formik.errors).length) {
          formik.submitForm();
        } else {
          setError('Please fill all fields');
        }
      }
    },
    [formik.submitForm, error, isLoading, formik.errors],
  );

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setError('');
      formik.setFieldTouched(e.target.name);
      return formik.handleChange(e);
    },
    [formik.setFieldValue, formik.handleChange],
  );

  return {
    handleChange,
    formik,
    agreeCheckbox,
    setAgreeCheckbox: () => setAgreeCheckbox(val => !val),
    onPreventDefault,
    handleKeyPress,
    provinceData,
    regionData,
    error,
    isLoading,
  };
};
