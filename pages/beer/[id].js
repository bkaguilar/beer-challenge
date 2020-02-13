import App from "../../App";
import Button from "../../components/Button";
import Section from "../../components/Section";
import { useState } from "react";
import fetch from "isomorphic-unfetch";

const Beer = props => {
  // let ingredients = Object.keys(props.page.ingredients);
  let ingredients = ["malt", "hops"];

  const [active, setActive] = useState(0);
  const handleActiveTab = e => {
    setActive(parseInt(e.currentTarget.attributes.index.value));
  };
  return (
    <App>
      <main className="Beer">
        <header className="Beer__header">
          <div>
            <h1 className="Beer__header__name">{props.page.name}</h1>
            <span className="Beer__header__tagline">{props.page.tagline}</span>
            <span title="Alcohol By Volume">{props.page.abv}</span>
          </div>

          <figure className="Beer__header__image">
            <img src={props.page.image_url} alt="" />
          </figure>
        </header>
        <div className="Beer__text">
          <Section name="Description">
            <p className="Beer__text__description__content">
              {props.page.description}
            </p>
          </Section>
          <Section name="Beers">
            <nav className="Beer__text__beers__nav">
              {ingredients.map((item, index) => (
                <a
                  key={index}
                  index={index}
                  className={
                    active === index
                      ? "Beer__text__beers__nav__item itemActive"
                      : "Beer__text__beers__nav__item"
                  }
                  onClick={handleActiveTab}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="Beer__text__beers__content">
              {active === 0 && (
                <IngredientsList
                  ingredient={props.page.ingredients.malt}
                  id="malt"
                />
              )}

              {active === 1 && (
                <IngredientsList
                  ingredient={props.page.ingredients.hops}
                  id="hops"
                />
              )}
            </div>
          </Section>
          <Section name="Methods"></Section>
        </div>
      </main>
      <style jsx>{`
        .Beer {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #f9cb38;
          padding-top: 70px;
        }

        .Beer__header {
          width: 100%;
          height: 300px;
          padding: 0 100px;
          display: flex;
          justify-content: space-between;
        }

        .Beer__header__name {
          color: #191919;
          font-size: 5.2em;
        }

        .Beer__header__tagline {
          font-style: italic;
        }

        .Beer__header__image {
          height: 100%;
          transition: all 200ms ease;
          transform: scale(1.4);
        }

        img {
          height: 100%;
          object-fit: cover;
          filter: drop-shadow(0 16px 10px rgba(0, 0, 0, 0.6));
        }

        .Beer__text {
          width: 100%;
          overflow: hidden;
          padding: 70px 100px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          background: white;
        }

        .Beer__text__beers__nav {
          display: flex;
        }

        .Beer__text__beers__nav__item {
          position: relative;
          cursor: pointer;
          text-transform: capitalize;
          font-weight: bold;
          color: rgba(241, 108, 81, 0.6);
          padding: 10px;
          margin-right: 50px;
          transition: all 200ms ease;
          border-bottom: 3px solid transparent;
        }

        .Beer__text__beers__nav__item::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scaleY(0);
          transform-origin: 0 bottom;
          transition: transform 200ms ease;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: rgba(241, 108, 81, 0.2);
        }

        .Beer__text__beers__nav__item:hover::before {
          transform: translate(-50%, -50%) scaleY(1);
        }

        .Beer__text__beers__content {
          position: relative;
          overflow: hidden;
          min-height: 500px;
        }

        .itemActive {
          color: #f16c51;
          border-bottom-color: #f16c51;
        }
      `}</style>
    </App>
  );
};

const IngredientsList = props => {
  let titleColumn = ["Name", "Amount", "Action"];
  return (
    <ul id={props.id} className="IngredientsList ">
      <div className="IngredientsList__nav">
        {titleColumn.map((item, index) => (
          <h3 key={index} className="IngredientsList__nav__title">
            {item}
          </h3>
        ))}
      </div>
      {props.ingredient.map((item, index) => (
        <Item key={index} item={item} />
      ))}

      <style jsx>{`
        .IngredientsList {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          height: 100%;
          padding: 20px 0;
          transform: translateY(100px);
          opacity: 0;
          animation: showTable 1s ease forwards;

          @keyframes showTable {
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        .IngredientsList__nav {
          font-size: 0.8em;
          color: rgba(123, 130, 159, 0.6);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }

        h3 {
          max-width: 33%;
        }
      `}</style>
    </ul>
  );
};

const Item = props => {
  return (
    <li className="Item">
      <span className="Item__name">{props.item.name}</span>
      <span className="Item__value">
        {props.item.amount.value + " " + props.item.amount.unit}
      </span>
      <span>
        <Button value="Done" className=" Button--ingredients" />{" "}
      </span>
      <style jsx>{`
        .Item {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin: 25px 0;
          padding: 15px 0;
          border-bottom: 0.3px solid rgba(123, 130, 159, 0.5);
        }

        span {
          // max-width: 33%;
          width: 33%;
        }

        span:nth-of-type(2) {
          text-align: center;
        }

        span:last-of-type {
          text-align: right;
        }
      `}</style>
    </li>
  );
};

Beer.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  const data = await res.json();

  return { page: data[0] };
};

export default Beer;
