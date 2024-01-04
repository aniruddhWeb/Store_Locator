import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useLoginUserMutation } from '../../generated/graphql';
import { setCookie } from '../cookie';
import { SESSION_DOMAIN } from '../../config/Constants';
import { Route } from '../../config/Routes';

const validationSchema = yup.object({
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password must have at least 8 characters'),
  email: yup.string().email('Invalid Email Address').required('Required field'),
});

const initialValues = {
  password: '',
  email: '',
};

export const useLoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonError, setButtonError] = useState<string>('');

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      setIsLoading(true);
      loginUser({
        variables: {
          email: values.email,
          password: values.password,
        },
      })
        .then(response => {
          if (
            response?.data?.login?.token &&
            response?.data?.login?.currentUser?.usrUserID
          ) {
            setCookie('leafythings_session', response?.data?.login?.token);
            setCookie(
              'leafythings_session_user',
              response?.data?.login?.currentUser?.usrUserID,
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
            const redirect =
              redirectFromTo.current || Cookies.get('redirectTo');
            if (redirect) {
              router.push(redirect);
            } else {
              router.push(Route.Root);
            }
          } else {
            setButtonError('Authorization error: no token received');
          }
        })
        .catch(e => setButtonError(e.message))
        .finally(() => setIsLoading(false));
    },
  });

  useEffect(() => {
    setButtonError('');
  }, [formik.values.email, formik.values.password]);
  const [loginUser] = useLoginUserMutation();

  const redirectFromTo = useRef<string | undefined | null>(
    Cookies.get('redirectTo') || null,
  );
  const handleKeyPress = useCallback(
    e => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
      if (e.key === 'Enter') {
        if (!Object.values(formik.errors).length) {
          formik.submitForm();
        } else {
          setButtonError('Please fill all fields');
        }
      }
    },
    [formik.submitForm, buttonError, isLoading, formik.errors],
  );

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    formik.setFieldTouched(e.target.name);
    return formik.handleChange(e);
  };

  return {
    onPreventDefault,
    handleKeyPress,
    handleChange,
    buttonError,
    isLoading,
    formik,
  };
};
