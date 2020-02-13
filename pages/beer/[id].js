import App from "../../App";
import fetch from "isomorphic-unfetch";

const Beer = props => {
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
          <section className="Beer__text__description">
            <h2 className="Beer__section__title">Description</h2>
            <p className="Beer__text__description__content">
              {props.page.description}
            </p>
          </section>
          <section className="Beer__text__ingredients">
            <h2 className="Beer__section__title">Ingredients</h2>
            <nav className="Beer__text__ingredients__keys">
              <h3>Hops</h3>
              <h3>Malt</h3>
              <h3>Methods</h3>
            </nav>
            <div className="Beer__text__ingredients__content">
              <ul>
                {props.page.ingredients.hops.map((item, index) => (
                  <List key={index} item={item} />
                ))}
              </ul>
              <ul>
                {props.page.ingredients.malt.map((item, index) => (
                  <List key={index} item={item} />
                ))}
              </ul>
              <ul>
                {Object.entries(props.page.method).map(([key]) => (
                  <li>{key}</li>
                ))}
              </ul>
            </div>
          </section>
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
          z-indez: 2;
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
          z-indez: 1;
          overflow: hidden;
          padding: 70px 100px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          background: white;
        }

        .Beer__section__title {
          color: #7b829f;
          font-size: 1.2em;
          margin-bottom: 30px;
        }

        .Beer__text__description,
        .Beer__text__ingredients {
          margin-bottom: 70px;
        }

        .Beer__text__ingredients__keys,
        .Beer__text__ingredients__content {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </App>
  );
};

const List = props => {
  return (
    <ul className="List">
      <li className="List__item">
        <span>{props.item.name}</span>
        <span>{props.item.amount.value}</span>
        <span>{props.item.amount.unit}</span>
      </li>
    </ul>
  );
};

Beer.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  const data = await res.json();

  return { page: data[0] };
};

export default Beer;
