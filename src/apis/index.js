import { baseModule } from './config';

const APIS = {
  get_all_items: () => {
    return baseModule.get('/products');
  },
  get_recipe_by_id: (receipeId) => {
    return baseModule.get(`/products/${receipeId}`);
  },
};

export default APIS;
