import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { Button, Flex, Spin } from 'antd';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

function Cartdetail() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [couponCode, setCouponCode] = useState(
    localStorage.getItem('couponCode') || ''
  );
  const [total, setTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');
  const [get_Product_by_cart, loading] = useAPI(APIS.get_Product_by_id);
  const navigate = useNavigate();

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
      calculateInitialTotals(fetchedProducts, initialQuantities);
    });
  }, []);

  const calculateInitialTotals = (fetchedProducts, initialQuantities) => {
    const initialTotal = fetchedProducts.reduce((acc, product) => {
      return (
        acc + calculateSubtotal(product.price, initialQuantities[product.id])
      );
    }, 0);
    setTotal(initialTotal);
    setDiscountedTotal(initialTotal);

    if (couponCode === '101010') {
      const discount = initialTotal * 0.1;
      setDiscountedTotal(initialTotal - discount);
      setDiscountMessage('Discount added 10%');
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > products.find((product) => product.id === id).stock) {
      setDiscountMessage('Limited stock, no more available');
    } else if (newQuantity < 1) {
      setDiscountMessage('Quantity cannot be less than 1');
    } else {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }));
    }
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const updateCart = () => {
    // Update local storage with new quantities
    const updatedCart = products.map((product) => ({
      id: product.id,
      quantity: quantities[product.id],
    }));
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Calculate total of products
    const totalValue = products.reduce((acc, product) => {
      return acc + calculateSubtotal(product.price, quantities[product.id]);
    }, 0);

    setTotal(totalValue);
    setDiscountedTotal(totalValue);

    if (couponCode === '101010') {
      const discount = totalValue * 0.1;
      setDiscountedTotal(totalValue - discount);
      setDiscountMessage('Discount added 10%');
    } else {
      setDiscountMessage('');
    }
  };

  const applyCoupon = () => {
    if (couponCode === '101010') {
      const discount = total * 0.1;
      setDiscountedTotal(total - discount);
      setDiscountMessage('Discount added 10%');
      localStorage.setItem('couponCode', couponCode);
    } else {
      setDiscountMessage('Invalid coupon code');
    }
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);

    const updatedCart = updatedProducts.map((product) => ({
      id: product.id,
      quantity: quantities[product.id],
    }));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate('/Checkout');
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
        <div className="spiner-con">
          <Flex gap="small" vertical>
            <Flex gap="small">
              <Spin tip="Loading" size="large">
                {content}
              </Spin>
            </Flex>
          </Flex>
        </div>
      ) : (
        <div className="list-div">
          {products.map((product, index) => (
            <div key={index} className="Buy-pro">
              <div className="cart-inner">
                <div className="Delete-div">
                  <Button
                    className="Delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    <ImCross
                      style={{ width: '6px', height: '6px', color: 'white' }}
                    />
                  </Button>
                </div>
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
      <div className="return-div">
        <div>
          <Link to={{ pathname: '/' }}>
            <Button className="return-btn">Return To Shop</Button>
          </Link>
        </div>
        <div>
          <Button className="return-btn" onClick={updateCart}>
            Update Cart
          </Button>
        </div>
      </div>
      <div className="checkout-con">
        <div className="coupon-con">
          <div>
            <input
              className="input-coupon"
              type="text"
              placeholder="Add Coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>
          <div>
            <Button
              style={{ width: '200px' }}
              className="checkout-btns"
              onClick={applyCoupon}
            >
              Apply Coupon
            </Button>
          </div>
        </div>
        <div className="checkout-box">
          <div className="checkout-inner">
            <h2>Cart Total</h2>
          </div>
          <div
            className="checkout-inner"
            style={{ borderBottom: '1px solid #000000', paddingBottom: '14px' }}
          >
            <div>
              <p>Subtotal:</p>
            </div>
            <div className="total-of-products">
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <div
            className="checkout-inner"
            style={{ borderBottom: '1px solid #000000', paddingBottom: '14px' }}
          >
            <div>
              <p>Shipping:</p>
            </div>
            <div>
              <p>Free</p>
            </div>
          </div>
          {discountMessage && (
            <div className="checkout-inner">
              <div>
                <p>{discountMessage}</p>
              </div>
            </div>
          )}
          <div className="checkout-inner">
            <div>Total</div>
            <div className="totalAllTotal">${discountedTotal.toFixed(2)}</div>
          </div>
          <div>
            <Button
              style={{ width: '230px' }}
              className="checkout-btns"
              onClick={handleCheckout}
            >
              Procees to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartdetail;
