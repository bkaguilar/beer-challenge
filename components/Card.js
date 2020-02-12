import { useEffect, useState } from "react";

const Card = props => {
  const [posY, setPosY] = useState(0);
  const [posX, setPosX] = useState(0);

  const handleMouseMove = e => {
    let card = e.currentTarget;
    let posYInCard = 5 - (10 * (e.pageY - card.offsetTop)) / card.offsetHeight;
    let posXInCard = -5 + (10 * (e.pageX - card.offsetLeft)) / card.offsetWidth;
    setPosY(posY => posYInCard);
    setPosX(posX => posXInCard);
  };

  return (
    <article className="Card" onMouseMove={handleMouseMove}>
      <figure className="Card__image">
        <img src={props.card.image_url} alt="" />
      </figure>
      <div className="Card__text">
        <h1 className="Card__text__name">
          {props.card.name}{" "}
          <span className="Card__text__ABV">{props.card.abv}</span>
        </h1>
        <p className="Card__text__description">{props.card.description}</p>
      </div>
      <style jsx>{`
        .Card {
          position: relative;
          height: 350px;
          width: 100%;
          background-color: white;
          padding: 15px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          box-shadow: 0 15px 15px -5px rgba(174, 174, 174, 0.3);
          transition: all 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .Card:hover {
        box-shadow: 0 15px 25px 0 rgba(174, 174, 174, 0.4);
          // transform: perspective(300px) rotateY(${posX}deg) rotateX(${posY}deg);
        }

        .Card__image {
          position: absolute;
          top: -30px;
        }

        img {
          heigth: 50px;
          width: 50px;
        }

        .Card__text {
          overflow: hidden;
          height: 50%;
          color: #7b829f;
        }

        .Card__text__name {
          color: #f16c51;
          padding: 5px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .Card__text__ABV {
          color: #7b829f;
          font-size: 18px;
        }
      `}</style>
    </article>
  );
};

export default Card;
