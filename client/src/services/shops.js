import axios from "axios";
const shopService = axios.create({
  baseURL: "/api/shops"
});

export const shopInfo = async shop => {
  console.log("DATA ON SERVICE", shop);
  const data = new FormData();
  data.append("shopName", shop.shopName);
  data.append("telephone", shop.telephone);
  data.append("image", shop.image);
  data.append("workingHours", shop.workingHours);
  data.append("shopAdress", shop.shopAdress);
  data.append("bio", shop.bio);
  data.append("lng", shop.coordinates[0]);
  data.append("lat", shop.coordinates[1]);

  console.log("DATA IN SERVICE", data);

  try {
    const response = await shopService.post(`/shop-info`, data);
    // const response = await shopService.post(`/shop-info`, data);
    console.log("RESPONSE IN SERVICE", response.data);
    return response.data.shop;
  } catch (error) {
    throw error;
  }
};

export const loadAllShops = async data => {
  console.log("DATA ON SERVICE", data);
  try {
    const response = await shopService.get(`/`);
    return response.data.shops;
  } catch (error) {
    throw error;
  }
};

export const loadShopInfo = async id => {
  console.log("ID ON SERVICE", id);
  try {
    const response = await shopService.get(`/${id}`);
    return response.data.shops;
  } catch (error) {
    throw error;
  }
};

export const loadMyShop = async () => {
  try {
    const response = await shopService.get(`/my-shop`);
    console.log("RESPONSE", response.data);
    return response.data.shops;
  } catch (error) {
    throw error;
  }
};
