import * as yup from 'yup';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import {
  LocationItemFragment,
  useLocationAllListProvinceForUserQuery,
  useLocationListRegionByProvinceForUserQuery,
  useRegisterUserMutation,
} from '../../generated/graphql';
import { setCookie } from '../cookie';
import { SESSION_DOMAIN } from '../../config/Constants';
import { Route } from '../../config/Routes';

export const types = [
  'Concentrates',
  'Tinctures',
  'Flower',
  'Edibles',
  'Topical Creams',
  'Capsules',
];
export const reasons = [
  'Stress',
  'Depression',
  'Anxiety',
  'Creativity',
  'Muscle tension',
  'Focus',
  'Sleep',
  'Chronic pain',
];
export const considerations = [
  'Price',
  'Quality',
  'THC Content',
  'Delivery Options',
  'CBD Content',
  'Brand',
];
export const participations = [
  'Have a business listed on Google',
  'Consumer',
  'Budtender',
  'Retail Management',
  'Cannabis Legal Services',
  'Education / Training',
  'Security',
  'Compliance',
  'Government',
  'Regulatory',
  'ACMPR Grower',
  'Licensed Producer Grower',
  'Lab Testing',
  'Automated Production Machines',
  'Senior Quality Assurance',
  'Design and Compliant Packaging',
  'Cannabis Marketing',
  'Millwork and Retail Construction',
  'POS Software',
  'POS Devices and Hardware',
  'Social Media',
  'Events',
  'Extractions',
  'Tissue Culture Specialist',
  'Menu and Sign Board Companies',
  'Cannabis Production',
  'Consumer Packages Goods Design',
  'Other',
];

export const deliveryOptions = ['Delivery', 'Mail Order', 'In-store'];

const validationSchema = yup.object({
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password must have at least 8 characters'),
  email: yup.string().email('Invalid Email Address').required('Required field'),
});

const initialValues = {
  username: '',
  country: '',
  province: '',
  region: '',
  email: '',
  password: '',
};

export const useRegistrationForm = (
  initialUserRegion?: LocationItemFragment | null,
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const agreeCheckbox = useCheckboxState({ state: '' });
  const businessRegisterCheckbox = useCheckboxState({
    state: router?.query?.next === 'business' ? 'true' : '',
  });
  const redirectFromTo = useRef<string | undefined | null>(
    Cookies.get('redirectTo') || null,
  );

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
            userSubscription: !!agreeCheckbox.state,
            mailPreferences: '',
            usrProvinceID: `${values.province}`,
            usrRegionID: `${values.region}`,
          },
          wired: router.query.campaign_name === 'wired',
        },
      })
        .then(response => {
          if (
            response?.data?.userRegister?.token &&
            response?.data?.userRegister?.currentUser?.usrUserID
          ) {
            setCookie(
              'leafythings_session',
              response?.data?.userRegister?.token,
            );
            setCookie(
              'leafythings_session_user',
              response?.data?.userRegister?.currentUser?.usrUserID,
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
            if (businessRegisterCheckbox.state) {
              router.push(Route.RegisterBusiness);
            } else {
              const redirect =
                redirectFromTo.current || Cookies.get('redirectTo');
              if (redirect) {
                router.push(redirect);
              } else {
                router.push(Route.Root);
              }
            }
          } else {
            setError('Authorization error: no token received');
          }
        })
        .catch(e => setError(e.message))
        .finally(() => setIsLoading(false));
    },
  });

  const { data: provinceDataAll } = useLocationAllListProvinceForUserQuery();
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
  const [registerUser] = useRegisterUserMutation();

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
    onPreventDefault,
    handleKeyPress,
    provinceData,
    regionData,
    businessRegisterCheckbox,
    error,
    isLoading,
  };
};

export const useCheckboxState = (props?: { state: string[] | string }) => {
  const [state, setState] = useState<string[] | string>(props?.state || '');

  const onChange = useCallback(
    (e: any) => {
      if (Array.isArray(state)) {
        if (state.includes(e.target.value)) {
          setState(state.filter(item => item !== e.target.value));
        } else {
          setState([...state, e.target.value]);
        }
      } else if (e.target.value) {
        setState('');
      } else {
        setState('true');
      }
    },
    [state],
  );

  return {
    onChange,
    state,
    setState,
  };
};
