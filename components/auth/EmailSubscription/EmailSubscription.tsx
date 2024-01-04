import React, { useMemo } from 'react';
import Link from 'next/link';
import s from './EmailSubscription.module.css';
import { Route } from '../../../config/Routes';

interface Props {
  emailSubscribed?: boolean;
}

const getSubscriptionText = (emailSubscribed?: boolean) => {
  if (emailSubscribed) {
    return 'You successfully subscribed!';
  }
  return 'Something Went Wrong';
};

export const EmailSubscription = React.memo(({ emailSubscribed }: Props) => {
  const text = useMemo(
    () => getSubscriptionText(emailSubscribed),
    [emailSubscribed],
  );
  return (
    <div className={s.root}>
      <div className={s.error}>{text}</div>
      {emailSubscribed ? (
        <Link href={Route.Root} prefetch={false} shallow={false}>
          <a href={Route.Root} className={s.backButton}>
            <div className={s.backButtonText}>Back to Home</div>
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
          </a>
        </Link>
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
