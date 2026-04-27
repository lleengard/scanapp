export function isAuth() {
  const token = localStorage.getItem("token");
  const expire = localStorage.getItem("expire");

  if (!token || !expire) return false;

  return new Date(expire) > new Date();
}
