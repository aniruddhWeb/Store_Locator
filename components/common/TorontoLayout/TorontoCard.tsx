import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import s from './TorontoLayout.module.css';
import { Route } from '../../../config/Routes';

interface IProps {
  titleHeight?: string;
  hasButton?: boolean;
  backgroundImage?: { url: string; __typename: string } | string;
  title?: string;
  text?: string;
  width?: string;
  maxHeight?: boolean;
  backgroundColor?: string;
  buttonLink?: string;
  color?: string;
  height?: string;
  paddingText?: string;
  marginTop?: string;
  marginText?: string;
  marginButton?: string;
  backgroundBlendMode?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  titleWidth?: string;
  hasText?: boolean;
  url?: string;
  smallTitle?: boolean;
  useDiv?: boolean;
  headerLink?: boolean;
}
export const TorontoCard: React.FC<IProps> = ({
  smallTitle = false,
  titleHeight = '',
  marginButton = '',
  hasText = true,
  marginTop = '',
  marginText = '',
  hasButton = true,
  title = '',
  backgroundImage = '',
  backgroundColor = '',
  useDiv = false,
  text = '',
  width = '',
  color = '',
  height = '',
  paddingText = '',
  backgroundBlendMode = '',
  backgroundSize = '',
  backgroundPosition = '',
  titleWidth = '',
  url = '',
  headerLink = false,
}) => {
  const headerClass = cn(s.cardImageTitle, {
    [s.cardImageTitleLink]: headerLink,
  });
  return (
    <>
      <div
        className={s.cardImage}
        style={{
          backgroundBlendMode,
          backgroundSize,
          backgroundPosition,
          height,
          width,
          backgroundColor,
          backgroundImage: `url(${backgroundImage})`,
        }}>
        <div
          className={
            backgroundColor === '#61AB62'
              ? s.fadeGreen
              : backgroundColor === '#EB815A'
              ? s.fadeOrange
              : s.fadeWhite
          }
        />
        <div
          className={s.cardImageContent}
          style={{
            marginTop,
          }}>
          {useDiv ? (
            headerLink ? (
              <Link href={`${Route.Delivery}/${url}`}>
                <a
                  href={`${Route.Delivery}/${url}`}
                  className={headerClass}
                  style={{
                    color: `${color} !important`,
                    maxWidth: `${titleWidth}`,
                    height: `${titleHeight}`,
                  }}>
                  {title}
                </a>
              </Link>
            ) : (
              <div
                className={headerClass}
                style={{
                  color,
                  maxWidth: `${titleWidth}`,
                  height: `${titleHeight}`,
                }}>
                {title}
              </div>
            )
          ) : !smallTitle ? (
            headerLink ? (
              <Link href={`${Route.Delivery}/${url}`}>
                <a className={s.link} href={`${Route.Delivery}/${url}`}>
                  <h2
                    className={headerClass}
                    style={{
                      color: `${color} !important`,
                      maxWidth: `${titleWidth}`,
                      height: `${titleHeight}`,
                    }}>
                    {title}
                  </h2>
                </a>
              </Link>
            ) : (
              <h2
                className={headerClass}
                style={{
                  color,
                  maxWidth: `${titleWidth}`,
                  height: `${titleHeight}`,
                }}>
                {title}
              </h2>
            )
          ) : (
            <h3
              className={headerClass}
              style={{
                color,
                maxWidth: `${titleWidth}`,
                height: `${titleHeight}`,
              }}>
              {title}
            </h3>
          )}
          {hasText && (
            <p
              className={s.cardImageText}
              style={{
                margin: `${marginText}`,
                color,
                padding: `${paddingText}`,
              }}>
              {text}
            </p>
          )}
          {hasButton && (
            <Link href={`${Route.Delivery}/${url}`}>
              <a
                className={s.button}
                style={{
                  margin: `${marginButton}`,
                }}>
                Find Weed Now
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
