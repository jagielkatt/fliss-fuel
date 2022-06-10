import React from "react";
import "./App.scss";
import { Calculator } from "./components/converter/Converter";

function App() {
  return (
    <div className="app">
      <div className="content">
        <div className="card">
          <h1 className="card__header">
            {" "}
            &#128054; Fliss calculator &#128747;
          </h1>
          <Calculator />
        </div>
        <p className="disclaimer">
          For educational purposes only. Do not use this website as your only
          source of information.{" "}
        </p>
      </div>
    </div>
  );
}

export default App;
