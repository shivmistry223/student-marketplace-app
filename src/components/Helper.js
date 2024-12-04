export const setUserData = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const userExists = () => localStorage.getItem("user");

export const logOut = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const isOwnProduct = (id) => {
  return id === JSON.parse(localStorage.getItem("user"))._id;
};

export const getUserId = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))._id
    : null;
