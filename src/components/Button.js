const Button = props => {
  let name,
    title,
    boxShadow,
    background = "";

  if (!props.done) {
    (name = "IDLE"),
      (title = name),
      (background = "#3153ac"),
      (boxShadow = "0 5px 25px -5px rgba(49, 83, 172, 0.8)");
  }

  if (props.running) {
    (name = "Running " + props.seconds + "s"),
      (title = "Timer is running"),
      (background = "green"),
      (boxShadow = "0 5px 25px -5px rgba(0,128,0 , .5)");
  }

  if (props.pause) {
    (name = "Pause " + props.seconds + "s"),
      (title = "Timer is pause"),
      (background = "#7b829f");
  }

  if (props.modal) name = "Accept";

  return (
    <button
      className="Button"
      duration={props.duration}
      title={props.done ? "Ingredient is ready :P" : title}
      onClick={props.onClick}
      name={props.name}
    >
      {props.done ? "Done" : name}
      <style jsx>{`
        .Button {
          padding: 10px 20px;
          min-width: 110px;
          border-radius: 5px;
          color: white;
          text-transform: capitalize;
          font-weight: bold;
          background: ${props.done ? "#f2e077" : background};
          box-shadow: ${props.done ? "none" : boxShadow};
          transition: all 400ms ease;
        }

        .Button:hover {
          box-shadow: ${props.done
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
