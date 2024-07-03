import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import Buttontwo from './Buttontwo';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Flex, Spin } from 'antd';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.06)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

const Products = () => {
  const [allitems, setAllItems] = useState([]);
  const [get_all_items, loading] = useAPI(APIS.get_all_items);

  async function getallitems() {
    try {
      const { data } = await get_all_items();
      console.log(data);
      const First_four = data.products.splice(0, 4);
      setAllItems(First_four);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getallitems();
  }, []);

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
        allitems.map((products, index) => {
          const firstImageUrl = products.images[0];

          return (
            <div
              key={index}
              style={{ display: 'flex', flexDirection: 'column' }}
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
                    <FaRegTrashCan />
                  </div>
                </div>
              </div>
              <Buttontwo>Add to Cart</Buttontwo>
              <div className="price-tag">
                <div>
                  <p className="product_name">{products.title}</p>
                </div>
                <div>
                  <p className="product_title">${products.price}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Products;
