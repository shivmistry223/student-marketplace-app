export const setUserData = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
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

export const isOwnProduct = (id) => {
  return id === JSON.parse(localStorage.getItem("user")).id;
};


export const getUserId = () => JSON.parse(localStorage.getItem('user')).id