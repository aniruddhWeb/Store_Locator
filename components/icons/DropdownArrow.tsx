export const DropdownArrow = ({ ...props }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g clipPath="url(#clip0_4453_15623)">
        <path
          d="M5.70999 8.71L8.29999 11.3C8.68999 11.69 9.31999 11.69 9.70999 11.3L12.3 8.71C12.93 8.08 12.48 7 11.59 7H6.40999C5.51999 7 5.07999 8.08 5.70999 8.71Z"
          fill={props?.fill || 'white'}
        />
      </g>
      <defs>
        <clipPath id="clip0_4453_15623">
          <rect width="18" height="18" fill={props?.fill || 'white'} />
        </clipPath>
      </defs>
    </svg>
  );
};
