import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import s from './EmailResend.module.css';
import { Route } from '../../../config/Routes';

interface Props {
  emailResent?: boolean;
}

const getVerifiedText = (emailResent?: boolean) => {
  if (emailResent) {
    return 'A confirmation email has been sent!';
  }
  return 'Something Went Wrong';
};

export const EmailResend = React.memo(({ emailResent }: Props) => {
  const text = useMemo(() => getVerifiedText(emailResent), [emailResent]);

  const router = useRouter();
  const onPressBack = useCallback(() => {
    if (router.query?.mobile) {
      router.replace(Route.Root);
    } else {
      router.back();
    }
  }, [router.query]);

  return (
    <div className={s.root}>
      <div className={s.error}>{text}</div>
      {emailResent ? (
        <div onClick={onPressBack} className={s.backButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="24 / arrows / arrow-left">
              <path
                id="icon"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.41436 13.0001L12.7073 19.293L11.293 20.7072L2.58594 12.0001L11.293 3.29297L12.7073 4.70718L6.41436 11.0001H21.0002V13.0001H6.41436Z"
                fill="#F2FC53"
              />
            </g>
          </svg>
          <div className={s.backButtonText}>Back</div>
        </div>
      ) : (
        <div className={s.tryContainer}>
          <div className={s.tryButtonText}>Try again or</div>
          <a href={Route.ContactUs} className={s.tryButtonText}>
            contact support
          </a>
        </div>
      )}
    </div>
  );
});
