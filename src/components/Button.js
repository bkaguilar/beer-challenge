const Button = props => {
  let name,
    background = "";
  if (!props.state) (name = "IDLE"), (background = "#3153ac");
  if (props.running)
    (name = "Running " + props.seconds + "s"), (background = "green");
  if (props.pause) (name = "Pause"), (background = "#7b829f");
  if (props.modal) name = "Accept";
  return (
    <button
      className="Button"
      duration={props.duration}
      title={props.state ? "Ingredient is ready :P" : "IDLE"}
      alt={props.state ? "Ingredient is ready :P" : "IDLE"}
      onClick={props.onClick}
      name={props.name}
    >
      {props.state ? "Done" : name}
      <style jsx>{`
        .Button {
          padding: 10px 20px;
          min-width: 110px;
          border-radius: 5px;
          color: white;
          text-transform: capitalize;
          font-weight: bold;
          background: ${props.state ? "#f2e077" : background};
          box-shadow: ${props.state
            ? "none"
            : "0 5px 25px -5px rgba(49, 83, 172, 0.8)"};
          transition: all 400ms ease;
        }

        .Button:hover {
          box-shadow: ${props.state
            ? "0 0 15px rgba(242, 224, 119, 0.5)"
            : "0 0 15px rgba(49, 83, 172, 0.5)"};
        }

        @media only screen and (max-width: 768px) {
          .Button {
            min-width: 80px;
          }
        }
      `}</style>
    </button>
  );
};

export default Button;
