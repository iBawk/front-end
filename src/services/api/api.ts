import { getNewAccessToken } from "./endpoints/new-access-token";
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
} from "./endpoints/produtct";
import { getUserLogin } from "./endpoints/user-login";
import { postUserRegister } from "./endpoints/user-register";
import { getUserMe } from "./endpoints/user-me";

export const API_BASE_URL = "http://127.0.0.1:3334";

const Api = {
  public: { postUserRegister, getUserLogin },
  private: {
    getNewAccessToken,
    getProducts,
    postProduct,
    deleteProduct,
    getProduct,
    getUserMe,
  },
};

export default Api;
