import React, { useMemo } from 'react';
import Link from 'next/link';
import s from './EmailVerify.module.css';
import { Route } from '../../../config/Routes';

interface Props {
  emailVerified?: boolean;
}

const getVerifiedText = (emailVerified?: boolean) => {
  if (emailVerified) {
    return 'Thank you for verifying your email!';
  }
  return 'Something Went Wrong';
};

export const EmailVerify = React.memo(({ emailVerified }: Props) => {
  const text = useMemo(() => getVerifiedText(emailVerified), [emailVerified]);

  return (
    <div className={s.root}>
      <div className={s.error}>{text}</div>
      {emailVerified ? (
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
