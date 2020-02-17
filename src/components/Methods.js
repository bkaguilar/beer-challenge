import { useState, useEffect } from "react";
import Section from "./Section";
import Nav from "./Nav";
import Button from "./Button";
import TableList from "./TableList";

const Methods = props => {
  let methods = Object.keys(props.page.method);
  let titleColumn = ["Temperature", "Duration", "Action"];
  const [methodActive, setMethodActive] = useState(0);
  const [isDone, setIsDone] = useState({});
  const [isPause, setIsPause] = useState({});
  const [isRunning, setIsRunning] = useState({});

  const handleMethodActiveTab = e => {
    setMethodActive(parseInt(e.currentTarget.attributes.index.value));
  };

  const handleChange = e => {
    let duration;
    let time = 0;

    if (e.target.hasAttribute("duration")) {
      duration = parseInt(e.target.attributes.duration.value);
    } else {
      setIsDone({ [e.target.attributes.name.value]: true });
    }

    const timing = e => {
      let target = e.target.attributes.name.value;
      setInterval(() => {
        if (time === duration) {
          clearInterval(timing);
          setIsRunning({ [target]: false });
          setIsDone({ [target]: true });
        } else {
          time++;
          console.log("time = " + time);
        }
      }, 1000);
    };

    if (
      !isRunning[e.target.attributes.name.value] &&
      !isPause[e.target.attributes.name.value] &&
      !isDone[e.target.attributes.name.value]
    ) {
      setIsRunning({ ...isRunning, [e.target.attributes.name.value]: true });
      timing(e);
    }
    if (
      isRunning[e.target.attributes.name.value] &&
      !isPause[e.target.attributes.name.value] &&
      !isDone[e.target.attributes.name.value]
    ) {
      clearInterval(timing);
      setIsPause({ ...isPause, [e.target.attributes.name.value]: true });
      setIsRunning({ ...isRunning, [e.target.attributes.name.value]: false });
    }
    if (
      !isRunning[e.target.attributes.name.value] &&
      isPause[e.target.attributes.name.value] &&
      !isDone[e.target.attributes.name.value]
    ) {
      timing();
      setIsPause({ ...isPause, [e.target.attributes.name.value]: false });
      setIsRunning({ ...isRunning, [e.target.attributes.name.value]: true });
      setIsDone({ ...isDone, [e.target.attributes.name.value]: false });
    }
  };

  return (
    <Section name="Methods">
      <Nav
        tableTab={methods}
        onClick={handleMethodActiveTab}
        tabActive={methodActive}
      />
      <div className="section__content">
        {methodActive === 0 && (
          <TableList id="mash_temp" titleColumn={titleColumn}>
            {props.page.method.mash_temp.map((item, index) => (
              <Item
                key={index}
                name={"mash_temp" + index}
                duration={item.duration}
                state={isDone["mash_temp" + index]}
                running={isRunning["mash_temp" + index]}
                pause={isPause["mash_temp" + index]}
                onClick={handleChange}
              >
                <span>{item.temp.value + " " + item.temp.unit}</span>
                <span>{item.duration}</span>
              </Item>
            ))}
          </TableList>
        )}
        {methodActive === 1 && (
          <TableList id="fermentation" titleColumn={titleColumn}>
            <Item
              name="fermentation"
              state={isDone["fermentation"]}
              onClick={handleChange}
            >
              <span>
                {props.page.method.fermentation.temp.value +
                  " " +
                  props.page.method.fermentation.temp.unit}
              </span>
            </Item>
          </TableList>
        )}

        {methodActive === 2 && (
          <TableList id="fermentation">
            <Item className="Item--twist" name="fermentation" methodActive={2}>
              <span>
                {props.page.method.twist
                  ? props.page.method.twist
                  : "No need to twist"}
              </span>
            </Item>
          </TableList>
        )}
      </div>
    </Section>
  );
};

const Item = props => {
  return (
    <li className={"Item " + props.className}>
      {props.children}
      <span>{props.methodActive != 2 && <Button {...props} />}</span>
    </li>
  );
};

export default Methods;
