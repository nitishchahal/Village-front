// src/utils/auth.js
export const isLoggedIn = () => {
  return !!localStorage.getItem("ve_token"); // true if logged in
};
