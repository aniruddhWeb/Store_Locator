export const Cross = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.41421 8.00005L15.7782 14.364L14.364 15.7782L8 9.41426L1.63604 15.7782L0.221826 14.364L6.58579 8.00005L0.221826 1.63608L1.63604 0.221871L8 6.58583L14.364 0.221871L15.7782 1.63608L9.41421 8.00005Z"
        fill={props?.fill || 'black'}
      />
    </svg>
  );
};
