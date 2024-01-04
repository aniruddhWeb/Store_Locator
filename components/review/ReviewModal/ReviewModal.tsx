import React, { Dispatch, FC, memo, SetStateAction } from 'react';
import StarRating from 'react-star-ratings';
import ReCAPTCHA from 'react-google-recaptcha';
import { Modal } from '../../common/Modal/Modal';
import s from './ReviewModal.module.css';
import { Button } from '../../common/Button/Button';
import {
  BusinessItemFragment,
  ProductItemFragment,
} from '../../../generated/graphql';
import { CAPTCHA_SITE_KEY } from '../../../config/Constants';
import { useCreateReview } from '../../../services/form/reviewModalForm';
import { setDefaultImageOnError } from '../../../utils/image';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  reviewTo: BusinessItemFragment | ProductItemFragment;
  refresh?: () => void;
}

export const ReviewModal: FC<Props> = memo<Props>(
  ({ isOpen, setIsOpen, reviewTo, refresh }) => {
    const {
      formik,
      name,
      setRating,
      rating,
      processing,
      type,
      image,
      error,
      submit,
      recaptchaRef,
      handleChange,
    } = useCreateReview(reviewTo, isOpen, refresh, setIsOpen);

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} style={style}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <div className={s.title}>Submit a Review</div>
          <div className={s.text}>
            For{' '}
            <img
              className={s.icon}
              src={image}
              onError={setDefaultImageOnError}
              alt={name}
            />{' '}
            {name}
          </div>
          <label className={s.input}>
            <textarea
              name="body"
              id="body"
              required
              value={formik.values.body}
              maxLength={1000}
              onChange={handleChange}
              className={s.textarea}
            />
            <span className={s.label}>Leave your review</span>
            <span className={s.count}>{formik.values.body.length}/1000</span>
            <div className={s.appearance} />
          </label>
          <p className={s.question}>How would you rate this {type}?</p>
          <div className={s.rating}>
            <StarRating
              numberOfStars={5}
              starDimension="28px"
              starSpacing="2px"
              rating={rating || 0}
              starHoverColor="#DFB300"
              starRatedColor="#DFB300"
              starEmptyColor="#E4E9E8"
              changeRating={setRating}
            />
          </div>
          {error && <p className={s.error}>{error}</p>}
          <Button
            disabled={!formik.isValid}
            buttonText={processing ? 'Saving...' : 'Submit'}
            onPress={formik.handleSubmit}
          />
          <div className={s.cancel} onClick={() => setIsOpen(false)}>
            Cancel
          </div>
          <ReCAPTCHA
            ref={recaptchaRef as any}
            sitekey={CAPTCHA_SITE_KEY}
            onChange={() => submit(formik.values)}
            size="invisible"
            badge="inline"
          />
        </form>
      </Modal>
    );
  },
);

const style: any = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
  },
  content: {},
};
