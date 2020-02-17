import App from "../../App";
import Section from "../../components/Section";
import Ingredients from "../../components/Ingredients";
import Methods from "../../components/Methods";
import fetch from "isomorphic-unfetch";

const Beer = props => {
  return (
    <App>
      <main className="Beer">
        <header className="Beer__header">
          <div className="Beer__header__text">
            <h1 className="Beer__header__name">{props.page.name}</h1>
            <span className="Beer__header__tagline">{props.page.tagline}</span>
            <div className="Beer__header__ABV" title="Alcohol By Volume">
              <span>Alcohol By Volume:</span>
              {props.page.abv}
            </div>
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
          <Ingredients page={props.page} />
          <Methods page={props.page} />
        </div>
      </main>
      <style jsx>{`
        .Beer {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(to top, #f9cb38 89%, #be9200);
          padding-top: 50px;
        }

        .Beer__header {
          position: relative;
          width: 100%;
          max-height: 400px;
          padding: 0 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .Beer__header__name {
          color: #191919;
          margin-bottom: 30px;
          font-size: 5em;
          line-height: 1.2;
          font-family: "Lora", san-serif;
        }

        .Beer__header__tagline {
          font-style: italic;
          color: white;
          font-size: 1.3em;
          padding: 10px;
          margin: 10px 0;
          background: #191919;
        }

        .Beer__header__ABV {
          position: absolute;
          bottom: -25px;
          padding: 10px;
          display: block;
          border-radius: 8px;
          width: auto;
          font-size: 1.3em;
          font-weight: bold;
          box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.3);
          background: white;
          color: #f16c51;
        }

        .Beer__header__ABV span {
          padding-right: 10px;
          font-size: 0.7em;
          font-weight: normal;
          color: #191919;
        }

        .Beer__header__image {
          transform: translate(-100px, 50px);
          height: 500px;
          transition: all 200ms ease;
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

        @media only screen and (max-width: 768px) {
          .Beer {
            padding: 50px 20px;
          }

          .Beer__header {
            max-height: none;
            padding: 0 20px 30px 20px;
            flex-direction: column;
          }

          .Beer__header__text {
            text-align: center;
          }

          .Beer__header__name {
            font-size: 5.4em;
            line-height: 1;
          }
          .Beer__header__ABV {
            font-size: 1.1em;
            left: 50%;
            transform: translateX(-50%);
          }

          .Beer__header__image {
            margin: 50px 0;
            height: 250px;
            transform: none;
          }

          .Beer__text {
            padding: 50px 20px 20px 20px;
          }
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
