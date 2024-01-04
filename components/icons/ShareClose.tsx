export const ShareClose = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        id="icon"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4142 12L19.7782 18.364L18.364 19.7782L12 13.4142L5.63604 19.7782L4.22183 18.364L10.5858 12L4.22183 5.63604L5.63604 4.22183L12 10.5858L18.364 4.22183L19.7782 5.63604L13.4142 12Z"
        fill={props?.fill || 'rgba(0,0,0,0.3)'}
      />
    </svg>
  );
};
