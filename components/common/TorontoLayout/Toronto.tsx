import React, { FC, useCallback, useMemo } from 'react';
import Link from 'next/link';
import get from 'lodash/get';
import { useMediaQueries } from '@react-hook/media-query';
import Highlighter from 'react-highlight-words';
import s from './TorontoLayout.module.css';
import { MapLocation } from '../../icons/MapLocation';
import { TorontoCard } from './TorontoCard';
import {
  getDeliveryCardData,
  getServingCardData,
  getInfoCardData,
} from './constants';
import {
  IDeliveryCard,
  IInfoCard,
  IProps,
  IServingCard,
} from './Torotnto.types';
import { Route } from '../../../config/Routes';
import { Marquee } from '../Marquee/Marquee';
import { ProductHorizontalCard } from '../../product/ProductHorizontalCard/ProductHorizontalCard';
import { Product } from '../../../generated/graphql';
import { PaginatedScroll } from '../PaginatedScroll/PaginatedScroll';

export const Toronto: FC<IProps> = React.memo(
  ({ currentUrls, torontoLandingData, torontoProducts }) => {
    const {
      landingTitles: torontoTitles,
      landingHighlights,
      torontoTexts,
      mainCardEast,
      mainCardWest,
      etobicokeMapBkg,
      scarboroughMapBkg,
      northYorkMapBkg,
      mississaugaMapBkg,
      aboutDeliveryBkg,
      orderDelivaryBkg,
      deliveryMapBkg,
      appleBlackButton,
      googleBlackButton,
      phoneBkg,
      phoneMobileBkg,
      downloadAppCannabisBkg,
      adviceProductBkg,
      orderMailBkg,
      footerBkg,
      unbeatableIcon,
      deliveryIcon,
      serviceIcon,
      flowerIcon,
      extractsConcentratesIcon,
      ediblesIcon,
    } = torontoLandingData;

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
      isTablet: 'only screen and (max-width: 1024px)',
    });

    const servingCardData: IServingCard[] = useMemo(() => {
      return getServingCardData(torontoTitles);
    }, [torontoLandingData]);

    const infoCardData: IInfoCard[] = useMemo(() => {
      return getInfoCardData(
        torontoTitles,
        torontoTexts,
        flowerIcon,
        extractsConcentratesIcon,
        ediblesIcon,
      );
    }, [torontoLandingData]);

    const deliverCardData: IDeliveryCard[] = useMemo(() => {
      return getDeliveryCardData(
        torontoTitles,
        torontoTexts,
        etobicokeMapBkg,
        scarboroughMapBkg,
        northYorkMapBkg,
        mississaugaMapBkg,
      );
    }, [torontoLandingData]);

    const handleTextHighlights = useCallback(
      (originalText: string, highlightKey: string) => {
        const textHighlight = get(landingHighlights, highlightKey, null);
        if (textHighlight?.texts && textHighlight?.texts.length > 0) {
          return (
            <Highlighter
              searchWords={textHighlight?.texts || []}
              autoEscape
              textToHighlight={originalText}
              highlightClassName={s.markText}
              highlightTag={
                textHighlight?.url
                  ? ({ children }: any) => (
                      <a href={textHighlight.url} className={s.linkStyle}>
                        {children}
                      </a>
                    )
                  : undefined
              }
            />
          );
        }
        return originalText;
      },
      [landingHighlights],
    );

    return (
      <div className={s.root}>
        <section className={s.heroSection}>
          <div className={s.heroSectionRow}>
            <div className={s.heroSectionRowItem40}>
              <div className={s.heroSectionTexts}>
                <h1 className={s.heroTitle}>
                  {get(torontoTitles, 'main', '')}
                </h1>
                <div className={s.locationInfo}>
                  <MapLocation fill="#EF845C" />
                  <span className={s.locationInfoText}>Toronto, Ontario</span>
                </div>
                <div className={s.description}>
                  {handleTextHighlights(
                    get(torontoTexts, 'weedDelivery', ''),
                    'weedDelivery',
                  )}
                </div>
              </div>
            </div>
            <div className={s.heroSectionRowItem60}>
              <div className={s.heroSectionCardImages}>
                {servingCardData.map(
                  (current: IServingCard, cardIndex: number) => {
                    return (
                      <TorontoCard
                        key={current.title}
                        hasText={current.hasText}
                        marginButton={current.marginButton}
                        backgroundColor={current.backgroundColor}
                        backgroundImage={
                          cardIndex === 0
                            ? mainCardWest?.url
                            : cardIndex === 1
                            ? mainCardEast?.url
                            : undefined
                        }
                        title={current.title}
                        color={current.color}
                        width={current.width}
                        height={current.height}
                        marginTop={current.marginTop}
                        url={current.url}
                      />
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </section>
        <section className={s.torontoProduct}>
          <div className={s.torontoProductBorder} />
          <Marquee
            titleVariant="left"
            title="Products"
            variant="third"
            scrollVariant="third">
            {(torontoProducts || []).map((product: Product) => (
              <ProductHorizontalCard
                scroll
                key={`product-${product.prdProductID}`}
                product={product}
                business={
                  (product?.business || []).length > 0
                    ? product.business[0]
                    : undefined
                }
              />
            ))}
          </Marquee>
        </section>
        <section
          className={s.otherLocation}
          style={{
            backgroundImage: `url(${deliveryMapBkg.url})`,
          }}>
          <div className={s.otherLocationBackground} />
          <div className={s.otherLocationMain}>
            <div className={s.otherLocationDescriptionWrapper}>
              <h3 className={s.otherLocationTitle}>
                {get(torontoTitles, 'otherDeliveryAreas', '')}
              </h3>
              <div className={s.otherLocationDescription}>
                {handleTextHighlights(
                  get(torontoTexts, 'deliveryArea', ''),
                  'deliveryArea',
                )}
              </div>
            </div>
            <div className={s.otherLocationMaps}>
              {deliverCardData.map((current: IDeliveryCard) => {
                return (
                  <div key={current.title} className={s.otherLocationMap}>
                    <TorontoCard
                      backgroundColor={current.backgroundColor}
                      marginButton={current.marginButton}
                      backgroundImage={current.backgroundImage}
                      title={current.title}
                      color={current.color}
                      width={current.width}
                      height={current.height}
                      marginTop={current.marginTop}
                      text={current.text}
                      paddingText={current.paddingText}
                      url={current.url}
                      headerLink={current.headerLink}
                    />
                  </div>
                );
              })}
            </div>
            <div className={s.otherLocationMapsMobile}>
              <PaginatedScroll
                items={deliverCardData.map((current: IDeliveryCard) => {
                  return (
                    <div key={current.title} className={s.otherLocationMap}>
                      <TorontoCard
                        useDiv
                        backgroundColor={current.backgroundColor}
                        marginButton={current.marginButton}
                        backgroundImage={current.backgroundImage}
                        title={current.title}
                        color={current.color}
                        width={current.width}
                        height={current.height}
                        marginTop={current.marginTop}
                        text={current.text}
                        paddingText={current.paddingText}
                        url={current.url}
                        headerLink={current.headerLink}
                      />
                    </div>
                  );
                })}
              />
            </div>
          </div>
        </section>
        <section>
          <div
            className={s.aboutToronto}
            style={{ backgroundImage: `url(${aboutDeliveryBkg.url})` }}>
            <h2 className={s.torontoTitle} style={{ textAlign: 'center' }}>
              {handleTextHighlights(
                get(torontoTitles, 'whyChooseToronto', ''),
                'whyChooseToronto',
              )}
            </h2>
            <div
              className={s.torontoDescription1}
              style={{
                textAlign: 'center',
                maxWidth: '727px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              {get(torontoTexts, 'aboutDeliveryMain', '')}
            </div>
            <div
              className={s.torontoDescription2}
              style={{
                textAlign: 'center',
                maxWidth: '727px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              {get(torontoTexts, 'aboutDelivery', '')}
            </div>
            <div className={s.torontoServiceContainer}>
              <div className={s.torontoServiceWrapper}>
                <div
                  className={s.deliveryIcon}
                  style={{ backgroundImage: `url(${unbeatableIcon.url})` }}
                />
                <div>
                  <h3 className={s.torontoServiceTitle}>
                    {get(torontoTitles, 'unbeatablePrices', '')}
                  </h3>
                  <div className={s.torontoServiceDescription}>
                    {get(torontoTexts, 'prices', '')}
                  </div>
                </div>
              </div>
              <div className={s.torontoServiceWrapper}>
                <div>
                  <div
                    className={s.deliveryIcon}
                    style={{ backgroundImage: `url(${deliveryIcon.url})` }}
                  />
                </div>
                <div>
                  <h3 className={s.torontoServiceTitle}>
                    {get(torontoTitles, 'sameDayWeedDelivery', '')}
                  </h3>
                  <div className={s.torontoServiceDescription}>
                    {get(torontoTexts, 'delivery', '')}
                  </div>
                </div>
              </div>
              <div className={s.torontoServiceWrapper}>
                <div>
                  <div
                    className={s.deliveryIcon}
                    style={{ backgroundImage: `url(${serviceIcon.url})` }}
                  />
                </div>
                <div>
                  <h3 className={s.torontoServiceTitle}>
                    {get(torontoTitles, 'discreetService', '')}
                  </h3>
                  <div className={s.torontoServiceDescription}>
                    {get(torontoTexts, 'services', '')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className={`${s.torontoDeliveryContainer} ${s.deliveryAnswer}`}>
          <div
            className={s.torontoDeliveryCannabis}
            style={{ backgroundImage: `url(${orderDelivaryBkg.url})` }}
          />
          <div className={s.torontoOrderCannabisWrapper}>
            <div className={s.torontoOrderCannabisTitle}>
              <h2 className={s.torontoTitle}>
                {handleTextHighlights(
                  get(torontoTitles, 'howDoIDeliveryOrderToronto', ''),
                  'howDoIDeliveryOrderToronto',
                )}
              </h2>
              <div
                className={s.torontoDescription1}
                style={{ maxWidth: '546px' }}>
                {get(torontoTexts, 'orderDeliveryMain', '')}
              </div>
              <div
                className={s.torontoDescription2}
                style={{ maxWidth: '546px' }}>
                {get(torontoTexts, 'orderDelivery', '')}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={s.downloadAppContainer}>
            <div className={s.downloadAppWrapper}>
              <div className={s.downloadAppTitle}>
                {get(torontoTitles, 'downloadApp', '')}
              </div>
              <div className={s.downloadAppDescription}>
                Find cannabis products, deals, and retailers <br />
                that are nearby and nationwide.
              </div>
              <div className={s.storeButtons}>
                <Link prefetch={false} href={currentUrls.apple}>
                  <a
                    rel="noreferrer"
                    href={currentUrls.apple}
                    target="_blank"
                    className={s.downloadIcon}>
                    <img src={appleBlackButton.url} alt="App Store" />
                  </a>
                </Link>
                <Link prefetch={false} href={currentUrls.google}>
                  <a
                    rel="noreferrer"
                    href={currentUrls.google}
                    target="_blank"
                    className={s.downloadIcon}>
                    <img src={googleBlackButton.url} alt="Google Play" />
                  </a>
                </Link>
              </div>
            </div>
            <div
              className={s.downloadAppContainerPhone}
              style={{
                backgroundImage: `url(${
                  !matches?.isMobile ? phoneBkg.url : phoneMobileBkg.url
                })`,
              }}
            />
            <img
              draggable={false}
              src={downloadAppCannabisBkg.url}
              className={s.downloadAppContainerCannabis}
            />
          </div>
        </section>
        <section
          className={`${s.torontoDeliveryContainer} ${s.deliveryAnswer}`}>
          <div className={s.torontoOrderCannabisWrapper}>
            <div className={s.torontoOrderCannabisTitle}>
              <h2 className={s.torontoTitle}>
                {handleTextHighlights(
                  get(torontoTitles, 'cannabisDeliveryKindToronto', ''),
                  'cannabisDeliveryKindToronto',
                )}
              </h2>
              <div
                className={s.torontoDescription1}
                style={{ maxWidth: '430px' }}>
                {get(torontoTexts, 'adviceProductMain', '')}
              </div>
              <div
                className={s.torontoDescription2}
                style={{ maxWidth: '430px' }}>
                {get(torontoTexts, 'adviceProduct', '')}
              </div>
            </div>
          </div>
          <div className={s.secondCannabisBg}>
            {matches.isTablet ? (
              <img src={adviceProductBkg.url} width="100%" height={240} />
            ) : (
              <img src={adviceProductBkg.url} className={s.desktopImage} />
            )}
          </div>
        </section>
        <section
          className={s.marijuanaCards}
          style={{ backgroundImage: `url(${orderMailBkg.url})` }}>
          <div
            className={s.marijuanaCardsBackground}
            style={{ backgroundImage: `url(${footerBkg.url})` }}
          />
          <h2
            className={s.torontoTitle}
            style={{
              textAlign: 'center',
              maxWidth: '560px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            {handleTextHighlights(
              get(torontoTitles, 'lookingForMailOrderToronto', ''),
              'lookingForMailOrderToronto',
            )}
          </h2>
          <div
            className={s.torontoDescription1}
            style={{
              textAlign: 'center',
              maxWidth: '727px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            {handleTextHighlights(
              get(torontoTexts, 'mailOrderMarijuana', ''),
              'mailOrderMarijuana',
            )}
          </div>
          <Link href={Route.ContactUs}>
            <a href={Route.ContactUs} className={s.contactBtn}>
              {get(torontoTitles, 'contactUs', '')}
            </a>
          </Link>
          <div className={s.infoCarts}>
            {infoCardData.map((current: IInfoCard) => {
              return (
                <div key={current.title} className={s.infoCart}>
                  <TorontoCard
                    smallTitle={current.smallTitle}
                    titleWidth={current.titleWidth}
                    marginText={current.marginText}
                    titleHeight={current.titleHeight}
                    backgroundBlendMode={current.backgroundBlendMode}
                    backgroundSize={current.backgroundSize}
                    backgroundPosition={current.backgroundPosition}
                    backgroundColor={current.backgroundColor}
                    hasButton={current.hasButton}
                    backgroundImage={current.backgroundImage}
                    title={current.title}
                    color={current.color}
                    width={current.width}
                    height={current.height}
                    marginTop={current.marginTop}
                    text={current.text}
                    paddingText={current.paddingText}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  },
);
