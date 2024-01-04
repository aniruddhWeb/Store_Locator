import React, { useMemo } from 'react';
import s from './Error.module.css';
import { Route } from '../../../config/Routes';

interface Props {
  text?: string;
  status?: number;
}

const getErrorText = (statusCode?: number) => {
  switch (statusCode) {
    case 404:
      return 'Page not found';
    default:
      return 'An error occurred';
  }
};

export const Error = React.memo(({ text, status }: Props) => {
  const errorText = useMemo(() => text || getErrorText(status), [text, status]);

  return (
    <div className={s.root}>
      {status ? (
        <div className={s.status}>{status}</div>
      ) : (
        <svg
          width="176"
          height="176"
          viewBox="0 0 176 176"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2654_8093)">
            <path
              d="M87.9992 109.986C84.9619 109.986 82.5 107.524 82.5 104.487V65.9919C82.5 62.955 84.9619 60.4927 87.9992 60.4927C91.0365 60.4927 93.4985 62.955 93.4985 65.9919V104.487C93.4985 107.524 91.0365 109.986 87.9992 109.986Z"
              fill="#F2FC53"
            />
            <path
              d="M173.672 137.596L105.21 23.4932C97.4421 10.5422 78.5742 10.5171 70.7914 23.4932L2.3288 137.596C-4.14553 148.386 3.64381 162.229 16.2763 162.229H159.724C172.359 162.229 180.145 148.385 173.672 137.596ZM159.724 151.23H16.2766C12.179 151.23 9.66652 146.738 11.7604 143.253L80.2226 29.1506C83.7349 23.2963 92.2618 23.2894 95.7786 29.1506L164.241 143.253C166.332 146.734 163.826 151.23 159.724 151.23Z"
              fill="#61AB62"
            />
            <path
              d="M87.9989 131.983C92.5546 131.983 96.2477 128.29 96.2477 123.734C96.2477 119.178 92.5546 115.485 87.9989 115.485C83.4431 115.485 79.75 119.178 79.75 123.734C79.75 128.29 83.4431 131.983 87.9989 131.983Z"
              fill="#F2FC53"
            />
          </g>
          <defs>
            <clipPath id="clip0_2654_8093">
              <rect width="176" height="176" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      <div className={s.error}>{errorText}</div>
      {status ? (
        <a href={Route.Root} className={s.backButton}>
          <div className={s.backButtonText}>Back to Home</div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="24 / arrows / arrow-left">
              <path
                id="icon"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.41436 13.0001L12.7073 19.293L11.293 20.7072L2.58594 12.0001L11.293 3.29297L12.7073 4.70718L6.41436 11.0001H21.0002V13.0001H6.41436Z"
                fill="#F2FC53"
              />
            </g>
          </svg>
        </a>
      ) : (
        <div className={s.tryContainer}>
          <div className={s.tryButtonText}>Try again or</div>
          <a href={Route.ContactUs} className={s.tryButtonText}>
            contact support
          </a>
        </div>
      )}
    </div>
  );
});
