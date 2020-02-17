import { useState } from "react";

const Card = props => {
  const [isHover, setIsHover] = useState(false);
  const handleHover = () => {
    setIsHover(true);
  };

  const handleLeave = () => {
    setIsHover(false);
  };

  return (
    <article id={props.card.id} className="Card">
      <figure className="Card__image">
        <img src={props.card.image_url} alt="" />
      </figure>
      <div
        className="Card__text"
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
      >
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
        }

        .Card__image {
          z-index: 1;
          pointer-events: none;
          transform: translate(${isHover ? "80%, 375px" : "0, -15%"})
            scale(${isHover ? 0.5 : 1});
          height: 50%;
          width: 50%;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 500ms ease;
        }

        img {
          height: 100%;
          object-fit: cover;
          filter: drop-shadow(0 16px 10px rgba(0, 0, 0, 0.6));
        }

        .Card__text {
          position: relative;
          min-height: 180px;
          overflow: hidden;
          padding: 15px;
          border-radius: 20px;
          background-color: white;
          color: #7b829f;
          font-size: 0.9em;
          transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .Card__text:hover {
          min-height: 100%;
        }

        .Card__text:hover > .Card__text__description {
          overflow: visible;
          height: auto;
        }

        .Card__text:after {
          content: "${isHover ? "See More" : ""}";
          position: absolute;
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px;
          height: ${isHover ? "auto" : "15%"};
          transtion: all 300ms ease;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, .4) 10%,
            white 90%
          );
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
