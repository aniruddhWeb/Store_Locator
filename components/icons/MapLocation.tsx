export const MapLocation = ({ ...props }) => {
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
        d="M20 0L0 8.57143L8.23529 11.7647L11.4286 20L20 0ZM11.5212 14.7067L9.78102 10.219L5.29326 8.47882L16.1921 3.80789L11.5212 14.7067Z"
        fill={props?.fill || 'black'}
      />
    </svg>
  );
};
