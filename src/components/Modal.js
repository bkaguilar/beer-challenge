import Button from "./Button";

const Modal = props => {
  return (
    <section className="Modal">
      <div className="Modal__dialog">
        <h3>Information</h3>
        <span>
          The ingredient {props.ingredientName} can`t be done until all hops
          with add {props.add} are done{" "}
        </span>
        <Button name="modal" modal={true} onClick={props.onClick} />
      </div>
      <style>{`
        .Modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0, .3);
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(4px);
        }

        .Modal__dialog {
          border: none;
          background: white;
          padding: 20px;
          box-shadow: 0 10px -10px rgba(0,0,0, .5);
        }
      `}</style>
    </section>
  );
};
export default Modal;
