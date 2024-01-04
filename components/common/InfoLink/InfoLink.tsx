import React, { useCallback } from 'react';
import cn from 'classnames';
import s from './InfoLink.module.css';
import { AnalyticsAction, useSaveAnalytics } from '../../../services/analytics';

interface Props {
  link: string;
  displayName: string;
  businessID?: string;
  businessClaim?: number | null;
  type?: 'Email' | 'Web' | 'Phone';
  icon?: any;
}

export const InfoLink = React.memo(
  ({ link, displayName, businessID, businessClaim, icon, type }: Props) => {
    const { saveAnalytics } = useSaveAnalytics();
    const linkClick = useCallback(
      (e: any) => {
        e.stopPropagation();
        if (businessID && type) {
          saveAnalytics(businessID, AnalyticsAction.Engagements + type);
        }
      },
      [type, businessID],
    );

    const linkClaimBarClass = cn(s.linkClaimBar, {
      [s.linkClaimBarShort]: type === 'Web',
      [s.linkClaimBarLong]: type === 'Phone',
    });

    if (businessClaim) {
      return (
        <div className={s.linkDisabled}>
          <div className={s.icon}>{icon || null}</div>
          <div className={s.linkClaimContainer}>
            <div className={linkClaimBarClass} />
          </div>
        </div>
      );
    }
    return (
      <a
        className={s.link}
        onClick={linkClick}
        target="_blank"
        rel="noopener noreferrer"
        href={link}>
        <div className={s.icon}>{icon || null}</div>
        <div className={s.linkRow}>{displayName}</div>
        <div className={s.linkRowAbsolute}>{displayName}</div>
      </a>
    );
  },
);
