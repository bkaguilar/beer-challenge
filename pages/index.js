import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Card from "../components/Card";
import App from "../App";
import Header from "../components/Header";

const index = props => {
  return (
    <App>
      <Header />
      <main className="Beers">
        {props.responseData.map(card => (
          <Link key={card.id} href="/beer/[id]" as={`/beer/${card.id}`}>
            <a>
              <Card card={card} />
            </a>
          </Link>
        ))}
      </main>
      <style jsx>{`
        .Beers {
          padding: 100px 50px;
          display: grid;
          grid-gap: 80px;
          place-items: center;
          justify-content: center;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
        }
      `}</style>
    </App>
  );
};

index.getInitialProps = async function() {
  const res = await fetch("https://api.punkapi.com/v2/beers");
  const data = await res.json();

  return {
    responseData: data.slice(0, 10)
  };
};

export default index;
