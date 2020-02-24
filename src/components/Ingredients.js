import Button from "./Button";
import Section from "./Section";
import Modal from "./Modal";
import TableList from "./TableList";
import Nav from "./Nav";
import { useState, useEffect } from "react";

const Ingredients = props => {
  let ingredients = Object.keys(props.page.ingredients);
  let titleColumn = ["Name", "Amount", "Action"];
  let startArray = [];
  let middleArray = [];

  const [isDone, setIsDone] = useState({});
  const [alert, setAlert] = useState(false);
  const [ingredientActive, setIngredientActive] = useState(0);

  const handleIngredientActiveTab = e => {
    setIngredientActive(parseInt(e.currentTarget.attributes.index.value));
  };

  const checkAdd = addValue => {
    const isAddTrue = e => {
      return e.props.done;
    };
    return (
      addValue === "start" ||
      (addValue === "middle" && startArray.every(isAddTrue)) ||
      (addValue === "end" && middleArray.every(isAddTrue))
    );
  };

  const handleChange = e => {
    let addValue = e.target.parentNode.parentNode.dataset.add;
    if (checkAdd(addValue) || !addValue) {
      setIsDone({ [e.target.attributes.name.value]: true, ...isDone });
    } else {
      setAlert(true);
    }
  };

  const handleClose = () => {
    setAlert(false);
  };

  let hopList = props.page.ingredients.hops.map((item, index) => {
    return (
      <Item
        key={index}
        name={item.name + index}
        item={item}
        onClick={handleChange}
        done={isDone[`${item.name + index}`]}
      />
    );
  });

  useEffect(() => {
    for (let i = 0; i < hopList.length; i++) {
      if (hopList[i].props.item.add === "start") startArray.push(hopList[i]);
      if (hopList[i].props.item.add === "middle") middleArray.push(hopList[i]);
    }
  });

  return (
    <Section name="Ingredients">
      <Nav
        tableTab={ingredients}
        onClick={handleIngredientActiveTab}
        tabActive={ingredientActive}
      />
      <div className="section__content">
        {ingredientActive === 0 && (
          <TableList id="malt" titleColumn={titleColumn}>
            {props.page.ingredients.malt.map((item, index) => {
              return (
                <Item
                  key={index}
                  name={item.name + index}
                  item={item}
                  onClick={handleChange}
                  done={isDone[`${item.name + index}`]}
                />
              );
            })}
          </TableList>
        )}

        {ingredientActive === 1 && (
          <TableList id="hops" titleColumn={titleColumn}>
            {hopList}
            {alert && (
              <Modal onClick={handleClose}>
                The ingredient can`t be done until all hops with add start or
                middle are done.
              </Modal>
            )}
          </TableList>
        )}

        {ingredientActive === 2 && (
          <TableList id="yeast">
            <li className="Item Item--yeast">
              <span>{props.page.ingredients.yeast}</span>
            </li>
          </TableList>
        )}
      </div>
    </Section>
  );
};

const Item = props => {
  return (
    <li className="Item" data-add={props.item.add} data-state={props.done}>
      <span className="Item__name">{props.item.name}</span>
      <span className="Item__value">
        {props.item.amount.value + " " + props.item.amount.unit}
      </span>
      <span>
        {props.item.add && (
          <span
            className="Item__add"
            title={"Add ingredient in the " + props.item.add}
          >
            {props.item.add}
          </span>
        )}
        <Button {...props} />
      </span>
      <style jsx>{`
        .Item__add {
          display: inline-block;
          font-weight: bold;
          width: 60px;
          text-align: center !important;
          font-size: 0.8em;
          text-transform: capitalize;
          padding: 2px 10px;
          margin-right: 15%;
          border-radius: 5px;
          color: rgb(123, 130, 159);
          background: rgba(123, 130, 159, 0.3);
        }
      `}</style>
    </li>
  );
};

export default Ingredients;
