import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { useParams } from 'react-router-dom';
import { Flex, Spin, Radio } from 'antd';
import { Rate } from 'antd';

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
  const [selectedColor, setSelectedColor] = useState('');

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
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
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
                Color:
                <Radio.Group
                  onChange={handleColorChange}
                  value={selectedColor}
                  style={{ marginLeft: 10 }}
                >
                  <Radio.Button
                    value="color1"
                    style={{
                      backgroundColor:
                        selectedColor === 'color1' ? '#E07575' : '#A0BCE0',
                      borderColor:
                        selectedColor === 'color1' ? '#E07575' : '#A0BCE0',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1px solid black',
                      padding: '0',
                    }}
                  ></Radio.Button>
                  <Radio.Button
                    value="color2"
                    style={{
                      backgroundColor:
                        selectedColor === 'color2' ? '#E07575' : '#A0BCE0',
                      borderColor:
                        selectedColor === 'color2' ? '#E07575' : '#A0BCE0',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1px solid black',
                      padding: '0',
                    }}
                  ></Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productbyid;
