import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import Buttontwo from './Buttontwo';
import { FaRegEye } from 'react-icons/fa6';
import { Flex, Spin } from 'antd';
import { Rate } from 'antd';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

const Productstwo = (props) => {
  const { sliceIndexes, onProductClick } = props;
  const [allitems2, setAllItems2] = useState([]);
  const [get_all_items, loading] = useAPI(APIS.get_all_items);

  async function getallitemsview() {
    try {
      const { data } = await get_all_items();
      console.log(data);
      const First_four2 = data.products.slice(
        sliceIndexes.start,
        sliceIndexes.end
      );
      setAllItems2(First_four2);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getallitemsview();
  }, [sliceIndexes]);

  return (
    <div className="product">
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
        allitems2.map((products, index) => {
          const firstImageUrl = products.images[0];

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
              }}
            >
              <div
                className="product-list"
                style={{
                  backgroundImage: `url(${firstImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'end',
                  }}
                >
                  <div
                    style={{
                      height: '32px',
                      width: '32px',
                      background: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      marginTop: '8px',
                      marginRight: '12px',
                    }}
                  >
                    <FaRegEye />
                  </div>
                </div>
              </div>

              <Buttontwo onClick={() => onProductClick(products.id)}>
                Add to Cart
              </Buttontwo>

              <div className="price-tag">
                <div>
                  <p className="product_name">{products.title}</p>
                </div>
                <div>
                  <p className="product_title">${products.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Rate
                    disabled
                    defaultValue={products.rating}
                    style={{ color: '#FFAD33' }}
                  />
                  <span className="spam">( {products.stock} )</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Productstwo;
