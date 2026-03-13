import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import "./Main.css";

const Main = () => {
  return (
    <div className="Main">
      <div className="left-panel">
        <Chart1 />
      </div>

      <div className="right-panel">
        <Chart2 />
        <Chart3 />
      </div>
    </div>
  );
};

export default Main;
