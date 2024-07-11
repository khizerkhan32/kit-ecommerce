import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { useParams } from 'react-router-dom';

function Productbyid() {
  const params = useParams();
  const [productone, setProductone] = useState({ category: '', name: '' });
  const [get_Product_by_id, loading] = useAPI(APIS.get_Product_by_id);

  useEffect(() => {
    get_Product_by_id(params.id)
      .then(({ data }) => {
        console.log(data);
        setProductone(data);
      })
      .catch((err) => console.log(err));
  }, [get_Product_by_id]);

  return (
    <div style={{ display: 'flex', width: '80%' }}>
      <div>
        <p>
          Account / {productone.category} / {productone.title}
        </p>
      </div>
    </div>
  );
}

export default Productbyid;
