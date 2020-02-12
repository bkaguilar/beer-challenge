import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Card from "../components/Card";

const App = props => {
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__header__title">Brewdog Beer Challenge</h1>
      </header>
      <main className="App__wrapper">
        {props.responseData.map(card => (
          <Link key={card.id} href="/p/[id]" as={`/p/${card.id}-${card.name}`}>
            <a>
              <Card card={card} />
            </a>
          </Link>
        ))}
      </main>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&display=swap");
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        *::-moz-selection {
          // background: rgba(orange, 0.5);
          color: white;
        }
        *::selection {
          // color: $sc-color;
          // background: rgba($brand-color_2, 0.5);
        }

        body {
          // background: #e8eff6;
          font-family: "Quicksand", sans-serif;
          line-height: 1.6;
          background: whitesmoke;
        }

        a {
          text-decoration: none;
        }

        .App {
          max-width: 1400px;
          margin: 0 auto;
        }

        .App__header {
          text-align: center;
          padding: 100px 50px;
        }

        .App__header__title {
          font-size: 3em;
          color: #7b829f;
        }

        .App__wrapper {
          padding: 100px 50px;
          display: grid;
          grid-gap: 80px;
          place-items: center;
          justify-content: center;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
        }
      `}</style>
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
