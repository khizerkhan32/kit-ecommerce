import Buttonone from '../componets/Buttonone';
import Footer from '../componets/Footer';
import Header from '../componets/Header';
import Products from '../componets/Products';
import Productstwo from '../componets/Productstwo';
import { useEffect, useState } from 'react';

function Productsdetail() {
  const [sliceIndexes, setSliceIndexes] = useState({ start: 10, end: 14 });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSeeAllClick = () => {
    if (isExpanded) {
      setSliceIndexes({ start: 10, end: 14 });
    } else {
      setSliceIndexes({ start: 10, end: 26 });
    }
    setIsExpanded(!isExpanded);
    console.log('working');
  };

  // useEffect(() => {
  //   handleSeeAllClick();
  // }, []);

  return (
    <div>
      <Header />
      <div className="product-con">
        <div className="button-con">
          <div>
            <p> Wishlist (4)</p>
          </div>
          <div>
            <Buttonone width={206}>Move All To Bag</Buttonone>
          </div>
        </div>
        <Products />
        <div className="button-con">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div
              style={{
                height: '40px',
                width: '20px',
                background: '#DB4444',
                borderRadius: '4px',
              }}
            ></div>
            <p>Just For You</p>
          </div>
          <div>
            <Buttonone width={156} onClick={handleSeeAllClick}>
              {isExpanded ? 'See Less' : 'See All'}
            </Buttonone>
          </div>
        </div>
        <Productstwo sliceIndexes={sliceIndexes} />
      </div>
      <Footer />
    </div>
  );
}

export default Productsdetail;
