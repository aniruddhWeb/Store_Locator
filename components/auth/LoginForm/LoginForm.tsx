import React from 'react';
import cn from 'classnames';
import s from './LoginForm.module.css';
import { Button } from '../../common/Button/Button';
import { Route } from '../../../config/Routes';
import { useLoginForm } from '../../../services/form/loginForm';

export const LoginForm = React.memo(() => {
  const {
    onPreventDefault,
    handleKeyPress,
    buttonError,
    isLoading,
    handleChange,
    formik,
  } = useLoginForm();

  const singleInputClass = cn(s.singleInput, {
    [s.singleInputError]: !!formik.errors.email && formik.touched.email,
  });

  const singleInputPasswordClass = cn(s.singleInput, {
    [s.singleInputError]: !!formik.errors.password && formik.touched.password,
  });
  return (
    <form className={s.root} onSubmit={formik.handleSubmit}>
      <h1 className="displayNone">Sign In</h1>
      <div className={s.main}>
        <div className={s.title}>Welcome Back!</div>
        <div className={s.subTitle}>Sign in to your account</div>
        <input
          name="email"
          id="email"
          className={singleInputClass}
          placeholder="Email"
          value={formik.values.email}
          type="email"
          onChange={handleChange}
          onClick={onPreventDefault}
          onKeyPress={handleKeyPress}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className={s.errorText}>
            {formik.errors.email ||
              'These credentials do not match our records.'}
          </p>
        ) : null}
        <input
          name="password"
          id="password"
          className={singleInputPasswordClass}
          placeholder="Password"
          type="password"
          value={formik.values.password}
          onClick={onPreventDefault}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className={s.errorText}>{formik.errors.password}</p>
        ) : null}
        <a href={`${Route.ForgotPassword}`} className={s.forgotPassword}>
          Forgot Password?
        </a>
        <Button
          buttonStyle={buttonStyle}
          error={!!buttonError}
          disabled={Object.values(formik.errors).length > 0}
          buttonText={buttonError || (isLoading ? 'Signing in...' : 'Sign In')}
          onPress={formik.handleSubmit}
        />
        <p className={s.policyText}>
          By accessing our site, you accept our <a href={Route.Terms}>terms</a>{' '}
          and <a href={Route.PrivacyPolicy}>privacy policy</a>.
        </p>
      </div>
      <div className={s.registerContainer}>
        <div className={s.registerTitle}>{`Don't have an account?`}</div>
        <a href={`${Route.RegisterUser}`} className={s.registerButton}>
          Sign Up
        </a>
      </div>
    </form>
  );
});

const buttonStyle = {
  maxWidth: '320px',
  width: 'calc(100% - 32px)',
  marginTop: '32px',
};
