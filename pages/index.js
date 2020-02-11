import fetch from "isomorphic-unfetch";
import Card from "../components/Card";

const App = props => {
  return (
    <div>
      <header>Brewdog Beer Challenge</header>
      <main>
        {props.responseData.map(card => {
          return <Card key={card.id} card={card} />;
        })}
      </main>
    </div>
  );
};

App.getInitialProps = async function() {
  const res = await fetch("https://api.punkapi.com/v2/beers");
  const data = await res.json();

  return {
    responseData: data.slice(0, 10)
  };
};

export default App;
