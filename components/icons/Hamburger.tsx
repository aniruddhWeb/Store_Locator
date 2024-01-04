export const Hamburger = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 2V0H0V2H20ZM20 6V8H0V6H20ZM20 12V14H0V12H20Z"
        fill="black"
      />
    </svg>
  );
};
