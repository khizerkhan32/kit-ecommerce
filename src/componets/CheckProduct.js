import React, { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { Button, Radio, Modal, Flex, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

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
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    if (paymentMethod === 'bank') {
      alert('Online banking not available right now.');
      return;
    }

    const firstName = document.querySelector(
      'input[placeholder="First Name*"]'
    ).value;
    const companyName = document.querySelector(
      'input[placeholder="Company Name"]'
    ).value;
    const streetAddress = document.querySelector(
      'input[placeholder="Street Address"]'
    ).value;
    const townCity = document.querySelector(
      'input[placeholder="Town/City"]'
    ).value;
    const phoneNumber = document.querySelector(
      'input[placeholder="Phone Number*"]'
    ).value;
    const emailAddress = document.querySelector(
      'input[placeholder="Email Address*"]'
    ).value;
    const errors = {};

    if (!firstName) errors.firstName = 'Please provide the required data';
    if (!companyName) errors.companyName = 'Please provide the required data';
    if (!streetAddress)
      errors.streetAddress = 'Please provide the required data';
    if (!townCity) errors.townCity = 'Please provide the required data';
    if (!phoneNumber || !/^\d+$/.test(phoneNumber) || phoneNumber.length !== 11)
      errors.phoneNumber = 'Wrong Phone Number';
    if (!emailAddress.includes('@') || !emailAddress.endsWith('.com'))
      errors.emailAddress = 'Wrong Email Address';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      localStorage.clear();
      setIsModalVisible(true);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate('/');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    navigate('/');
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
              <input placeholder="First Name*" />
              {formErrors.firstName && (
                <div className="error-message">{formErrors.firstName}</div>
              )}
            </div>
          </div>
          <div>
            <div>
              <p>Company Name</p>
            </div>
            <div>
              <input placeholder="Company Name" />
              {formErrors.companyName && (
                <div className="error-message">{formErrors.companyName}</div>
              )}
            </div>
          </div>
          <div>
            <div>
              <p>Street Address*</p>
            </div>
            <div>
              <input placeholder="Street Address" />
              {formErrors.streetAddress && (
                <div className="error-message">{formErrors.streetAddress}</div>
              )}
            </div>
          </div>
          <div>
            <div>
              <p>Apartment, floor, etc. (optional)</p>
            </div>
            <div>
              <input placeholder="Apartment, floor, etc. (optional)" />
            </div>
          </div>
          <div>
            <div>
              <p>Town/City*</p>
            </div>
            <div>
              <input placeholder="Town/City" />
              {formErrors.townCity && (
                <div className="error-message">{formErrors.townCity}</div>
              )}
            </div>
          </div>
          <div>
            <div>
              <p>Phone Number*</p>
            </div>
            <div>
              <input placeholder="Phone Number*" />
              {formErrors.phoneNumber && (
                <div className="error-message">{formErrors.phoneNumber}</div>
              )}
            </div>
          </div>
          <div>
            <div>
              <p>Email Address*</p>
            </div>
            <div>
              <input placeholder="Email Address*" />
              {formErrors.emailAddress && (
                <div className="error-message">{formErrors.emailAddress}</div>
              )}
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
            <div className="billing-left">
              <div className="billing-left-con">
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
                  <Radio.Group
                    className="payment-radio"
                    defaultValue="cod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <div className="card-set">
                      <div>
                        <Radio value="bank">Bank</Radio>
                      </div>
                      <div className="Image-div">
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
              </div>
              <div className="coupon-div">
                <div className="coupon-section">
                  <div style={{ width: '52%' }}>
                    <input
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <div style={{ width: '38%' }}>
                    <Button onClick={applyCoupon} className="checkout-btns">
                      Apply Coupon
                    </Button>
                  </div>
                </div>
                <div style={{ width: '46%' }}>
                  <Button
                    type="primary"
                    className="checkout-btns"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        // title="Congratulations!"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
        className="congrats-animation"
      >
        <div className="congrats-text">
          Congratulations! Your order has been placed.
        </div>
      </Modal>
    </div>
  );
}

export default CheckProduct;
