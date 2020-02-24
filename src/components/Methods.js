import { useState, useEffect } from "react";
import Section from "./Section";
import Nav from "./Nav";
import Button from "./Button";
import TableList from "./TableList";

let duration;
let interval = [];

const Methods = props => {
  let methods = Object.keys(props.page.method);
  let titleColumn = ["Temperature", "Duration", "Action"];

  const [methodActive, setMethodActive] = useState(0);
  const [isDone, setIsDone] = useState({});
  const [isPause, setIsPause] = useState({});
  const [isRunning, setIsRunning] = useState({});
  const [seconds, setSeconds] = useState({});

  const handleMethodActiveTab = e => {
    setMethodActive(parseInt(e.currentTarget.attributes.index.value));
  };

  const timer = (duration, name) => {
    if (seconds[name] === duration) {
      clearInterval(interval[name]);
      setSeconds({ ...seconds, [name]: 0 });
      setIsDone({ ...isDone, [name]: true });
      setIsRunning({ ...isRunning, [name]: false });
      setIsPause({ ...isPause, [name]: false });
    } else {
      setSeconds(prevSeconds => ({
        ...prevSeconds,
        [name]: prevSeconds[name] + 1
      }));
      console.log();
    }
  };

  useEffect(() => {
    console.log(seconds);
  }, [seconds]);

  const handleChange = e => {
    let name = e.target.attributes.name.value;
    if (e.target.hasAttribute("duration")) {
      duration = parseInt(e.target.attributes.duration.value);
      if (isDone[name]) {
        return;
      }

      if (!isRunning[name] && !isPause[name] && !isDone[name]) {
        setSeconds({ ...seconds, [name]: 0 });
        setIsRunning({ ...isRunning, [name]: true });
        interval[name] = setInterval(timer, 1000, duration, name);
      }

      if (isRunning[name]) {
        clearInterval(interval[name]);
        setIsRunning({ ...isRunning, [name]: false });
        setIsPause({ ...isPause, [name]: true });
      }

      if (isPause[name]) {
        interval[name] = setInterval(timer, 1000, duration, name);
        setIsPause({ ...isPause, [name]: false });
        setIsRunning({ ...isRunning, [name]: true });
      }
    } else {
      setIsDone({ [name]: true, ...isDone });
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
              <li key={index} className="Item">
                <span>{item.temp.value + " " + item.temp.unit}</span>
                <span>{item.duration}</span>
                <span>
                  <Button
                    name={"mash_temp" + index}
                    duration={item.duration}
                    seconds={seconds["mash_temp" + index]}
                    done={isDone["mash_temp" + index]}
                    running={isRunning["mash_temp" + index]}
                    pause={isPause["mash_temp" + index]}
                    onClick={handleChange}
                  />
                </span>
              </li>
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
