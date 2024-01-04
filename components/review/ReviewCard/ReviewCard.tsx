import React, { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQueries } from '@react-hook/media-query';
import { Review } from '../../../generated/graphql';
import s from './ReviewCard.module.css';
import { formatTimeAgo } from '../../../utils/string';
import { Delete } from '../../icons/Delete';
import { ReadMorePopUp } from '../../common/ReadMorePopUp/ReadMorePopUp';
import { ReviewDeleteModal } from '../ReviewDeleteModal/ReviewDeleteModal';

export type SliderType = {
  numberOfStars: number;
  starDimension: string;
  starSpacing: string;
  rating: number;
  starRatedColor: string;
  starEmptyColor: string;
};

const DynamicStarRatings = dynamic<SliderType>(
  // @ts-ignore
  () => import('react-star-ratings'),
  {
    ssr: false,
  },
);

interface Props {
  review: Review;
  refresh?: () => void;
  gridMode?: boolean;
}

export const ReviewCard = React.memo<Props>(({ review, refresh, gridMode }) => {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const onDeleteShow = useCallback(() => setDeleteOpen(true), []);

  const isMore = useMemo(() => {
    return (review?.rvwComment || '').length > 125;
  }, [review]);

  const sliceData = useMemo(() => {
    return review?.rvwComment?.slice(0, 125) || '';
  }, [review]);

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  return (
    <>
      <div className={gridMode ? s.rootGrid : s.root}>
        <div className={gridMode ? s.cardColumnGrid : s.cardColumn}>
          <div className={s.starsWrapper}>
            <DynamicStarRatings
              numberOfStars={5}
              starDimension={matches?.isMobile ? '20px' : '24px'}
              starSpacing="1px"
              rating={review?.rvwScore || 0}
              starRatedColor="#DFB300"
              starEmptyColor="#E4E9E8"
            />
            <div className={s.reviewContainer}>
              {review.rvwReply && (
                <div className={s.viewOwner} onClick={() => setPopUpOpen(true)}>
                  {`Owner's reply`}
                </div>
              )}
              {review.canDeleteReview ? (
                <div onClick={onDeleteShow} className={s.deleteContainer}>
                  <Delete className={s.deleteIcon} />
                  <div className={s.deleteText}>{'My Review'}</div>
                </div>
              ) : null}
            </div>
          </div>
          <div className={gridMode ? s.reviewTextGrid : s.reviewText}>
            {isMore ? `${sliceData}...` : review?.rvwComment || ''}{' '}
            {isMore && (
              <span onClick={() => setPopUpOpen(true)} className={s.readMore}>
                Read more
              </span>
            )}
          </div>
          {popUpOpen && (
            <ReadMorePopUp
              setPopUpOpen={() => setPopUpOpen(false)}
              review={review}
            />
          )}
          <div className={s.userTextWrapper}>
            <div className={s.userText}>{`${review?.username}, ${formatTimeAgo(
              review?.rvwCreationDate,
            )}`}</div>
          </div>
        </div>
      </div>
      <ReviewDeleteModal
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
        review={review}
        refresh={refresh}
      />
    </>
  );
});
