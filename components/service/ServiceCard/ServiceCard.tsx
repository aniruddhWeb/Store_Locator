import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import s from './ServiceCard.module.css';
import { getContentfulImageLink } from '../../../utils/image';
import { Route } from '../../../config/Routes';
import { IMAGE_PLACEHOLDER } from '../../../config/Constants';

interface Props {
  service?: {
    name?: string | null;
    description?: string | null;
    image?: {
      height?: number | null;
      width?: number | null;
      url?: string | null;
    } | null;
    url?: string | null;
  } | null;
}

export const ServiceCard = React.memo(({ service }: Props) => {
  const serviceCardImageRowClass = cn(s.serviceCardImageRowContainer, {
    [s.serviceCardImage]: true,
  });

  return (
    <Link prefetch={false} href={service?.url || Route.Root}>
      <a href={service?.url || Route.Root} target="_blank" className={s.root}>
        <div className={s.cardRow}>
          <img
            src={
              getContentfulImageLink(service?.image?.url, 175) ||
              IMAGE_PLACEHOLDER
            }
            className={serviceCardImageRowClass}
            alt={service?.name || 'service image'}
          />
          <div className={s.cardContent}>
            <div className={s.nameServiceRow}>{service?.name || ''}</div>
            <div className={s.descServiceRow}>{service?.description || ''}</div>
            <div className={s.urlServiceRow}>Visit Website</div>
          </div>
        </div>
      </a>
    </Link>
  );
});
