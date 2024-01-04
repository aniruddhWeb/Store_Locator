import React, { useCallback } from 'react';
import cn from 'classnames';
import s from './Sitemap.module.css';
import { SiteMapWeb } from '../../../generated/graphql';
import { Route } from '../../../config/Routes';

interface Props {
  sitemap?: SiteMapWeb | null;
}

export const Sitemap = React.memo<Props>(({ sitemap }) => {
  const renderSitemapItem = useCallback(
    (name: string, route: string, depth?: number) => {
      const sitemapClass = cn(s.sitemapContainer, {
        [s.sitemapSubContainer]: depth === 1,
        [s.sitemapSubSubContainer]: depth === 2,
      });
      const sitemapPointClass = cn(s.sitemapPoint, {
        [s.sitemapSubPoint]: depth === 1,
        [s.sitemapSubSubPoint]: depth === 2,
      });
      return (
        <div key={route} className={sitemapClass}>
          <div className={sitemapPointClass} />
          <a className={s.sitemapLink} href={route}>
            {name}
          </a>
        </div>
      );
    },
    [],
  );

  if (!sitemap) {
    return null;
  }
  return (
    <div className={s.root}>
      {renderSitemapItem('Home', Route.Root)}
      {renderSitemapItem('Brands', Route.Brands)}
      {(sitemap.brands || []).map(item =>
        !item
          ? null
          : renderSitemapItem(
              `Brands - ${item.province.toUpperCase()}`,
              `${Route.Brands}/${item.province.toLowerCase()}`,
              1,
            ),
      )}
      {renderSitemapItem('Mail Order Marijuana', Route.MailOrder)}
      {(sitemap.mail_order_marijuana || []).map(item =>
        !item
          ? null
          : renderSitemapItem(
              `Mail Order Marijuana - ${item.province.toUpperCase()}`,
              `${Route.MailOrder}/${item.province.toLowerCase()}`,
              1,
            ),
      )}
      {renderSitemapItem('Weed Delivery', Route.Delivery)}
      {(sitemap.weed_delivery || []).map(item =>
        !item ? null : (
          <React.Fragment key={`Weed Delivery ${item.province}`}>
            {renderSitemapItem(
              `Weed Delivery - ${item.province.toUpperCase()}`,
              `${Route.Delivery}/${item.province.toLowerCase()}`,
              1,
            )}
            {(item.city || []).map(subItem =>
              !subItem
                ? null
                : renderSitemapItem(
                    `Weed Delivery - ${
                      subItem.name
                    }, ${item.province.toUpperCase()}`,
                    `${Route.Delivery}/${item.province.toLowerCase()}/${
                      subItem.slug
                    }`,
                    2,
                  ),
            )}
          </React.Fragment>
        ),
      )}
      {renderSitemapItem('Marijuana Dispensaries', Route.Dispensary)}
      {(sitemap.marijuana_dispensary || []).map(item =>
        !item ? null : (
          <React.Fragment key={`Marijuana Dispensaries ${item.province}`}>
            {renderSitemapItem(
              `Marijuana Dispensaries - ${item.province.toUpperCase()}`,
              `${Route.Dispensary}/${item.province.toLowerCase()}`,
              1,
            )}
            {(item.city || []).map(subItem =>
              !subItem
                ? null
                : renderSitemapItem(
                    `Marijuana Dispensaries - ${
                      subItem.name
                    }, ${item.province.toUpperCase()}`,
                    `${Route.Dispensary}/${item.province.toLowerCase()}/${
                      subItem.slug
                    }`,
                    2,
                  ),
            )}
          </React.Fragment>
        ),
      )}
      {renderSitemapItem('Deals', Route.Deals)}
      {renderSitemapItem('Blog', Route.Blog)}
    </div>
  );
});
