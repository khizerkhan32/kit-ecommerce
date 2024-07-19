import React, { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { Button, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

function CheckProduct() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [couponCode, setCouponCode] = useState(
    localStorage.getItem('couponCode') || ''
  );
  const [discountMessage, setDiscountMessage] = useState('');
  const [get_Product_by_cart, loading] = useAPI(APIS.get_Product_by_id);
  const [isChecked, setIsChecked] = useState(false);
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
      calculateInitialTotals(fetchedProducts);
    });
  }, []);

  const calculateInitialTotals = (fetchedProducts) => {
    const initialTotal = fetchedProducts.reduce((acc, product) => {
      return acc + calculateSubtotal(product.price, product.quantity);
    }, 0);
    setTotal(initialTotal);
    setDiscountedTotal(initialTotal);

    if (couponCode === '101010') {
      const discount = initialTotal * 0.1;
      setDiscountedTotal(initialTotal - discount);
      setDiscountMessage('Discount added 10%');
    }
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
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

  const handlePlaceOrder = () => {
    navigate('/Checkout');
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkout-container">
      <div>
        <div className="signle-Account">
          Home / My Account / Product / View Cart /
          <span style={{ color: 'black' }}> CheckOut</span>
        </div>
      </div>
      <div className="bliling-con">
        <div className="billing-details">
          <div>
            <h2>Billing Details</h2>
          </div>
          <div>
            <div>
              <p>First Name*</p>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div>
            <div>
              <p>Company Name</p>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div>
            <div>
              <p>Street Address*</p>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div>
            <div>
              <p>Apartment, floor, etc. (optional)</p>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div>
            <div>
              <p>Town/City*</p>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div>
            <div>
              <p>Phone Number*</p>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div>
            <div>
              <p>Email Address*</p>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div className="check-div">
            <div>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            <div>
              <p style={{ color: '#000000' }}>
                Save this information for faster check-out next time
              </p>
            </div>
          </div>
        </div>
        <div className="order-details">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {products.map((product, index) => (
                <div key={index} className="order-item">
                  <div style={{ width: '58%' }} className="cart-inner">
                    <div
                      className="cart-image"
                      style={{
                        width: '40px',
                        height: '36px',
                        backgroundImage: `url(${
                          product.images && product.images[0]
                        })`,
                      }}
                    ></div>
                    <div>{product.title}</div>
                  </div>
                  <div>${product.price}</div>
                </div>
              ))}
              <div className="order-summary">
                <div>
                  <p>Subtotal:</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <div>
                  <p>Shipping:</p>
                  <p>Free</p>
                </div>
                {discountMessage && (
                  <div>
                    <p>{discountMessage}</p>
                  </div>
                )}
                <div style={{ border: 'none' }}>
                  <p>Total:</p>
                  <p>${discountedTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="payment-method">
                <Radio.Group className="payment-radio" defaultValue="cod">
                  <div className='card-set' >
                    <div>
                      <Radio value="bank">Bank</Radio>
                    </div>
                    <div>
                      <div>
                        <img src={'/images/1.png'} alt="return Icon" />
                      </div>
                      <div>
                        <img src={'/images/2.png'} alt="return Icon" />
                      </div>
                      <div>
                        <img src={'/images/3.png'} alt="return Icon" />
                      </div>
                      <div>
                        <img src={'/images/4.png'} alt="return Icon" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Radio value="cod">Cash on delivery</Radio>
                  </div>
                </Radio.Group>
              </div>
              <div className="coupon-section">
                <input
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button onClick={applyCoupon}>Apply Coupon</Button>
              </div>
              <Button type="primary" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckProduct;
