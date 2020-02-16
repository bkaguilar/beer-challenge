const Nav = props => (
  <nav className="Nav">
    {props.table.map((item, index) => {
      return (
        <a
          key={index}
          index={index}
          className={
            props.tabActive === index ? "Nav__tab itemActive" : "Nav__tab"
          }
          onClick={props.onClick}
        >
          {item}
        </a>
      );
    })}
    <style jsx>
      {`
        .Nav {
          display: flex;
        }

        .Nav__tab {
          position: relative;
          cursor: pointer;
          text-transform: capitalize;
          font-weight: bold;
          color: rgba(241, 108, 81, 0.6);
          padding: 10px;
          margin-right: 50px;
          transition: all 200ms ease;
          border-bottom: 3px solid transparent;
        }

        .Nav__tab::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scaleY(0);
          transform-origin: 0 bottom;
          transition: transform 200ms ease;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: rgba(241, 108, 81, 0.1);
        }

        .Nav__tab:hover::before {
          transform: translate(-50%, -50%) scaleY(1);
        }

        .itemActive {
          color: #f16c51;
          border-bottom-color: #f16c51;
        }

        @media only screen and (max-width: 768px) {
          .Nav {
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
          }
          .Nav::-webkit-scrollbar {
            display: none;
          }
          .Nav__tab {
            margin-right: 20px;
          }
        }
      `}
    </style>
  </nav>
);

export default Nav;
