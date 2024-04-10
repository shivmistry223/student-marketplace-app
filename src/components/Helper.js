export const setUser = () => {
  localStorage.setItem("user", true);
};

export const userExists = () => {
  if (!localStorage.getItem("user")) {
    window.location.href = "/login";
  }
};

export const logOut = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
