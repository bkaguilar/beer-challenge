import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Card from "../components/Card";

const App = props => {
  return (
    <div>
      <header>Brewdog Beer Challenge</header>
      <main>
        {props.responseData.map(card => (
          <Link href="/p/[id]" as={`/p/${card.id}`}>
            <a>
              <Card key={card.id} card={card} />
            </a>
          </Link>
        ))}
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