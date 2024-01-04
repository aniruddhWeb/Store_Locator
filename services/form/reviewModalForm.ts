import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  BusinessItemFragment,
  ProductItemFragment,
  Review,
  useReviewDeleteMutation,
  useReviewSaveMutation,
} from '../../generated/graphql';
import { getImageLink } from '../../utils/image';

const initialValues = {
  body: '',
};

const validationSchema = yup.object({
  body: yup.string().min(30).max(1000).required(),
});

export const useCreateReview = (
  reviewTo: BusinessItemFragment | ProductItemFragment,
  isOpen?: boolean,
  refresh?: () => void,
  setIsOpen?: any,
) => {
  const [reviewSave] = useReviewSaveMutation();
  const [rating, setRating] = useState<number>(5);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const id = useMemo(() => {
    if ('bizBusinessID' in reviewTo) {
      return reviewTo.bizBusinessID;
    }

    if ('prdProductID' in reviewTo) {
      return reviewTo.prdProductID;
    }

    throw new Error('reviewTo variable is not valid');
  }, [reviewTo]);

  const name = useMemo(() => {
    if ('bizName' in reviewTo) {
      return reviewTo.bizName;
    }

    if ('prdName' in reviewTo) {
      return reviewTo.prdName;
    }

    throw new Error('reviewTo variable is not valid');
  }, [reviewTo]);

  const type = useMemo(() => {
    if ('bizName' in reviewTo) {
      return 'Business';
    }

    return 'Product';
  }, [reviewTo]);

  const image = useMemo(() => {
    return getImageLink(reviewTo.mdaLocalFileName, 100);
  }, [reviewTo?.mdaLocalFileName]);

  const recaptchaRef = useRef();

  const onSendForm = useCallback(async () => {
    // @ts-ignore
    recaptchaRef.current?.execute();
  }, []);

  const onCreate = useCallback(() => {
    if (refresh) {
      refresh();
    }
    setIsOpen(false);
  }, [refresh, setIsOpen]);

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnBlur: false,
    validateOnChange: true,
    initialValues,
    onSubmit: onSendForm,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setError('');
      formik.setFieldTouched(e.target.name);
      return formik.handleChange(e);
    },
    [formik.setFieldValue, formik.handleChange],
  );

  const submit = useCallback(
    (values: { body: string }) => {
      if (processing) return;
      setError('');
      setProcessing(true);
      reviewSave({
        variables: {
          input: {
            rvwAssociateID: id,
            rvwComment: values.body,
            rvwScore: rating,
          },
        },
      })
        .then(() => {
          setError('');
          if (onCreate) {
            onCreate();
          }
        })
        .catch(e => setError(e.message))
        .finally(() => {
          setProcessing(false);
          setRating(5);
          formik.resetForm();
        });
    },
    [processing, id, rating, onCreate, formik.resetForm],
  );

  useEffect(() => {
    if (!isOpen) {
      setProcessing(false);
      setRating(5);
      formik.resetForm();
    }
  }, [isOpen, formik.resetForm]);

  return {
    submit,
    formik,
    name,
    type,
    image,
    processing,
    error,
    rating,
    setRating,
    recaptchaRef,
    handleChange,
  };
};

export const useDeleteReview = (review: Review, onDelete?: () => void) => {
  const [reviewDelete] = useReviewDeleteMutation();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const submit = useCallback(() => {
    if (processing) return;

    setProcessing(true);
    reviewDelete({
      variables: {
        reviewId: review.rvwReviewID,
      },
    })
      .then(() => {
        setError('');
        if (onDelete) {
          onDelete();
        }
      })
      .catch(e => setError(e.message))
      .finally(() => {
        setProcessing(false);
      });
  }, [processing, review, onDelete]);

  return {
    submit,
    processing,
    error,
  };
};
