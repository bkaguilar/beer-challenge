const Button = props => {
  return (
    <button className="Button" title={props.value} alt={props.value}>
      {props.value}
      <style jsx>{`
        .Button {
          padding: 10px 18px;
          min-width: 100px;
          border-radius: 20px;
          color: white;
          text-transform: capitalize;
          font-weight: bold;
          background: #3153ac;
        }
      `}</style>
    </button>
  );
};

export default Button;
