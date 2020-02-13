const Button = props => {
  return (
    <button
      className={"Button" + props.className}
      title={props.value}
      alt={props.value}
    >
      {props.value}
      <style jsx>{`
        .Button {
          padding: 10px 20px;
          min-width: 110px;
          border-radius: 8px;
          color: white;
          text-transform: capitalize;
          font-weight: bold;
          background: #3153ac;
          box-shadow: 0 5px 14px rgba(49, 83, 172, 0.4);
          transition: all 400ms ease;
        }

        .Button:hover {
          box-shadow: 0 0 14px rgba(49, 83, 172, 0.4);
        }
      `}</style>
    </button>
  );
};

export default Button;
