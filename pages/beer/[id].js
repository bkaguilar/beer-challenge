import App from "../../App";

const Beer = props => {
  return (
    <App>
      <main>
        <h1>{props.page.name}</h1>
        <figure>
          <img src={props.page.image_url} alt="" />
        </figure>
        <span title="Alcohol By Volume">{props.page.abv}</span>
        <p className="Card__text__description">{props.page.description}</p>
      </main>
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
