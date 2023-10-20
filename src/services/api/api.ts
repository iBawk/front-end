import { getNewAccessToken } from "./endpoints/new-access-token";
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
} from "./endpoints/produtct";
import { getUserLogin } from "./endpoints/user-login";
import { postUserRegister } from "./endpoints/user-register";

export const API_BASE_URL = "http://localhost:3334";

const Api = {
  public: { postUserRegister, getUserLogin },
  private: {
    getNewAccessToken,
    getProducts,
    postProduct,
    deleteProduct,
    getProduct,
  },
};

export default Api;
