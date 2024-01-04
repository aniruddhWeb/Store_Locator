export const Star = ({ ...props }) => {
  // E4E9E8
  // FFCB45
  return (
    <svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M12.0005 0L16.0795 6.95456L24.0005 8.6579L18.6005 14.6594L19.4169 22.6667L12.0005 19.4212L4.58408 22.6667L5.40049 14.6594L0.000488281 8.6579L7.92146 6.95456L12.0005 0Z"
        fill={props.fill || '#FFCB45'}
      />
    </svg>
  );
};
