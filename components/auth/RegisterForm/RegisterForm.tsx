import React from 'react';
import cn from 'classnames';
import { Checkbox } from 'pretty-checkbox-react';
import s from './RegisterForm.module.css';
import { Button } from '../../common/Button/Button';

import { Route } from '../../../config/Routes';
import { useRegistrationForm } from '../../../services/form/registrationForm';
import { LocationItemFragment } from '../../../generated/graphql';
import { FLAGS } from '../../common/LocationDropdown/constants';
import { transformCapitalWords } from '../../../utils/string';

type Props = {
  userRegion?: LocationItemFragment | null;
};

export const RegisterForm = React.memo(({ userRegion }: Props) => {
  const {
    handleChange,
    agreeCheckbox,
    onPreventDefault,
    handleKeyPress,
    provinceData,
    regionData,
    businessRegisterCheckbox,
    error,
    isLoading,
    formik,
  } = useRegistrationForm(userRegion);
  const singleInputEmailClass = cn(s.singleInput, {
    [s.singleInputError]: !!formik.errors.email && formik.touched.email,
  });

  const singleInputPasswordClass = cn(s.singleInput, {
    [s.singleInputError]: !!formik.errors.password && formik.touched.password,
  });

  return (
    <form className={s.root} onSubmit={formik.handleSubmit}>
      <h1 className="displayNone">Sign Up</h1>
      <div className={s.rootContainer}>
        <div className={s.main}>
          <div className={s.title}>Sign Up</div>
          <input
            className={s.singleInput}
            placeholder="Username"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onClick={onPreventDefault}
            onKeyPress={handleKeyPress}
          />
          <input
            className={singleInputEmailClass}
            placeholder="Email"
            id="email"
            name="email"
            value={formik.values.email}
            type="email"
            onChange={handleChange}
            onClick={onPreventDefault}
            onKeyPress={handleKeyPress}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className={s.errorText}>{formik.errors.email}</p>
          ) : null}
          <input
            className={singleInputPasswordClass}
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            minLength={8}
            value={formik.values.password}
            onChange={handleChange}
            onClick={onPreventDefault}
            onKeyPress={handleKeyPress}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className={s.errorText}>{formik.errors.password}</p>
          ) : null}
          <div className={s.selectRowContainer}>
            <div className={s.selectHalfContainer}>
              <select
                multiple={false}
                required
                id="country"
                name="country"
                onChange={formik.handleChange}
                value={formik.values.country}
                className={s.selectInput}>
                <option value="">Select Country</option>
                <option value={FLAGS.canada.plCountryID}>
                  {transformCapitalWords(FLAGS.canada.name)}
                </option>
                <option value={FLAGS.usa.plCountryID}>{FLAGS.usa.name}</option>
              </select>
            </div>
            <div className={s.selectHalfContainer}>
              <select
                multiple={false}
                required
                id="province"
                name="province"
                onChange={formik.handleChange}
                value={formik.values.province}
                className={s.selectInput}>
                {Number(formik.values.country) === FLAGS.usa.plCountryID
                  ? (
                      [
                        <option key={'USA'} value="">
                          Select State
                        </option>,
                      ] as any[]
                    ).concat(
                      (provinceData?.locationListProvinceForUser || []).map(
                        provinceItem =>
                          !provinceItem ? null : (
                            <option
                              key={provinceItem.plProvinceID}
                              value={provinceItem.plProvinceID}>
                              {provinceItem.plName}
                            </option>
                          ),
                      ),
                    )
                  : (
                      [
                        <option key={'Canada'} value="">
                          Select Province
                        </option>,
                      ] as any[]
                    ).concat(
                      (provinceData?.locationListProvinceForUser || []).map(
                        provinceItem =>
                          !provinceItem ? null : (
                            <option
                              key={provinceItem.plProvinceID}
                              value={provinceItem.plProvinceID}>
                              {provinceItem.plName}
                            </option>
                          ),
                      ),
                    )}
              </select>
            </div>
          </div>
          {formik.values.province &&
          (regionData?.locationListRegionByProvinceForUser || []).length > 0 ? (
            <div className={s.selectContainer}>
              <select
                id="region"
                name="region"
                multiple={false}
                required
                value={formik.values.region}
                onChange={formik.handleChange}
                className={s.selectInput}>
                <option value="">Select Region</option>
                {(regionData?.locationListRegionByProvinceForUser || []).map(
                  regionItem =>
                    !regionItem ? null : (
                      <option
                        key={regionItem.plRegionID}
                        value={regionItem.plRegionID}>
                        {regionItem.plName}
                      </option>
                    ),
                )}
              </select>
            </div>
          ) : null}
          <div className={s.businessRegister}>
            <Checkbox
              bigger
              animation="smooth"
              shape="curve"
              color="success"
              value={businessRegisterCheckbox.state}
              onChange={businessRegisterCheckbox.onChange}
              checked={!!businessRegisterCheckbox.state}
            />
            <div className={s.businessRegisterText}>Sign Up As Business</div>
          </div>
          <div className={s.agreeContainer}>
            <Checkbox
              bigger
              animation="smooth"
              shape="curve"
              color="success"
              value={agreeCheckbox.state}
              onChange={agreeCheckbox.onChange}
              checked={!!agreeCheckbox.state}
            />
            <div className={s.agreeText}>
              I agree to receive emails regarding contests and giveaways from
              Leafythings. I understand that I can unsubscribe at any time.
            </div>
          </div>
          <div className={s.buttonContainer}>
            <Button
              error={!!error}
              disabled={Object.values(formik.errors).length > 0}
              buttonStyle={buttonStyle}
              buttonText={error || (isLoading ? 'Signing Up...' : 'Sign Up')}
              onPress={formik.handleSubmit}
            />
            <p className={s.policyText}>
              By accessing our site, you accept our{' '}
              <a href={Route.Terms}>terms</a> and{' '}
              <a href={Route.PrivacyPolicy}>privacy policy</a>.
            </p>
          </div>
        </div>
        <div className={s.buttonContainerMobile}>
          <Button
            buttonStyle={buttonStyle}
            error={!!error}
            disabled={Object.values(formik.errors).length > 0}
            buttonText={error || (isLoading ? 'Signing Up...' : 'Sign Up')}
            onPress={formik.handleSubmit}
          />
          <p className={s.policyText}>
            By accessing our site, you accept our{' '}
            <a href={Route.Terms}>terms</a> and{' '}
            <a href={Route.PrivacyPolicy}>privacy policy</a>.
          </p>
        </div>
      </div>
      <div className={s.loginContainer}>
        <div className={s.loginTitle}>{`Already have an account?`}</div>
        <a href={`${Route.Login}`} className={s.loginButton}>
          Sign In
        </a>
      </div>
    </form>
  );
});

const buttonStyle = {
  width: 'calc(100% - 32px)',
};
