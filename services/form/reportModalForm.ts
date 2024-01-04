import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PUBLIC_WEBSITE } from '../../config/Constants';
import { useCurrentLocationDynamic } from '../location';
import { useCurrentUserDynamic } from '../user';
import { apolloClient } from '../../api/client';
import {
  ReportIssueDocument,
  ReportIssueQuery,
  ReportIssueQueryVariables,
} from '../../generated/app';

const validationSchema = yup.object({
  name: yup.string().required('Required field'),
  email: yup.string().email('Invalid Email Address').required('Required field'),
  issue: yup.string().required('Required field'),
});

const initialValues = {
  issue: '',
  error: '',
  viewing: '',
  name: '',
  email: '',
};

export const useReportForm = (
  setIsOpen: (arg: boolean) => void,
  isOpen: boolean,
) => {
  const router = useRouter();

  const { currentUser } = useCurrentUserDynamic();
  const { selectedLocation } = useCurrentLocationDynamic();

  const recaptchaRef = useRef();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      email: currentUser?.email || '',
      name:
        `${currentUser?.usrFirstName || ''} ${
          currentUser?.usrLastName || ''
        }`.trim() || '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      apolloClient
        .query<ReportIssueQuery, ReportIssueQueryVariables>({
          query: ReportIssueDocument,
          fetchPolicy: 'no-cache',
          variables: {
            name: values.name,
            emailFrom: values.email,
            page: values.viewing,
            description: values.issue,
            stepsReproduce: values.error,
            regionID: `${selectedLocation!.plRegionID}`,
            city: selectedLocation!.plName,
            province: selectedLocation!.province.plInitials,
            originalPage: `${PUBLIC_WEBSITE}${router.asPath}`,
          },
        })
        .then(() => {
          resetForm();
          setTimeout(() => {
            window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
          }, 600);
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
