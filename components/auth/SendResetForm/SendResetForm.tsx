import React from 'react';
import cn from 'classnames';
import s from './SendResetForm.module.css';
import { Button } from '../../common/Button/Button';
import { useResetForm } from '../../../services/form/sendResetForm';

export const SendResetForm = React.memo(() => {
  const {
    handleChange,
    onPreventDefault,
    handleKeyPress,
    resetError,
    emailSent,
    isLoading,
    formik,
  } = useResetForm();

  const singleInputClass = cn(s.singleInput, {
    [s.singleInputError]: !!formik.errors.email && formik.touched.email,
  });

  return (
    <form className={s.root} onSubmit={formik.handleSubmit}>
      <h1 className="displayNone">Reset Password</h1>
      <div className={s.main}>
        <div className={s.title}>Reset Password</div>
        <input
          name="email"
          id="email"
          className={singleInputClass}
          placeholder="Email"
          value={formik.values.email}
          type="email"
          autoComplete="off"
          onChange={handleChange}
          onClick={onPreventDefault}
          onKeyPress={handleKeyPress}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className={s.errorText}>{formik.errors.email}</p>
        ) : null}
        <Button
          onPress={formik.handleSubmit}
          buttonStyle={buttonStyle}
          error={!!resetError}
          success={emailSent}
          disabled={!formik.isValid}
          buttonText={
            resetError ||
            (emailSent
              ? 'Password Reset Link Sent!'
              : isLoading
              ? 'Sending...'
              : 'Send Password Reset Link')
          }
        />
      </div>
    </form>
  );
});

const buttonStyle = {
  maxWidth: '320px',
  width: 'calc(100% - 32px)',
  marginTop: '32px',
};
