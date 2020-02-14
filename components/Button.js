const Button = props => {
  return (
    <button
      className="Button"
      title={props.state === "Done" ? "Ingredient has been used " : props.state}
      alt={props.state}
      onClick={props.onClick}
    >
      {props.state}
      <style jsx>{`
        .Button {
          padding: 10px 20px;
          min-width: 110px;
          border-radius: 8px;
          color: white;
          text-transform: capitalize;
          font-weight: bold;
          background: ${props.state === "IDLE" ? "#3153ac" : "#f2e077"};
          box-shadow: ${props.state === "IDLE"
            ? "0 5px 15px rgba(49, 83, 172, 0.4)"
            : "none"};
          transition: all 400ms ease;
        }

        .Button:hover {
          box-shadow: ${props.state === "IDLE"
            ? "0 0 15px rgba(49, 83, 172, 0.4)"
            : "0 0 15px rgba(242, 224, 119, 0.4)"};
        }
      `}</style>
    </button>
  );
};

export default Button;
