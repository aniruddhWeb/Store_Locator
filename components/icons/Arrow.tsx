export const Arrow = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5858 13H3V11H17.5858L11.2929 4.70706L12.7071 3.29285L21.4142 12L12.7071 20.7071L11.2929 19.2928L17.5858 13Z"
        fill={props?.fill || 'black'}
      />
    </svg>
  );
};
