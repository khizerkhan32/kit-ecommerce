import { baseModule } from './config';

const APIS = {
  get_all_items: () => {
    return baseModule.get('/products');
  },
  get_Product_by_id: (receipeId) => {
    return baseModule.get(`/products/${receipeId}`);
  },
  get_Product_by_cart: (productId) => {
    return baseModule.get(`/carts/${productId}`);
  },
};

export default APIS;
