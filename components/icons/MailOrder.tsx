export const MailOrder = ({ ...props }) => {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 0.25H15.75C16.5784 0.25 17.25 0.921573 17.25 1.75V12.25C17.25 13.0784 16.5784 13.75 15.75 13.75H2.25C1.42157 13.75 0.75 13.0784 0.75 12.25V1.75C0.75 0.921573 1.42157 0.25 2.25 0.25ZM2.25 5.21358V12.25H15.75V5.2139L8.99998 8.58891L2.25 5.21358ZM2.25 3.5365L9.00002 6.91184L15.75 3.53685V1.75H2.25V3.5365Z"
        fill={props.fill || 'black'}
      />
    </svg>
  );
};
