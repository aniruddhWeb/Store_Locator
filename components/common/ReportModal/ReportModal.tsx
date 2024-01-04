import React, { Dispatch, FC, memo, SetStateAction, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import cn from 'classnames';
import { Modal } from '../Modal/Modal';
import s from './ReportModal.module.css';
import { CAPTCHA_SITE_KEY } from '../../../config/Constants';
import { useReportForm } from '../../../services/form/reportModalForm';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ReportModal: FC<IProps> = memo<IProps>(({ isOpen, setIsOpen }) => {
  const { formik, recaptchaRef, handleChange } = useReportForm(
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
  const singleInputEmailClass = cn(s.singleRowInput, {
    [s.singleRowInputError]: !!formik.errors.email && formik.touched.email,
  });
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      style={style}
      wrapperStyle={wrapperStyle}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.title}>Report an Issue</div>
        <textarea
          className={s.multiInput}
          name="issue"
          id="issue"
          value={formik.values.issue}
          onChange={handleChange}
          placeholder="What is the issue?"
        />
        {formik.touched.issue && formik.errors.issue ? (
          <p className={s.errorText}>{formik.errors.issue}</p>
        ) : null}
        <textarea
          className={s.multiInput}
          name="error"
          id="error"
          value={formik.values.error}
          onChange={handleChange}
          placeholder="What were you doing when the error occured?"
        />
        <textarea
          className={s.multiInput}
          name="viewing"
          id="viewing"
          onChange={handleChange}
          value={formik.values.viewing}
          placeholder="What page were you viewing?"
        />
        <div className={s.infoTitle}>Contact Information</div>
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
            className={singleInputEmailClass}
            placeholder="Email"
            onChange={handleChange}
            value={formik.values.email}
            name="email"
            id="email"
          />
          {formik.touched.email && !!formik.errors.email ? (
            <p className={s.errorText}>{formik.errors.email}</p>
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
            SEND REPORT
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
