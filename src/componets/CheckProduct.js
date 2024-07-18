import React, { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { Button, Input, Radio } from 'antd';
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
    navigate('/Checkout'); // Redirect to the actual checkout page
  };

  return (
    <div className="checkout-container">
      <div className="billing-details">
        <h2>Billing Details</h2>
        <Input placeholder="First Name*" />
        <Input placeholder="Company Name" />
        <Input placeholder="Street Address*" />
        <Input placeholder="Apartment, floor, etc. (optional)" />
        <Input placeholder="Town/City*" />
        <Input placeholder="Phone Number*" />
        <Input placeholder="Email Address*" />
        <div>
          <Input type="checkbox" /> Save this information for faster check-out
          next time
        </div>
      </div>
      <div className="order-details">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {products.map((product, index) => (
              <div key={index} className="order-item">
                <div>{product.title}</div>
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
              <div>
                <p>Total:</p>
                <p>${discountedTotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="payment-method">
              <Radio.Group defaultValue="cod">
                <Radio value="bank">Bank</Radio>
                <Radio value="cod">Cash on delivery</Radio>
              </Radio.Group>
            </div>
            <div className="coupon-section">
              <Input
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
  );
}

export default CheckProduct;
