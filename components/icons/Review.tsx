export const Review = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0868 16L4 19.8042V16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16H10.0868ZM6 16.1958L9.5132 14H18V2H2V14H6V16.1958ZM9 4V7H6V9H9V12H11V9H14V7H11V4H9Z"
        fill={props.fill || '#EF845C'}
      />
    </svg>
  );
};
