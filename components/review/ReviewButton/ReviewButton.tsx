import React, { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import s from './ReviewButton.module.css';
import { ReviewModal } from '../ReviewModal/ReviewModal';
import {
  BusinessItemFragment,
  ProductItemFragment,
} from '../../../generated/graphql';
import { useCurrentUserDynamic } from '../../../services/user';
import { Review } from '../../icons/Review';
import { Route } from '../../../config/Routes';

interface Props {
  reviewTo: BusinessItemFragment | ProductItemFragment;
  noMargin?: boolean;
  noHorizontal?: boolean;
  refresh?: () => void;
  canAddReview?: boolean;
}

export const ReviewButton = React.memo<Props>(
  ({ reviewTo, canAddReview, noHorizontal, refresh, noMargin }) => {
    const { currentUser, login } = useCurrentUserDynamic();
    const [isOpen, setIsOpen] = useState(false);

    const buttonClass = cn(s.button, {
      [s.buttonNoMargin]: noMargin,
      [s.buttonNoHorizontal]: noHorizontal,
    });

    const iconClass = cn(s.icon, {
      [s.iconNoHorizontal]: noHorizontal,
    });

    if (canAddReview || currentUser) {
      if (
        currentUser &&
        currentUser?.email &&
        !currentUser?.email_verified_at
      ) {
        return (
          <Link
            prefetch={false}
            shallow={false}
            href={`${Route.EmailVerify}/${currentUser?.usrUserID}${Route.EmailResend}`}>
            <a
              href={`${Route.EmailVerify}/${currentUser?.usrUserID}${Route.EmailResend}`}
              className={buttonClass}>
              <div className={iconClass}>
                <Review fill="#000000" />
              </div>
              Verify email to leave a Review
            </a>
          </Link>
        );
      }
      if (canAddReview) {
        return (
          <>
            <div onClick={() => setIsOpen(true)} className={buttonClass}>
              <div className={iconClass}>
                <Review fill="#000000" />
              </div>
              Leave a Review
            </div>
            <ReviewModal
              refresh={refresh}
              reviewTo={reviewTo}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </>
        );
      }
    }
    if (!currentUser) {
      return (
        <Link prefetch={false} href={login}>
          <a href={login} className={buttonClass}>
            <div className={iconClass}>
              <Review fill="#000000" />
            </div>
            Sign in to leave a Review
          </a>
        </Link>
      );
    }
    return null;
  },
);
