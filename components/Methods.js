import { useState } from "react";
import Section from "./Section";
import Nav from "./Nav";
import Button from "./Button";
import TableList from "./TableList";

const Methods = props => {
  let methods = Object.keys(props.page.method);
  let titleColumn = ["Temperature", "Duration", "Action"];
  const [methodActive, setMethodActive] = useState(0);
  const [isDone, setIsDone] = useState({});

  const handleMethodActiveTab = e => {
    setMethodActive(parseInt(e.currentTarget.attributes.index.value));
  };

  const handleChange = e => {
    console.log(isDone);
    setIsDone({ [e.target.attributes.name.value]: true, ...isDone });
  };

  return (
    <Section name="Methods">
      <Nav
        table={methods}
        onClick={handleMethodActiveTab}
        tabActive={methodActive}
      />
      <div className="section__content">
        <TableList titleColumn={titleColumn}>
          {methodActive === 0 &&
            props.page.method.mash_temp.map((item, index) => {
              return (
                <li className="Item" key={index}>
                  <span>{item.temp.value + item.temp.unit}</span>
                  <span>{item.duration}</span>
                  <span>
                    <Button
                      name="mash_temp"
                      state={isDone["mash_temp"]}
                      onClick={handleChange}
                    />
                  </span>
                </li>
              );
            })}

          {methodActive === 1 && (
            <li className="Item">
              <span>
                {props.page.method.fermentation.temp.value +
                  props.page.method.fermentation.temp.unit}
              </span>
              <span>
                <Button
                  name="fermentation"
                  state={isDone["fermentation"]}
                  onClick={handleChange}
                />
              </span>
            </li>
          )}

          {methodActive === 2 && (
            <li className="Item">
              <span>
                {props.page.method.twist
                  ? props.page.method.twist
                  : "No need to twist"}
              </span>
              {props.page.method.twist && (
                <span>
                  <Button
                    name="twist"
                    state={isDone["twist"]}
                    onClick={handleChange}
                  />
                </span>
              )}
            </li>
          )}
        </TableList>
      </div>
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
          width: 33%;
        }

        span:nth-of-type(2) {
          text-align: center;
        }

        span:last-of-type {
          text-align: right;
        }
      `}</style>
    </Section>
  );
};

export default Methods;
