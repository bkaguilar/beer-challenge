const Button = props => {
  return (
    <button
      className="Button"
      title={props.state ? "Ingredient is ready :P" : "IDLE"}
      alt={props.state ? "Ingredient is ready :P" : "IDLE"}
      onClick={props.onClick}
      name={props.name}
    >
      {props.state ? "Done" : "IDLE"}
      <style jsx>{`
        .Button {
          padding: 10px 20px;
          min-width: 110px;
          border-radius: 8px;
          color: white;
          text-transform: capitalize;
          font-weight: bold;
          background: ${props.state ? "#f2e077" : "#3153ac"};
          box-shadow: ${props.state
            ? "none"
            : "0 5px 15px rgba(49, 83, 172, 0.4)"};
          transition: all 400ms ease;
        }

        .Button:hover {
          box-shadow: ${props.state
            ? "0 0 15px rgba(242, 224, 119, 0.4)"
            : "0 0 15px rgba(49, 83, 172, 0.4)"};
        }
      `}</style>
    </button>
  );
};

export default Button;
