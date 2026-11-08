const ROLE_PERMISSIONS = {
  admin: ["admin:page", "stats:read"],
};

export function authorize(user, permission) {
  if (!user) return false;

  const permissions = ROLE_PERMISSIONS[user.role] ?? [];

  // TODO 2. 해당 권한이 있는지 확인
  return permissions.includes(permission);
}