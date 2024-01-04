import React from 'react';
import { Checkbox } from 'pretty-checkbox-react';
import s from './MailPopSubscription.module.css';
import { Button } from '../Button/Button';
import { MailPop as MailPopIcon } from '../../icons/MailPop';
import { Cross } from '../../icons/Cross';
import { useMailPopForm } from '../../../services/form/mailPop';
import {
  deliveryOptions,
  participations,
  types,
} from '../../../services/form/registrationForm';
import { Route } from '../../../config/Routes';

const buttonStyle = {
  backgroundColor: '#000000',
  marginTop: '32px',
};

const mobileButtonStyle = {
  backgroundColor: '#000000',
  marginTop: '16px',
};

export interface Props {
  closeMailPop: () => void;
}

export const MailPopSubscription = React.memo((props: Props) => {
  const {
    formik,
    onPreventDefault,
    error,
    deliveryCheckbox,
    typesCheckbox,
    participationCheckbox,
  } = useMailPopForm(props);
  return (
    <form className={s.wrapper} onSubmit={formik.handleSubmit}>
      <div className={s.root}>
        <MailPopIcon className={s.icon} />
        <div className={s.title}>{`Let’s be Buds`}</div>
        <div className={s.text}>
          Join our mailing list to receive exclusive offers and weed deals from
          the cannabis retailers on Leafythings.
        </div>
        <input
          className={s.singleInput}
          placeholder="Name"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onClick={onPreventDefault}
        />
        <input
          className={s.singleInput}
          placeholder="Email"
          value={formik.values.email}
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onClick={onPreventDefault}
        />
        <div className={s.desktopButton}>
          <Button
            error={!!error}
            disabled={
              !!error || !formik.values.email || !formik.values.username
            }
            buttonStyle={buttonStyle}
            onPress={formik.handleSubmit}
            buttonText={error || 'Subscribe'}
          />
          <p className={s.agreeText}>
            By accessing our site, you accept our{' '}
            <a href={Route.Terms}>terms</a> and{' '}
            <a href={Route.PrivacyPolicy}>privacy policy</a>.
          </p>
        </div>
        <Cross className={s.closeMobileIcon} onClick={props.closeMailPop} />
      </div>
      <div className={s.mailPreferencesRoot}>
        <div className={s.checkTitleContainer}>
          <div className={s.checkTitle}>Mail Preferences</div>
          <div className={s.checkAll}>Select all that apply</div>
        </div>
        <div className={s.checkBlockContainer}>
          <div
            className={
              s.checkBlockTitle
            }>{`How do you participate in Cannabis?`}</div>
          <div className={s.checkBlockRowNoWrapContainer}>
            {participations.map(participation => (
              <div key={participation} className={s.checkBoxItem}>
                <Checkbox
                  bigger
                  value={participation}
                  animation="smooth"
                  shape="curve"
                  color="success"
                  onChange={participationCheckbox.onChange}
                  checked={participationCheckbox.state.includes(participation)}
                />
                <div className={s.checkBoxItemText}>{participation}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.checkBlockContainer}>
          <div
            className={
              s.checkBlockTitle
            }>{`What's your preferred method of consuming cannabis?`}</div>
          <div className={s.checkBlockRowContainer}>
            {types.map(type => (
              <div key={type} className={s.checkBoxItem}>
                <Checkbox
                  bigger
                  key={type}
                  value={type}
                  animation="smooth"
                  shape="curve"
                  color="success"
                  onChange={typesCheckbox.onChange}
                  checked={typesCheckbox.state.includes(type)}
                />
                <div className={s.checkBoxItemText}>{type}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.checkBlockContainer}>
          <div
            className={
              s.checkBlockTitle
            }>{`What is your preferred delivery option?`}</div>
          <div className={s.checkBlockRowContainer}>
            {deliveryOptions.map(deliveryOption => (
              <div key={deliveryOption} className={s.checkBoxItem}>
                <Checkbox
                  bigger
                  value={deliveryOption}
                  animation="smooth"
                  shape="curve"
                  color="success"
                  onChange={deliveryCheckbox.onChange}
                  checked={deliveryCheckbox.state.includes(deliveryOption)}
                />
                <div className={s.checkBoxItemText}>{deliveryOption}</div>
              </div>
            ))}
          </div>
        </div>
        <Cross className={s.closeDesktopIcon} onClick={props.closeMailPop} />
      </div>
      <div className={s.mobileButton}>
        <Button
          error={!!error}
          disabled={!!error || !formik.values.email || !formik.values.username}
          buttonStyle={mobileButtonStyle}
          onPress={formik.handleSubmit}
          buttonText={error || 'Subscribe'}
        />
        <p className={s.agreeText}>
          By accessing our site, you accept our <a href={Route.Terms}>terms</a>{' '}
          and <a href={Route.PrivacyPolicy}>privacy policy</a>.
        </p>
      </div>
    </form>
  );
});
