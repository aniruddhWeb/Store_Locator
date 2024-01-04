import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/router';
import s from './ContactForm.module.css';
import { Button } from '../../common/Button/Button';
import { useContactUsSendLazyQuery } from '../../../generated/graphql';
import { useCurrentUserDynamic } from '../../../services/user';
import { useCurrentLocationDynamic } from '../../../services/location';
import { MessageSent } from '../../icons/MessageSent';
import { CAPTCHA_SITE_KEY } from '../../../config/Constants';

export const ContactForm = React.memo(() => {
  const router = useRouter();

  const { currentUser } = useCurrentUserDynamic();
  const { selectedLocation } = useCurrentLocationDynamic();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [subject, setSubject] = useState<string>(
    (router?.query?.subject as string) || 'General',
  );

  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sendContactUs] = useContactUsSendLazyQuery();

  const recaptchaRef = useRef();

  useEffect(() => {
    if (!email && currentUser?.email) {
      setEmail(currentUser?.email);
    }
    if (!name && (currentUser?.usrFirstName || currentUser?.usrLastName)) {
      setName(
        `${currentUser?.usrFirstName || ''} ${
          currentUser?.usrLastName || ''
        }`.trim(),
      );
    }
  }, [
    name,
    email,
    currentUser?.email,
    currentUser?.usrFirstName,
    currentUser?.usrLastName,
  ]);

  const onSendForm = useCallback(async () => {
    // @ts-ignore
    recaptchaRef.current?.execute();
  }, []);

  const onCaptcha = useCallback(() => {
    setIsLoading(true);
    sendContactUs({
      variables: {
        name,
        emailFrom: email,
        message,
        subject,
        regionID: `${selectedLocation!.plRegionID}`,
        city: selectedLocation!.plName,
        province: selectedLocation!.province.plInitials,
      },
    })
      .then(response => {
        setMessageSent(!!response?.data?.contactUs);
        setTimeout(() => {
          window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
        }, 600);
      })
      .catch(undefined)
      .finally(() => setIsLoading(false));
  }, [name, email, message, subject, selectedLocation]);

  const onPreventDefault = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onNameChange = useCallback(e => {
    setName(e.target.value);
  }, []);

  const onEmailChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onMessageChange = useCallback(e => {
    setMessage(e.target.value);
  }, []);

  const onSubjectChange = useCallback(e => {
    setSubject(e.target.value);
  }, []);

  return (
    <div className={s.root}>
      {messageSent ? (
        <>
          <MessageSent className={s.messageSentImage} />
          <div className={s.messageSentTitle}>Your message has been sent!</div>
          <div className={s.messageSentDescription}>
            {`We'll get back to you very soon.`}
          </div>
        </>
      ) : (
        <>
          <div className={s.rowContainer}>
            <input
              className={s.singleRowInput}
              placeholder="Name"
              value={name}
              onChange={onNameChange}
              onClick={onPreventDefault}
            />
            <input
              className={s.singleRowInput}
              placeholder="Email"
              value={email}
              onChange={onEmailChange}
              onClick={onPreventDefault}
            />
          </div>
          <div className={s.selectContainer}>
            <select
              name="Subject"
              multiple={false}
              required
              value={subject}
              onChange={onSubjectChange}
              className={s.selectInput}>
              <option value="General">General Inquiry</option>
              <option value="Sales">Sales Inquiry</option>
              <option value="Technical">Technical Issue</option>
            </select>
          </div>
          <textarea
            className={s.multiInput}
            placeholder="Message"
            value={message}
            onChange={onMessageChange}
            onClick={onPreventDefault}
          />
          <Button
            buttonStyle={buttonStyle}
            disabled={
              isLoading ||
              messageSent ||
              !name ||
              !email ||
              !subject ||
              !message ||
              !selectedLocation
            }
            buttonText={isLoading ? 'Sending...' : 'Send Message'}
            onPress={onSendForm}
          />
          <ReCAPTCHA
            ref={recaptchaRef as any}
            sitekey={CAPTCHA_SITE_KEY}
            onChange={onCaptcha}
            size="invisible"
            badge="inline"
          />
        </>
      )}
    </div>
  );
});

const buttonStyle = {
  marginTop: '24px',
};
