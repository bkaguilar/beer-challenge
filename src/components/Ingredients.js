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

  const handleChange = e => {
    let add = e.target.parentNode.parentNode.dataset.add;
    if (
      add === "start" ||
      (add === "middle" && startArray.every(isTrue)) ||
      (add === "end" && middleArray.every(isTrue)) ||
      !add
    ) {
      setIsDone({ [e.target.attributes.name.value]: true, ...isDone });
    } else {
      setAlert(true);
    }
  };

  const isTrue = (el, index, arr) => {
    return el.props.state;
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
        state={isDone[`${item.name + index}`]}
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
                  state={isDone[`${item.name + index}`]}
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
                The ingredient can`t be done until all hops with add are done.
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
    <li className="Item" data-add={props.item.add} data-state={props.state}>
      <span className="Item__name">{props.item.name}</span>
      <span className="Item__value">
        {props.item.amount.value + " " + props.item.amount.unit}
      </span>
      <span>
        <Button {...props} />
      </span>
    </li>
  );
};

export default Ingredients;
