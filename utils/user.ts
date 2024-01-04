export const hasRoles = (
  roles?: (string | null)[] | null,
  targetRoles?: string[],
) => {
  return (
    (roles || []).filter(x => x && (targetRoles || []).includes(x)).length > 0
  );
};
