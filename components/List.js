const List = props => {
  return (
    <ul className="List">
      {props.item.map((item, index) => {
        return (
          <li>
            <span>{item.name}</span>
            <span>{item.amount.value}</span>
            <span>{item.amount.unit}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
