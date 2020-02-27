import fetch from "isomorphic-unfetch";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Card from "../components/Card";

const index = props => {
  const observer = useRef();
  const [page, setPage] = useState(1);
  const [beers, setBeers] = useState([]);

  const lastBeer = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          console.log(page);
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [page]
  );

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=10`)
      .then(res => res.json())
      .then(data => setBeers(prevBeers => [...prevBeers, ...data]));
  }, [page]);

  return (
    <Layout>
      <Header />
      <main className="Beers">
        {beers.map((card, index) => {
          if (beers.length === index + 1) {
            return (
              <Link key={card.id} href="/beer/[id]" as={`/beer/${card.id}`}>
                <a id={card.id} ref={lastBeer}>
                  <Card card={card} />
                </a>
              </Link>
            );
          } else {
            return (
              <Link key={card.id} href="/beer/[id]" as={`/beer/${card.id}`}>
                <a id={card.id}>
                  <Card card={card} />
                </a>
              </Link>
            );
          }
        })}
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

        .loading {
          height: 200px;
          margin: 30px 0;
          background: red;
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

export default index;
