import React, { useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import s from './BannerItem.module.css';
import { IMAGE_PLACEHOLDER } from '../../../config/Constants';
import { Button } from '../Button/Button';
import { getContentfulImageLink } from '../../../utils/image';
import { useBannerClickAnalytics } from '../../../services/analytics';
import { hasWindow } from '../../../utils/window';

interface Props {
  title?: string | null;
  businessName?: string | null;
  description?: string | null;
  buttonText?: string | null;
  link?: string | null;
  type?: string | null;
  image?: any;
  showImage?: boolean;
}

export const BannerItem = React.memo(
  ({
    title,
    businessName,
    description,
    link,
    showImage,
    buttonText,
    image,
    type,
  }: Props) => {
    const showImageValue = useRef<boolean>(showImage || false);

    const router = useRouter();

    const { saveClickAnalytics } = useBannerClickAnalytics();

    const onPressBanner = useCallback(
      async (e: any) => {
        if (businessName) {
          await saveClickAnalytics(businessName);
        } else if (title) {
          await saveClickAnalytics(title);
        }
        if (hasWindow && (businessName || title)) {
          (window as any)?.dataLayer?.push({
            event: 'promotion_clicks',
            store_name: businessName || title,
          });
        }
        if (link) {
          router.push(link);
        }
      },
      [link, saveClickAnalytics, businessName, title],
    );

    const imageContainerStyle = useMemo(() => {
      if (showImageValue && image?.width && image?.height) {
        const aspectRatio = `${image.width / image.height}`;
        return {
          aspectRatio,
          opacity: 1,
        };
      }
      return undefined;
    }, [image?.width, image?.height, showImageValue]);

    return (
      <div className={s.root}>
        <div className={image ? s.contentContainer : s.contentNoImageContainer}>
          {type ? <div className={s.type}>{type}</div> : null}
          {title ? <div className={s.title}>{title}</div> : null}
          {description ? (
            <div className={s.description}>{description}</div>
          ) : null}
          {buttonText ? (
            <Button onPress={onPressBanner} buttonText={buttonText} />
          ) : null}
        </div>
        {image ? (
          <div onDragStart={e => e.preventDefault()}>
            {showImageValue ? (
              <img
                draggable={false}
                className={s.imageContainer}
                alt={title || ''}
                style={{ ...imageContainerStyle }}
                src={
                  getContentfulImageLink(image?.url, 720) || IMAGE_PLACEHOLDER
                }
              />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);
