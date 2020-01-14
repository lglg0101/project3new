import axios from "axios";
const apiAuthenticationService = axios.create({
  baseURL: "/api/authentication"
});
export const signIn = async data => {
  try {
    const response = await apiAuthenticationService.post(`/sign-in`, data);
    console.log(response.data.auxuser);
    return response.data.auxuser;
  } catch (error) {
    throw error;
  }
};
export const signUp = async user => {
  console.log(user);
  const data = new FormData();
  data.append("username", user.username);
  data.append("email", user.email);
  data.append("city", user.city);
  data.append("isShop", user.isShop);
  data.append("image", user.image);
  data.append("bio", user.bio);
  data.append("password", user.password);
  console.log("Data before sending to route", data);
  try {
    console.log("SERVICE");
    const response = await apiAuthenticationService.post(`/sign-up`, data);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};
export const signOut = async () => {
  try {
    await apiAuthenticationService.post(`/sign-out`);
  } catch (error) {
    throw error;
  }
};

export const loadUserInformation = async () => {
  try {
    const response = await apiAuthenticationService.get(`/loaduser`);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};
// export const loadUserPicture = async post => {
//   const data = new FormData();
//   data.append("text", user.text);
//   data.append("image", user.image);
//   try {
//     const response = await apiService.patch(`/upload`, data);
//     console.log("RESPONSE", response);
//     return response
//   } catch (error) {
//     throw error;
//   }
// };
export const loadShopInformation = async () => {
  try {
    const response = await apiAuthenticationService.get(`/shopprofile`);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};
