import { Radio } from 'antd';
import { useState } from 'react';

const Radiobutton = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
  return (
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
            backgroundColor: selectedColor === 'color1' ? '#E07575' : '#A0BCE0',
            borderColor: selectedColor === 'color1' ? '#E07575' : '#A0BCE0',
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
            backgroundColor: selectedColor === 'color2' ? '#E07575' : '#A0BCE0',
            borderColor: selectedColor === 'color2' ? '#E07575' : '#A0BCE0',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid black',
            padding: '0',
          }}
        ></Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default Radiobutton;
