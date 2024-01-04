import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import s from './UserMenu.module.css';
import { DropArrow } from '../../icons/DropArrow';
import { Profile } from '../../icons/Profile';
import { CurrentUser } from '../../../generated/graphql';
import { Route } from '../../../config/Routes';

enum UserRole {
  Admin = 'admin',
  User = 'user',
  Editor = 'editor',
  Sales1 = 'sales1',
  Sales2 = 'sales2',
  Marketing = 'marketing',
  Tech = 'tech',
  Banned = 'banned',
  Seo = 'seo',
}

const hasRoles = (roles?: (string | null)[] | null, targetRoles?: string[]) => {
  return (
    (roles || []).filter(x => x && (targetRoles || []).includes(x)).length > 0
  );
};

interface Props {
  isVisible?: boolean;
  currentUser?: CurrentUser | null;
  originalUser?: {
    username: string;
    userID: string;
  } | null;
  closePopups?: () => void;
  logout?: () => void;
  account: string;
  login: string;
}

export const UserMenu = memo(
  ({
    currentUser,
    originalUser,
    isVisible,
    login,
    account,
    logout,
    closePopups,
  }: Props) => {
    const router = useRouter();

    const [isOpened, setOpen] = useState(false);

    const open = useCallback(() => {
      if (closePopups) {
        closePopups();
      }
      if (currentUser) {
        setOpen(true);
      } else {
        router.push(login);
      }
    }, [currentUser, router, login, closePopups]);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
      if (isOpened) {
        document.addEventListener('click', close);

        return () => document.removeEventListener('click', close);
      }
    }, [isOpened, close]);

    const stopPropagation = useCallback(e => e.stopPropagation(), []);

    return (
      <div onClick={open} className={s.menu}>
        <div className={s.menuLabel}>
          <Profile
            className={currentUser ? s.profileLogged : s.profile}
            fill={currentUser ? '#32A071' : '#000000'}
          />
          {currentUser ? (
            <>
              <div className={s.name}>{currentUser?.username || ''}</div>
              <DropArrow />
            </>
          ) : null}
        </div>
        {isVisible && currentUser && isOpened ? (
          <div
            onMouseLeave={close}
            onClick={stopPropagation}
            className={s.dropdown}>
            {originalUser && originalUser.username !== currentUser.username ? (
              <a
                href={`${Route.Profile}${Route.Login}/${originalUser.userID}`}
                className={s.dropdownItem}>
                {`Login as ${originalUser.username}`}
              </a>
            ) : null}
            {hasRoles(currentUser.userRoles, [
              UserRole.Admin,
              UserRole.Marketing,
              UserRole.Sales2,
              UserRole.Tech,
            ]) ? (
              <a href={`${Route.AdminBusinesses}`} className={s.dropdownItem}>
                Admin
              </a>
            ) : null}
            {hasRoles(currentUser.userRoles, [
              UserRole.Admin,
              UserRole.Tech,
            ]) ? (
              <a
                href={`${Route.Admin}${Route.ProductAds}`}
                className={s.dropdownItem}>
                Product Ads
              </a>
            ) : null}
            {hasRoles(currentUser.userRoles, [
              UserRole.Admin,
              UserRole.Marketing,
              UserRole.Sales2,
              UserRole.Tech,
            ]) ? (
              <a href={`${Route.Analytics}`} className={s.dropdownItem}>
                Analytics
              </a>
            ) : null}
            {hasRoles(currentUser.userRoles, [
              UserRole.Admin,
              UserRole.Editor,
              UserRole.Tech,
            ]) ? (
              <a href={`${Route.EditorPanel}`} className={s.dropdownItem}>
                Editor Control Panel
              </a>
            ) : null}
            {hasRoles(currentUser.userRoles, [
              UserRole.Admin,
              UserRole.Tech,
            ]) ? (
              <a href={`${Route.RegionOverview}`} className={s.dropdownItem}>
                Region Overview
              </a>
            ) : null}
            {hasRoles(currentUser.userRoles, [
              UserRole.Seo,
              UserRole.Admin,
              UserRole.Tech,
            ]) ? (
              <a href={`${Route.SeoPanel}`} className={s.dropdownItem}>
                SEO Control Panel
              </a>
            ) : null}
            {hasRoles(currentUser.userRoles, [
              UserRole.Admin,
              UserRole.Editor,
              UserRole.Marketing,
              UserRole.Seo,
              UserRole.Sales2,
            ]) ? (
              <a
                target="_blank"
                href={`${Route.GSuite}`}
                className={s.dropdownItem}>
                GSuite
              </a>
            ) : null}
            <a href={account} className={s.dropdownItem}>
              Account
            </a>
            <div onClick={logout} className={s.dropdownItem}>
              Logout
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);
