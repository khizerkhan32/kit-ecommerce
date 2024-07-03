import { baseModule } from './config'; //working

const APIS = {
  get_all_items: () => {
    return baseModule.get('/products');
  },
};

export default APIS;
