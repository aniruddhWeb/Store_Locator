import React, { Dispatch, FC, memo, SetStateAction, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import cn from 'classnames';
import { Modal } from '../Modal/Modal';
import s from './ClaimModal.module.css';
import { CAPTCHA_SITE_KEY } from '../../../config/Constants';
import { useClaimModalForm } from '../../../services/form/claimModalForm';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ClaimModal: FC<IProps> = memo<IProps>(({ isOpen, setIsOpen }) => {
  const { formik, recaptchaRef, handleChange } = useClaimModalForm(
    setIsOpen,
    isOpen,
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isOpen]);

  const buttonClass = cn(s.reportButton, {
    [s.enabledButton]:
      formik.isValid && Object.values(formik.touched).length > 0,
  });
  const singleInputNameClass = cn(s.singleRowInput, {
    [s.singleRowInputError]: !!formik.errors.name && formik.touched.name,
  });
  const singleInputPhoneClass = cn(s.singleRowInput, {
    [s.singleRowInputError]: !!formik.errors.phone && formik.touched.phone,
  });
  const singleInputTimeClass = cn(s.singleRowInput, {
    [s.singleRowInputError]: !!formik.errors.time && formik.touched.time,
  });

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      style={style}
      wrapperStyle={wrapperStyle}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.title}>Claim this listing</div>
        <div className={s.inputWrapper}>
          <input
            className={singleInputNameClass}
            name="name"
            id="name"
            onChange={handleChange}
            value={formik.values.name}
            placeholder="Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <p className={s.errorText}>{formik.errors.name}</p>
          ) : null}
        </div>
        <div className={s.inputWrapper}>
          <input
            className={singleInputPhoneClass}
            placeholder="Phone number"
            onChange={handleChange}
            value={formik.values.phone}
            name="phone"
            id="phone"
          />
          {formik.touched.phone && !!formik.errors.phone ? (
            <p className={s.errorText}>{formik.errors.phone}</p>
          ) : null}
        </div>
        <div className={s.inputWrapper}>
          <input
            className={singleInputTimeClass}
            placeholder="What is preferred time to call you?"
            onChange={handleChange}
            value={formik.values.time}
            name="time"
            id="time"
          />
          {formik.touched.time && !!formik.errors.time ? (
            <p className={s.errorText}>{formik.errors.time}</p>
          ) : null}
        </div>
        <div className={s.recaptchaWrapper}>
          <ReCAPTCHA
            ref={recaptchaRef as any}
            sitekey={CAPTCHA_SITE_KEY}
            size="invisible"
            badge="inline"
          />
        </div>
        <div className={s.buttonWrapper}>
          <button type="submit" className={buttonClass}>
            SEND REQUEST
          </button>
        </div>
      </form>
    </Modal>
  );
});

const style: any = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
  },
  content: {},
};

const wrapperStyle = {
  overflowY: 'scroll',
  overflowX: 'hidden',
};
