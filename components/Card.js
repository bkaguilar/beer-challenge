import { useEffect, useState } from "react";
import Button from "../components/Button";

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
        <h2 className="Card__text__name">
          {props.card.name}
          <span className="Card__text__name__ABV" title="Alcohol By Volume">
            {props.card.abv}
          </span>
        </h2>
        <p className="Card__text__description">{props.card.description}</p>
      </div>
      <style jsx>{`
        .Card {
          position: relative;
          height: 350px;
          width: 100%;
          background: #f9cb38;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          box-shadow: 0 15px 15px -5px rgba(174, 174, 174, 0.3);
          transition: all 700ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .Card:hover {
        box-shadow: 0 15px 25px 0 rgba(174, 174, 174, 0.4);
        transform: translateY(-5px);
          // transform: perspective(300px) rotateY(${posX}deg) rotateX(${posY}deg);
        }

        .Card__image {
          transform: translateY(-15%);
          height: 50%;
          width: 50%;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        img {
          height: 90%;
          object-fit: cover;
        }

        .Card__text {
          min-height: 180px;
          overflow: hidden;
          padding: 15px;
          border-radius: 20px;
          background-color: white;
          color: #7b829f;
          font-size: .9em;
          transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .Card__text:hover {
          min-height: 100%;
        }

        .Card__text:hover > .Card__text__description {
          overflow: visible;
          height: auto;
        }

        .Card__text__name {
          color: #f16c51;
          padding: 5px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .Card__text__name__ABV {
          color: #7b829f;
          font-size: 18px;
        }

        .Card__text__description {
          line-height: 1.5;
          text-align: justify;
          overflow: hidden;
          height: 7em;
        }
      `}</style>
    </article>
  );
};

export default Card;
