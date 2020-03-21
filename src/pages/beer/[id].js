import { API_URL } from "../../constants";
import Section from "../../components/Section";
import Ingredients from "../../components/Ingredients";
import Methods from "../../components/Methods";
import fetch from "isomorphic-unfetch";
import Layout from "../../components/Layout";

const Beer = props => {
  return (
    <Layout>
      <main className="Beer">
        <BeerHeader {...props} />
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

          .Beer__text {
            padding: 50px 20px 20px 20px;
          }
        }
      `}</style>
    </Layout>
  );
};

const BeerHeader = props => {
  return (
    <header className="BeerHeader">
      <div className="BeerHeader__text">
        <h1 className="BeerHeader__name">{props.page.name}</h1>
        <span className="BeerHeader__tagline">{props.page.tagline}</span>
        <div className="BeerHeader__ABV" title="Alcohol By Volume">
          <span>Alcohol By Volume:</span>
          {props.page.abv}
        </div>
      </div>
      <figure className="BeerHeader__image">
        <img src={props.page.image_url} alt="" />
      </figure>
      <style jsx>{`
        .BeerHeader {
          position: relative;
          width: 100%;
          max-height: 400px;
          padding: 0 100px 40px 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .BeerHeader__name {
          color: #191919;
          margin-bottom: 30px;
          font-size: 8vmin;
          line-height: 1.2;
          font-family: "Lora", san-serif;
        }

        .BeerHeader__tagline {
          font-style: italic;
          color: white;
          font-size: 1.3em;
          padding: 10px;
          margin: 10px 0;
          background: #191919;
        }

        .BeerHeader__ABV {
          position: absolute;
          bottom: -25px;
          padding: 10px;
          display: block;
          border-radius: 5px;
          width: auto;
          font-size: 1.3em;
          font-weight: bold;
          box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.3);
          background: white;
          color: #f16c51;
        }

        .BeerHeader__ABV span {
          padding-right: 10px;
          font-size: 0.7em;
          font-weight: normal;
          color: #191919;
        }

        .BeerHeader__image {
          padding: 0 20px;
          transform: translate(-20px, 50px);
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
          .BeerHeader {
            max-height: none;
            padding: 0 20px 30px 20px;
            flex-direction: column;
          }

          .BeerHeader__text {
            text-align: center;
          }

          .BeerHeader__name {
            font-size: 5.4em;
            line-height: 1;
          }
          .BeerHeader__ABV {
            font-size: 1.1em;
            left: 50%;
            transform: translateX(-50%);
          }

          .BeerHeader__image {
            margin: 50px 0;
            height: 250px;
            transform: none;
          }
        }
      `}</style>
    </header>
  );
};

Beer.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();

  return { page: data[0] };
};

export default Beer;
