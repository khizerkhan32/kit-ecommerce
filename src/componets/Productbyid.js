import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { useParams } from 'react-router-dom';
import { Button, Flex, Spin } from 'antd';
import { Rate } from 'antd';
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
  const [productone, setProductone] = useState({
    category: '',
    name: '',
    images: [],
  });
  const [get_Product_by_id, loading] = useAPI(APIS.get_Product_by_id);
  const [mainImageUrl, setMainImageUrl] = useState('');

  useEffect(() => {
    get_Product_by_id(params.id)
      .then(({ data }) => {
        console.log(data);
        setProductone(data);
        setMainImageUrl(data.images.length > 0 ? data.images[0] : '');
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  const ImageUrltwo = productone.images.length > 0 ? productone.images[1] : '';
  const ImageUrlthree =
    productone.images.length > 0 ? productone.images[2] : '';
  const ImageUrlfour = productone.images.length > 0 ? productone.images[3] : '';
  const ImageUrlfive = productone.images.length > 0 ? productone.images[0] : '';

  const handleImageClick = (imageUrl) => {
    setMainImageUrl(imageUrl);
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
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <div>
            <p>
              Account / {productone.category} / {productone.title}
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
            <div style={{ display: 'flex', width: '60%', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '20%',
                  gap: '15px',
                }}
              >
                {ImageUrltwo && (
                  <div
                    className="backgroud-Image"
                    style={{
                      backgroundImage: `url(${ImageUrltwo})`,
                      width: '100%',
                      height: '138px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(ImageUrltwo)}
                  ></div>
                )}
                {ImageUrlthree && (
                  <div
                    className="backgroud-Image"
                    style={{
                      backgroundImage: `url(${ImageUrlthree})`,
                      width: '100%',
                      height: '138px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(ImageUrlthree)}
                  ></div>
                )}
                {ImageUrlfour && (
                  <div
                    className="backgroud-Image"
                    style={{
                      backgroundImage: `url(${ImageUrlfour})`,
                      width: '100%',
                      height: '138px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(ImageUrlfour)}
                  ></div>
                )}
                {ImageUrlfive && (
                  <div
                    className="backgroud-Image"
                    style={{
                      backgroundImage: `url(${ImageUrlfive})`,
                      width: '100%',
                      height: '138px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(ImageUrlfive)}
                  ></div>
                )}
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

            <div
              style={{
                display: ' flex',
                width: '40%',
                flexDirection: 'column',
                gap: '22px',
              }}
            >
              <div>
                <h2>{productone.title}</h2>
              </div>
              <div>
                <div style={{ display: 'flex' }}>
                  <Rate
                    disabled
                    defaultValue={productone.rating}
                    style={{ color: '#FFAD33' }}
                  />
                  <p>
                    ({productone.stock} Reviews) | <span>In stock</span>
                  </p>
                </div>
              </div>
              <div>${productone.price}</div>
              <div className="description">{productone.description}</div>
              <div>
                <Radiobutton />
              </div>
              <div>
                <Productsize />
              </div>
              <div style={{ display: 'flex' }}>
                <Button className="multiple">
                  <GoDash style={{ width: '24px', height: '24px' }} />
                </Button>
                <div className="buy-number">1</div>
                <Button className="multiple">
                  <HiOutlinePlus style={{ width: '24px', height: '24px' }} />
                </Button>
                <Button
                  style={{
                    height: '44px',
                    width: '164px',
                    background: '#DB4444',
                    color: 'white',
                  }}
                >
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
