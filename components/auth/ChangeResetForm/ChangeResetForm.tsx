import React from 'react';
import cn from 'classnames';
import s from './ChangeResetForm.module.css';
import { Button } from '../../common/Button/Button';
import { useChangeReset } from '../../../services/form/changeResetForm';

export const ChangeResetForm = React.memo(() => {
  const {
    onPreventDefault,
    handleKeyPress,
    buttonError,
    passwordChanged,
    token,
    isLoading,
    formik,
    handleChange,
  } = useChangeReset();

  const singleInputEmailClass = cn(s.singleInput, {
    [s.singleInputError]: !!formik.errors.email && formik.touched.email,
  });

  const singleInputClass = cn(s.singleInput, {
    [s.singleInputError]: !!formik.errors.password && formik.touched.password,
  });

  const singlePasswordInputClass = cn(s.singleInput, {
    [s.singleInputError]:
      !!formik.errors.repeatPassword && formik.touched.repeatPassword,
  });
  return (
    <form className={s.root} onSubmit={formik.handleSubmit}>
      <h1 className="displayNone">Change Password</h1>
      <div className={s.main}>
        <div className={s.title}>Change Password</div>
        <input
          className={singleInputEmailClass}
          placeholder="Email"
          value={formik.values.email}
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          onChange={handleChange}
          onClick={onPreventDefault}
          onKeyPress={handleKeyPress}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className={s.errorText}>{formik.errors.email}</p>
        ) : null}
        <input
          className={singleInputClass}
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={formik.values.password}
          onChange={handleChange}
          onClick={onPreventDefault}
          onKeyPress={handleKeyPress}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className={s.errorText}>{formik.errors.password}</p>
        ) : null}
        <input
          className={singlePasswordInputClass}
          placeholder="Confirm Password"
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          autoComplete="off"
          value={formik.values.repeatPassword}
          onChange={handleChange}
          onClick={onPreventDefault}
          onKeyPress={handleKeyPress}
        />
        {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
          <p className={s.errorText}>{formik.errors.repeatPassword}</p>
        ) : null}
        <Button
          buttonStyle={buttonStyle}
          error={!!buttonError}
          success={passwordChanged}
          disabled={!token || Object.values(formik.errors).length > 0}
          buttonText={
            buttonError ||
            (passwordChanged
              ? 'Password Changed'
              : isLoading
              ? 'Changing...'
              : 'Change Password')
          }
          onPress={formik.handleSubmit}
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
