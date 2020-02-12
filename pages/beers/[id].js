const Beer = props => {
  return <h1>{props.page.name}</h1>;
};

Beer.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  const data = await res.json();

  return { page: data[0] };
};

export default Beer;
