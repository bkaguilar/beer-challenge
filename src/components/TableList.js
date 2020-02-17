const TableList = props => {
  return (
    <ul id={props.id} className="TableList">
      <div className="TableList__nav">
        {props.titleColumn.map((item, index) => (
          <h3 key={index} className="TableList__nav__title">
            {item}
          </h3>
        ))}
      </div>
      {props.children}
      <style jsx>{`
        .TableList {
          background: white;
          height: 100%;
          padding: 20px 0;
          transform: translateY(100px);
          opacity: 0;
          animation: showTable 1s ease forwards;

          @keyframes showTable {
            100% {
              opacity: 1;
              transform: none;
            }
          }
        }

        .TableList__nav {
          font-size: 0.8em;
          color: rgba(123, 130, 159, 0.6);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }

        h3 {
          max-width: 33%;
        }

        @media only screen and (max-width: 768px) {
          .TableList__nav {
            font-size: 0.7em;
          }
        }
      `}</style>
    </ul>
  );
};

export default TableList;
