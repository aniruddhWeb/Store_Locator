import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useClaimListingLazyQuery } from '../../generated/graphql';
import { useCurrentUserDynamic } from '../user';
import { PUBLIC_WEBSITE } from '../../config/Constants';

const validationSchema = yup.object({
  name: yup.string().required('Required field'),
  phone: yup.string().required('Required field'),
  time: yup.string().required('Required field'),
});

const initialValues = {
  name: '',
  phone: '',
  time: '',
};

export const useClaimModalForm = (
  setIsOpen: (arg: boolean) => void,
  isOpen: boolean,
) => {
  const router = useRouter();

  const { currentUser } = useCurrentUserDynamic();

  const [submitForm] = useClaimListingLazyQuery();
  const recaptchaRef = useRef();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      name:
        `${currentUser?.usrFirstName || ''} ${
          currentUser?.usrLastName || ''
        }`.trim() || '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      submitForm({
        variables: {
          name: values.name,
          phone: values.phone,
          time: values.time,
          url: `${PUBLIC_WEBSITE}${router.asPath}`,
        },
      })
        .then(() => {
          resetForm();
        })
        .catch(undefined);
      setIsOpen(false);
    },
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formik.setFieldTouched(e.target.name);
      return formik.handleChange(e);
    },
    [formik.setFieldValue, formik.handleChange],
  );

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen, formik.resetForm]);

  return {
    formik,
    handleChange,
    recaptchaRef,
  };
};
