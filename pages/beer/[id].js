import App from "../../App";
import fetch from "isomorphic-unfetch";
import List from "../../components/List";

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
            <h2>Description</h2>
            <p>{props.page.description}</p>
          </section>
          <section className="Beer__text__ingredients">
            <h2>Ingredients</h2>
            <nav className="Beer__text__ingredients__keys">
              {Object.entries(props.page.ingredients).map(([key, value]) => {
                return <h3>{key}</h3>;
              })}
            </nav>
            {Object.values(props.page.ingredients).map((item, index) => {
              if (Array.isArray(item)) {
                return <List key={index} item={item} />;
              } else {
                return (
                  <ul>
                    <li>{item}</li>
                  </ul>
                );
              }
            })}
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
          height: 350px;
          display: flex;
          justify-content: space-around;
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
          transform: translateY(-20px);
        }

        img {
          height: 400px;
          object-fit: cover;
        }

        .Beer__text {
          z-indez: 1;
          overflow: hidden;
          padding: 15px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          background: white;
        }

        .Beer__text__ingredients__keys {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </App>
  );
};

Beer.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  const data = await res.json();

  return { page: data[0] };
};

export default Beer;
