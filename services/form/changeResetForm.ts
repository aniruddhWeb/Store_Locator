import * as yup from 'yup';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import { useResetPasswordMutation } from '../../generated/graphql';
import { setCookie } from '../cookie';
import { SESSION_DOMAIN } from '../../config/Constants';
import { Route } from '../../config/Routes';

const validationSchema = yup.object({
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password must have at least 8 characters'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  email: yup.string().email('Invalid Email Address').required('Required field'),
});

const initialValues = {
  password: '',
  email: '',
  repeatPassword: '',
};

export const useChangeReset = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonError, setButtonError] = useState<string>('');
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);
  const [resetPassword] = useResetPasswordMutation();

  const token = useMemo(
    () => router?.query?.token as string | null | undefined,
    [router?.query],
  );

  useEffect(() => {
    if (router?.query?.email) {
      formik.setFieldValue(
        'email',
        ((router?.query?.email as string) || '').replace(/ /g, '+'),
      );
    }
  }, [router?.query?.email]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: values => {
      setIsLoading(true);
      resetPassword({
        variables: {
          email: values.email,
          token: token || '',
          password: values.password,
        },
      })
        .then(response => {
          if (
            response?.data?.newPassword?.token &&
            response?.data?.newPassword?.currentUser?.usrUserID
          ) {
            setPasswordChanged(true);
            setCookie(
              'leafythings_session',
              response?.data?.newPassword?.token,
            );
            setCookie(
              'leafythings_session_user',
              response?.data?.newPassword?.currentUser?.usrUserID,
            );
            Cookies.remove('leafythings_session_logout', {
              domain: SESSION_DOMAIN,
            });
            Cookies.remove('leafythings_session_id', {
              domain: SESSION_DOMAIN,
            });
            Cookies.remove('lastUserToken', {
              domain: SESSION_DOMAIN,
            });
            Cookies.remove('lastUserID', {
              domain: SESSION_DOMAIN,
            });
            Cookies.remove('lastUserName', {
              domain: SESSION_DOMAIN,
            });
            router.push(Route.Root);
          } else {
            setButtonError('Authorization error: no token received');
          }
        })
        .catch(e => setButtonError(e.message))
        .finally(() => setIsLoading(false));
    },
  });

  const handleKeyPress = useCallback(
    e => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
      if (e.key === 'Enter') {
        if (
          !(
            !!buttonError ||
            passwordChanged ||
            !token ||
            isLoading ||
            !Object.values(formik.errors).length
          )
        ) {
          formik.submitForm();
        } else {
          setButtonError('Please fill all fields');
        }
      }
    },
    [formik.submitForm, token, formik.errors, buttonError],
  );

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setButtonError('');
      formik.setFieldTouched(e.target.name);
      return formik.handleChange(e);
    },
    [formik.setFieldTouched, formik.handleChange],
  );

  return {
    handleChange,
    onPreventDefault,
    handleKeyPress,
    buttonError,
    passwordChanged,
    token,
    isLoading,
    formik,
  };
};
