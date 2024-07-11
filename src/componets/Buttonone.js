
function Buttonone(props) {
  const { children, width, onClick } = props;
  return (
    <button
      style={{
        border: '1px solid rgba(0, 0, 0, 0.5)',
        width: width,
        borderRadius: '4.5px',
        background: 'none',
        height: 44,
        color: '#000000',
        fontFamily: "Poppins', sans-serif",
        fontWeight: '500',
        fontSize: '16px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Buttonone;
