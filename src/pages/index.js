import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Card from "../components/Card";

const index = props => {
  const [data, setData] = useState(props.responseData.slice(0, 5));
  const [number, setNumber] = useState(5);

  const loadRef = React.createRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0 && number <= 25) {
          console.log(entry.intersectionRatio);
          setNumber(number + 5);
          setData(props.responseData.slice(0, number));
        }
      });
    });

    observer.observe(loadRef.current);
    return () => observer.disconnect();
  });

  return (
    <Layout>
      <Header />
      <main className="Beers">
        {data.map((card, index) => (
          <Link key={card.id} href="/beer/[id]" as={`/beer/${card.id}`}>
            <a id={card.id} ref={loadRef}>
              <Card card={card} />
            </a>
          </Link>
        ))}
        <p id="load" />
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

        @media only screen and (max-width: 768px) {
          .Beers {
            padding: 20px;
          }
        }
      `}</style>
    </Layout>
  );
};

const Header = () => {
  return (
    <header className="Header">
      <h1 className="Header__title">Brewdog Beer Challenge</h1>
      <style jsx>{`
        .Header {
          text-align: center;
          padding: 100px 50px;
          font-family: "Lora", san-serif;
        }

        .Header__title {
          font-size: 3em;
          font-weight: 100;
          color: #7b829f;
        }

        @media only screen and (max-width: 768px) {
          .Header {
            padding: 20px;
          }
        }
      `}</style>
    </header>
  );
};

index.getInitialProps = async () => {
  const res = await fetch("https://api.punkapi.com/v2/beers");
  const data = await res.json();
  return {
    responseData: data
  };
};

export default index;
