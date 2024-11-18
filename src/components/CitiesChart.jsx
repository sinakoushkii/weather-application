import { useState } from "react";

const CitiesChart = () => {
  const [citites, setCities] = useState([]);
  const [cititesData, setCititesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="form_wrapper">
      <form>
        <div className="input_wrapper">
          <input />
          <input />
          <input />
          <input />
          <input />
        </div>
        <button className="form_btn">Submitt</button>
      </form>
    </div>
  );
};

export default CitiesChart;
