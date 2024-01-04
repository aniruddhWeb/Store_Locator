import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import s from './ReadMorePopUp.module.css';
import { PopupClose } from '../../icons/PopupClose';
import { useOutsideDetect } from '../../../utils/window';
import { Review } from '../../../generated/graphql';
import { SliderType } from '../../review/ReviewCard/ReviewCard';
import { formatTimeAgo } from '../../../utils/string';
import { Portal } from '../Portal/Portal';

interface IReadMorePopUpProps {
  setPopUpOpen: () => void;
  review: Review;
}
const DynamicStarRatings = dynamic<SliderType>(
  // @ts-ignore
  () => import('react-star-ratings'),
  {
    ssr: false,
  },
);
export const ReadMorePopUp = React.memo<IReadMorePopUpProps>(
  ({ setPopUpOpen, review }) => {
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'scroll';
      };
    }, []);
    const ref = useOutsideDetect(setPopUpOpen);
    return (
      <Portal>
        <div className={s.mainContainer}>
          <div ref={ref} className={s.popupDialog}>
            <div className={s.mainContent}>
              <div className={s.fixedContainer}>
                <div className={s.close} onClick={setPopUpOpen}>
                  <PopupClose />
                </div>
                <div className={s.popupStars}>
                  <DynamicStarRatings
                    numberOfStars={5}
                    starDimension="24px"
                    starSpacing="2px"
                    rating={review?.rvwScore || 0}
                    starRatedColor="#DFB300"
                    starEmptyColor="#E4E9E8"
                  />
                </div>
              </div>
              <div className={s.popupDescription}>
                <div className={s.fullTextContent}>
                  <p className={s.popupText}>{review.rvwComment}</p>
                  <p className={s.popupDescriptionInfo}>
                    {`${review?.username}, ${formatTimeAgo(
                      review?.rvwCreationDate,
                    )}`}
                  </p>
                  {review.rvwReply && (
                    <div className={s.greenSection}>
                      <h3 className={s.greenSectionTitle}>
                        {`${review?.rvwReplyAuthorName?.bizName},`}{' '}
                        <span>{formatTimeAgo(review?.rvwCreationDate)}</span>
                      </h3>
                      <p className={s.greenSectionText}>{review.rvwReply}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    );
  },
);
