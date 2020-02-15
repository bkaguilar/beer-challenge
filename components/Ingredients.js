import Button from "./Button";
import Section from "./Section";
import TableList from "./TableList";
import Nav from "./Nav";
import { useState } from "react";

const Ingredients = props => {
  let ingredients = Object.keys(props.page.ingredients);
  const [ingredientActive, setIngredientActive] = useState(0);

  const handleIngredientActiveTab = e => {
    setIngredientActive(parseInt(e.currentTarget.attributes.index.value));
  };

  return (
    <Section name="Ingredients">
      <Nav
        table={ingredients}
        onClick={handleIngredientActiveTab}
        tabActive={ingredientActive}
      />
      <div className="section__content">
        {ingredientActive === 0 && (
          <IngredientsList ingredient={props.page.ingredients.malt} id="malt" />
        )}
        {ingredientActive === 1 && (
          <IngredientsList ingredient={props.page.ingredients.hops} id="hops" />
        )}
        {ingredientActive === 2 && <span>{props.page.ingredients.yeast}</span>}
      </div>
    </Section>
  );
};

const IngredientsList = props => {
  let titleColumn = ["Name", "Amount", "Action"];
  const [isDone, setIsDone] = useState({});

  let startArray = [];
  let middleArray = [];

  const handleChange = e => {
    let add = e.target.parentNode.parentNode.dataset.add;
    console.log(add);
    if (
      add === "start" ||
      (add === "middle" && startArray.every(isTrue)) ||
      (add === "end" && middleArray.every(isTrue)) ||
      !add
    ) {
      setIsDone({ [e.target.attributes.name.value]: true, ...isDone });
    } else {
      alert("Ingredient can`t be done until all ingredients are done");
    }
  };

  const isTrue = (el, index, arr) => {
    return el.props.state;
  };

  let list = props.ingredient.map((item, index) => {
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

  for (let i = 0; i < list.length; i++) {
    if (list[i].props.item.add === "start") startArray.push(list[i]);
    if (list[i].props.item.add === "middle") middleArray.push(list[i]);
  }

  return (
    <TableList id={props.id} titleColumn={titleColumn}>
      {list}
    </TableList>
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
        <Button name={props.name} state={props.state} onClick={props.onClick} />
      </span>
      <style jsx>{`
        .Item {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin: 25px 0;
          padding: 15px 0;
          border-bottom: 0.3px solid rgba(123, 130, 159, 0.5);
        }

        span {
          // max-width: 33%;
          width: 33%;
        }

        span:nth-of-type(2) {
          text-align: center;
        }

        span:last-of-type {
          text-align: right;
        }
      `}</style>
    </li>
  );
};

export default Ingredients;
