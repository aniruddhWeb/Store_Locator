import * as yup from 'yup';
import { ChangeEvent, useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { useSendPasswordEmailMutation } from '../../generated/graphql';

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email Address').required('Required field'),
});

const initialValues = {
  email: '',
};

export const useResetForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetError, setResetError] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [sendPasswordEmail] = useSendPasswordEmailMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: values => {
      setIsLoading(true);
      sendPasswordEmail({
        variables: {
          email: values.email,
        },
      })
        .then(response => {
          if (response?.data?.resetPassword) {
            setEmailSent(true);
          } else {
            setResetError('Authorization error: no token received');
          }
        })
        .catch(e => setResetError(e.message))
        .finally(() => setIsLoading(false));
    },
  });

  const handleKeyPress = useCallback(
    e => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
      if (e.key === 'Enter') {
        if (formik.isValid) {
          formik.submitForm().finally(() => setIsLoading(false));
        } else {
          setResetError('Please fill all fields');
        }
      }
    },
    [emailSent, formik.submitForm, formik.isValid, resetError, isLoading],
  );

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setResetError('');
      formik.setFieldTouched(e.target.name);
      return formik.handleChange(e);
    },
    [formik.setFieldTouched, formik.handleChange],
  );

  return {
    handleChange,
    onPreventDefault,
    handleKeyPress,
    resetError,
    emailSent,
    isLoading,
    formik,
  };
};
