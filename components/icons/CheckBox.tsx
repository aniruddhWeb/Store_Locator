export const CheckBox = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <rect
        opacity="0.1"
        x="1"
        y="1"
        width="22"
        height="22"
        rx="4"
        stroke="#61AB62"
        strokeWidth="2"
      />
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="4"
        fill="#61AB62"
        stroke="#61AB62"
        strokeWidth="2"
      />
      <path
        d="M9.74984 15.15L7.12484 12.525C6.83234 12.2325 6.36734 12.2325 6.07484 12.525C5.78234 12.8175 5.78234 13.2825 6.07484 13.575L9.21734 16.7175C9.50984 17.01 9.98234 17.01 10.2748 16.7175L18.2248 8.77499C18.5173 8.48249 18.5173 8.01749 18.2248 7.72499C17.9323 7.43249 17.4673 7.43249 17.1748 7.72499L9.74984 15.15Z"
        fill="white"
      />
    </svg>
  );
};
