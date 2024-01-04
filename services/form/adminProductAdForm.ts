import { ChangeEvent, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  ProductType,
  useSaveProductTypePriceInMutation,
} from '../../generated/graphql';

const validationSchema = yup.object({
  brandCost: yup
    .number()
    .moreThan(0, 'Should be more than 0')
    .required('Required field'),
  deliveryCost: yup
    .number()
    .moreThan(0, 'Should be more than 0')
    .required('Required field'),
  mailOrderCost: yup
    .number()
    .moreThan(0, 'Should be more than 0')
    .required('Required field'),
  dispensaryCost: yup
    .number()
    .moreThan(0, 'Should be more than 0')
    .required('Required field'),
});

const initialValues = {
  brandCost: '',
  deliveryCost: '',
  mailOrderCost: '',
  dispensaryCost: '',
};

export const useAdminProductAdForm = (
  productAd: ProductType | null | undefined,
  setIsOpen: (arg: boolean) => void,
  isOpen: boolean,
  refresh?: () => void,
) => {
  const [saveProductTypePriceIn] = useSaveProductTypePriceInMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      brandCost: `${productAd?.typePriceBrand || ''}`,
      deliveryCost: `${productAd?.typePriceDelivery || ''}`,
      mailOrderCost: `${productAd?.typePriceMail || ''}`,
      dispensaryCost: `${productAd?.typePriceDispensary || ''}`,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (productAd?.id) {
        saveProductTypePriceIn({
          variables: {
            input: [
              {
                id: productAd?.id,
                typePriceBrand: +values.brandCost,
                typePriceMail: +values.mailOrderCost,
                typePriceDelivery: +values.deliveryCost,
                typePriceDispensary: +values.dispensaryCost,
              },
            ],
          },
        })
          .then(() => {
            if (refresh) {
              refresh();
            }
            resetForm();
          })
          .catch(undefined);
      }
      setIsOpen(false);
    },
  });

  useEffect(() => {
    if (productAd?.id) {
      formik.setValues({
        brandCost: `${productAd?.typePriceBrand || ''}`,
        deliveryCost: `${productAd?.typePriceDelivery || ''}`,
        mailOrderCost: `${productAd?.typePriceMail || ''}`,
        dispensaryCost: `${productAd?.typePriceDispensary || ''}`,
      });
    }
  }, [productAd]);

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
  };
};
