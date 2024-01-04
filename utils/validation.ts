export const validateEmail = (email: string) => {
  return (
    !email ||
    email.length === 0 ||
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email,
    )
  );
};

export const validatePassword = (password: string) => {
  return password ? password.length >= 8 : true;
};
