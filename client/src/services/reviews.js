//services for reviews
import axios from "axios";

const apiService = axios.create({
  // Before proxying
  // baseURL: 'http://localhost:3020/api'
  // After proxying
  // baseURL: 'http://localhost:3000/api'
  baseURL: "/api/review"
});

export const create = async (review, shopId ) => {

  console.log("review  on service", review );

  const data = new FormData();
  data.append("text", review.text);
  data.append("image", review.image);
  data.append("shopId", shopId)

  try {
    const response = await apiService.post (`/create`, data);
    console.log("RESPONSE", response);
    return response.data.review;
  } catch (error) {
    console.log("THIS IS THE ERROR", error)
    throw error;
  }
};

export const load = async id => {
  try {
    const response = await apiService.get(`/${id}`);
    console.log(response);
    const review  = response.data.review ;
    return review ;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const list = async () => {
  try {
    const response = await apiService.get('/list');
    const reviews = response.data.reviews;
    return reviews;
  } catch (error) {
    throw error;
  }
};

export const edit = async (id, review) => {
  try {
    await apiService.patch(`/${id}`, review);
  } catch (error) {
    throw error;
  }
};

export const remove = async id => {
  try {
    await apiService.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};

export const reviewsOfShop = async (shopId) => {
  try {
    const response = await apiService.get(`/reviews-of-shop/${shopId}`);
    const reviews = response.data.reviews;
    return reviews;
  } catch (error) {
    throw error;
  }
};
