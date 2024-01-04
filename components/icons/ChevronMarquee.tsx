export const ChevronMarquee = ({ ...props }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M20.16 12L30.72 24L20.16 36"
        stroke={props?.fill || '#6F7E7C'}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};
