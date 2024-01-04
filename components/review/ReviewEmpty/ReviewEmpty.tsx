import React from 'react';
import s from './ReviewEmpty.module.css';
import {
  BusinessItemFragment,
  ProductItemFragment,
} from '../../../generated/graphql';
import { HighLightStar } from '../../icons/HighLightStar';
import { ReviewButton } from '../ReviewButton/ReviewButton';

interface Props {
  reviewTo: BusinessItemFragment | ProductItemFragment;
  canAddReview?: boolean;
  refresh?: () => void;
}

export const ReviewEmpty = React.memo<Props>(
  ({ reviewTo, canAddReview, refresh }) => {
    return (
      <div className={s.root}>
        <div className={s.content}>
          <div className={s.star}>
            <HighLightStar />
          </div>
          <div className={s.text}>
            {`We currently have no reviews.${
              canAddReview ? ' Be the first to leave one!' : ''
            }`}
          </div>
        </div>
        <div className={s.buttonContainer}>
          <div className={s.bar} />
          <ReviewButton
            reviewTo={reviewTo}
            refresh={refresh}
            canAddReview={canAddReview}
          />
        </div>
      </div>
    );
  },
);
