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

  const timer = name => {
    setSeconds(prevSeconds => ({
      ...prevSeconds,
      [name]: prevSeconds[name] - 1
    }));
  };

  //Check if the ingredient item seconds is zero
  useEffect(() => {
    let k = Object.keys(interval);
    if (k.length > 0) {
      for (let i = 0; i < k.length; i++) {
        if (seconds[k[i]] === 0) {
          clearInterval(interval[k[i]]);
          setIsDone({ ...isDone, [k[i]]: true });
          setIsRunning({ ...isRunning, [k[i]]: false });
          setIsPause({ ...isPause, [k[i]]: false });
        }
      }
    }
  }, [seconds]);

  const handleChange = e => {
    let name = e.target.attributes.name.value;
    if (e.target.hasAttribute("duration")) {
      duration = parseInt(e.target.attributes.duration.value);
      if (isDone[name]) {
        return;
      }

      if (!isRunning[name] && !isPause[name] && !isDone[name]) {
        setSeconds({ ...seconds, [name]: duration });
        setIsRunning({ ...isRunning, [name]: true });
        interval[name] = setInterval(timer, 1000, name);
      }

      if (isRunning[name]) {
        setIsRunning({ ...isRunning, [name]: false });
        setIsPause({ ...isPause, [name]: true });
        clearInterval(interval[name]);
      }

      if (isPause[name]) {
        setIsPause({ ...isPause, [name]: false });
        setIsRunning({ ...isRunning, [name]: true });
        interval[name] = setInterval(timer, 1000, name);
      }
    } else {
      setIsDone({ ...isDone, [name]: true });
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
              done={isDone["fermentation"]}
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
