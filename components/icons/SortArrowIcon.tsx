import React from 'react';

export const SortArrowIcon = ({ color }: { color?: string }) => (
  <svg
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.296477 2.88375L2.88648 0.29375C3.27648 -0.0962501 3.90648 -0.0962501 4.29648 0.29375L6.88648 2.88375C7.51648 3.51375 7.06648 4.59375 6.17648 4.59375H0.996477C0.106477 4.59375 -0.333523 3.51375 0.296477 2.88375Z"
      fill={color || '#6D6D6D'}
    />
  </svg>
);
