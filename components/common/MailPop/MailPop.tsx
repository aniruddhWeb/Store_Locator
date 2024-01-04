import React from 'react';
import s from './MailPop.module.css';
import { Button } from '../Button/Button';
import { MailPop as MailPopIcon } from '../../icons/MailPop';
import { Cross } from '../../icons/Cross';
import { useMailPopForm } from '../../../services/form/mailPop';

const buttonStyle = {
  backgroundColor: '#000000',
  marginTop: '32px',
};

export interface Props {
  closeMailPop: () => void;
}

export const MailPop = React.memo((props: Props) => {
  const { formik, onPreventDefault, error } = useMailPopForm(props);
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
        <Button
          error={!!error}
          disabled={!!error || !formik.values.email || !formik.values.username}
          buttonStyle={buttonStyle}
          onPress={formik.handleSubmit}
          buttonText={error || 'Subscribe'}
        />
        <Cross className={s.closeIcon} onClick={props.closeMailPop} />
      </div>
    </form>
  );
});
