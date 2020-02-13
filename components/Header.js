const Header = props => {
  return (
    <header className="Header">
      <h1 className="Header__title">Brewdog Beer Challenge</h1>
      <style jsx>{`
        .Header {
          text-align: center;
          padding: 100px 50px;
        }

        .Header__title {
          font-size: 3em;
          color: #7b829f;
        }
      `}</style>
    </header>
  );
};

export default Header;
