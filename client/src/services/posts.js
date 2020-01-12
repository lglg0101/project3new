import axios from "axios";
const apiService = axios.create({
  baseURL: "/api/post"
});

export const create = async (post, shopId) => {
  console.log("POST on service", post);
  const data = new FormData();
  data.append("content", post.content);
  data.append("image", post.image);
  data.append("shopId", shopId);

  console.log("data on service", data);
  try {
    const response = await apiService.post(`/create`, data);
    console.log("RESPONSE", response);
    return response.data.post;
  } catch (error) {
    throw error;
  }
};
export const load = async id => {
  try {
    const response = await apiService.get(`/${id}`);
    console.log(response);
    const post = response.data.post;
    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const list = async () => {
  try {
    const response = await apiService.get("/list");
    const posts = response.data.posts;
    return posts;
  } catch (error) {
    throw error;
  }
};
export const edit = async (id, post) => {
  try {
    await apiService.patch(`/${id}`, post);
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
// SHOP OWNER PERSPECTIVE
export const postsForShop = async () => {
  try {
    const response = await apiService.get(`/post-for-shop`);
    const posts = response.data.posts;
    return posts;
  } catch (error) {
    throw error;
  }
};


// USER PERSPECTIVE
export const postsFromShop = async id => {
  try {
    const response = await apiService.get(`/posts-from-shop/${id}`);
    const posts = response.data.posts;
    return posts;
  } catch (error) {
    throw error;
  }
};
