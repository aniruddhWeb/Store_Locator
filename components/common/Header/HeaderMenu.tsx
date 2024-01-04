import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MapLocation } from '../../icons/MapLocation';
import { MapSelect } from '../../icons/MapSelect';
import { Search } from '../../icons/Search';
import s from './HeaderMenu.module.css';
import { useCurrentLocationDynamic } from '../../../services/location';
import { Route } from '../../../config/Routes';
import { useCurrentUserDynamic } from '../../../services/user';
import { Profile } from '../../icons/Profile';
import { Close } from '../../icons/Close';
import { LogoTitle } from '../../icons/LogoTitle';
import { TCategoryBarItems } from './headerData';

interface Props {
  toggleMenu: () => void;
  toggleLocationSelect: () => void;
  toggleSearch: () => void;
  categoryItems: TCategoryBarItems[];
  setSelectedCategoryItem: (v: TCategoryBarItems) => void;
}

export const HeaderMenu: FC<Props> = props => {
  const router = useRouter();
  const userProps = useCurrentUserDynamic();
  const { selectedLocation: location } = useCurrentLocationDynamic();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  return (
    <div onClick={props.toggleMenu} className={s.root}>
      <div className={s.container}>
        <div className={s.authContainer}>
          {!userProps?.currentUser ? (
            <Link href={Route.RegisterUser}>
              <a href={Route.RegisterUser} className={s.registerButton}>
                Sign Up
              </a>
            </Link>
          ) : null}
          {userProps?.currentUser ? (
            <Link prefetch={false} href={userProps.account}>
              <a
                onClick={props.toggleMenu}
                href={userProps.account}
                className={s.authMobileOpacity}>
                <Profile className={s.profile} fill="#32A071" />
                <div className={s.textIconMobileOpacity}>
                  {userProps.currentUser.username || ''}
                </div>
              </a>
            </Link>
          ) : (
            <Link prefetch={false} href={userProps.login}>
              <a
                onClick={props.toggleMenu}
                href={userProps.login}
                className={s.authMobile}>
                <Profile className={s.profile} />
                <div className={s.textIconMobile}>Sign In</div>
              </a>
            </Link>
          )}
        </div>
        <div className={s.itemsBottomMobileCategories}>
          <div className={s.navigationMobile}>
            <nav className={s.navigationItemsMobile}>
              {(props.categoryItems || []).map(categoryItem => (
                <div
                  key={categoryItem.title}
                  className={s.linkMobileCategory}
                  onClick={() => {
                    props.toggleMenu();
                    props.setSelectedCategoryItem(categoryItem);
                  }}>
                  {categoryItem.title}
                </div>
              ))}
            </nav>
          </div>
        </div>
        <div className={s.itemsBottomMobile}>
          <div className={s.navigationMobile}>
            <nav className={s.navigationItemsMobile}>
              <Link
                prefetch={false}
                href={`${
                  Route.Brands
                }/${location?.province.plInitials.toLowerCase()}`}>
                <a onClick={props.toggleMenu} className={s.linkMobile}>
                  brands
                </a>
              </Link>
              <Link
                prefetch={false}
                href={`${
                  Route.MailOrder
                }/${location?.province.plInitials.toLowerCase()}`}>
                <a onClick={props.toggleMenu} className={s.linkMobile}>
                  mail order
                </a>
              </Link>
              <Link
                prefetch={false}
                href={`${
                  Route.Delivery
                }/${location?.province.plInitials.toLowerCase()}/${
                  location?.plSlug
                }`}>
                <a onClick={props.toggleMenu} className={s.linkMobile}>
                  deliveries
                </a>
              </Link>
              <Link
                prefetch={false}
                href={`${
                  Route.Dispensary
                }/${location?.province.plInitials.toLowerCase()}/${
                  location?.plSlug
                }`}>
                <a onClick={props.toggleMenu} className={s.linkMobile}>
                  dispensaries
                </a>
              </Link>
              <Link
                prefetch={false}
                href={`${
                  Route.Deals
                }/${location?.province.plInitials.toLowerCase()}/${
                  location?.plSlug
                }`}>
                <a onClick={props.toggleMenu} className={s.linkMobile}>
                  deals
                </a>
              </Link>
              <Link prefetch={false} href={Route.Services}>
                <a onClick={props.toggleMenu} className={s.linkMobile}>
                  services
                </a>
              </Link>
            </nav>
          </div>
        </div>
        <div className={s.bottomBorder} />
        <div className={s.rightColumnMobile}>
          <div className={s.secMobile} onClick={props.toggleSearch}>
            <Search className={s.profile} />
            <div className={s.textIconMobile}>Search</div>
          </div>
          <Link prefetch={false} href={Route.Map}>
            <a
              onClick={props.toggleMenu}
              href={Route.Map}
              className={s.secMobile}>
              <MapSelect className={s.searchMobile} />
              <div className={s.textIconMobile}>Show Map</div>
            </a>
          </Link>
          <div className={s.secMobile} onClick={props.toggleLocationSelect}>
            <MapLocation className={s.mapLocationIconMobile} />
            <div className={s.textIconMobile}>Change Location</div>
          </div>
          {userProps.currentUser ? (
            <div className={s.secMobile} onClick={userProps.logout}>
              <div className={s.profile} />
              <div className={s.textIconMobile}>Logout</div>
            </div>
          ) : null}
        </div>
        <div className={s.mobilePadding} />
        <Close className={s.closeIcon} onClick={props.toggleMenu} />
        <LogoTitle className={s.logo} />
      </div>
    </div>
  );
};
