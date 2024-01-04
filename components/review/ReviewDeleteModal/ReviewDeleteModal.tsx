import React, { Dispatch, FC, memo, SetStateAction } from 'react';
import StarRating from 'react-star-ratings';
import { Modal } from '../../common/Modal/Modal';
import s from './ReviewDeleteModal.module.css';
import { Button } from '../../common/Button/Button';
import { Review } from '../../../generated/graphql';
import { useDeleteReview } from '../../../services/form/reviewModalForm';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  review: Review;
  refresh?: () => void;
}

export const ReviewDeleteModal: FC<Props> = memo<Props>(
  ({ isOpen, setIsOpen, review, refresh }) => {
    const { submit, processing, error } = useDeleteReview(review, () => {
      if (refresh) refresh();
      setIsOpen(false);
    });

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} style={style}>
        <form className={s.form} onSubmit={submit}>
          <div className={s.title}>Delete Review</div>
          <div className={s.text}>
            Do you really want to delete the following review?
          </div>
          <div className={s.review}>
            <p className={s.reviewText}>{review?.rvwComment || ''}</p>
            <div className={s.rating}>
              <StarRating
                numberOfStars={5}
                starDimension="16px"
                starSpacing="1px"
                rating={review?.rvwScore || 0}
                starHoverColor="#DFB300"
                starRatedColor="#DFB300"
                starEmptyColor="#E4E9E8"
              />
            </div>
          </div>
          {error && <p className={s.error}>{error}</p>}
          <Button
            buttonText={processing ? 'Saving...' : 'Delete'}
            onPress={submit}
          />
          <div className={s.cancel} onClick={() => setIsOpen(false)}>
            Cancel
          </div>
        </form>
      </Modal>
    );
  },
);

const style: any = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
  },
  content: {},
};
