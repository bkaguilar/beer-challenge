import Button from "./Button";

const Modal = props => {
  return (
    <section className="Modal">
      <div className="Modal__dialog">
        <h3 className="Modal__dialog__title">Information</h3>
        <span className="Modal__dialog__content">{props.children}</span>
        <Button name="modal" modal={true} onClick={props.onClick} />
      </div>
      <style>{`
        .Modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0, .5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Modal__dialog {
          border-radius: 8px;
          background: white;
          padding: 20px;
          box-shadow: 0 5px 10px -5px rgba(0,0,0,0.3);
          transform: translateY(100px);
          opacity: 0;
          animation: showModal 400ms ease-out forwards;
        }

        @keyframes showModal {
          100% {
            opacity:1;
           transform: translateY(0);
          }
        }

        .Modal__dialog--open {
          transform: translateY(0);
        }

        .Modal__dialog__title {
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 0.3px solid rgba(123, 130, 159, 0.5);
        }

        .Modal__dialog__content {
          display: inline-block;
          margin-bottom: 15px;
        }

        .Modal__dialog button {
          display: block;
          margin: 10px 0;
          margin-left: auto;
        }

         @media only screen and (max-width: 768px) {
           .Modal {
             align-items: flex-end;
           }

          .Modal__dialog  {
            width: 100%;
           border-bottom-left-radius: 0; 
           border-bottom-right-radius: 0; 
          }
      `}</style>
    </section>
  );
};
export default Modal;
