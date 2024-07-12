import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { useParams } from 'react-router-dom';
import { Flex, Spin } from 'antd';

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
            <div style={{ display: 'flex', width: '60%' }}>
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
              <div style={{ display: 'flex', width: '65%', height: '600px' }}>
                {mainImageUrl && (
                  <div
                    className="backgroud-Image"
                    style={{
                      backgroundImage: `url(${mainImageUrl})`,
                      width: '100%',
                      height: '100%',
                    }}
                  ></div>
                )}
              </div>
            </div>

            <div style={{ display: ' flex', width: '40%' }}>content</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productbyid;
