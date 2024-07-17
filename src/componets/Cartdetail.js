import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';

function Cartdetail() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [get_Product_by_cart, loading] = useAPI(APIS.get_Product_by_id);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    Promise.all(
      cart.map((item) =>
        get_Product_by_cart(item.id)
          .then(({ data }) => ({ ...data, quantity: item.quantity }))
          .catch((err) => console.log(err))
      )
    ).then((fetchedProducts) => {
      setProducts(fetchedProducts);
      // Initialize quantities state
      const initialQuantities = fetchedProducts.reduce((acc, product) => {
        acc[product.id] = product.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
      console.log(fetchedProducts);
    });
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  return (
    <div className="cart-con">
      <div className="signle-Account">
        Home / <span style={{ color: 'black' }}>Cart</span>
      </div>
      <div className="Buy-con">
        <div className="cart-inner">Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {products.map((product, index) => (
            <div key={index} className="Buy-pro">
              <div className="cart-inner">
                <div
                  className="cart-image"
                  style={{
                    backgroundImage: `url(${
                      product.images && product.images[0]
                    })`,
                  }}
                ></div>
                <div>{product.title}</div>
              </div>
              <div>
                <p>${product.price}</p>
              </div>
              <div>
                <input
                  className="quantity-input"
                  value={quantities[product.id]}
                  type="number"
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                />
              </div>
              <div>
                $
                {calculateSubtotal(
                  product.price,
                  quantities[product.id]
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
      <div></div>
    </div>
  );
}

export default Cartdetail;
