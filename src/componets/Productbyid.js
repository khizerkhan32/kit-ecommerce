import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Flex, Spin, Rate } from 'antd';
import Radiobutton from './Radiobutton';
import Productsize from './Productsize';
import { HiOutlinePlus } from 'react-icons/hi2';
import { GoDash } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa6';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

function Productbyid() {
  const params = useParams();
  const navigate = useNavigate();
  const [productone, setProductone] = useState({
    category: '',
    name: '',
    images: [],
  });
  const [quantity, setQuantity] = useState(1);
  const [get_Product_by_id, loading] = useAPI(APIS.get_Product_by_id);
  const [mainImageUrl, setMainImageUrl] = useState('');

  useEffect(() => {
    get_Product_by_id(params.id)
      .then(({ data }) => {
        setProductone(data);
        setMainImageUrl(data.images.length > 0 ? data.images[0] : '');
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  const handleImageClick = (imageUrl) => {
    setMainImageUrl(imageUrl);
  };

  const handleBuyNow = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = existingCart.findIndex(
      (product) => product.id === params.id
    );

    if (productIndex > -1) {
      existingCart[productIndex].quantity += quantity;
    } else {
      existingCart.push({ id: params.id, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/Cart');
  };

  const handleIncrease = () => {
    if (quantity < productone.stock) {
      setQuantity(quantity + 1);
    } else {
      alert('Limited stock. No more available.');
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div style={{ display: 'flex', width: '80%' }}>
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
        <div className="sigle-product">
          <div>
            <p className="signle-Account">
              Account / {productone.category} /
              <span style={{ color: 'black' }}> {productone.title}</span>
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="single-left">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '20%',
                  gap: '15px',
                }}
              >
                {productone.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="backgroud-Image"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      width: '100%',
                      height: '138px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(imageUrl)}
                  ></div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '66.5%',
                  height: '600px',
                  backgroundColor: '#f5f5f5',
                  alignItems: 'center',
                }}
              >
                {mainImageUrl && (
                  <div
                    className="backgroud-Image"
                    style={{
                      backgroundImage: `url(${mainImageUrl})`,
                      width: '100%',
                      height: '490px',
                    }}
                  ></div>
                )}
              </div>
            </div>
            <div className="single-Right">
              <div className="title-div">
                <h2>{productone.title}</h2>
              </div>
              <div>
                <div className="star-con">
                  <Rate
                    disabled
                    defaultValue={productone.rating}
                    style={{ color: '#FFAD33' }}
                  />
                  <p className="signle-Account">
                    ({productone.stock} Reviews) &ensp; | &ensp;
                    <span style={{ color: '#00FF66' }}>In stock</span>
                  </p>
                </div>
              </div>
              <div className="prices">${productone.price}</div>
              <div className="description">{productone.description}</div>
              <div>
                <Radiobutton />
              </div>
              <div>
                <Productsize />
              </div>
              <div className="buy-div">
                <div style={{ display: 'flex' }}>
                  <Button
                    className="multiple"
                    onClick={handleDecrease}
                    style={{
                      borderTopRightRadius: '0px',
                      borderBottomRightRadius: '0px',
                    }}
                  >
                    <GoDash style={{ width: '24px', height: '24px' }} />
                  </Button>
                  <div className="buy-number">{quantity}</div>
                  <Button
                    className="multiple"
                    onClick={handleIncrease}
                    style={{
                      borderTopLeftRadius: '0px',
                      borderBottomLeftRadius: '0px',
                    }}
                  >
                    <HiOutlinePlus style={{ width: '24px', height: '24px' }} />
                  </Button>
                </div>
                <Button className="buy-btn" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button className="heartbutton">
                  <FaRegHeart style={{ width: '22px', height: '22px' }} />
                </Button>
              </div>
              <div className="delivery">
                <div className="dilevry-con">
                  <div>
                    <img
                      src={'/images/icon-delivery.svg'}
                      alt="delivery truck"
                    />
                  </div>
                  <div>
                    <h3>Free Delivery</h3>
                    <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className="dilevry-con">
                  <div>
                    <img src={'/images/icon-return.svg'} alt="return Icon" />
                  </div>
                  <div>
                    <h3>Return Delivery</h3>
                    <p>Free 30 Days Delivery Returns. Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productbyid;
